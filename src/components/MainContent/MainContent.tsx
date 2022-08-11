import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Space, Tabs } from 'antd';
import { MethodDescription } from './MethodDescription';
import { ProfileTwoTone, BugTwoTone } from '@ant-design/icons';

const { TabPane } = Tabs;

type MainContentProps = {
  isLoading: boolean;
  method?: SwaggerJson.ApiMethod;
  definitions?: Record<string, SwaggerJson.Schema>;
};

const DebugContent = lazy(() => import('./DebugContent'));

export const MainContent: React.FC<MainContentProps> = ({ isLoading, method, definitions }) => {
  if (isLoading || !method) {
    return null;
  }
  return (
    <Tabs defaultActiveKey='1'>
      <TabPane
        tab={
          <span>
            <ProfileTwoTone twoToneColor='#52c41a' />
            Document
          </span>
        }
        key='1'>
        <MethodDescription method={method} definitions={definitions} />
      </TabPane>
      <TabPane
        tab={
          <span>
            <BugTwoTone twoToneColor='#eb2f96' />
            Debug
          </span>
        }
        key='2'>
        <Suspense fallback={<div>Loading...</div>}>
          <DebugContent method={method} />
        </Suspense>
      </TabPane>
    </Tabs>
  );
};
