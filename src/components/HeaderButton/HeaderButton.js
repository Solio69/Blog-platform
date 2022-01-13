/* eslint-disable react/prop-types */
import React from 'react';
import styles from './HeaderButton.module.scss';

const HeaderButton = function ({ text }) {
  return (
    <button type="button" className={styles.header__button}>
      {text}
    </button>
  );
};

export default HeaderButton;
