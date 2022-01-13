/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
// ArticleControler
import React from 'react';
import { Popconfirm, Button } from 'antd';

import styles from './ArticleControler.module.scss';

const ArticleControler = ({ controllerFlag }) => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const showPopconfirm = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  const deleteButton = (
    
   <Popconfirm
      placement="right"
      title="Are you sure to delete this article?"
      visible={visible}
      onConfirm={handleOk}
      okButtonProps={{ loading: confirmLoading }}
      onCancel={handleCancel}
      cancelText="No"
      okText="Yes"
      className={styles['ant-popconfirm']}
     
    >
      <Button type="primary" onClick={showPopconfirm} className={styles['controller-button__del']}>
        Delete
      </Button>
    </Popconfirm>

    
  );

  const onEdit = () => {
    console.log('onEdit');
  };

  const controler = controllerFlag ? (
    <div className={styles['controller-wrapper']}>
      {deleteButton}
      <button type="button" className={styles['controller-button__edit']} onClick={onEdit}>
        <span>Edit</span>
      </button>
    </div>
  ) : null;

  return <React.Fragment>{controler}</React.Fragment>;
};

export default ArticleControler;
