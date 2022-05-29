import { MantineProvider } from '@mantine/core';
import MyAppShell from './MyAppShell';

export default function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        // Override any other properties from default theme
        fontFamily: 'Open Sans, sans serif',
        //spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
      }}>
      <MyAppShell />
    </MantineProvider>
  );
}
