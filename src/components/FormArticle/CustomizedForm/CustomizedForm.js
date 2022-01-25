/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Input, Button } from 'antd';
import styles from '../FormArticle.module.scss';

// кастомная форма
const CustomizedForm = ({ fields, transferData, title }) => {
  const onFinish = (val) => {
    transferData(val);
  };

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
        <span>{title}</span>
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
        <Form.List name="tagList">
          {(fieldsList, { add, remove }) => (
            <>
              {fieldsList.map((field, index) => (
                <Form.Item label={index === 0 ? 'Tags' : ''} className={styles['ant-form-item']} key={field.key}>
                  <Form.Item {...field} noStyle>
                    <Input placeholder="Tag" style={{ width: '40%' }} />
                  </Form.Item>

                  {fieldsList.length > 1 ? (
                    <Button
                      onClick={() => {
                        remove(field.name);
                      }}
                      className={styles['form-item-list__del-button']}
                    >
                      Delete
                    </Button>
                  ) : null}
                </Form.Item>
              ))}

              <Form.Item className={styles['form-item-list__add-button']}>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                >
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

export { CustomizedForm };
