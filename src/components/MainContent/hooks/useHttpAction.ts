import { useCallback } from 'react';
import { message } from 'antd';
import qs from 'qs';
import { http, AxiosRequestConfig } from '@/libs/http';
import utility from '@/libs/utility';

export const useHttpAction = (method: SwaggerJson.ApiMethod) => {
  const httpAction = useCallback(
    (formValues: Record<string, any>, requestType: 'form' | 'raw') => {
      const pathObj: Record<string, string> = {};

      method.parameters.forEach(p => {
        if (p.in == 'path') {
          pathObj[p.name] = formValues[p.name] || '';
          delete formValues[p.name];
        }
      });
      const path = utility.format(method.path, pathObj);

      if (/[\{\}]+/gi.test(path)) {
        return Promise.reject('required parameter is missing');
      }

      const config: AxiosRequestConfig = { headers: {} };
      let data;
      if (requestType == 'raw') {
        const jsonVal = formValues['json-body-9527'] || '{}';
        try {
          data = JSON.parse(jsonVal);
        } catch (e) {
          message.error('json parse error');
          return Promise.reject('json parse error');
        }
      } else if (
        method.consumes &&
        method.consumes.indexOf('application/x-www-form-urlencoded') >= 0
      ) {
        config.headers!['Content-Type'] = 'application/x-www-form-urlencoded';
        data = qs.stringify(formValues, { indices: false });
      } else {
        data = formValues;
      }

      if (
        method.operationId == 'ExportMethod' ||
        (method.produces && method.produces.some(x => x == 'application/octet-stream'))
      ) {
        config.responseType = 'blob';
        console.log('download request');
      }

      config.params = { _t: new Date().getTime() };

      switch (method.method.toLowerCase()) {
        case 'get':
          config.params = { ...config.params, ...formValues };
          return http.get(path, config);
        case 'post':
          return http.post(path, data, config);
        case 'put':
          return http.put(path, data, config);
        case 'patch':
          return http.patch(path, data, config);
        case 'delete':
          //config.params = formValues;
          config.data = data;
          return http.delete(path, config);
        default:
          return Promise.reject('unsupported method');
      }
    },
    [method, http],
  );

  return { httpAction };
};
