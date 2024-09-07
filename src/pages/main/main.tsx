import { Link } from 'react-router-dom';
import styles from './main.module.css';

export const Main = () => {
	return (
		<div className={styles.container}>
			<h1>
				Hello from Rick
				<Link to={`secret`}>and</Link>
				Morty
			</h1>
		</div>
	);
};
