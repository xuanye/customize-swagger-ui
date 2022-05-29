import React from 'react';
import { AppShell, Navbar, Header } from '@mantine/core';
import { NavbarNested } from './components/NavbarNested';
const MyAppShell = () => {
  return (
    <AppShell
      padding='md'
      navbar={<NavbarNested />}
      styles={theme => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}>
      {/* Your application here */}
    </AppShell>
  );
};

export default MyAppShell;
