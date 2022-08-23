import React from 'react';
import { Navigate } from 'react-router-dom';
import { LocalStorageService } from '../services';
import { useSelector } from 'react-redux'

export default function Auth({ children }) {
  const authed = useSelector((state) => state.auth.authed);

  if (LocalStorageService.getPersistAuth()) {
    return children;
  }

  return authed === true ? children : <Navigate to="/login" replace />;
}
