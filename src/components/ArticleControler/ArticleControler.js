import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Popconfirm, Button } from 'antd';
import styles from './ArticleControler.module.scss';

const ArticleControler = ({ controllerFlag, confirmDeletion }) => {
  const stateUser = useSelector((state) => state.user);
  const { userData } = stateUser;

  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const { slug } = useParams(); // получает slug из роутера

  // показ модалки
  const showPopconfirm = () => {
    setVisible(true);
  };

  // если в модалке подтвердить действие
  const handleOk = () => {
    confirmDeletion();

    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 500);
  };

  // если нажать в модалке "No" закывает окно
  const handleCancel = () => {
    setVisible(false);
  };

  // кнопка удадения
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
    >
      <Button type="primary" onClick={showPopconfirm} className={styles['controller-button__del']}>
        Delete
      </Button>
    </Popconfirm>
  );

  const paramSlug = `/articles/${slug}/edit`;

  const controler =
    controllerFlag && userData ? (
      <div className={styles['controller-wrapper']}>
        {deleteButton}
        <Link to={paramSlug} className={styles['controller-button__edit']}>
          <span>Edit</span>
        </Link>
      </div>
    ) : null;

  return controler;
};

export { ArticleControler };
