import React from 'react';
import { Table, Badge, Group } from '@mantine/core';
import { useMethodStyleColor } from './hooks/useMethodStyleColor';
type MethodSummaryProps = {
  method: SwaggerJson.ApiMethod;
};

export const MethodSummary: React.FC<MethodSummaryProps> = ({ method }) => {
  const methodColor = useMethodStyleColor(method.method || '');
  return (
    <Table verticalSpacing='xs' fontSize='xs'>
      <tbody>
        <tr>
          <td className='title'>Path</td>
          <td colSpan={3}>
            <Group>
              <Badge size='sm' radius='xs' color={methodColor}>
                {method.method.toUpperCase()}
              </Badge>
              {method.path}
            </Group>
          </td>
        </tr>
        <tr>
          <td className='title'>Summary</td>
          <td colSpan={3}>{method?.summary}</td>
        </tr>
        {method.description && (
          <tr>
            <td className='title'>Description</td>
            <td colSpan={3}>{method?.description}</td>
          </tr>
        )}
        <tr>
          <td className='title' style={{ width: '15%' }}>
            Consumes
          </td>
          <td style={{ width: '35%' }}>{method?.consumes || ''}</td>
          <td className='title' style={{ width: '15%' }}>
            Produces
          </td>
          <td>{method?.produces || ''}</td>
        </tr>
      </tbody>
    </Table>
  );
};
