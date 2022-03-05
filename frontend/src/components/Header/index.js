import React from "react";

import { Layout, Avatar, Menu, Dropdown } from "antd";
import storeLocal from "../../utils/storeLocal";
import { UserOutlined } from "@ant-design/icons";
import history from "../../utils/history";
const { Header } = Layout;

export default function HeaderContent() {
  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          storeLocal.clear();
          history.push("/login");
        }}
      >
        logout
      </Menu.Item>
    </Menu>
  );
  return (
    <Header
      className="site-layout-background"
      style={{ padding: 0, background: "none" }}
    >
      <Dropdown overlay={menu} placement="bottomRight" arrow>
        <Avatar icon={<UserOutlined />} />
      </Dropdown>
    </Header>
  );
}
