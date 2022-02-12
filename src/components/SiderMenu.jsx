import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import useSwagger from '@/hooks/swagger';

const { SubMenu } = Menu;

const SideMenu = () => {
    const swagger = useSwagger(model => [model.service, model.currentId, model.setCurrentId]);

    const [openKeys, setOpenKeys] = useState(['']);
    const [rootMenuKeys, setRootMenuKeys] = useState(['']);

    const onOpenChange = keys => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (rootMenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    useEffect(() => {
        const keys = swagger.service.map(tag => {
            return tag.name;
        });
        setRootMenuKeys(keys);
    }, [swagger.service]);

    const tags = swagger.service.map(tag => {
        return (
            <SubMenu key={tag.name} icon={<AppstoreOutlined />} title={tag.name}>
                {tag.methods.map(method => {
                    return <Menu.Item key={method.id}>{method.operationId}</Menu.Item>;
                })}
            </SubMenu>
        );
    });

    const onItemClick = ({ key }) => {
        if (key != swagger.currentId) swagger.setCurrentId(key);
    };
    return (
        <Menu
            mode='inline'
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            onClick={onItemClick}
            style={{ height: '100%', borderRight: 0 }}>
            {tags}
        </Menu>
    );
};

export default SideMenu;
