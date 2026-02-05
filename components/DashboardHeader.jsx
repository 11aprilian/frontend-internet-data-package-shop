"use client";

import { Layout, Button, Avatar, Dropdown } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { Header } = Layout;

export default function DashboardHeader({ collapsed, setCollapsed, user, onLogout }) {
  const items = [
    {
      key: "profile",
      label: <span className="cursor-default">👋 Halo, {user?.name || "User"}</span>,
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: <span className="">Logout</span>,
      onClick: onLogout,
    },
  ];

  return (
    <Header
      className="!bg-white flex items-center justify-between shadow-sm"
      style={{ paddingLeft: 24, paddingRight: 16 }}
    >
      {/* Left */}
      <div className="flex items-center gap-2">
        <Button
          type="text"
          className="!text-amber-600 hover:!text-amber-500"
          onClick={() => setCollapsed(!collapsed)}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        />
        <span className="font-semibold text-amber-600 text-lg">Quotaku.</span>
      </div>

      {/* Right */}
      <Dropdown menu={{ items }} placement="bottomRight" trigger={["click"]}>
        <div className="flex items-center gap-2 cursor-pointer select-none">
          <span className="text-sm text-amber-600">
            Halo, <b>{user?.name || "User"}</b>
          </span>
          <Avatar
            className="!text-amber-600 hover:!text-amber-500 !bg-white"
            icon={<UserOutlined />}
          />
        </div>
      </Dropdown>
    </Header>
  );
}
