/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-undef */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { Form, Input, Button, Spin, Alert } from 'antd';

import ErrorMessage from '../ErrorMessage';
import SuccessMessage from '../SuccessMessage';

import { fetchUserLogIn } from '../../store/userSlice';
import styles from './FormSignIn.module.scss';

const FormSignIn = () => {
  const dispath = useDispatch();
  const { error, status, userData } = useSelector((state) => state.user);

  useEffect(() => {
    // если есть днные о юзере, то сохраняет токен в хранилище
    if (userData && userData !== null) {
      localStorage.setItem('token', JSON.stringify(userData.token));
    }
  }, [userData]);

  const onFinish = (val) => {
    const registrationData = {
      email: val.email.trim(),
      password: val.password.trim(),
    };
    // отправлет на сервер введенные данные
    dispath(fetchUserLogIn(registrationData));
  };

  // сообщение об ошибке
  const errorAlert = error ? <ErrorMessage description={error} /> : null;

  // сообщение об успешной авторизации
  const successAlert = userData ? <SuccessMessage description="Registration was successful!" /> : null;

  // форма авторизации
  const form =
    !successAlert && status !== 'loading' ? (
      <Form
        layout="vertical"
        name="normal_login"
        size="large"
        className={styles['ant-form']}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <div className={styles['form-title']}>
          <span>Sign In</span>
        </div>

        <Form.Item
          className={styles['ant-form-item']}
          label="Email address"
          name="email"
          rules={[
            {
              type: 'email',
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input placeholder="Email address" />
        </Form.Item>
        <Form.Item
          className={styles['ant-form-item']}
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input.Password type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item className={styles['ant-form-item-control-input-content']}>
          <Button type="primary" htmlType="submit" className={styles['login-form-button']}>
            Log in
          </Button>
          <span>
            Don’t have an account? <Link to="/sign-up">Sign Up</Link>.
          </span>
        </Form.Item>
      </Form>
    ) : null;

  // индикатор загрузки
  const loading = status === 'loading' ? <Spin className={styles['ant-spin']} size="large" /> : null;

  return (
    <React.Fragment>
      {errorAlert}
      {successAlert}
      {form}
      {loading}
    </React.Fragment>
  );
};

export default FormSignIn;
