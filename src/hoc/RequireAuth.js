/* eslint-disable react/prop-types */
import React, { memo } from 'react';
import { Navigate } from 'react-router-dom';
import { stateUser } from '../selectors';

const RequireAuth = memo(({ children }) => {
  const { userData } = stateUser();

  if (!userData) {
    return <Navigate to="/sign-in" />;
  }

  return children;
});

export { RequireAuth };
