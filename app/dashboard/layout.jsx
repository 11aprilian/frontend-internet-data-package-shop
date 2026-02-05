"use client";

import { Layout, Spin } from "antd";
import { useEffect, useState } from "react";
import { destroyCookie, parseCookies } from "nookies";
import { useRouter } from "next/navigation";

import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import Footer from "@/components/Footer";

const { Content } = Layout;

export default function DashboardLayout({ children }) {
  const router = useRouter();

  const [checked, setChecked] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const cookies = parseCookies();
    const authUser = cookies.auth_user;

    if (!authUser) {
      router.replace("/login");
    } else {
      const parsedUser = JSON.parse(authUser);
      setUser(parsedUser);
      setChecked(true);
    }
  }, [router]);

  const handleLogout = () => {
    destroyCookie(null, "auth_user", { path: "/" });
    router.replace("/login");
  };

  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Layout className="min-h-screen">
      {/* Header */}
      <DashboardHeader
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        user={user}
        onLogout={handleLogout}
      />

      <Layout>
        {/* Sidebar */}
        <DashboardSidebar
          collapsed={collapsed}
          handleLogout={handleLogout}
        />

        {/* Content */}
        <Content className="p-6 bg-gray-50 min-h-screen">
          {children}
        </Content>
      </Layout>

      <Footer />
    </Layout>
  );
}
