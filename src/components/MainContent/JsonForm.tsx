import React from 'react';
import { Table, Box, Input } from '@mantine/core';
import utility from '@/libs/utility';

type JsonFormProps = {
  parameters: SwaggerJson.Parameter[];
};

const JsonForm: React.FC<JsonFormProps> = ({ parameters }) => {
  const hasPathParameters = parameters.findIndex(x => x.in == 'path') >= 0;
  const pathParameters = hasPathParameters ? (
    <Box sx={{ marginTop: '10px' }}>
      <Table verticalSpacing='xs' fontSize='xs'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
            <th>Description</th>
            <th>Data Type</th>
          </tr>
        </thead>
        <tbody>
          {parameters.map(p => {
            return p.in == 'path' ? (
              <tr key={p.name}>
                <td>{p.name}</td>
                <td>
                  <Input size='xs' />
                </td>
                <td>{p.description}</td>
                <td>{utility.getTypeName(p)}</td>
              </tr>
            ) : null;
          })}
        </tbody>
      </Table>
    </Box>
  ) : null;
  return (
    <>
      {pathParameters}
      <div>JSON Form</div>
    </>
  );
};

export default JsonForm;
