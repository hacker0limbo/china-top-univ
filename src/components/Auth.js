import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { LocalStorageService } from '../services';
import { useSelector } from 'react-redux';

export default function Auth({ children }) {
  const { pathname } = useLocation();
  const authed = useSelector((state) => state.auth.authed);

  if (LocalStorageService.getPersistAuth()) {
    return children;
  }

  return authed === true ? children : <Navigate to={`/login?redirect=${pathname}`} replace />;
}
