import React, { useEffect, useState } from 'react';
import { Divider, Form, Button, Radio, Row, Col } from 'antd';
import { ThunderboltTwoTone, RocketTwoTone } from '@ant-design/icons';

import InputForm from './InputForm';
import JsonForm from './JsonForm';
import JsonView from './JsonView';

import useRequest from '../hooks/request';
//import useSwagger from '../hooks/swagger'

import service from '@/service/common';

const radioOptions = [
    { label: 'Form', value: 1 },
    { label: 'Json', value: 2 },
];

const DebugPanel = ({ method, definitions }) => {
    const request = useRequest();

    const [form] = Form.useForm();
    const [requestType, setRequestType] = useState(1);
    const [responseJson, setResponseJson] = useState(null);
    const [responseStatus, setResponseStatus] = useState(0);
    const [loading, setLoading] = useState(false);

    //const swagger = useSwagger(model => [model.currentId]);
    useEffect(() => {
        if (method) {
            const parameters = !!method ? method.parameters : null;

            request.setRequestData([...parameters]);
            form.resetFields();
            setResponseJson(null);
        }
    }, [method]);

    useEffect(() => {
        form.resetFields();
    }, [method]);

    useEffect(() => {
        setResponseJson(null);
        setResponseStatus(0);
        setLoading(false);
    }, [method]);

    const startRequest = async () => {
        setLoading(true);
        const values = form.getFieldsValue();
        const data = requestType == 1 ? values : JSON.stringify(values['json-body-9527'] || '');
        try {
            const res = await service.request(method, data, requestType);
            if (res) {
                if (res.status) {
                    setResponseStatus(res.status);
                }

                if (res.data) {
                    setResponseJson(res.data);
                }
            }
            setLoading(false);
            //console.log(res);
        } catch (error) {
            setLoading(false);

            if (error.response) {
                //console.log(error.response);
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setResponseStatus(error.response.status || 500);
                setResponseJson(error.response.data || error.response.statusText);
                return;
            }
            console.log(error.toJSON());
            if (error.message) {
                //setResponseStatus(404);
                setResponseJson(error.message);
            }
            //console.log(error);
            if (error.status) {
                setResponseStatus(error.status);
            } else {
                setResponseStatus(500);
            }

            if (error.data) {
                setResponseJson(error.data);
            }
        }

        //console.log(form.getFieldsValue());
    };

    const formElement =
        requestType == 1 ? (
            <InputForm parameters={request.requestData} form={form} />
        ) : (
            <JsonForm parameters={request.requestData} form={form} />
        );

    const requestTypeChanged = e => {
        setRequestType(parseInt(e.target.value));
    };
    return (
        <div>
            <Divider orientation='left'>
                <ThunderboltTwoTone /> Parameters
            </Divider>

            <Row>
                <Col span={6} offset={18} style={{ textAlign: 'right' }}>
                    <Radio.Group
                        options={radioOptions}
                        onChange={requestTypeChanged}
                        value={requestType}
                        optionType='button'
                        buttonStyle='solid'
                    />
                </Col>
            </Row>
            {formElement}
            <div>
                {' '}
                <Button type='primary' loading={loading} onClick={startRequest} htmlType='button'>
                    Submit
                </Button>{' '}
            </div>
            <Divider orientation='left'>
                <RocketTwoTone twoToneColor='#e90' /> Response
            </Divider>
            <JsonView json={responseJson} status={responseStatus} />
        </div>
    );
};

export default DebugPanel;
