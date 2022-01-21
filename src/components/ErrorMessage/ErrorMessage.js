/* eslint-disable react/require-default-props */

import React from 'react';

import PropTypes from 'prop-types'; 

import { Alert } from 'antd';

import styles from './ErrorMessage.module.scss';

const ErrorMessage = function ({ description, callback }) {
  return (
    <div className={styles['error-message']}>
      <Alert message="Error" description={description} type="error" showIcon closable onClose={() => callback()} />
    </div>
  );
};

ErrorMessage.defaultProps = {
  description:'',
};

ErrorMessage.propTypes = {
  description:PropTypes.string, 
  callback:PropTypes.func,
};


export default ErrorMessage;
