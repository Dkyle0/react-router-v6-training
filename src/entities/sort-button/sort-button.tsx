import { useState } from 'react';
import styles from './sort-button.module.css';

export const SortButton = ({
	sortingOrder,
	setSortingOrder,
}: {
	sortingOrder: boolean;
	setSortingOrder: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const [first, setFirst] = useState(true);

	const handleClick = () => {
		setSortingOrder((prev) => !prev);
		if (first) setFirst(false);
	};

	return (
		<div className={styles.sortBtnContainer}>
			<div className={styles.sortBtn}>
				<button className={styles.buttonArounder} onClick={handleClick}>
					{first ? 'Сотртировать' : sortingOrder ? 'DSC' : 'ASC'}
				</button>
			</div>
		</div>
	);
};
