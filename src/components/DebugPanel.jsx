import React, { useEffect, useState } from 'react';
import { Divider, Form, Button, Radio, Row, Col, Space, Modal } from 'antd';
import { ThunderboltTwoTone, RocketTwoTone } from '@ant-design/icons';

import * as Lockr from 'lockr';

import InputForm from './InputForm';
import JsonForm from './JsonForm';
import JsonView from './JsonView';
import TokenForm from './TokenForm';

import useRequest from '../hooks/request';
//import useSwagger from '../hooks/swagger'

import service from '@/service/common';

Lockr.setPrefix('swagger_');

const radioOptions = [
    { label: 'Form', value: 1 },
    { label: 'Json', value: 2 },
];

const DebugPanel = ({ method, definitions }) => {
    const request = useRequest();

    const [form] = Form.useForm();
    const [tokenForm] = Form.useForm();
    const [requestType, setRequestType] = useState(1);
    const [responseJson, setResponseJson] = useState(null);
    const [responseStatus, setResponseStatus] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

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

    useEffect(() => {
        if (!isModalVisible) {
            return;
        }
        let token = Lockr.get('jwt_token');
        token = token || '';
        tokenForm.setFieldsValue({ token });
    }, [isModalVisible]);

    const startRequest = async () => {
        setLoading(true);
        const values = form.getFieldsValue();

        const data = requestType == 1 ? values : JSON.parse(values['json-body-9527'] || '{}');
        //console.log(data);
        try {
            const token = Lockr.get('jwt_token');
            const res = await service.request(method, data, requestType, token);
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
            console.log(error);
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
    const handlerShowModel = () => {
        setModalVisible(true);
    };
    const handlerModelOk = () => {
        const token = tokenForm.getFieldValue('token');
        Lockr.set('jwt_token', token);
        setModalVisible(false);
    };
    const handlerModelCancel = () => {
        setModalVisible(false);
    };
    return (
        <div>
            <Divider orientation='left'>
                <ThunderboltTwoTone /> Parameters
            </Divider>
            <Row>
                <Col span={6} offset={18} style={{ textAlign: 'right' }}>
                    <Space>
                        <Button danger onClick={handlerShowModel}>
                            Token
                        </Button>
                        <Radio.Group
                            options={radioOptions}
                            onChange={requestTypeChanged}
                            value={requestType}
                            optionType='button'
                            buttonStyle='solid'
                        />
                    </Space>
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

            <Modal
                title='Edit Request Token'
                visible={isModalVisible}
                onOk={handlerModelOk}
                onCancel={handlerModelCancel}
            >
                <TokenForm form={tokenForm} />
            </Modal>
        </div>
    );
};

export default DebugPanel;
