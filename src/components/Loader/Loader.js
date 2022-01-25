import React from 'react';
import { Spin } from 'antd';
import styles from '../../index.scss';

const Loader = () => {
  return <Spin className={styles['ant-spin']} size="large" />;
};

export { Loader };
