import React from 'react';

import PropTypes from 'prop-types'

import { Alert } from 'antd';

import styles from './SuccessMessage.module.scss';

const SuccessMessage = function ({ description, callback, closable }) {
  return (
    <div className={styles['success-message']}>
      <Alert
        message="Success!"
        description={description}
        type="success"
        showIcon
        closable={closable}
        onClose={() => callback()}
      />
    </div>
  );
};


// description, callback, closable
SuccessMessage.defaultProps = {
  description:'',
  closable: true
};

SuccessMessage.propTypes = {
  description: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  callback:PropTypes.func,
  closable: PropTypes.bool,
};


export default SuccessMessage;
