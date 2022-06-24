import React, { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Button, Radio, Row, Col, Space, Modal, Form } from 'antd';
import { AxiosResponse } from 'axios';
import { InputForm } from './InputForm';
import { useRequestTye } from './hooks/useRequestType';
import { useHttpAction } from './hooks/useHttpAction';
import { ResponseView } from './ResponseView';
import { useToggle } from './hooks/useToggle';
import { TokenForm } from './TokenForm';
import { JsonForm } from './JsonForm';
import MyStore from '@/libs/store';
import { CacheKeys } from '@/config/constants';

const radioOptions = [
  { label: 'Form', value: 'form' },
  { label: 'Json', value: 'raw' },
];

type DebugContentProps = {
  method: SwaggerJson.ApiMethod;
};
const DebugContent: React.FC<DebugContentProps> = ({ method }) => {
  const { requestType, setRequestType } = useRequestTye(method);
  const { httpAction } = useHttpAction(method);

  const [response, setResponse] = useState<any>(undefined);
  const [statusCode, setStatusCode] = useState(0);

  const [modalVisible, toggleModalVisible] = useToggle(false);

  const formRef = useRef<{ formSubmit(): any }>(null);
  const handlerSend = useCallback(async () => {
    const formValues = formRef.current?.formSubmit();
    console.log('🚀 ~ file: DebugContent.tsx ~ line 34 ~ handlerSend ~ formValues', formValues);

    try {
      var rsp = await httpAction(formValues as Record<string, any>, requestType);

      setStatusCode(rsp.status);
      setResponse(rsp.data);

      //console.log(rsp);
    } catch (e) {
      console.log('🚀 ~ file: DebugContent.tsx ~ line 44 ~ handlerSend ~ e', e);
      const errorRsp = e as any as AxiosResponse<any, any>;
      if (errorRsp) {
        if (errorRsp.status) {
          setStatusCode(errorRsp.status);
        }

        if (errorRsp.data) {
          setResponse(errorRsp.data);
        } else if (errorRsp.request?.responseText) {
          setResponse(errorRsp.request?.responseText);
        }
      } else {
        setStatusCode(500);
        setResponse('Internal Server Error');
      }
    }
  }, [httpAction, requestType]);

  const tokenFormRef = useRef<{ getToken(): string; setToken(token: string): void }>(null);

  useEffect(() => {
    if (modalVisible) {
      var token = MyStore.get(CacheKeys.AuthorizationToken) || '';
      tokenFormRef.current?.setToken(token);
    }
  }, [modalVisible]);

  const handlerTokenFormSubmit = useCallback(() => {
    var token = tokenFormRef.current?.getToken();
    MyStore.set(CacheKeys.AuthorizationToken, token || '');
    toggleModalVisible();
  }, []);

  const handlerTokenFormCancel = useCallback(() => {
    toggleModalVisible();
  }, []);
  return (
    <>
      <Row>
        <Col span={12} offset={12} style={{ textAlign: 'right' }}>
          <Space>
            <Button
              danger
              onClick={() => {
                toggleModalVisible();
              }}>
              Token
            </Button>
            <Radio.Group
              options={radioOptions}
              onChange={e => {
                setRequestType(e.target.value as 'form' | 'raw');
              }}
              value={requestType}
              optionType='button'
              buttonStyle='solid'
            />
          </Space>
        </Col>
      </Row>

      {requestType == 'form' && <InputForm parameters={method.parameters} onRef={formRef} />}
      {requestType == 'raw' && <JsonForm parameters={method.parameters} onRef={formRef} />}
      <div>
        <Button type='primary' onClick={handlerSend}>
          Send
        </Button>
      </div>
      <ResponseView response={response} statusCode={statusCode}></ResponseView>

      <Modal
        title='Edit Request Token'
        visible={modalVisible}
        onOk={handlerTokenFormSubmit}
        onCancel={handlerTokenFormCancel}>
        <TokenForm onRef={tokenFormRef} />
      </Modal>
    </>
  );
};

export default DebugContent;
