import { Button, Group, Title, RadioGroup, Radio } from '@mantine/core';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { InputForm } from './InputForm';

const JsonForm = lazy(() => import('./JsonForm'));

type DebugContentProps = {
  method: SwaggerJson.ApiMethod;
};
const DebugContent: React.FC<DebugContentProps> = ({ method }) => {
  const [requestType, setRequestType] = useState('none');
  useEffect(() => {
    if (method && method.parameters) {
      if (method.parameters.length == 0) {
        setRequestType('none');
      } else {
        const inBody = method.parameters.findIndex(x => x.in == 'body') >= 0;
        setRequestType(inBody ? 'raw' : 'form');
      }
    }
  }, [method]);

  return (
    <>
      <Group spacing='xs' position='apart'>
        <Title order={4}>{method.path}</Title>
        <Group>
          <Button size='xs' radius='xs'>
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
        onChange={setRequestType}>
        <Radio value='none' label='none' />
        <Radio value='form' label='form-data' />
        <Radio value='raw' label='raw(json)' />
      </RadioGroup>
      {requestType == 'form' && <InputForm parameters={method.parameters} />}
      {requestType == 'raw' && (
        <Suspense fallback={<div>Loading</div>}>
          <JsonForm parameters={method.parameters} />
        </Suspense>
      )}
    </>
  );
};

export default DebugContent;
