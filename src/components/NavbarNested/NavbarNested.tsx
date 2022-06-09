/// <reference types="../../hooks/swagger" />

import React from 'react';
import { Navbar, createStyles } from '@mantine/core';
import { NavbarMenu, NavbarMenuProps } from '../NavbarMenu';

const useStyles = createStyles(theme => ({
  navbar: {
    backgroundColor: theme.colors.gray[1],
    borderRight: `1px solid ${theme.colors.gray[3]}`,
    paddingBottom: 0,
    height: 'auto',
    minHeight:
      'calc(100vh - var(--mantine-header-height, 0px) - var(--mantine-footer-height, 0px))',
  },

  links: {
    padding: 0,
    //marginLeft: -theme.spacing.md,
    //marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

interface NavbarNestedProps {
  services: SwaggerJson.ApiService[];
  currentId: string;
  onItemClick: (item: any) => void;
}
export function NavbarNested({ services, currentId, onItemClick }: NavbarNestedProps) {
  const { classes } = useStyles();

  const links = services.map(service => {
    const item: NavbarMenuProps = {
      label: service.name,
      items: service.methods.map(m => {
        return {
          label: m.operationId || m.path,
          value: m.id,
        };
      }),
      onItemClick: onItemClick || function (item: any) {},
    };
    return <NavbarMenu {...item} key={item.label} />;
  });

  return (
    <Navbar width={{ base: 250 }} className={classes.navbar}>
      <Navbar.Section grow className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>
    </Navbar>
  );
}
