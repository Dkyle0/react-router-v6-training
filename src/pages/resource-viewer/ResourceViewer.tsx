import styles from "./ResourceViewer.module.css";
import DefaultCharData from "./info-data/characters.json";
import defaultEpisodeData from "./info-data/episode.json";
import DefaultLocationsData from "./info-data/location.json";
import { useLoaderData, useParams } from "react-router-dom";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFetchNewPageData } from "../../shared/lib/hooks/useFetchNewPageData";
import { useListSortEffect } from "../../shared/lib/hooks/useListSortEffect";
import { ListForInfoPages } from "../../feachures/list-for-info-pages/listForInfoPages";
import { InfoPage } from "../../feachures/info-page/infoPage";

export const ResourceViewer = ({ title }: { title: string }) => {
  const { id } = useParams();
  const [sortingOrder, setSortingOrder] = useState(false);
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState<IInfoData[]>([]);
  const [loadedPages, setLoadedPages] = useState<Set<number>>(new Set());
  const [hasMoreData, setHasMoreData] = useState(true);
  const defaultData = useRef([] as IInfoData[]);

  const loaderData = useLoaderData() as {
    results: IInfoData[];
    currentData: IInfoData | null;
  };
  const { results, currentData } = loaderData;

  const [infoData, setInfoData] = useState<IInfoData[]>([]);
  const [currentItem, setCurrentItem] = useState<IInfoData | null>(currentData);

  const observer = useRef<IntersectionObserver | undefined>(undefined);

  const lastNodeRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreData) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [hasMoreData]
  );

  const defaultURL = useRef("");
  let errorMessage = "";

  switch (title) {
    case "Персонажи":
      defaultData.current = DefaultCharData;
      defaultURL.current = "https://rickandmortyapi.com/api/character";
      errorMessage = "Персонаж не найден";
      break;
    case "Локации":
      defaultData.current = DefaultLocationsData;
      defaultURL.current = "https://rickandmortyapi.com/api/location";
      errorMessage = "Локация не найдена";
      break;
    case "Эпизоды":
      defaultData.current = defaultEpisodeData;
      defaultURL.current = "https://rickandmortyapi.com/api/episode";
      errorMessage = "Эпизод не найден";
      break;
    default:
      break;
  }

  const URL = useRef(defaultURL.current);

  useEffect(() => {
    setPage(1);
    setAllData(results);
    setLoadedPages(new Set([1]));
    setHasMoreData(results.length > 0);
    setInfoData(results);
  }, [results]);

  useEffect(() => {
    if (id) {
      setCurrentItem(currentData);
    } else {
      setCurrentItem(null);
    }
  }, [id, currentData]);

  useFetchNewPageData({
    page,
    loadedPages,
    hasMoreData,
    URL,
    defaultURL,
    defaultData,
    setInfoData,
  });

  useEffect(() => {
    if (infoData?.length && !loadedPages.has(page)) {
      const newData = infoData.filter(
        (newItem) =>
          !allData.some((existingItem) => existingItem.id === newItem.id)
      );
      if (newData.length > 0) {
        setAllData((prev) => [...prev, ...newData]);
        setLoadedPages((prev) => new Set(prev).add(page));
      }
    } else if (!infoData?.length && page > 1) {
      setHasMoreData(false);
    }
  }, [infoData, page, loadedPages, allData]);

  const sortedData = useMemo(() => {
    const sorted = [...allData];
    if (sortingOrder) {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    }
    return sorted;
  }, [allData, sortingOrder]);

  useListSortEffect(sortedData, sortingOrder);

  const list = (
    <ListForInfoPages
      title={title}
      sortingOrder={sortingOrder}
      sortedData={sortedData}
      setSortingOrder={setSortingOrder}
      lastNodeRef={lastNodeRef}
    />
  );

  const char =
    id && currentItem ? (
      <InfoPage
        title={title}
        errorMessage={errorMessage}
        currentData={currentItem}
      />
    ) : null;

  const render = id ? char : list;

  return (
    <div
      className={`${styles.container} 
                ${title === "Персонажи" ? styles.bgChar : ""} 
                ${title === "Эпизоды" ? styles.bgLoc : ""} 
                ${title === "Локации" ? styles.bgEpi : ""}`}
    >
      {render}
    </div>
  );
};
