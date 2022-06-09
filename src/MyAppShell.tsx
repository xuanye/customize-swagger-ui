import React, { useEffect, useMemo } from 'react';
import { AppShell, Header, Text, createStyles, Group, Global } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { NavbarNested } from '@/components/NavbarNested';
import { MainContent } from '@/components/MainContent';
import { ApiApp, X } from 'tabler-icons-react';
import useSwaggerQuery from './hooks/useSwaggerQuery';

const useAppShellStyles = createStyles(theme => ({
  header: {
    backgroundColor: theme.colors.indigo[8],
    color: '#fff',
    boxShadow: '0 0 8px rgb(0 0 0 / 20%)',
  },
  logo: {
    color: theme.colors.green[2],
  },
}));

const MyAppShell = () => {
  const { classes } = useAppShellStyles();
  const { isLoading, error, swaggerJson, currentId, setCurrentId } =
    useSwaggerQuery('/v2/swagger.json');
  useEffect(() => {
    if (error) {
      showNotification({ message: error as string, color: 'red', icon: <X size={18} /> });
    }
  }, [error]);

  const currentMethod = useMemo(() => {
    if (currentId && swaggerJson && swaggerJson.services && swaggerJson.services.length > 0) {
      //console.log('🚀 ~ file: MyAppShell.tsx ~ line 33 ~ currentMethod ~ currentId', currentId);
      var path = currentId.split('.');
      //console.log(swaggerJson.services);
      return swaggerJson.services[parseInt(path[0])].methods[parseInt(path[1])];
    }
    return null;
  }, [currentId]);
  return (
    <AppShell
      padding='xs'
      header={
        <Header height={50} p='xs' className={classes.header}>
          <Group spacing='xs'>
            <ApiApp className={classes.logo}></ApiApp>
            <Text>Application header</Text>
          </Group>
        </Header>
      }
      navbar={
        isLoading ? (
          <div>Loading</div>
        ) : (
          <NavbarNested
            currentId={currentId}
            services={swaggerJson.services}
            onItemClick={item => {
              setCurrentId(item.value);
            }}
          />
        )
      }
      styles={theme => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}>
      <Global
        styles={theme => ({
          '*, *::before, *::after': {
            boxSizing: 'border-box',
          },

          body: {
            ...theme.fn.fontStyles(),
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
            lineHeight: theme.lineHeight,
          },
          table: {
            '>thead>tr': {
              backgroundColor: theme.colors.gray[1],
            },
            'td,th': {
              borderCollapse: 'collapse',
              borderBottom: 'none',
              border: `1px solid ${theme.colors.gray[3]}`,
              '&.title': {
                backgroundColor: theme.colors.gray[1],
              },
            },
            borderSpacing: 0,
            border: `1px solid ${theme.colors.gray[3]}`,
          },
        })}
      />
      <MainContent
        isLoading={isLoading}
        method={currentMethod}
        definitions={swaggerJson?.definitions}
      />
    </AppShell>
  );
};

export default MyAppShell;
