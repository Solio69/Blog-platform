/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import React from 'react';
import { Link } from 'react-router-dom';

import { Form, Input, Button } from 'antd';

import styles from './FormSignIn.module.scss';

const FormSignIn = ({ callback }) => {
  return (
    <Form
      layout="vertical"
      name="normal_login"
      size="large"
      className={styles['ant-form']}
      initialValues={{
        remember: true,
      }}
      onFinish={(val) => {
        callback(val);
      }}
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
  );
};

export default FormSignIn;
