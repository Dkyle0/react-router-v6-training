import './App.css';
import { lazy, Suspense } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { internalPaths } from './constants/internal-paths';
import { PrivateRoute } from './private-route';
import ErrorBoundary from './error-boundary/errorBoundary';
import { Loader } from './components/loader';
import { Layout } from './components/layout/layout';
import { fetchResourceViewerData } from './components/browser-router-loader-functions';

const SecretLevel = lazy(() =>
	import('./pages/secret-level').then((module) => ({ default: module.SecretLevel })),
);
const ResourceViewer = lazy(() =>
	import('./pages').then((module) => ({ default: module.ResourceViewer })),
);
const Main = lazy(() => import('./pages').then((module) => ({ default: module.Main })));
const Login = lazy(() => import('./pages').then((module) => ({ default: module.Login })));
const ErrorPage = lazy(() =>
	import('./pages').then((module) => ({ default: module.Error })),
);

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: (
			<Suspense fallback={<Loader />}>
				<ErrorPage title="Что-то пошло не так" />
			</Suspense>
		),
		children: [
			{
				path: internalPaths.home,
				element: (
					<Suspense fallback={<Loader />}>
						<Main />
					</Suspense>
				),
			},
			{
				path: internalPaths.login,
				element: (
					<Suspense fallback={<Loader />}>
						<Login />
					</Suspense>
				),
			},
			{
				path: `${internalPaths.characters}/:id?`,
				element: (
					<PrivateRoute>
						<Suspense fallback={<Loader />}>
							<ErrorBoundary>
								<ResourceViewer title="Персонажи" />
							</ErrorBoundary>
						</Suspense>
					</PrivateRoute>
				),
				loader: fetchResourceViewerData,
			},
			{
				path: `${internalPaths.episodes}/:id?`,
				element: (
					<PrivateRoute>
						<Suspense fallback={<Loader />}>
							<ErrorBoundary>
								<ResourceViewer title="Эпизоды" />
							</ErrorBoundary>
						</Suspense>
					</PrivateRoute>
				),
				loader: fetchResourceViewerData,
			},
			{
				path: `${internalPaths.locations}/:id?`,
				element: (
					<PrivateRoute>
						<Suspense fallback={<Loader />}>
							<ErrorBoundary>
								<ResourceViewer title="Локации" />
							</ErrorBoundary>
						</Suspense>
					</PrivateRoute>
				),
				loader: fetchResourceViewerData,
			},
			{
				path: internalPaths.secret,
				element: (
					<Suspense fallback={<Loader />}>
						<SecretLevel />
					</Suspense>
				),
			},
			{
				path: '/*',
				element: (
					<Suspense fallback={<Loader />}>
						<ErrorPage title="Такая страница не найдена." />
					</Suspense>
				),
			},
		],
	},
]);

export function App() {
	return <RouterProvider router={router} fallbackElement={<Loader />} />;
}
