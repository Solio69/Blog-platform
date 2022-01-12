/* eslint-disable react/prop-types */
import React from 'react';
import { Alert } from 'antd';

import styles from './ErrorMessage.module.scss';

const ErrorMessage = function ({ description, callback }) {
  return (
    <div className={styles['error-message']}>
      <Alert message="Error" description={description} type="error" showIcon closable onClose={() => callback()} />
    </div>
  );
};

export default ErrorMessage;
