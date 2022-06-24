import React from 'react';
import { Divider, Tag, Alert } from 'antd';

import ReactJson from 'react-json-view';
import { FireTwoTone } from '@ant-design/icons';
import { useStatusColor } from './hooks/useStatusColor';

type ResponseViewProps = {
  statusCode: number;
  response?: any;
};

export const ResponseView: React.FC<ResponseViewProps> = ({ response, statusCode }) => {
  const statusColor = useStatusColor(statusCode);
  return (
    <div>
      <Divider dashed orientation='center'>
        <span>
          <FireTwoTone />
          Response
        </span>
      </Divider>
      {statusCode > 0 && (
        <div style={{ margin: '5px 0' }}>
          <Tag color={statusColor}> {statusCode}</Tag>
        </div>
      )}
      {typeof response == 'string' ? (
        <Alert message={response || '<<Empty>>'} type='error' />
      ) : (
        <ReactJson src={response || {}}></ReactJson>
      )}
    </div>
  );
};
