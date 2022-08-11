import React, { useMemo, useImperativeHandle, useEffect } from 'react';
import { Input, Form } from 'antd';
import utility from '@/libs/utility';

const { TextArea } = Input;
type JsonFormProps = {
  parameters: SwaggerJson.Parameter[];
  onRef?: React.Ref<{ formSubmit(): any }>;
};

export const JsonForm: React.FC<JsonFormProps> = ({ parameters, onRef }) => {
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
  const pathParameters = useMemo(() => {
    const hasPathParameters = parameters.some(x => x.in == 'path');
    return hasPathParameters ? (
      <table className='detail-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
            <th>Description</th>
            <th>Data Type</th>
          </tr>
        </thead>
        <tbody>
          {parameters.map(p => {
            return p.in == 'path' ? (
              <tr key={p.name}>
                <td>{p.name}</td>
                <td style={{ width: '25%' }}>
                  <Form.Item name={p.name} initialValue=''>
                    <Input placeholder={utility.getTypeName(p)} />
                  </Form.Item>
                </td>
                <td>{p.description}</td>
                <td>{utility.getTypeName(p)}</td>
              </tr>
            ) : null;
          })}
        </tbody>
      </table>
    ) : null;
  }, [parameters]);
  return (
    <>
      <Form className='request-form' form={form} name='request-form'>
        {pathParameters}
        <div style={{ padding: '10px 0' }}>
          <Form.Item name='json-body-9527' initialValue=''>
            <TextArea rows={15} placeholder='please input json string' />
          </Form.Item>
        </div>
      </Form>
    </>
  );
};
