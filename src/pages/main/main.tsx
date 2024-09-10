import { Link } from 'react-router-dom';
import { useAuth } from '../../auth-provider/auth-provider';
import styles from './main.module.css';

export const Main = () => {
	const auth = useAuth();
	const name = auth?.user || 'Anonimous';
	return (
		<div className={styles.container}>
			<h1>
				<p>Hello {name}!</p>
				From Rick
				<Link to={`secret`}>and</Link>
				Morty
			</h1>
		</div>
	);
};
