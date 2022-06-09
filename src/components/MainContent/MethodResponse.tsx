import React, { useMemo } from 'react';
import { Table, Divider, Box, Text } from '@mantine/core';
import { CircleCheck } from 'tabler-icons-react';
import utility from '@/libs/utility';
import { DefinitionDetail } from './DefinitionDetail';

type MethodResponseProps = {
  response?: SwaggerJson.Response;
  definitions?: Record<string, SwaggerJson.Schema>;
};

export const MethodResponse: React.FC<MethodResponseProps> = ({ response, definitions }) => {
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
    </div>
  );
};
