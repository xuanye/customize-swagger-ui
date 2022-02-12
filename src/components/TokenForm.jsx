import React from 'react';

import { Input, Form } from 'antd';

const { TextArea } = Input;

const TokenForm = ({ form }) => {
    return (
        <Form className='token-form' form={form} name='token-form'>
            <Form.Item name='token' initialValue=''>
                <TextArea rows={6} />
            </Form.Item>
        </Form>
    );
};

export default TokenForm;
