import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider, theme } from 'antd';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PrivateRoute from './components/private-route/PrivateRoute';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import DashboardWrapper from './pages/dashboard/DashboardWrapper';
import HomePage from './pages/home/HomePage';
import { useAppSelector } from './redux/hooks';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    element: <PrivateRoute />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignupPage /> },
      { path: '/dashboard', element: <DashboardWrapper /> }
    ]
  }
]);

// Create a client
const queryClient = new QueryClient();

// Define theme tokens
const lightTheme = theme.defaultAlgorithm;
const darkTheme = theme.darkAlgorithm;

const App: React.FC = () => {
  const enableDarkMode = useAppSelector((state) => state.user.userPreferences.enableDarkMode);

  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={{ algorithm: enableDarkMode ? darkTheme : lightTheme }}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </QueryClientProvider>
  );
};

export default App;
