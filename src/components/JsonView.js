import React from 'react';
import { Tag, Alert } from 'antd';
import ReactJson from 'react-json-view';

const JsonView = ({ json, status }) => {
    if (!json) {
        return null;
    }

    const detail =
        typeof json == 'string' ? (
            <Alert message={json} type='error' />
        ) : (
            <ReactJson src={json}></ReactJson>
        );
    return (
        <div>
            <div className='success-response-message'>
                <Tag color={status >= 200 && status < 300 ? 'success' : 'error'}>{status}</Tag>
            </div>
            {detail}
        </div>
    );
};

export default JsonView;
