import React from 'react';
import { Tag, Alert } from 'antd';
import ReactJson from 'react-json-view';

const JsonView = ({ json, status }) => {
    if (status == 0) {
        return null;
    }
    //console.log('🚀 ~ file: JsonView.js ~ line 6 ~ JsonView ~ json, status', json, status);
    const detail =
        typeof json == 'string' ? (
            <Alert message={json || '<<Empty>>'} type='error' />
        ) : (
            <ReactJson src={json || {}}></ReactJson>
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
