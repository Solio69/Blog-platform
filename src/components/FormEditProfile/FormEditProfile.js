/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-unused-vars */
import React from 'react';

import { Form, Input, Button, } from 'antd';

import styles from './FormEditProfile.module.scss';

const FormEditProfile = ({callback,email, username}) => {


  return(
    <Form
    layout="vertical"
    size="large"
    className={styles['ant-form']}
    initialValues={{
      remember: true,
    }}
    onFinish={(val)=>{callback(val)}}
  >
    <div className={styles['form-title']}>
      <span>Edit Profile</span>
    </div>

    <Form.Item
      className={styles['ant-form-item']}
      name="username"
      label="Username"
      initialValue={username}
      rules={[
        {
          required: true,
          message: 'Your username must be between 3 and 20 characters long.',
          min: 3,
          max: 20,
        },
      ]}
    >
      <Input type="text" />
    </Form.Item>

    <Form.Item
      className={styles['ant-form-item']}
      label="Email address"
      name="email"
      initialValue={email}
      rules={[
        {
          type: 'email',
          required: true,
          message: 'Please input your email!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      className={styles['ant-form-item']}
      name="password"
      label="New password"
      rules={[
        {
          message: 'Your password must be between 6 and 40 characters long.',
          min: 6,
          max: 40,
        },
      ]}
    >
      <Input.Password type="password" placeholder="New password" />
    </Form.Item>

    <Form.Item
      className={styles['ant-form-item']}
      name="image"
      label="Avatar image (url)"
      rules={[
        {
          type: 'url',
          warningOnly: true,
        },
      ]}
    >
      <Input placeholder="Avatar image" />
    </Form.Item>

    <Form.Item className={styles['ant-form-item-control-input-content']}>
      <Button type="primary" htmlType="submit" className={styles['login-form-button']}>
        Save
      </Button>
    </Form.Item>
    </Form>
  )
};

export default FormEditProfile;
