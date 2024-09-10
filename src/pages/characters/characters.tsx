import styles from './characters.module.css';
import charData from '../../info-data/characters.json';
import { CardsComponent } from '../../cards-component';
import { useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { SortButton } from '../../sort-button';
import { useListSortEffect } from '../../hooks';

export const Characters = () => {
	const { id } = useParams();
	const [sortingOrder, setSortingOrder] = useState(false);
	const sortedData = useMemo(() => [...charData], []);

	useListSortEffect(sortedData, sortingOrder);

	const list = (
		<>
			<h1>Персонажи</h1>
			<SortButton sortingOrder={sortingOrder} setSortingOrder={setSortingOrder} />
			<div className={styles.charList}>
				{sortedData.map(({ id, name, image, created }) => {
					return (
						<CardsComponent
							key={id}
							id={id}
							title={name}
							imageUrl={image}
							created={created}
							url="characters"
						/>
					);
				})}
			</div>
		</>
	);

	const currentId = Number(id) - 1;

	const char =
		!isNaN(currentId) && currentId >= 0 && currentId < sortedData.length ? (
			<div className={styles.char}>
				<h1>{sortedData[currentId].name}</h1>
				<img src={sortedData[currentId].image} alt={sortedData[currentId].name} />
				<p>
					<strong>Status:</strong> {sortedData[currentId].status}
				</p>
				<p>
					<strong>Species:</strong> {sortedData[currentId].species}
				</p>
				<p>
					<strong>Type:</strong> {sortedData[currentId].type || 'N/A'}
				</p>
				<p>
					<strong>Gender:</strong> {sortedData[currentId].gender}
				</p>
				<p>
					<strong>Created:</strong>{' '}
					{new Date(sortedData[currentId].created).toLocaleDateString()}
				</p>
			</div>
		) : (
			<h1>Ошибка: Персонаж не найден</h1>
		);

	const render = id ? char : list;

	return <div className={styles.container}>{render}</div>;
};
