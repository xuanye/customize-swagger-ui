import React, { useEffect, useImperativeHandle, useMemo } from 'react';
import { Table, Box, Input } from '@mantine/core';
import utility from '@/libs/utility';
import { useForm } from '@mantine/form';

type InputFormProps = {
  parameters: SwaggerJson.Parameter[];
  onRef?: React.Ref<{ formSubmit(): any }>;
};
export const InputForm: React.FC<InputFormProps> = ({ parameters, onRef }) => {
  const inBody = parameters.findIndex(x => x.in == 'body') >= 0;

  const initialForm = getInitialValues(parameters);

  const form = useForm({
    initialValues: initialForm,
  });
  useEffect(() => {
    form.setValues(getInitialValues(parameters));
  }, [parameters]);

  useImperativeHandle(onRef, () => {
    return {
      formSubmit: raiseSubmit,
    };
  });

  const raiseSubmit = () => {
    return form.values;
  };

  return (
    <form>
      <Box sx={{ marginTop: '10px' }}>
        <Table verticalSpacing='xs' fontSize='xs'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Value</th>
              <th>Description</th>
              <th>Parameter Type</th>
              <th>Data Type</th>
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
                    <td>
                      <Input
                        size='xs'
                        radius='xs'
                        placeholder={p.type}
                        {...form.getInputProps(p.name)}
                      />
                    </td>
                    <td>{p.description}</td>
                    <td>{inBody && p.in != 'path' && p.in != 'query' ? 'body' : p.in}</td>
                    <td>{utility.getTypeName(p)}</td>

                    <td>{p.required}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </Table>
      </Box>
    </form>
  );
};

function getInitialValues(parameters: SwaggerJson.Parameter[]) {
  const retVal: Record<string, any> = {};
  parameters.forEach(p => {
    retVal[p.name] = '1';
  });
  return retVal;
}
