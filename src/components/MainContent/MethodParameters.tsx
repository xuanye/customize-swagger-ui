import React, { memo, useEffect, useMemo, useRef } from 'react';
import { Table, Divider, Box, Text } from '@mantine/core';
import { Forms } from 'tabler-icons-react';
import utility from '@/libs/utility';

type MethodParametersProps = {
  parameters: SwaggerJson.Parameter[];
  definitions: Record<string, SwaggerJson.Schema>;
};

export const MethodParameters: React.FC<MethodParametersProps> = ({ parameters, definitions }) => {
  useEffect(() => {
    console.log('>>>>MethodParameters<<<<<');
  }, [parameters]);

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
                Parameter
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

/*

*/
type DefinitionDetailProps = {
  schema: SwaggerJson.Schema;
  definitions: Record<string, SwaggerJson.Schema>;
  existsDefinitions: Record<string, boolean>;
  showCurrent?: boolean;
};

const DefinitionDetail: React.FC<DefinitionDetailProps> = ({
  schema,
  definitions,
  existsDefinitions,
  showCurrent,
}) => {
  useEffect(() => {
    console.log('=======DefinitionDetail===', schema);
  }, [schema, showCurrent]);

  if (!schema || !schema.properties || Object.keys(schema.properties).length == 0) {
    return null;
  }

  if (!schema.type) {
    if (schema['$ref']) {
      schema.type = 'object';
    } else if (schema['items']) {
      schema.type = 'array';
    } else {
      return null;
    }
  }

  const childDefinition: Record<string, SwaggerJson.Schema> = {};

  const properties = Object.entries(schema.properties);

  properties.forEach(([_, p]) => {
    let key = '';
    if (
      p.type == 'array' &&
      p.items &&
      p.items['$ref'] &&
      p.items['$ref'].startsWith('#/definitions')
    ) {
      key = p.items['$ref'].split('/').pop() || '';
    } else if (p['$ref']) {
      if (p.items && Array.isArray(p.items)) {
        key = p.items[0]['$ref'].split('/').pop();
      } else {
        key = p['$ref'].split('/').pop() || '';
      }
    }
    if (key && !childDefinition[key] && !existsDefinitions[key] && definitions[key]) {
      childDefinition[key] = definitions[key];
      childDefinition[key].name = key;
      existsDefinitions[key] = true;
      return;
    }
  });

  const currentSchema = showCurrent ? (
    <Table verticalSpacing='xs' fontSize='xs'>
      <thead>
        <tr>
          <th colSpan={3}>{schema?.name || ''}</th>
        </tr>
      </thead>
      <thead>
        <tr>
          <th>Name</th>
          <th>Data Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {properties.map(([property, schema]) => {
          return (
            <tr key={property}>
              <td>{property}</td>
              <td>{utility.getTypeName(schema)}</td>
              <td>{schema?.description || ''} </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  ) : null;

  return (
    <>
      {currentSchema}
      {Object.keys(childDefinition).map(key => {
        return (
          <DefinitionDetail
            key={key}
            schema={childDefinition[key]}
            definitions={definitions}
            existsDefinitions={existsDefinitions}
            showCurrent={true}
          />
        );
      })}
    </>
  );
};
