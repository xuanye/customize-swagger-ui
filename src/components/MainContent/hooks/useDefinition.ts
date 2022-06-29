import { useEffect, useState } from 'react';

export const useDefinition = (
  schema: SwaggerJson.Schema,
  existsDefinitions: Record<string, boolean>,
  definitions: Record<string, SwaggerJson.Schema> = {},
) => {
  const [properties, setProperties] = useState<[string, SwaggerJson.Schema][]>([]);
  const [childSchemas, setChildSchemas] = useState<Record<string, SwaggerJson.Schema>>({});

  useEffect(() => {
    const props = Object.entries(schema?.properties || {});
    const childSchemas: Record<string, SwaggerJson.Schema> = {};
    props.forEach(([_, p]) => {
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

      if (key && !childSchemas[key] && !existsDefinitions[key] && definitions[key]) {
        PrepareSchemaType(definitions[key]);
        childSchemas[key] = definitions[key];
        childSchemas[key].name = key;
        existsDefinitions[key] = true;

        return;
      }
    });
    setProperties(props);
    setChildSchemas(childSchemas);
  }, [schema]);

  return { properties, childSchemas };
};

function PrepareSchemaType(schema: SwaggerJson.Schema) {
  if (!schema.type) {
    if (schema['$ref']) {
      schema.type = 'object';
    } else if (schema['items']) {
      schema.type = 'array';
    }
  }
}
