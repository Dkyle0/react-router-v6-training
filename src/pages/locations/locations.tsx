import styles from './locations.module.css';
import DefaultLocationsData from '../../info-data/location.json';
import { useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { useFetchData, useListSortEffect } from '../../hooks';
import { ListForInfoPages } from '../../list-for-info-pages';
import { InfoPage } from '../info-page';

export const Locations = () => {
	const { id } = useParams();
	const [sortingOrder, setSortingOrder] = useState(false);
	let URL = 'https://rickandmortyapi.com/api/location';
	const locationsData = useFetchData(URL, DefaultLocationsData);
	const sortedData = useMemo(() => [...locationsData], [locationsData]);

	useListSortEffect(sortedData, sortingOrder);

	const list = (
		<ListForInfoPages
			title="Локации"
			sortingOrder={sortingOrder}
			sortedData={sortedData}
			setSortingOrder={setSortingOrder}
		/>
	);

	const currentLocation = id ? sortedData.find((el) => el.id === Number(id)) : null;

	const location = (
		<InfoPage
			title="loc"
			errorMessage="Локация не найдена"
			currentData={currentLocation}
		/>
	);

	const render = id ? location : list;

	return <div className={styles.container}>{render}</div>;
};
