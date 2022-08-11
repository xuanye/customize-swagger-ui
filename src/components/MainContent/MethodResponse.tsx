import React from 'react';
import { Divider, Space, Tag } from 'antd';
import { DefinitionDetail } from './DefinitionDetail';
import { FireTwoTone } from '@ant-design/icons';
import { useStatusColor } from './hooks/useStatusColor';

type MethodResponseProps = {
  responses: Record<string, SwaggerJson.Response>;
  definitions?: Record<string, SwaggerJson.Schema>;
};

export const MethodResponse: React.FC<MethodResponseProps> = ({ responses, definitions }) => {
  let responseDetail = null;
  if (responses && definitions) {
    responseDetail = Object.entries(responses).map(([statusCode, response]) => {
      return (
        <MethodResponseDetail
          key={statusCode}
          statusCode={statusCode}
          response={response}
          definitions={definitions}
        />
      );
    });
  }

  return (
    <div>
      <Divider dashed orientation='center'>
        <span>
          <FireTwoTone />
          Response
        </span>
      </Divider>
      {responseDetail}
    </div>
  );
};

type MethodResponseDetailProps = {
  statusCode: string;
  response: SwaggerJson.Response;
  definitions: Record<string, SwaggerJson.Schema>;
};
const MethodResponseDetail: React.FC<MethodResponseDetailProps> = ({
  statusCode,
  response,
  definitions,
}) => {
  if (!response.schema || !response.schema['$ref']) {
    return <StatusBar statusCode={statusCode} description={response.description} />;
  }
  const arrRef = response.schema['$ref'].split('/');
  const entity: string = arrRef.pop() || '';
  const schema = definitions[entity];
  const existsDefinitions: Record<string, boolean> = {};
  if (!schema) {
    return <StatusBar statusCode={statusCode} description={response.description} />;
  }
  schema.name = entity;
  return (
    <div>
      <StatusBar statusCode={statusCode} description={response.description} />
      <DefinitionDetail
        schema={schema}
        definitions={definitions}
        existsDefinitions={existsDefinitions}
        showCurrent={true}
      />
    </div>
  );
};

type StatusBarProps = {
  statusCode: string;
  description?: string;
};
const StatusBar: React.FC<StatusBarProps> = ({ statusCode, description = 'success' }) => {
  const color = useStatusColor(parseInt(statusCode));
  return (
    <div style={{ marginTop: '10px' }}>
      <Space>
        <Tag color={color}>{statusCode}</Tag>
        <span> {description}</span>
      </Space>
    </div>
  );
};
