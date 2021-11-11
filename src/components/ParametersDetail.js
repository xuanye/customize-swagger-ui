import React from 'react';
import Utility from '@/libs/utility';
const ParametersDetail = ({ parameters, definitions }) => {
    if (!parameters) {
        return null;
    }

    const extraSchema = { type: 'object', properties: [] };
    const existsDefinitions = {};

    let inBody = false;
    for (let i = 0, l = parameters.length; i < l; i++) {
        if (parameters[i].in == 'body') {
            inBody = true;
        }
        if (parameters[i].schema && parameters[i].schema['$ref']) {
            extraSchema.properties.push(parameters[i].schema);
        }
    }
    return (
        <div>
            <table className='detail-table'>
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
                                    <td>{inBody ? 'body' : p.in}</td>
                                    <td>{Utility.getTypeName(p)}</td>
                                    <td>{p.default || ''}</td>
                                    <td>{p.required}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            <DefinitionDetail
                schema={extraSchema}
                definitions={definitions}
                existsDefinitions={existsDefinitions}
            />
        </div>
    );
};

const DefinitionDetail = ({ schema, definitions, existsDefinitions, showCurrent }) => {
    if (!schema) {
        return null;
    }
    if (schema.type != 'object') {
        if (schema['$ref']) {
            schema.type = 'object';
        } else {
            return null;
        }
    }
    const childDefinition = {};
    const properties = Object.keys(schema.properties);

    properties.map(pName => {
        let key = '';
        const p = schema.properties[pName];
        if (p.type == 'array' && p.items && p.items['$ref'].startsWith('#/definitions')) {
            key = p.items['$ref'].split('/').pop();
        } else if (p['$ref']) {
            if (p.items && Array.isArray(p.items)) {
                key = p.items[0]['$ref'].split('/').pop();
            } else {
                key = p['$ref'].split('/').pop();
            }
        }
        if (key && !childDefinition[key] && !existsDefinitions[key] && definitions[key]) {
            childDefinition[key] = definitions[key];
            childDefinition[key].name = key;
            existsDefinitions[key] = 1;
            return;
        }
    });

    const table = showCurrent ? (
        <table className='detail-table'>
            <thead>
                <tr>
                    <th colSpan='3'>{schema.name || ''}</th>
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
                {properties.map(property => {
                    return (
                        <tr key={property}>
                            <td>{property}</td>
                            <td>{Utility.getTypeName(schema.properties[property])}</td>
                            <td>{schema.properties[property].description || ''} </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    ) : null;

    return (
        <div>
            {table}
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
        </div>
    );
};

export default ParametersDetail;
