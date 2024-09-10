import styles from './locations.module.css';
import locationsData from '../../info-data/location.json';
import { CardsComponent } from '../../cards-component';
import { useParams } from 'react-router-dom';
import { SortButton } from '../../sort-button';
import { useMemo, useState } from 'react';
import { useListSortEffect } from '../../hooks';

export const Locations = () => {
	const { id } = useParams();
	const [sortingOrder, setSortingOrder] = useState(false);
	const sortedData = useMemo(() => [...locationsData], []);

	useListSortEffect(sortedData, sortingOrder);

	const list = (
		<>
			<h1>Локации</h1>
			<SortButton sortingOrder={sortingOrder} setSortingOrder={setSortingOrder} />
			<div className={styles.locationsList}>
				{sortedData.map(({ id, name, created }) => {
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

	const currentId = Number(id) - 1;

	const char =
		!isNaN(currentId) && currentId >= 0 && currentId < sortedData.length ? (
			<div className={styles.locations}>
				<h1>{sortedData[currentId].name}</h1>
				<p>
					<strong>Dimension:</strong> {sortedData[currentId].dimension}
				</p>
				<p>
					<strong>Type:</strong> {sortedData[currentId].type || 'N/A'}
				</p>
				<p>
					<strong>Created:</strong>{' '}
					{new Date(sortedData[currentId].created).toLocaleDateString()}
				</p>
			</div>
		) : (
			<h1>Ошибка: Локация не найден</h1>
		);

	const render = id ? char : list;

	return <div className={styles.container}>{render}</div>;
};
