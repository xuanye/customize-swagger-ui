import React, { useImperativeHandle } from 'react';

import { Input, Form } from 'antd';

const { TextArea } = Input;

type TokenFormProps = {
  onRef?: React.Ref<{ getToken(): string; setToken(token: string): void }>;
};
export const TokenForm: React.FC<TokenFormProps> = ({ onRef }) => {
  const [form] = Form.useForm();
  useImperativeHandle(onRef, () => {
    return {
      getToken: raiseGetToken,
      setToken: raiseSetToken,
    };
  });
  const raiseGetToken = () => {
    return form.getFieldValue('token');
  };
  const raiseSetToken = (token: string) => {
    return form.setFieldsValue({ token: token });
  };
  return (
    <Form className='token-form' form={form} name='token-form'>
      <Form.Item name='token' initialValue=''>
        <TextArea rows={6} />
      </Form.Item>
    </Form>
  );
};
