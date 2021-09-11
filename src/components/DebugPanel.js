import React, { useEffect, useState } from 'react';
import { Divider, Form, Button } from 'antd';
import { ThunderboltTwoTone } from '@ant-design/icons';

import InputForm from './InputForm';

import useRequest from '../hooks/request';
//import useSwagger from '../hooks/swagger'

const DebugPanel = ({ method, definitions }) => {
    const request = useRequest();

    const [form] = Form.useForm();
    //const swagger = useSwagger(model => [model.currentId]);
    useEffect(() => {
        if (method) {
            const parameters = !!method ? method.parameters : null;

            request.setRequestData([...parameters]);
        }
    }, [method]);

    const setValue = () => {
        console.log(form.getFieldsValue());
    };
    return (
        <div>
            <Divider orientation='left'>
                <ThunderboltTwoTone /> Parameters
            </Divider>
            <InputForm parameters={request.requestData} form={form} />
            <div>
                {' '}
                <Button type='primary' onClick={setValue} htmlType='button'>
                    Submit
                </Button>{' '}
            </div>
        </div>
    );
};

export default DebugPanel;
