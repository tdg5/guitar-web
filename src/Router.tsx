import { createBrowserRouter, RouterProvider } from 'react-router';
import { PrimaryLayout } from '@/layouts/PrimaryLayout';
import { HomePage } from '@/pages/Home.page';
import { SettingsPage } from '@/pages/Settings.page';

const routes = [
  {
    element: <PrimaryLayout />,
    children: [
      {
        element: <HomePage />,
        path: '/',
      },
      {
        element: <SettingsPage />,
        path: '/settings',
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export function Router() {
  return <RouterProvider router={router} />;
}
