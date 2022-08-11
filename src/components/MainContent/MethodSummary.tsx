import { Space, Tag } from 'antd';
import React, { memo } from 'react';

type MethodSummaryProps = {
  method: SwaggerJson.ApiMethod;
};

export const MethodSummary: React.FC<MethodSummaryProps> = memo(({ method }) => {
  const methodColor = useMethodStyleColor(method?.method || '');
  return (
    <table className='detail-table'>
      <tbody>
        <tr>
          <td className='title'>Path</td>
          <td colSpan={3}>
            <Space>
              <Tag color={methodColor}>{method?.method.toUpperCase()}</Tag>
              {method?.path}
            </Space>
          </td>
        </tr>
        <tr>
          <td className='title'>Summary</td>
          <td colSpan={3}>{method?.summary}</td>
        </tr>
        {method?.description && (
          <tr>
            <td className='title'>Description</td>
            <td colSpan={3}>{method?.description}</td>
          </tr>
        )}
        <tr>
          <td className='title' style={{ width: '15%' }}>
            Consumes
          </td>
          <td style={{ width: '35%' }}>{method?.consumes?.join(';') || ''}</td>
          <td className='title' style={{ width: '15%' }}>
            Produces
          </td>
          <td>{method?.produces || ''}</td>
        </tr>
      </tbody>
    </table>
  );
});

function useMethodStyleColor(methodName: string) {
  const lowerCaseName = methodName.toLowerCase();
  switch (lowerCaseName) {
    case 'get':
      return 'green';
    case 'post':
      return 'blue';
    case 'put':
      return 'orange';
    case 'patch':
      return 'volcano';
    case 'delete':
      return 'red';
    default:
      return '';
  }
}
