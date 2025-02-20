import { createBrowserRouter, RouterProvider } from 'react-router';
import { PrimaryLayout } from '@/layouts/PrimaryLayout';
import { HomePage } from '@/pages/Home.page';
import { SandboxPage } from '@/pages/Sandbox.page';
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
        element: <SandboxPage />,
        path: '/sandbox',
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
