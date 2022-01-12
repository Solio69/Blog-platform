/* eslint-disable react/function-component-definition */
/* eslint-disable arrow-body-style */
import React from 'react';
import { Spin } from 'antd';
import styles from '../../index.scss';

const Loader = () => {
  return <Spin className={styles['ant-spin']} size="large" />;
};

export default Loader;
