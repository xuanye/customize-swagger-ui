import { Button, Group, Title, RadioGroup, Radio } from '@mantine/core';
import React, { lazy, Suspense, useCallback, useRef, useState } from 'react';
import { InputForm } from './InputForm';
import { http } from '@/libs/http';
import { useRequestTye } from './hooks/useRequestType';
import { useHttpAction } from './hooks/useHttpAction';

import { JsonView } from './JsonView';

const JsonForm = lazy(() => import('./JsonForm'));

type DebugContentProps = {
  method: SwaggerJson.ApiMethod;
};
const DebugContent: React.FC<DebugContentProps> = ({ method }) => {
  const { requestType, setRequestType } = useRequestTye(method);
  const { httpAction } = useHttpAction(method);

  const [response, setResponse] = useState<any>(undefined);
  const [statusCode, setStatusCode] = useState(0);

  const formRef = useRef<{ formSubmit(): any }>(null);
  const handlerSend = useCallback(async () => {
    const formValues = formRef.current?.formSubmit();

    try {
      var rsp = await httpAction(formValues as Record<string, any>, requestType);

      setStatusCode(rsp.status);
      setResponse(rsp.data);

      //console.log(rsp);
    } catch (e) {
      console.log(e);
    }
  }, [http, method]);

  return (
    <>
      <Group spacing='xs' position='apart'>
        <Title order={4}>{method.path}</Title>
        <Group>
          <Button size='xs' radius='xs' onClick={handlerSend}>
            Send
          </Button>
          <Button size='xs' radius='xs' color='violet'>
            Token
          </Button>
        </Group>
      </Group>
      <RadioGroup
        sx={{ marginTop: '15px' }}
        size='xs'
        value={requestType}
        onChange={v => {
          setRequestType(v as 'form' | 'raw' | 'none');
        }}>
        <Radio value='none' label='none' />
        <Radio value='form' label='form-data' />
        <Radio value='raw' label='raw(json)' />
      </RadioGroup>
      {requestType == 'form' && <InputForm parameters={method.parameters} onRef={formRef} />}
      {requestType == 'raw' && (
        <Suspense fallback={<div>Loading</div>}>
          <JsonForm parameters={method.parameters} />
        </Suspense>
      )}
      <JsonView response={response} statusCode={statusCode}></JsonView>
    </>
  );
};

export default DebugContent;
