import React, { useEffect, useState } from 'react';

import { Input, Form, Row, Col } from 'antd';

const { TextArea } = Input;

const JsonForm = ({ parameters, form }) => {
    if (!parameters) {
        return null;
    }

    return (
        <Form className='json-form' form={form} name='request-form'>
            <Form.Item name='json-body-9527' initialValue=''>
                <TextArea rows={6} />
            </Form.Item>
        </Form>
    );
};

export default JsonForm;
