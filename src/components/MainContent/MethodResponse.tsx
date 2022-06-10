import React from 'react';
import { Divider, Box, Text, Badge, Group } from '@mantine/core';
import { CircleCheck } from 'tabler-icons-react';
import { DefinitionDetail } from './DefinitionDetail';

type MethodResponseProps = {
  responses?: Record<string, SwaggerJson.Response>;
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
      <Divider
        my='xs'
        variant='dashed'
        labelPosition='center'
        label={
          <>
            <CircleCheck color='blue' size={12} />
            <Box ml={5}>
              <Text weight={500} size='sm'>
                Response
              </Text>
            </Box>
          </>
        }
      />
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
  return (
    <Group style={{ marginTop: '10px' }}>
      <Badge size='xs' color={getStatusColor(statusCode)} radius='sm'>
        {statusCode}
      </Badge>
      <Text size='sm'> {description}</Text>
    </Group>
  );
};

function getStatusColor(statusCode: string) {
  const statusCodeVal = parseInt(statusCode);
  if (statusCodeVal >= 500) {
    return 'red';
  } else if (statusCodeVal >= 400) {
    return 'yellow';
  } else if (statusCodeVal >= 300) {
    return 'orange';
  }

  return 'teal';
}
