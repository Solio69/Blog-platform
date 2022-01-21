import React from 'react';
import { Link } from 'react-router-dom';
import HeaderButton from '../HeaderButton/HeaderButton';

const UserIsNotLoggedIn = function () {
  return (
    <div>
      <Link to="/sign-in">
        <HeaderButton text="Sign In" />
      </Link>
      <Link to="/sign-up">
        <HeaderButton text="Sign Up" />
      </Link>
    </div>
  );
};

export default UserIsNotLoggedIn;
