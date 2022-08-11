import { useState, useEffect } from 'react';

export const useRequestTye = (method: SwaggerJson.ApiMethod) => {
  const [requestType, setRequestType] = useState<'form' | 'raw'>('form');
  useEffect(() => {
    if (method && method.parameters) {
      if (method.parameters.length == 0) {
        setRequestType('form');
      } else {
        const inBody = method.parameters.findIndex(x => x.in == 'body') >= 0;
        setRequestType(inBody ? 'raw' : 'form');
      }
    }
  }, [method]);

  return { requestType, setRequestType };
};
