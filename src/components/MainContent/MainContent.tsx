import React, { useEffect, useMemo, useState } from 'react';
import { Tabs, createStyles } from '@mantine/core';
import { Rocket, Notes } from 'tabler-icons-react';
import { MethodDescription } from './MethodDescription';

type MainContentProps = {
  isLoading: boolean;
  isError?: boolean;
  method: SwaggerJson.ApiMethod | null;
  definitions: Record<string, SwaggerJson.Schema> | null;
};

export const MainContent: React.FC<MainContentProps> = ({ isLoading, method, definitions }) => {
  useEffect(() => {
    console.log('===MainContent===');
  }, [method]);

  if (isLoading || !method) {
    return null;
  }
  return (
    <Tabs>
      <Tabs.Tab label='Document' icon={<Notes size={16} />}>
        <MethodDescription method={method} definitions={definitions} />
      </Tabs.Tab>
      <Tabs.Tab label='Debug' color='pink' icon={<Rocket size={16} />}>
        Messages tab content
      </Tabs.Tab>
    </Tabs>
  );
};
