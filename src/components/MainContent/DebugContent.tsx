import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Radio, Row, Col, Space, Modal, Tag } from 'antd';
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
import { useMethodStyleColor } from './hooks/useMethodStyleColor';

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

  const [loading, setLoading] = useToggle(false);

  const formRef = useRef<{ formSubmit(): any }>(null);
  const handlerSend = useCallback(async () => {
    const formValues = formRef.current?.formSubmit();

    setLoading(true);

    try {
      var rsp = await httpAction(formValues as Record<string, any>, requestType);

      setStatusCode(rsp.status);

      if (rsp.headers['content-type'] == 'application/octet-stream') {
        const fileName = rsp.headers['content-disposition'].replace(/\w+;filename=(.*)/, '$1');
        const blob = new Blob([rsp.data]);
        let dom = document.createElement('a');
        let url = window.URL.createObjectURL(blob);
        dom.href = url;
        dom.download = decodeURI(fileName);
        dom.style.display = 'none';
        document.body.append(dom);
        dom.click();
        dom.parentNode?.removeChild(dom);
        window.URL.revokeObjectURL(url);
        setResponse('Starting download');
      } else {
        setResponse(rsp.data);
      }

      //console.log(rsp);
    } catch (e) {
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
    } finally {
      setLoading(false);
    }
  }, [httpAction, requestType]);

  useEffect(() => {
    setResponse(undefined);
    setStatusCode(0);
  }, [method]);

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

  const methodColor = useMethodStyleColor(method?.method || '');
  return (
    <>
      <Row>
        <Col span={12}>
          <Space>
            <Tag color={methodColor}>{method?.method.toUpperCase()}</Tag>
            {method?.path}
          </Space>
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
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
        <Button type='primary' loading={loading} onClick={handlerSend}>
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
