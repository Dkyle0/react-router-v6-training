import styles from './characters.module.css';
import charData from '../../info-data/characters.json';
import { CardsComponent } from '../../cardsComponent';
import { useMatch } from 'react-router-dom';
import { useState } from 'react';
import { SortButton } from '../../sort-button';
import { useListSortEffect } from '../../hooks';

export const Characters = () => {
	const isCard = useMatch('/characters/:id');
	const [sortingOrder, setSortingOrder] = useState(false);

	useListSortEffect(charData, sortingOrder);

	const list = (
		<>
			<h1>Персонажи</h1>
			<SortButton sortingOrder={sortingOrder} setSortingOrder={setSortingOrder} />
			<div className={styles.charList}>
				{charData.map(({ id, name, image, created }) => {
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

	const id = Number(isCard?.params?.id) - 1;

	const char =
		!isNaN(id) && id >= 0 && id < charData.length ? (
			<div className={styles.char}>
				<h1>{charData[id].name}</h1>
				<img src={charData[id].image} alt={charData[id].name} />
				<p>
					<strong>Status:</strong> {charData[id].status}
				</p>
				<p>
					<strong>Species:</strong> {charData[id].species}
				</p>
				<p>
					<strong>Type:</strong> {charData[id].type || 'N/A'}
				</p>
				<p>
					<strong>Gender:</strong> {charData[id].gender}
				</p>
				<p>
					<strong>Created:</strong>{' '}
					{new Date(charData[id].created).toLocaleDateString()}
				</p>
			</div>
		) : (
			<h1>Ошибка: Персонаж не найден</h1>
		);

	const render = isCard ? char : list;

	return <div className={styles.container}>{render}</div>;
};
