"use client";

import { Layout, Menu } from "antd";
import {
  AppstoreOutlined,
  ShoppingCartOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { Sider } = Layout;

export default function DashboardSidebar({ collapsed, handleLogout }) {
  const pathname = usePathname();

  return (
    <Sider
      width={220}
      collapsible
      collapsed={collapsed}
      trigger={null}
      className="!bg-white"
      style={{ minHeight: "calc(100vh - 64px)" }}
      breakpoint="md"
    >
      <Menu
        mode="inline"
        selectedKeys={[pathname]}
        className="border-r-0"
        items={[
          {
            key: "/dashboard",
            icon: <AppstoreOutlined className="!text-amber-600" />,
            label: (
              <Link className="!text-amber-600" href="/dashboard">
                Home
              </Link>
            ),
          },
          {
            key: "/dashboard/customer",
            icon: <ShoppingCartOutlined className="!text-amber-600" />,
            label: (
              <Link className="!text-amber-600" href="/dashboard/customer">
                Paket Data
              </Link>
            ),
          },
          {
            key: "/dashboard/transactions",
            icon: <HistoryOutlined className="!text-amber-600" />,
            label: (
              <Link className="!text-amber-600" href="/dashboard/transactions">
                Transaksi
              </Link>
            ),
          }
        ]}
      />
    </Sider>
  );
}
