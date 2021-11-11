import React, { useEffect, useState } from 'react';
import Utility from '@/libs/utility';
import { Input, Form } from 'antd';
const InputForm = ({ parameters, form }) => {
    if (!parameters) {
        return null;
    }
    let inBody = false;
    for (let i = 0, l = parameters.length; i < l; i++) {
        if (parameters[i].in == 'body') {
            inBody = true;
            break;
        }
    }
    return (
        <Form className='request-form' form={form} name='request-form'>
            <table className='detail-table'>
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
                    {parameters.map((p, i) => {
                        return (
                            <tr key={p.name}>
                                <td>{p.name}</td>
                                <td>
                                    <Form.Item name={p.name} initialValue=''>
                                        <Input placeholder={`please input ${p.name}'s value`} />
                                    </Form.Item>
                                </td>
                                <td>{p.description}</td>
                                <td>{inBody ? 'body' : p.in}</td>
                                <td>{Utility.getTypeName(p)}</td>
                                <td>{p.required}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Form>
    );
};

export default InputForm;
