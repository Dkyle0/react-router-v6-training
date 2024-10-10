import { useEffect, useState } from 'react';

export const useFetchData = <T>(url: string, defaultData: T[]): T[] => {
	const [data, setData] = useState<T[]>(defaultData);

	useEffect(() => {
		if (url) {
			fetch(url)
				.then((fetchedData) => fetchedData.json())
				.then((newData) => setData(newData.results))
				.catch((error) => {
					console.error('Ошибка при загрузке данных:', error);
					setData(defaultData);
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url]);

	return data;
};
