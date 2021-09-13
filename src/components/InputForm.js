import React, { useEffect, useState } from 'react';
import Utility from '@/libs/utility';
import { Input, Form } from 'antd';
const InputForm = ({ parameters, form }) => {
    if (!parameters) {
        return null;
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
                                <td>{p.in}</td>
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
