/* eslint-disable react/prop-types */
import React from 'react';

import { Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

const RequireAuth = function ({ children }) {
  const { userData } = useSelector((state) => state.user);

  if (!userData) {
    return <Navigate to="/sign-in" />;
  }

  return children;
};

export default RequireAuth;
