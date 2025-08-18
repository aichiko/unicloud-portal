"use client";
import React, { useEffect, useState } from "react";
import { HomeOutlined, SettingOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { MenuDataItem, ProLayout } from "@ant-design/pro-components";
import { Button, Modal, Dropdown, Avatar, Space, Typography, message } from "antd";
import type { MenuProps } from 'antd';
import Image from "next/image";
import LogoImg from "@/assets/logo2_1.png";
import { usePathname, useRouter } from "next/navigation";
import AdminAPI from '@/apis/adminApi';
import { useAdminUserStore } from '@/store/adminUserStore';

const { Text } = Typography;

const menuDataItems: MenuDataItem[] = [
  {
    path: '/admin',
    name: '首页',
    icon: <HomeOutlined />,
  },
  {
    path: '/admin/config',
    name: '系统配置',
    icon: <SettingOutlined />,
  },
]

function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [loading, setLoading] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();
  const { 
    isLoggedIn, 
    adminUserInfo, 
    logout, 
    setAdminUserInfo,
    setCurrentMenuItem,
    setBreadcrumbs 
  } = useAdminUserStore();

  // 获取用户信息
  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      if (isLoggedIn) {
        const userInfoData = await AdminAPI.getUserInfo();
        setAdminUserInfo(userInfoData);
      }
    } catch (error) {
      console.error('获取用户信息失败:', error);
      message.error('获取用户信息失败');
      // 如果获取用户信息失败，可能token已过期，执行登出
      handleLogout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 如果已登录但没有用户信息，获取用户信息
    if (isLoggedIn && !adminUserInfo) {
      fetchUserInfo();
    }
    
    // 如果未登录，跳转到登录页
    if (!isLoggedIn) {
      router.push("/adminLogin");
    }
  }, [isLoggedIn, adminUserInfo, router]);

  // 处理菜单点击
  const handleMenuClick = (path?: string) => {
    if (path) {
      setCurrentMenuItem(path);
      router.push(path);
    }
  };

  // 处理退出登录
  const handleLogout = () => {
    Modal.confirm({
      title: '确认退出',
      content: '您确定要退出登录吗？',
      onOk: () => {
        logout();
        router.push('/adminLogin');
      }
    });
  };

  // 用户下拉菜单
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'admin-userInfo',
      label: (
        <div style={{ padding: '8px 0' }}>
          <Space direction="vertical" size={4}>
            <Text strong>{adminUserInfo?.user?.nickName || '管理员'}</Text>
          </Space>
        </div>
      ),
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout,
    },
  ];

  return (
    <ProLayout
      title={false}
      logo={<Image src={LogoImg} alt="Logo" height={32} width={160} />}
      token={{
        header: {
          heightLayoutHeader: 64
        }
      }}
      location={{ pathname }}
      layout='top'
      menu={{
        defaultOpenAll: true,
        request: async () => menuDataItems,
      }}
      menuItemRender={(item, dom) => (
        <div onClick={() => handleMenuClick(item.path)}>
          {dom}
        </div>
      )}
      avatarProps={{
        src: adminUserInfo?.user?.avatar || undefined,
        size: 'small',
        title: adminUserInfo?.user?.nickName || '管理员',
        render: (_props, dom) => {
          return (
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
            >
              <Space style={{ cursor: 'pointer', padding: '0 8px' }}>
                {adminUserInfo?.user?.avatar ? (
                  <Avatar src={adminUserInfo.user.avatar} size="small" />
                ) : (
                  <Avatar icon={<UserOutlined />} size="small" />
                )}
                <Text style={{ color: 'rgba(0, 0, 0, 0.85)' }}>
                  {adminUserInfo?.user?.nickName || '管理员'}
                </Text>
              </Space>
            </Dropdown>
          );
        },
      }}
    >
      {children}
    </ProLayout>
  );
}

export default AdminLayout;
