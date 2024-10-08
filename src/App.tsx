import './App.css';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './private-route';
import { internalPaths } from './constants/internal-paths';
import { Menu } from './menu';
import ErrorBoundary from './error-boundary/errorBoundary';

const SecretLevel = lazy(() =>
	import('./pages/secret-level').then((module) => ({ default: module.SecretLevel })),
);
const Locations = lazy(() =>
	import('./pages/locations/locations').then((module) => ({
		default: module.Locations,
	})),
);
const Episodes = lazy(() =>
	import('./pages').then((module) => ({ default: module.Episodes })),
);
const Characters = lazy(() =>
	import('./pages').then((module) => ({ default: module.Characters })),
);
const Main = lazy(() => import('./pages').then((module) => ({ default: module.Main })));
const Login = lazy(() => import('./pages').then((module) => ({ default: module.Login })));
const Error = lazy(() => import('./pages').then((module) => ({ default: module.Error })));

export function App() {
	return (
		<div className="App">
			<Menu />
			<Suspense fallback={<h1>Загразка</h1>}>
				<ErrorBoundary>
					<Routes>
						<Route path={internalPaths.home} element={<Main />} />
						<Route path={internalPaths.login} element={<Login />} />

						<Route
							path={`${internalPaths.characters}/:id?`}
							element={
								<PrivateRoute>
									<Characters />
								</PrivateRoute>
							}
						/>
						<Route
							path={`${internalPaths.episodes}/:id?`}
							element={
								<PrivateRoute>
									<Episodes />
								</PrivateRoute>
							}
						/>
						<Route
							path={`${internalPaths.locations}/:id?`}
							element={
								<PrivateRoute>
									<Locations />
								</PrivateRoute>
							}
						/>

						<Route path={internalPaths.secret} element={<SecretLevel />} />

						<Route
							path="/*"
							element={<Error title="Такая страница не найдена." />}
						/>
					</Routes>
				</ErrorBoundary>
			</Suspense>
		</div>
	);
}
