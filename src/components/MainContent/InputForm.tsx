import React, { useEffect, useImperativeHandle } from 'react';

import utility from '@/libs/utility';
import { Input, Form } from 'antd';

type InputFormProps = {
  parameters: SwaggerJson.Parameter[];
  onRef?: React.Ref<{ formSubmit(): any }>;
};
export const InputForm: React.FC<InputFormProps> = ({ parameters, onRef }) => {
  const inBody = parameters.findIndex(x => x.in == 'body') >= 0;

  const [form] = Form.useForm();

  useImperativeHandle(onRef, () => {
    return {
      formSubmit: raiseSubmit,
    };
  });

  useEffect(() => {
    form.resetFields();
  }, [form, parameters]);
  const raiseSubmit = () => {
    return form.getFieldsValue();
  };

  return (
    <Form className='request-form' form={form} name='request-form'>
      <table className='detail-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
            <th>Description</th>
            <th>Parameter Type</th>
            <th>Required</th>
          </tr>
        </thead>
        <tbody>
          {
            /*"name": "petId",
         "in": "path",
         "description": "ID of pet to update",
         "required": true,
         "type": "integer",
         "format": "int64" */

            parameters.map(p => {
              return (
                <tr key={p.name}>
                  <td>{p.name}</td>
                  <td style={{ width: '25%' }}>
                    <Form.Item name={p.name} initialValue=''>
                      <Input placeholder={utility.getTypeName(p)} />
                    </Form.Item>
                  </td>
                  <td>{p.description}</td>
                  <td>{inBody && p.in != 'path' && p.in != 'query' ? 'body' : p.in}</td>
                  <td>{p.required}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </Form>
  );
};
