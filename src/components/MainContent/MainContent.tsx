import React, { lazy, Suspense } from 'react';
import { Tabs } from '@mantine/core';
import { Rocket, Notes } from 'tabler-icons-react';
import { MethodDescription } from './MethodDescription';

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
    <Tabs>
      <Tabs.Tab label='Debug' color='pink' icon={<Rocket size={16} />}>
        <Suspense fallback={<div>Loading...</div>}>
          <DebugContent method={method} />
        </Suspense>
      </Tabs.Tab>
      <Tabs.Tab label='Document' icon={<Notes size={16} />}>
        <MethodDescription method={method} definitions={definitions} />
      </Tabs.Tab>
    </Tabs>
  );
};
