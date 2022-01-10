/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from 'react';
import { Alert } from 'antd';

import styles from './SuccessMessage.module.scss';

const SuccessMessage = function ({ description }) {
  return (
    <div className={styles['success-message']}>
      <Alert message="Success!" description={description} type="success" showIcon closable />
    </div>
  );
};

export default SuccessMessage;
