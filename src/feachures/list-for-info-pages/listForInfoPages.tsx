import { CardsComponent } from "../../entities/cards-component/cards-component";
import { SortButton } from "../../entities/sort-button/sort-button";
import styles from "./listForInfoPages.module.css";

interface IListForInfoPages {
  title: string;
  sortingOrder: boolean;
  setSortingOrder: React.Dispatch<React.SetStateAction<boolean>>;
  sortedData: IInfoData[];
  lastNodeRef: (node: HTMLDivElement | null) => void;
}

export const ListForInfoPages = ({
  title,
  sortingOrder,
  setSortingOrder,
  sortedData,
  lastNodeRef,
}: IListForInfoPages) => {
  let resultList;

  switch (title) {
    case "Локации":
      resultList = sortedData.map(({ id, name, created }, index) => {
        return sortedData.length - 9 === index + 1 ? (
          <CardsComponent
            key={id}
            id={id}
            title={name}
            created={created}
            url="location"
            lastNodeRef={lastNodeRef}
          />
        ) : (
          <CardsComponent
            key={id}
            id={id}
            title={name}
            created={created}
            url="location"
          />
        );
      });
      break;
    case "Персонажи":
      resultList = sortedData.map(({ id, name, image, created }, index) => {
        return sortedData.length - 9 === index + 1 ? (
          <CardsComponent
            key={id}
            id={id}
            title={name}
            imageUrl={image}
            created={created}
            url="character"
            lastNodeRef={lastNodeRef}
          />
        ) : (
          <CardsComponent
            key={id}
            id={id}
            title={name}
            imageUrl={image}
            created={created}
            url="character"
          />
        );
      });
      break;
    case "Эпизоды":
      resultList = sortedData.map(({ id, name, created }, index) => {
        return sortedData.length - 9 === index + 1 ? (
          <CardsComponent
            key={id}
            id={id}
            title={name}
            created={created}
            url="episode"
            lastNodeRef={lastNodeRef}
          />
        ) : (
          <CardsComponent
            key={id}
            id={id}
            title={name}
            created={created}
            url="episode"
          />
        );
      });
      break;
    default:
      resultList = "";
      break;
  }

  return (
    <>
      <h1>{title}</h1>
      <SortButton
        sortingOrder={sortingOrder}
        setSortingOrder={setSortingOrder}
      />
      <div className={styles.list}>{resultList}</div>
    </>
  );
};
