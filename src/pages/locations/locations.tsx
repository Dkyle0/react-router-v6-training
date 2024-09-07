import styles from './locations.module.css';
import locationsData from '../../info-data/location.json';
import { CardsComponent } from '../../cardsComponent';
import { useMatch } from 'react-router-dom';
import { SortButton } from '../../sort-button';
import { useState } from 'react';
import { useListSortEffect } from '../../hooks';

export const Locations = () => {
	const isCard = useMatch('/locations/:id');
	const [sortingOrder, setSortingOrder] = useState(false);

	useListSortEffect(locationsData, sortingOrder);

	const list = (
		<>
			<h1>Локации</h1>
			<SortButton sortingOrder={sortingOrder} setSortingOrder={setSortingOrder} />
			<div className={styles.locationsList}>
				{locationsData.map(({ id, name, created }) => {
					return (
						<CardsComponent
							key={id}
							id={id}
							title={name}
							created={created}
							url="locations"
						/>
					);
				})}
			</div>
		</>
	);

	const id = Number(isCard?.params?.id) - 1;

	const char =
		!isNaN(id) && id >= 0 && id < locationsData.length ? (
			<div className={styles.locations}>
				<h1>{locationsData[id].name}</h1>
				<p>
					<strong>Dimension:</strong> {locationsData[id].dimension}
				</p>
				<p>
					<strong>Type:</strong> {locationsData[id].type || 'N/A'}
				</p>
				<p>
					<strong>Created:</strong>{' '}
					{new Date(locationsData[id].created).toLocaleDateString()}
				</p>
			</div>
		) : (
			<h1>Ошибка: Локация не найден</h1>
		);

	const render = isCard ? char : list;

	return <div className={styles.container}>{render}</div>;
};
