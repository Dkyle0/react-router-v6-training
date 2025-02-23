import { Suspense } from "react";
import ErrorBoundary from "./error-boundary/errorBoundary";
import { internalPaths } from "../../../shared/constants/internal-paths";
import { Layout } from "../../../feachures/layout/layout";
import { Loader } from "../../../shared/loader/loader";
import { PrivateRoute } from "../../../entities/private-route/private-route";
import { fetchResourceViewerData } from "../../../shared/api/browser-router-loader-functions/fetchResourceViewerData";
import {
  ErrorPage,
  Main,
  Login,
  ResourceViewer,
  SecretLevel,
} from "./lazy-imports/";

export const routes = [
  {
    path: "/",
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
        path: `${internalPaths.characters}`,
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
        path: `${internalPaths.characters}/:id`,
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
        path: "/*",
        element: (
          <Suspense fallback={<Loader />}>
            <ErrorPage title="Такая страница не найдена." />
          </Suspense>
        ),
      },
    ],
  },
];
