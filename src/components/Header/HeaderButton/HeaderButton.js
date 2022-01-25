import React from 'react';
import PropTypes from 'prop-types';
import styles from './HeaderButton.module.scss';

const HeaderButton = ({ text }) => {
  return (
    <button type="button" className={styles.header__button}>
      {text}
    </button>
  );
};

HeaderButton.defaultProps = {
  text: '',
};

HeaderButton.propTypes = {
  text: PropTypes.string,
};

export { HeaderButton };
