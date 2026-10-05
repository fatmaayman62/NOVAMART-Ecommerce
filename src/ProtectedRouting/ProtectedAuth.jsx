import React from 'react';
import useTokenStore from '../Store/authTokenStore';
import { Navigate } from 'react-router-dom';

function ProtectedAuth({ children }) {
  const token = useTokenStore((state) => state.token);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedAuth;