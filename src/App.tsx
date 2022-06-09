import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useEffect } from 'react';
import MyAppShell from './MyAppShell';

export default function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        // Override any other properties from default theme
        fontFamily:
          '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif;',
        //spacing: { xs: 5, sm: 10, md: 15, lg: 20, xl: 30 },
      }}>
      <NotificationsProvider>
        <MyAppShell />
      </NotificationsProvider>
    </MantineProvider>
  );
}
