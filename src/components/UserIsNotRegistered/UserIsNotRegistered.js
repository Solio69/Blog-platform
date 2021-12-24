import React from 'react';
// import styles from './UserIsNotRegistered.module.scss';

import HeaderButton from '../HeaderButton/HeaderButton';

const UserIsNotRegistered = function () {
  return (
    <div>
      <HeaderButton text="Sign In" />
      <HeaderButton text="Sign Up" />
    </div>
  );
};

export default UserIsNotRegistered;
