import React from 'react';
import { Table, Box, Input } from '@mantine/core';
import utility from '@/libs/utility';
import { useForm } from '@mantine/form';

type InputFormProps = {
  parameters: SwaggerJson.Parameter[];
};
export const InputForm: React.FC<InputFormProps> = ({ parameters }) => {
  const inBody = parameters.findIndex(x => x.in == 'body') >= 0;
  const hasFile = parameters.findIndex(x => x.in == 'file') >= 0;
  const initialForm = getInitialValues(parameters);
  const form = useForm({
    initialValues: initialForm,
  });
  return (
    <form {hasFile}>
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
                      <Input size='xs' placeholder={p.name} {...form.getInputProps(p.name)} />
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
    retVal[p.name] = '';
  });
  return retVal;
}
