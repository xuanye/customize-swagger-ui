import React from 'react';
import { Navbar, Group, Code, ScrollArea, createStyles } from '@mantine/core';
import {
  Notes,
  CalendarStats,
  Gauge,
  PresentationAnalytics,
  FileAnalytics,
  Adjustments,
  Lock,
} from 'tabler-icons-react';

import { NavbarMenu } from '../NavbarMenu';

const mockData = [
  { label: 'Dashboard', icon: Gauge },
  {
    label: 'Market news',
    icon: Notes,
    opened: true,
    items: [
      { label: 'Overview', value: '/' },
      { label: 'Forecasts', value: '/' },
      { label: 'Outlook', value: '/' },
      { label: 'Real time', value: '/' },
    ],
  },
  {
    label: 'Releases',
    icon: CalendarStats,
    items: [
      { label: 'Upcoming releases', value: '/' },
      { label: 'Previous releases', value: '/' },
      { label: 'Releases schedule', value: '/' },
    ],
  },
  { label: 'Analytics', icon: PresentationAnalytics },
  { label: 'Contracts', icon: FileAnalytics },
  { label: 'Settings', icon: Adjustments },
  {
    label: 'Security',
    icon: Lock,
    items: [
      { label: 'Enable 2FA', value: '/' },
      { label: 'Change password', value: '/' },
      { label: 'Recovery codes', value: '/' },
    ],
  },
];

const useStyles = createStyles(theme => ({
  navbar: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

export function NavbarNested() {
  const { classes } = useStyles();
  const links = mockData.map(item => (
    <NavbarMenu
      {...item}
      onItemClick={item => {
        console.log(item);
      }}
      key={item.label}
    />
  ));

  return (
    <Navbar width={{ sm: 220 }} className={classes.navbar}>
      <Navbar.Section grow className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>
    </Navbar>
  );
}
