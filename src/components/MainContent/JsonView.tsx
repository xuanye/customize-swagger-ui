import React from 'react';
import { Divider, Box, Text } from '@mantine/core';
import { CircleCheck } from 'tabler-icons-react';
import ReactJson from 'react-json-view';

type JsonViewProps = {
  response?: any;
  statusCode: number;
};

export const JsonView: React.FC<JsonViewProps> = ({ response, statusCode }) => {
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
      <ReactJson src={response || {}}></ReactJson>
    </div>
  );
};
