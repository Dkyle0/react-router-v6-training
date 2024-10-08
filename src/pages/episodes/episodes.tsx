import styles from './episodes.module.css';
import defaultEpisodeData from '../../info-data/episode.json';
import { useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { useFetchData, useListSortEffect } from '../../hooks';
import { ListForInfoPages } from '../../list-for-info-pages';
import { InfoPage } from '../info-page';

export const Episodes = () => {
	const { id } = useParams();
	const [sortingOrder, setSortingOrder] = useState(false);
	let URL = 'https://rickandmortyapi.com/api/episode';
	const episodeData = useFetchData(URL, defaultEpisodeData);
	const sortedData = useMemo(() => [...episodeData], [episodeData]);

	useListSortEffect(sortedData, sortingOrder);

	const list = (
		<ListForInfoPages
			title="Эпизоды"
			sortingOrder={sortingOrder}
			sortedData={sortedData}
			setSortingOrder={setSortingOrder}
		/>
	);

	const currentEpisode = id ? sortedData.find((el) => el.id === Number(id)) : null;

	const episode = (
		<InfoPage
			title="episode"
			errorMessage="Эпизод не найден"
			currentData={currentEpisode}
		/>
	);

	const render = id ? episode : list;

	return <div className={styles.container}>{render}</div>;
};
