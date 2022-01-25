/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';
import styles from './FormEditProfile.module.scss';

const FormEditProfile = ({ transferData, email, username }) => {
  const onFinish = (val) => {
    transferData(val);
  };

  // eslint-disable-next-line react/prop-types
  const CustomizedForm = ({ fields }) => {
    return (
      <Form
        name="dynamic_form_item"
        layout="vertical"
        size="large"
        className={styles['ant-form']}
        onFinish={onFinish}
        fields={fields}
      >
        <div className={styles['form-title']}>
          <span>Edit Profile</span>
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
          <Input type="text" />
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
    );
  };

  // если значения переданы, то использует их
  const CompletedForm = () => {
    const [fields] = useState([
      {
        name: ['username'],
        value: username || '',
      },
      {
        name: ['email'],
        value: email || '',
      },
    ]);

    return <CustomizedForm fields={fields} />;
  };

  return <CompletedForm />;
};

FormEditProfile.defaultProps = {
  email: '',
  username: '',
};

FormEditProfile.propTypes = {
  transferData: PropTypes.func.isRequired,
  email: PropTypes.string,
  username: PropTypes.string,
};

export { FormEditProfile };
