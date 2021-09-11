import React from 'react';
import Utility from '@/libs/utility';
const ParametersDetail = ({ parameters }) => {
    if (!parameters) {
        return null;
    }

    return (
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
                                <td>{p.in}</td>
                                <td>{Utility.getTypeName(p)}</td>
                                <td>{p.default || ''}</td>
                                <td>{p.required}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    );
};

export default ParametersDetail;
