import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './menu.module.css';
import { useAuth } from '../../auth-provider/auth-provider';
import { internalPaths } from '../../constants/internal-paths';

const menuItems = [
	{ path: '/', name: 'Главная' },
	{ path: internalPaths.characters, name: 'Персонажи' },
	{ path: internalPaths.episodes, name: 'Эпизоды' },
	{ path: internalPaths.locations, name: 'Расположение' },
];

export const Menu = () => {
	const location = useLocation();
	const [currentMenu, setCurrentMenu] = useState(menuItems);
	const auth = useAuth();
	const navigate = useNavigate();
	const handleSingout = () => {
		auth?.signout(() => {
			navigate('/');
		});
	};

	useEffect(() => {
		setCurrentMenu(menuItems.filter((item) => item.path !== location.pathname));
	}, [location.pathname]);

	return (
		<div className={styles.dropdown}>
			<button className={styles.drop_butt}></button>
			<nav className={styles.drop_content}>
				{currentMenu.map((item, index) => (
					<Link key={index} to={item.path}>
						{item.name}
					</Link>
				))}
				{auth?.user ? (
					<button onClick={handleSingout}>Выйти</button>
				) : (
					<Link to={'/login'}>Войти</Link>
				)}
			</nav>
		</div>
	);
};
