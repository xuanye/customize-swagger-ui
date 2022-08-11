import React from 'react';

import utility from '@/libs/utility';
import { useDefinition } from './hooks/useDefinition';

type DefinitionDetailProps = {
  schema: SwaggerJson.Schema;
  definitions?: Record<string, SwaggerJson.Schema>;
  existsDefinitions: Record<string, boolean>;
  showCurrent?: boolean;
};

export const DefinitionDetail: React.FC<DefinitionDetailProps> = ({
  schema,
  definitions,
  existsDefinitions,
  showCurrent,
}) => {
  const { childSchemas, properties } = useDefinition(schema, existsDefinitions, definitions);

  if (schema.type != 'object' && schema.type != 'array') {
    return null;
  }
  if (!schema || !schema.properties || Object.keys(schema.properties).length == 0) {
    return null;
  }

  const currentSchema = showCurrent ? (
    <table className='detail-table'>
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
    </table>
  ) : null;
  return (
    <div style={{ marginTop: '5px' }}>
      {currentSchema}
      {Object.keys(childSchemas).map(key => {
        return (
          <DefinitionDetail
            key={key}
            schema={childSchemas[key]}
            definitions={definitions}
            existsDefinitions={existsDefinitions}
            showCurrent={true}
          />
        );
      })}
    </div>
  );
};
