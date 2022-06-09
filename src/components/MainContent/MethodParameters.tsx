import React, { useMemo } from 'react';
import { Table, Divider, Box, Text } from '@mantine/core';
import { Forms } from 'tabler-icons-react';
import utility from '@/libs/utility';
import { DefinitionDetail } from './DefinitionDetail';

type MethodParametersProps = {
  parameters: SwaggerJson.Parameter[];
  definitions: Record<string, SwaggerJson.Schema>;
};

export const MethodParameters: React.FC<MethodParametersProps> = ({ parameters, definitions }) => {
  if (!parameters) {
    return null;
  }

  let inBody: boolean = parameters.findIndex(x => x.in == 'body') >= 0;

  const extraSchema: SwaggerJson.Schema = useMemo(() => {
    const data: SwaggerJson.Schema = { type: 'object', properties: {} };
    parameters.forEach(p => {
      if (p.schema && data.properties) {
        data.properties[p.name] = p.schema;
      }
    });
    return data;
  }, [parameters]);

  const existsDefinitions: Record<string, boolean> = {};

  //console.log('MethodParameters', parameters);

  return (
    <>
      <Divider
        my='xs'
        variant='dashed'
        labelPosition='center'
        label={
          <>
            <Forms color='green' size={12} />
            <Box ml={5}>
              <Text weight={500} size='sm'>
                Parameters
              </Text>
            </Box>
          </>
        }
      />
      <Table verticalSpacing='xs' fontSize='xs'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Parameter Type</th>
            <th>Data Type</th>
            <th>Default</th>
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
                  <td>{p.description}</td>
                  <td>{inBody && p.in != 'path' && p.in != 'query' ? 'body' : p.in}</td>
                  <td>{utility.getTypeName(p)}</td>
                  <td>{p.default || ''}</td>
                  <td>{p.required}</td>
                </tr>
              );
            })
          }
        </tbody>
      </Table>
      <DefinitionDetail
        schema={extraSchema}
        definitions={definitions}
        existsDefinitions={existsDefinitions}
      />
    </>
  );
};
