import React, { useEffect, useState } from 'react';
import { Layout, Tabs, Tag, Space } from 'antd';

import SideMenu from './components/SiderMenu';
import MethodDetail from './components/MethodDetail';
import DebugPanel from './components/DebugPanel';
import useSwagger from '@/hooks/swagger';

import { get } from './libs/fetch';

const { Header, Content, Sider } = Layout;
const { TabPane } = Tabs;

const SWAGGER_JSON_PATH =
    window.__SwaggerJsonPath__ && window.__SwaggerJsonPath__ != '%(SwaggerJsonPath)'
        ? window.__SwaggerJsonPath__
        : '/v2/swagger.json';

const App = () => {
    const swagger = useSwagger();

    const [tabContent, setTabContent] = useState({ operationId: '/', method: 'GET' });
    const [method, setMethod] = useState(null);

    //call once;
    useEffect(() => {
        const fetchData = async () => {
            const result = await get(SWAGGER_JSON_PATH);

            const data = result.data;

            swagger.setInfo(data.info);
            swagger.setVersion(data.version);
            swagger.buildService(data);

            document.title = data.info && data.info.title;
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (swagger.service && swagger.service.length > 0) {
            const arrIds = swagger.currentId.split('.');
            const serviceId = parseInt(arrIds[0]);
            const methodId = parseInt(arrIds[1]);
            if (swagger.service[serviceId] && swagger.service[serviceId].methods[methodId]) {
                const item = swagger.service[serviceId].methods[methodId];
                setMethod(item);
                setTabContent({
                    operationId: item.operationId,
                    method: item.method.toUpperCase(),
                });
            }
        }
    }, [swagger.currentId, swagger.service]);
    const bodyHeight = document.body.clientHeight - 90;

    const tab1Content = (
        <div>
            <Tag color={getMethodColor(tabContent.method)}>{tabContent.method}</Tag>
            {tabContent.operationId}
        </div>
    );

    return (
        <Layout>
            <Header className='header'>
                <Space>
                    <span className='appName'>{swagger.info.title}</span>
                    <Tag color='cyan'>{swagger.info.version || '1.0.0'}</Tag>
                </Space>
            </Header>
            <Layout>
                <Sider width={250} className='site-layout-background'>
                    <SideMenu />
                </Sider>
                <Layout style={{ padding: '5px 10px' }}>
                    <Content
                        className='body-background'
                        style={{
                            padding: '10px 25px',
                            margin: 0,
                            minHeight: bodyHeight,
                        }}
                    >
                        <Tabs defaultActiveKey='1'>
                            <TabPane tab={tab1Content} key='1'>
                                <MethodDetail method={method} definitions={swagger.definitions} />
                            </TabPane>
                            <TabPane tab='Debug Panel' key='2'>
                                <DebugPanel method={method} definitions={swagger.definitions} />
                            </TabPane>
                        </Tabs>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

const getMethodColor = method => {
    const lowerCaseName = method.toLowerCase();
    switch (lowerCaseName) {
        case 'get':
            return '#2db7f5';
        case 'post':
            return '#1055e9';
        case 'put':
            return '#108e88';
        case 'patch':
            return '#888ee9';
        case 'delete':
            return '#f50';
        default:
            return '#2db7f5';
    }
};
export default App;
