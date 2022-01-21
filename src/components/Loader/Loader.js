import React from 'react';
import { Spin } from 'antd';
import styles from '../../index.scss';

const Loader = function () {
  return <Spin className={styles['ant-spin']} size="large" />;
};

export default Loader;
