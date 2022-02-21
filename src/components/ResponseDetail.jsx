import React from 'react';
import { Tag } from 'antd';
import Utility from '@/libs/utility';

const ResponseDetail = ({ responses, definitions }) => {
    if (!responses || !definitions) {
        return null;
    }
    //const statusKeys = Object.keys(responses);
    const defaultResponse = responses['200'] || responses['default'];
    if (!defaultResponse) {
        return null;
    }
    if (!defaultResponse.schema || !defaultResponse.schema['$ref']) {
        return (
            <div className='success-response-message'>
                <Tag color='success'>200</Tag> {defaultResponse.description || 'success'}
            </div>
        );
    }
    const arrRef = defaultResponse.schema['$ref'].split('/');
    const entity = arrRef.pop();
    const schema = definitions[entity];
    const existsDefinitions = {};
    if (!schema) {
        return (
            <div className='success-response-message'>
                <Tag color='success'>200</Tag> {defaultResponse.description || 'success'}
            </div>
        );
    }
    schema.name = entity;
    return (
        <div>
            <div className='success-response-message'>
                <Tag color='success'>200</Tag> {defaultResponse.description || 'success'}
            </div>
            <DefinitionDetail
                schema={schema}
                definitions={definitions}
                existsDefinitions={existsDefinitions}
            />
        </div>
    );
};

const DefinitionDetail = ({ schema, definitions, existsDefinitions }) => {
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
        if (
            p.type == 'array' &&
            p.items &&
            p.items['$ref'] &&
            p.items['$ref'].startsWith('#/definitions')
        ) {
            key = p.items['$ref'].split('/').pop();
        } else if (p['$ref']) {
            key = p['$ref'].split('/').pop();
        }
        if (key && !childDefinition[key] && !existsDefinitions[key] && definitions[key]) {
            childDefinition[key] = definitions[key];
            childDefinition[key].name = key;
            existsDefinitions[key] = 1;
            return;
        }
    });

    return (
        <div>
            <table className='detail-table'>
                <thead>
                    <tr>
                        <th colSpan='3'>{schema.name || ''}</th>
                    </tr>
                </thead>
                <thead>
                    <tr>
                        <th>Properties</th>
                        <th>Type</th>
                        <th>Description</th>
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
                        properties.map(property => {
                            return (
                                <tr key={property}>
                                    <td>{property}</td>
                                    <td>{Utility.getTypeName(schema.properties[property])}</td>
                                    <td>{schema.properties[property].description || ''} </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            {Object.keys(childDefinition).map(key => {
                return (
                    <DefinitionDetail
                        key={key}
                        schema={childDefinition[key]}
                        definitions={definitions}
                        existsDefinitions={existsDefinitions}
                    />
                );
            })}
        </div>
    );
};

export default ResponseDetail;
