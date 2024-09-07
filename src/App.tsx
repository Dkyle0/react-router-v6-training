import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Menu } from './menu';
import { Characters, Episodes, Error, Main } from './pages';
import { Locations } from './pages/locations/locations';
import { SecretLevel } from './pages/secret-level';

export function App() {
	return (
		<div className="App">
			<Menu />
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/characters/" element={<Characters />} />
				<Route path="/characters/:id" element={<Characters />} />
				<Route path="/episodes/" element={<Episodes />} />
				<Route path="/episodes/:id" element={<Episodes />} />
				<Route path="/locations/" element={<Locations />} />
				<Route path="/locations/:id" element={<Locations />} />
				<Route path="/secret" element={<SecretLevel />} />
				<Route path="/*" element={<Error title="Такая страница не найдена." />} />
			</Routes>
		</div>
	);
}
