import { useEffect, useState } from 'react';

export const useFetchData = <T>(url: string, defaultData: T[]): T[] => {
	const [data, setData] = useState<T[]>(defaultData);

	useEffect(() => {
		fetch(url)
			.then((fetchedData) => fetchedData.json())
			.then((newData) => setData(newData.results));
	}, [url]);

	return data;
};
