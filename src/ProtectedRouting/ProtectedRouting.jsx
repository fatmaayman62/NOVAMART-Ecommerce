import React from 'react';
import useTokenStore from '../Store/authTokenStore';
import { Navigate } from 'react-router-dom';

function ProtectedRouting({ children }) {
  const token = useTokenStore((state) => state.token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRouting;