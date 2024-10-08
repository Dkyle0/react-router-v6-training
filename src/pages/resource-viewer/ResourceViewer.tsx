import styles from './ResourceViewer.module.css';
import DefaultCharData from '../../info-data/characters.json';
import defaultEpisodeData from '../../info-data/episode.json';
import DefaultLocationsData from '../../info-data/location.json';
import { useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { useFetchData, useListSortEffect } from '../../hooks';
import { ListForInfoPages } from '../../list-for-info-pages';
import { InfoPage } from '../info-page';

export const ResourceViewer = ({ title }: { title: string }) => {
	const { id } = useParams();
	const [sortingOrder, setSortingOrder] = useState(false);

	let defaultData: IInfoData[] = [];
	let URL = '';
	let errorMessage = '';

	switch (title) {
		case 'Персонажи':
			defaultData = DefaultCharData;
			URL = 'https://rickandmortyapi.com/api/character';
			errorMessage = 'Персонаж не найден';
			break;
		case 'Локации':
			defaultData = DefaultLocationsData;
			URL = 'https://rickandmortyapi.com/api/location';
			errorMessage = 'Локация не найдена';
			break;
		case 'Эпизоды':
			defaultData = defaultEpisodeData;
			URL = 'https://rickandmortyapi.com/api/episode';
			errorMessage = 'Эпизод не найден';
			break;
		default:
			break;
	}

	const charData = useFetchData(URL, defaultData);
	const sortedData = useMemo(() => [...charData], [charData]);

	useListSortEffect(sortedData, sortingOrder);

	const list = (
		<ListForInfoPages
			title={title}
			sortingOrder={sortingOrder}
			sortedData={sortedData}
			setSortingOrder={setSortingOrder}
		/>
	);

	const currentChar = id ? sortedData.find((el) => el.id === Number(id)) : null;

	const char = (
		<InfoPage title={title} errorMessage={errorMessage} currentData={currentChar} />
	);

	const render = id ? char : list;

	return <div className={styles.container}>{render}</div>;
};
