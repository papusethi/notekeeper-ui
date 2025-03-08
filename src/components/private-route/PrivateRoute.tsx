import { Layout } from 'antd';
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';

const PrivateRoute: React.FC = () => {
  const location = useLocation();

  const { currentUser, isAuthenticated } = useAppSelector((state) => state.user);

  const verifyUser = () => {
    if (isAuthenticated && currentUser) {
      if (location.pathname === '/login' || location.pathname === '/signup') {
        return <Navigate to="/dashboard" replace />;
      } else {
        return <Outlet />;
      }
    } else {
      if (location.pathname === '/login' || location.pathname === '/signup') {
        return <Outlet />;
      } else {
        return <Navigate to="/login" replace />;
      }
    }
  };

  return <Layout id="container">{verifyUser()}</Layout>;
};

export default PrivateRoute;
