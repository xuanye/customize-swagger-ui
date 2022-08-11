import React, { useEffect, useMemo } from 'react';
import { Layout, Tag, Space, Typography, message } from 'antd';

import { MainContent } from '@/components/MainContent';

import useSwaggerQuery from './hooks/useSwaggerQuery';
import { NavbarNested } from './components/NavbarNested';
import { ApiOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

const myWindow = window as any;
const SWAGGER_JSON_PATH =
  myWindow.__SwaggerJsonPath__ && myWindow.__SwaggerJsonPath__ != '%(SwaggerJsonPath)'
    ? myWindow.__SwaggerJsonPath__
    : '/v2/swagger.json';

const MyAppShell = () => {
  const { isLoading, error, swaggerJson, currentId, setCurrentId } =
    useSwaggerQuery(SWAGGER_JSON_PATH);
  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (swaggerJson?.info?.title) {
      document.title = swaggerJson?.info?.title;
    }
  }, [swaggerJson]);
  const bodyHeight = document.body.clientHeight - 90;
  const currentMethod = useMemo(() => {
    if (currentId && swaggerJson && swaggerJson.services && swaggerJson.services.length > 0) {
      var path = currentId.split('.');
      return swaggerJson.services[parseInt(path[0])].methods[parseInt(path[1])];
    }
    return undefined;
  }, [currentId]);
  return (
    <Layout>
      <Header className='header'>
        <Space align='baseline'>
          <ApiOutlined style={{ fontSize: 18, color: '#e6fffb' }} />
          <Typography.Title level={4}>
            {swaggerJson.info.title || 'Swagger API DOC'}
          </Typography.Title>
          <Tag color='cyan'>{swaggerJson.info.version || '1.0.0'}</Tag>
        </Space>
      </Header>
      <Layout>
        <Sider width={250} className='site-layout-background'>
          <NavbarNested
            services={swaggerJson.services}
            onItemClick={({ key }) => {
              setCurrentId(key);
            }}
          />
        </Sider>
        <Layout style={{ padding: '5px 10px' }}>
          <Content
            className='body-background'
            style={{
              padding: '10px 25px',
              margin: 0,
              minHeight: bodyHeight,
            }}>
            <MainContent
              isLoading={isLoading}
              method={currentMethod}
              definitions={swaggerJson.definitions}
            />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MyAppShell;
