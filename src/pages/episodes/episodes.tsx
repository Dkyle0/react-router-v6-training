import styles from './episodes.module.css';
import episodeData from '../../info-data/episode.json';
import { CardsComponent } from '../../cardsComponent';
import { useMatch } from 'react-router-dom';
import { useState } from 'react';
import { useListSortEffect } from '../../hooks';
import { SortButton } from '../../sort-button';

export const Episodes = () => {
	const isCard = useMatch('/episodes/:id');
	const [sortingOrder, setSortingOrder] = useState(false);

	useListSortEffect(episodeData, sortingOrder);

	const list = (
		<>
			<h1>Эпизоды</h1>
			<SortButton sortingOrder={sortingOrder} setSortingOrder={setSortingOrder} />
			<div className={styles.episodesList}>
				{episodeData.map(({ id, name, created }) => {
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

	const id = Number(isCard?.params?.id) - 1;

	const char =
		!isNaN(id) && id >= 0 && id < episodeData.length ? (
			<div className={styles.episodes}>
				<h1>{episodeData[id].name}</h1>
				<img
					src={
						'https://ideogram.ai/assets/image/lossless/response/2xC_4FcHTPCxi84AN1CWOQ'
					}
					alt={episodeData[id].name}
				/>
				<p>
					<strong>Episode:</strong> {episodeData[id].episode}
				</p>
				<p>
					<strong>Air_date:</strong> {episodeData[id].air_date}
				</p>
				<p>
					<strong>Created:</strong>{' '}
					{new Date(episodeData[id].air_date).toLocaleDateString()}
				</p>
			</div>
		) : (
			<h1>Ошибка: Эпизод не найден</h1>
		);

	const render = isCard ? char : list;

	return <div className={styles.container}>{render}</div>;
};
