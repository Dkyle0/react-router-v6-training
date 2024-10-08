import styles from './listForInfoPages.module.css';
import { SortButton } from '../sort-button';
import { CardsComponent } from '../cards-component';

interface IListForInfoPages {
	title: string;
	sortingOrder: boolean;
	setSortingOrder: React.Dispatch<React.SetStateAction<boolean>>;
	sortedData: IInfoData[];
}

export const ListForInfoPages = ({
	title,
	sortingOrder,
	setSortingOrder,
	sortedData,
}: IListForInfoPages) => {
	let resultList;

	switch (title) {
		case 'Локации':
			resultList = sortedData.map(({ id, name, created }) => {
				return (
					<CardsComponent
						key={id}
						id={id}
						title={name}
						created={created}
						url="locations"
					/>
				);
			});
			break;
		case 'Персонажи':
			resultList = sortedData.map(({ id, name, image, created }) => {
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
			});
			break;
		case 'Эпизоды':
			resultList = sortedData.map(({ id, name, created }) => {
				return (
					<CardsComponent
						key={id}
						id={id}
						title={name}
						created={created}
						url="episodes"
					/>
				);
			});
			break;
		default:
			resultList = '';
			break;
	}

	return (
		<>
			<h1>{title}</h1>
			<SortButton sortingOrder={sortingOrder} setSortingOrder={setSortingOrder} />
			<div className={styles.list}>{resultList}</div>
		</>
	);
};
