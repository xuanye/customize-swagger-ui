import { useState, useEffect } from 'react';

export const useRequestTye = (method: SwaggerJson.ApiMethod) => {
  const [requestType, setRequestType] = useState<'form' | 'raw' | 'none'>('none');
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

  return { requestType, setRequestType };
};
