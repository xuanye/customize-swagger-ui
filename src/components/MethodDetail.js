import React, { useEffect, useState } from 'react';
import { Divider } from 'antd';
import {
    CheckCircleTwoTone,
    WarningTwoTone,
    ProfileTwoTone,
    ThunderboltTwoTone,
} from '@ant-design/icons';
import SummaryDetail from './SummaryDetail';
import ParametersDetail from './ParametersDetail';
import ResponseDetail from './ResponseDetail';
import ErrorDetail from './ErrorDetail';

const MethodDetail = ({ method, definitions }) => {
    const parameters = !!method ? method.parameters : null;

    const responses = !!method ? method.responses : null;

    if (!responses) {
        return null;
    }
    const status = Object.keys(responses);
    const errorIndex = status.findIndex(x => x != '200' && x != ' default');
    return (
        <div>
            <Divider orientation='left'>
                <ProfileTwoTone twoToneColor='#52c41a' /> Summary
            </Divider>
            <SummaryDetail method={method} />
            <Divider orientation='left'>
                <ThunderboltTwoTone /> Parameters
            </Divider>
            <ParametersDetail parameters={parameters} definitions={definitions} />
            <Divider orientation='left'>
                <CheckCircleTwoTone twoToneColor='#52c41a' /> Response
            </Divider>
            <ResponseDetail responses={responses} definitions={definitions} />

            {errorIndex >= 0 ? (
                <Divider orientation='left'>
                    <WarningTwoTone twoToneColor='#f5222d' /> Errors
                </Divider>
            ) : null}

            <ErrorDetail responses={responses} />
        </div>
    );
};

export default MethodDetail;
