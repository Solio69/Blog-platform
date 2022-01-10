/* eslint-disable react/jsx-fragments */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { Form, Input, Button, Checkbox, Divider, Spin } from 'antd';

import { fetchUserRegistration } from '../../store/userSlice';

import ErrorMessage from '../ErrorMessage';
import SuccessMessage from '../SuccessMessage';

import styles from './FormSignUP.module.scss';

const FormSignUP = () => {
  const dispath = useDispatch();
  const { error, status, userData } = useSelector((state) => state.user);

  useEffect(() => {
    // если есть днные о юзере, то сохраняет токен в хранилище
    if (userData && userData !== null) {
      localStorage.setItem('token', JSON.stringify(userData.token));
    }
  }, [userData]);

  const onFinish = (val) => {
    const newUser = {
      username: val.username.trim(),
      email: val.email.trim(),
      password: val.password.trim(),
    };
    // console.log(newUser);
    dispath(fetchUserRegistration(newUser));
  };

  // сообщение об ошибке
  const errorAlert = error ? <ErrorMessage description={error} /> : null;

  // сообщение об успешной авторизации
  const successAlert = userData ? <SuccessMessage description="Authorization was successful!" /> : null;

  const form =
    !successAlert && status !== 'loading' ? (
      <Form
        layout="vertical"
        // name="normal_login"
        size="large"
        className={styles['ant-form']}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <div className={styles['form-title']}>
          <span>Create new account</span>
        </div>

        <Form.Item
          className={styles['ant-form-item']}
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: 'Your username must be between 3 and 20 characters long.',
              min: 3,
              max: 20,
            },
          ]}
        >
          <Input type="text" placeholder="Username" />
        </Form.Item>

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
              message: 'Your password must be between 6 and 40 characters long.',
              min: 6,
              max: 40,
            },
          ]}
        >
          <Input.Password type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item
          className={styles['ant-form-item']}
          name="confirm"
          label="Repeat Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Passwords must match',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Divider className={styles['ant-divider']} />

        <Form.Item
          className={styles['ant-form-item']}
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
            },
          ]}
        >
          <Checkbox>I agree to the processing of my personal information</Checkbox>
        </Form.Item>
        <Form.Item className={styles['ant-form-item-control-input-content']}>
          <Button type="primary" htmlType="submit" className={styles['login-form-button']}>
            Create
          </Button>
          <span>
            Don’t have an account? <Link to="/sign-in">Sign In</Link>.
          </span>
        </Form.Item>
      </Form>
    ) : null;

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

export default FormSignUP;
