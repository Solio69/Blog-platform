/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable dot-notation */
/* eslint-disable no-unused-vars */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-undef */
/* eslint-disable id-length */
/* eslint-disable consistent-return */
/* eslint-disable arrow-body-style */

import React from 'react';

import { Form, Input, Button } from 'antd';

import styles from './FormArticle.module.scss';

const FormArticle = ({callback}) => {

  // функция библиотеки antd 
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };

  // функция библиотеки antd 
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
  };

  const onFinish = (val) => {
    callback(val);
  };

  return (
    <Form
      layout="vertical"
      size="large"
      className={styles['ant-form']}
      onFinish={onFinish}
      {...formItemLayoutWithOutLabel}
    >
      <div className={styles['form-title']}>
        <span>Create new article</span>
      </div>
      <Form.Item
        className={styles['ant-form-item']}
        name="title"
        label="Title"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type="text" placeholder="Title" />
      </Form.Item>

      <Form.Item
        className={styles['ant-form-item']}
        name="description"
        label="Short description"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type="text" placeholder="Short description" />
      </Form.Item>

      <Form.Item
        className={styles['ant-form-item']}
        name="body"
        label="Text"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.TextArea type="text" placeholder="Text" className={styles['ant-input']} />
      </Form.Item>

      <div className={styles['form-item-list__wrapper']}>
        <Form.List name="tagList" initialValue={[undefined]}> 
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  className={styles['ant-form-item']}
                  {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                  label={index === 0 ? 'Tags' : ''}
                  required={false}
                  key={field.key}
                >
                  <Form.Item {...field} noStyle>
                    <Input placeholder="Tag" style={{ width: '40%' }} />
                  </Form.Item>

                  {fields.length > 1 ? (
                    
                    <Button type="dashed" onClick={() => remove(field.name)} className={styles['form-item-list__del-button']}>
                      Delete
                    </Button>
                  ) : null}
                </Form.Item>
              ))}

              <Form.Item className={styles['form-item-list__add-button']}>
                <Button type="dashed" onClick={() => add()}>
                  Add tag
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item className={styles['ant-form-item']}>
          <Button type="primary" htmlType="submit" className={styles['form-item-list__send-button']}>
            Send
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default FormArticle;
