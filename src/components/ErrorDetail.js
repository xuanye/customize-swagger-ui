import React from 'react';
import { Tag } from 'antd';
const ErrorDetail = ({ responses }) => {
    if (!responses) {
        return null;
    }
    const statusKeys = Object.keys(responses);

    return (
        <div>
            {statusKeys.map(key => {
                if (key == '200' || key == 'default') {
                    return null;
                }
                return (
                    <div key={key} className='error-response-message'>
                        <Tag color='error'>{key}</Tag> {responses[key].description || ''}{' '}
                    </div>
                );
            })}
        </div>
    );
};

export default ErrorDetail;
