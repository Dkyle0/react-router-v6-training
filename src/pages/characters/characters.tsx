import styles from './characters.module.css';
import DafaultCharData from '../../info-data/characters.json';
import { useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { useFetchData, useListSortEffect } from '../../hooks';
import { ListForInfoPages } from '../../list-for-info-pages';
import { InfoPage } from '../info-page';

export const Characters = () => {
	const { id } = useParams();
	const [sortingOrder, setSortingOrder] = useState(false);
	// const [page, setPage] = useState(1);
	let URL = 'https://rickandmortyapi.com/api/character';
	const charData = useFetchData(URL, DafaultCharData);
	const sortedData = useMemo(() => [...charData], [charData]);

	useListSortEffect(sortedData, sortingOrder);

	const list = (
		<ListForInfoPages
			title="Персонажи"
			sortingOrder={sortingOrder}
			sortedData={sortedData}
			setSortingOrder={setSortingOrder}
		/>
	);

	const currentChar = id ? sortedData.find((el) => el.id === Number(id)) : null;

	const char = (
		<InfoPage
			title="char"
			errorMessage="Персонаж не найден"
			currentData={currentChar}
		/>
	);

	const render = id ? char : list;

	return <div className={styles.container}>{render}</div>;
};
