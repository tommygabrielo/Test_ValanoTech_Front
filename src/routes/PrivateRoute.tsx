import React, { JSX, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, role } = useContext(AuthContext);

  if (!isAuthenticated || role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
