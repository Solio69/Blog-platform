/* eslint-disable react/prop-types */
import React, { memo } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RequireAuth = memo(({ children }) => {
  const stateUser = useSelector((state) => state.user);
  const { userData } = stateUser;

  if (!userData) {
    return <Navigate to="/sign-in" />;
  }

  return children;
});

export { RequireAuth };
