import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Menu } from './menu';
import { Characters, Episodes, Error, Login, Main } from './pages';
import { Locations } from './pages/locations/locations';
import { SecretLevel } from './pages/secret-level';
import { internalPaths } from './constants/internal-paths';
import { PrivateRoute } from './private-route';

export function App() {
	return (
		<div className="App">
			<Menu />
			<Routes>
				<Route path={internalPaths.home} element={<Main />} />
				<Route path={internalPaths.login} element={<Login />} />
				<Route
					path={internalPaths.characters}
					element={
						<PrivateRoute>
							<Characters />
						</PrivateRoute>
					}
				>
					<Route
						path={internalPaths.character(':id')}
						element={<Characters />}
					/>
				</Route>
				<Route
					path={internalPaths.episodes}
					element={
						<PrivateRoute>
							<Episodes />
						</PrivateRoute>
					}
				>
					<Route path={internalPaths.episode(':id')} element={<Episodes />} />
				</Route>
				<Route
					path={internalPaths.locations}
					element={
						<PrivateRoute>
							<Locations />
						</PrivateRoute>
					}
				>
					<Route path={internalPaths.location(':id')} element={<Locations />} />
				</Route>
				<Route path={internalPaths.secret} element={<SecretLevel />} />
				<Route path="/*" element={<Error title="Такая страница не найдена." />} />
			</Routes>
		</div>
	);
}
