import { http, AxiosRequestConfig } from '@/libs/http';
import utility from '@/libs/utility';
import { useCallback } from 'react';

export const useHttpAction = (method: SwaggerJson.ApiMethod) => {
  const httpAction = useCallback(
    (formValues: Record<string, any>, requestType: 'form' | 'raw' | 'none') => {
      const pathObj: Record<string, string> = {};

      method.parameters.forEach(p => {
        if (p.type == 'path') {
          pathObj[p.name] = formValues[p.name] || '';
          delete formValues[p.name];
        }
      });
      const path = utility.format(method.path, pathObj);
      if (/[\{\}]+/gi.test(path)) {
        return Promise.reject('required parameter is missing');
      }

      const config: AxiosRequestConfig = {};
      switch (method.method.toLowerCase()) {
        case 'get':
          config.params = formValues;
          return http.get(path, config);
        case 'post':
          if (
            method.consumes &&
            method.consumes.indexOf('application/x-www-form-urlencoded') > 0 &&
            requestType != 'none'
          ) {
            return http.postForm(path, formValues, config);
          } else {
            return http.post(path, formValues, config);
          }
        case 'put':
          if (
            method.consumes &&
            method.consumes.indexOf('application/x-www-form-urlencoded') > 0 &&
            requestType != 'none'
          ) {
            return http.putForm(path, formValues, config);
          } else {
            return http.put(path, formValues, config);
          }
        case 'patch':
          if (
            method.consumes &&
            method.consumes.indexOf('application/x-www-form-urlencoded') > 0 &&
            requestType != 'none'
          ) {
            return http.patchForm(path, formValues, config);
          } else {
            return http.patch(path, formValues, config);
          }
        case 'delete':
          config.params = formValues;
          return http.delete(path, config);
        default:
          return Promise.reject('unsupported method');
      }
    },
    [method, http],
  );

  return { httpAction };
};
