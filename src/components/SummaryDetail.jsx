import React from 'react';
import { Descriptions } from 'antd';

const SummaryDetail = ({ method }) => {
    if (!method) {
        return null;
    }

    return (
        <Descriptions size='middle' bordered>
            <Descriptions.Item label='Path' span={3}>
                {method.path}
            </Descriptions.Item>
            <Descriptions.Item label='Summary' span={3}>
                {method.summary || ''}
            </Descriptions.Item>
            <Descriptions.Item label='Description' span={3}>
                {method.description || ''}
            </Descriptions.Item>
            <Descriptions.Item label='Consumes' span={1}>
                {method.consumes ? method.consumes.join(';') : '  '}
            </Descriptions.Item>
            <Descriptions.Item label='Produces' span={2}>
                {method.produces ? method.produces.join(';') : ' '}
            </Descriptions.Item>
        </Descriptions>
    );
};

export default SummaryDetail;
