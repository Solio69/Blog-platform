/* eslint-disable react/prop-types */
import React from 'react';
import { Alert } from 'antd';

import styles from './ErrorMessage.module.scss';

const ErrorMessage = function ({ description }) {
  return (
    <div className={styles['error-message']}>
      <Alert message="Error" description={description} type="error" showIcon closable />
    </div>
  );
};

export default ErrorMessage;
