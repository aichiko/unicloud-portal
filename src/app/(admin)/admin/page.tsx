'use client';
import React, { useEffect } from 'react';
import { Card, Row, Col, Tag, Typography, Divider, Avatar, Space, Statistic } from 'antd';
import { UserOutlined, SettingOutlined, SecurityScanOutlined, TeamOutlined } from '@ant-design/icons';
import { useAdminUserStore, hasPermission, hasRole, isSuperAdmin } from '@/store/adminUserStore';

const { Title, Paragraph, Text } = Typography;

function Home() {
  const { adminUserInfo, permissions, roles, setBreadcrumbs } = useAdminUserStore();

  useEffect(() => {
    // 设置面包屑导航
    setBreadcrumbs([{ title: '首页' }]);
  }, [setBreadcrumbs]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* 用户信息卡片 */}
        <Card className="mb-6 shadow-sm" style={{ marginBottom: '24px' }}>
          <Row gutter={24} align="middle">
            <Col span={6}>
              <Space direction="vertical" align="center" style={{ width: '100%' }}>
                {adminUserInfo?.user?.avatar ? (
                  <Avatar size={80} src={adminUserInfo.user.avatar} />
                ) : (
                  <Avatar size={80} icon={<UserOutlined />} />
                )}
                <div style={{ textAlign: 'center' }}>
                  <Title level={4} style={{ margin: 0 }}>
                    {adminUserInfo?.user?.nickName || '管理员'}
                  </Title>
                  <Text type="secondary">
                    {adminUserInfo?.user?.dept?.deptName || '系统管理员'}
                  </Text>
                </div>
              </Space>
            </Col>
            
            <Col span={18}>
              <Row gutter={24}>
                <Col span={8}>
                  <Statistic
                    title="用户名"
                    value={adminUserInfo?.user?.userName || 'admin'}
                    prefix={<UserOutlined />}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="权限角色"
                    value={isSuperAdmin() ? '超级管理员' : roles.join(', ')}
                    prefix={<SecurityScanOutlined />}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="所属部门"
                    value={adminUserInfo?.user?.dept?.deptName || '系统管理'}
                    prefix={<TeamOutlined />}
                  />
                </Col>
              </Row>
              
              <Divider />
              
              <div>
                <Text strong>权限列表：</Text>
                <div className="mt-2">
                  {permissions.length > 0 ? (
                    permissions.slice(0, 8).map((permission, index) => (
                      <Tag key={index} color="blue" className="mb-1">
                        {permission === '*:*:*' ? '超级权限' : permission}
                      </Tag>
                    ))
                  ) : (
                    <Text type="secondary">暂无权限信息</Text>
                  )}
                  {permissions.length > 8 && (
                    <Tag color="default">+{permissions.length - 8} 更多...</Tag>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Card>

        {/* 系统介绍卡片 */}
        <Card className="mb-6 shadow-sm" style={{ marginBottom: '24px' }}>
          <Row gutter={24}>
            <Col span={16}>
              <Title level={2} className="text-blue-600 mb-4">
                区域智慧病理云平台 - 管理后台
              </Title>
              <Paragraph className="text-gray-700 text-base leading-relaxed">
                区域智慧病理云平台管理后台是一个基于云计算技术的现代化医疗信息系统管理界面，致力于为病理行业提供高效、
                准确的系统管理和配置功能。平台整合了用户管理、权限控制、系统配置和监控功能，
                实现了病理科系统的集中化管理和运维支撑。
              </Paragraph>
              
              <div className="mt-4">
                <Text strong>当前版本：</Text>
                <Tag color="green" className="ml-2">v1.0.0</Tag>
              </div>
              
              <div className="mt-4 flex space-x-4">
                {isSuperAdmin() && <Tag color="red">超级管理员</Tag>}
                {hasRole('admin') && <Tag color="blue">系统管理员</Tag>}
                {hasPermission('system:config:*') && <Tag color="orange">系统配置</Tag>}
                {hasPermission('*:*:*') && <Tag color="purple">全部权限</Tag>}
              </div>
            </Col>
            
            <Col span={8}>
              <Title level={4} className="text-gray-800 mb-3">管理功能</Title>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <Text>用户管理</Text>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <Text>权限控制</Text>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <Text>系统配置</Text>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <Text>AI辅助诊断</Text>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <Text>统计分析</Text>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <Text>质量控制</Text>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <Text>实时预制</Text>
                </div>
              </div>
              
              <Divider />
              
              <Title level={4} className="text-gray-800 mb-3">特色功能</Title>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  <Text>数字切片</Text>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  <Text>远程操作</Text>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  <Text>进程监控</Text>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  <Text>科研平台</Text>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  <Text>多科会诊</Text>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  <Text>知识库</Text>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  <Text>专家资源</Text>
                </div>
              </div>
            </Col>
          </Row>
        </Card>

        {/* 版权信息 */}
        <Card className="text-center shadow-sm">
          <Text type="secondary">
            Copyright © 优云智能 All Rights Reserved
          </Text>
        </Card>
      </div>
    </div>
  );
}

export default Home;
