import { useEffect } from 'react';

interface INewPageData {
	page: number;
	loadedPages: Set<number>;
	hasMoreData: boolean;
	URL: React.MutableRefObject<string>;
	defaultURL: React.MutableRefObject<string>;
	defaultData: React.MutableRefObject<IInfoData[]>;
	setInfoData: (value: React.SetStateAction<IInfoData[]>) => void;
}

export const useFetchNewPageData = ({
	page,
	loadedPages,
	hasMoreData,
	URL,
	defaultURL,
	defaultData,
	setInfoData,
}: INewPageData) => {
	useEffect(() => {
		if (!loadedPages.has(page) && hasMoreData && page > 1) {
			URL.current = `${defaultURL.current}?page=${page}`;
			fetch(URL.current)
				.then((fetchedData) => fetchedData.json())
				.then((newData) => setInfoData(newData.results))
				.catch((error) => {
					console.error('Ошибка при загрузке данных:', error);
					setInfoData(defaultData.current);
				});
		}
	}, [page, loadedPages, hasMoreData, URL, defaultURL, setInfoData, defaultData]);
};
