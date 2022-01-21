/* eslint-disable no-restricted-globals */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import { Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

const RequireAuth = ({ children }) => {
  // const location = useLocation()
  const { userData } = useSelector((state) => state.user);

  if (!userData) {
    return <Navigate to="/sign-in" />;
  }

  return children;
};

export { RequireAuth };
