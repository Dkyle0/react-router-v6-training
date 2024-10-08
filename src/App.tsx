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
const ResourceViewer = lazy(() =>
	import('./pages').then((module) => ({ default: module.ResourceViewer })),
);
const Main = lazy(() => import('./pages').then((module) => ({ default: module.Main })));
const Login = lazy(() => import('./pages').then((module) => ({ default: module.Login })));
const Error = lazy(() => import('./pages').then((module) => ({ default: module.Error })));

export function App() {
	const renderResourceViewerRoutes = (path: string, title: string) => (
		<Route
			path={`${path}/:id?`}
			element={
				<PrivateRoute>
					<ResourceViewer title={title} />
				</PrivateRoute>
			}
		/>
	);

	return (
		<div className="App">
			<Menu />
			<Suspense fallback={<h1>Загрузка...</h1>}>
				<ErrorBoundary>
					<Routes>
						<Route path={internalPaths.home} element={<Main />} />
						<Route path={internalPaths.login} element={<Login />} />

						{renderResourceViewerRoutes(
							internalPaths.characters,
							'Персонажи',
						)}
						{renderResourceViewerRoutes(internalPaths.episodes, 'Эпизоды')}
						{renderResourceViewerRoutes(internalPaths.locations, 'Локации')}

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
