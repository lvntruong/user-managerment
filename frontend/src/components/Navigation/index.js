import React, { useState } from "react";

import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { CustomerServiceOutlined, DashboardOutlined } from "@ant-design/icons";

const { Sider } = Layout;

function Navigation() {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={{
          zIndex: 1000,
        }}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/" />
            Company
          </Menu.Item>
          <Menu.Item key="2" icon={<CustomerServiceOutlined />}>
            <Link to="/person">Person</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
}
export default Navigation;
