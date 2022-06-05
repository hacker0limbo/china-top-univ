import React from 'react';
import useStore from '../store';
import { Navigate } from 'react-router-dom';
import { LocalStorageService } from '../services';

export default function Auth({ children }) {
  const authed = useStore((state) => state.auth.authed);

  if (LocalStorageService.getPersistAuth()) {
    return children;
  }

  return authed === true ? children : <Navigate to="/login" replace />;
}
