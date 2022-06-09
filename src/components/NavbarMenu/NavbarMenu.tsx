import React, { useState } from 'react';
import { Group, Box, Collapse, Text, UnstyledButton, createStyles } from '@mantine/core';
import { Icon as TablerIcon, ChevronRight, Folder as FolderIcon } from 'tabler-icons-react';

const useStyles = createStyles(theme => ({
  control: {
    fontWeight: 500,
    display: 'block',
    width: '100%',
    padding: `${theme.spacing.xs}px 0`,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  link: {
    overflow: 'hidden',
    fontWeight: 500,
    display: 'block',
    textDecoration: 'none',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    paddingLeft: 15,
    marginLeft: 20,
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    borderLeft: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  chevron: {
    transition: 'transform 200ms ease',
  },
}));

export interface NavbarMenuProps {
  label: string;
  opened?: boolean;
  onItemClick: (item: NavbarMenuItemProps) => void;
  items?: NavbarMenuItemProps[];
}

export interface NavbarMenuItemProps {
  label: string;
  value: string;
}

export const NavbarMenu = ({
  label,
  onItemClick,
  opened: initiallyOpened,
  items,
}: NavbarMenuProps) => {
  const { classes, theme } = useStyles();
  const hasChild = Array.isArray(items);
  const [opened, setOpened] = useState(initiallyOpened || false);

  const childNodes = (hasChild ? items : []).map(item => {
    return (
      <Text<'a'>
        component='a'
        className={classes.link}
        key={item.label}
        onClick={event => {
          onItemClick(item);
          event.preventDefault();
        }}>
        {item.label}
      </Text>
    );
  });

  return (
    <>
      <UnstyledButton onClick={() => setOpened(o => !o)} className={classes.control}>
        <Box sx={{ display: 'flex', alignItems: 'left' }}>
          <Box ml='xs'>
            <ChevronRight
              className={classes.chevron}
              size={14}
              style={{
                transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
              }}
            />
          </Box>

          <FolderIcon strokeWidth={2} size={18} />

          <Box ml='xs'>{label}</Box>
        </Box>
      </UnstyledButton>
      {hasChild ? <Collapse in={opened}>{childNodes}</Collapse> : null}
    </>
  );
};
