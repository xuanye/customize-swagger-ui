import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';

import { FolderOutlined } from '@ant-design/icons';

interface NavbarNestedProps {
  services: SwaggerJson.ApiService[];
  onItemClick: (item: any) => void;
}

export const NavbarNested: React.FC<NavbarNestedProps> = ({ services, onItemClick }) => {
  const [openKeys, setOpenKeys] = useState(['']);
  const [rootMenuKeys, setRootMenuKeys] = useState(['']);

  const onOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1) || '';
    if (rootMenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  useEffect(() => {
    const keys = services.map(tag => {
      return tag.name;
    });
    setRootMenuKeys(keys);
  }, [services]);

  const items = services.map(tag => {
    return {
      label: tag.name,
      key: tag.name,
      icon: <FolderOutlined />,
      children: tag.methods.map(method => {
        return {
          label: method.operationId || method.path,
          key: method.id,
        };
      }),
    };
  });

  return (
    <Menu
      mode='inline'
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      onClick={onItemClick}
      //style={{ height: '100%', borderRight: 0 }}
      items={items}></Menu>
  );
};
