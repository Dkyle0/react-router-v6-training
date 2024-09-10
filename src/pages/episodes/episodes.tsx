import styles from './episodes.module.css';
import episodeData from '../../info-data/episode.json';
import { CardsComponent } from '../../cards-component';
import { useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { useListSortEffect } from '../../hooks';
import { SortButton } from '../../sort-button';

export const Episodes = () => {
	const { id } = useParams();
	const [sortingOrder, setSortingOrder] = useState(false);
	const sortedData = useMemo(() => [...episodeData], []);

	useListSortEffect(sortedData, sortingOrder);

	const list = (
		<>
			<h1>Эпизоды</h1>
			<SortButton sortingOrder={sortingOrder} setSortingOrder={setSortingOrder} />
			<div className={styles.episodesList}>
				{sortedData.map(({ id, name, created }) => {
					return (
						<CardsComponent
							key={id}
							id={id}
							title={name}
							created={created}
							url="episodes"
						/>
					);
				})}
			</div>
		</>
	);

	const currentId = Number(id) - 1;

	const char =
		!isNaN(currentId) && currentId >= 0 && currentId < sortedData.length ? (
			<div className={styles.episodes}>
				<h1>{sortedData[currentId].name}</h1>
				<img
					src={
						'https://ideogram.ai/assets/image/lossless/response/2xC_4FcHTPCxi84AN1CWOQ'
					}
					alt={sortedData[currentId].name}
				/>
				<p>
					<strong>Episode:</strong> {sortedData[currentId].episode}
				</p>
				<p>
					<strong>Air_date:</strong> {sortedData[currentId].air_date}
				</p>
				<p>
					<strong>Created:</strong>{' '}
					{new Date(sortedData[currentId].air_date).toLocaleDateString()}
				</p>
			</div>
		) : (
			<h1>Ошибка: Эпизод не найден</h1>
		);

	const render = id ? char : list;

	return <div className={styles.container}>{render}</div>;
};
