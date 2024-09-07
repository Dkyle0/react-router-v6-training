import { Link } from 'react-router-dom';
import styles from './cardsComponent.module.css';

interface ICardsComponent {
	id: number;
	title: string;
	imageUrl?: string;
	created: string;
	url: string;
}

export const CardsComponent = ({
	id,
	title,
	imageUrl,
	created,
	url,
}: ICardsComponent) => {
	return (
		<div className={styles.container}>
			<Link to={`/${url}/${id}`}>
				<img
					className={styles.img}
					src={
						imageUrl ||
						'https://ideogram.ai/assets/image/lossless/response/2xC_4FcHTPCxi84AN1CWOQ'
					}
					alt={title}
				/>
				<div className={styles.postCardFoter}>
					<h4>{title}</h4>
					<div className={styles.postCardInfo}>
						<div className={styles.created}>{created!.slice(0, 10)}</div>
					</div>
				</div>
			</Link>
		</div>
	);
};
