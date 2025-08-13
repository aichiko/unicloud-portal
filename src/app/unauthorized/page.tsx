'use client';
import React from 'react';
import { Button, Result, Typography } from 'antd';
import { MailOutlined, PhoneOutlined, HomeOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
const { Text } = Typography;

function HeaderContact({ title, contact }: { title: 'email' | 'phone'; contact: string }) {
  const isEmail = title === 'email';
  const icon = isEmail ? <MailOutlined style={{ fontSize: 24 }} /> : <PhoneOutlined style={{ fontSize: 24 }} />;
  const displayTitle = isEmail ? '邮件地址' : '热线电话';

  return (
    <div className="flex items-center space-x-3">
      {/* 图标 */}
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl"
        style={{ backgroundColor: '#2769AF' }}
      >
        {icon}
      </div>

      {/* 文字信息 */}
      <div className="flex flex-col items-start">
        <Text className="text-sm font-medium text-gray-600 mb-1">
          {displayTitle}
        </Text>
        <Text className="text-base font-semibold text-gray-800">
          {contact}
        </Text>
      </div>
    </div>
  );
}

export default function UnauthorizedPage() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <Result
          status="403"
          title="暂无访问权限"
          subTitle="很抱歉，您暂时没有访问该系统的权限，请联系管理员开通相关权限。"
          extra={
            <div className="space-y-6">
              {/* 联系信息 */}
              <div className="bg-white rounded-lg p-6 shadow-sm border">

                <div className="space-y-4">
                  {/* 邮件联系 */}
                  <HeaderContact title="email" contact="support@unicloud-med.com" />
                  {/* 电话联系 */}
                  <HeaderContact title="phone" contact="027-59320986" />
                </div>

                <div className="m-4 p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm text-[#2B6CB0] text-center">
                    💡 请联系管理员说明您需要访问的系统模块，我们会尽快为您开通相关权限
                  </span>
                </div>
              </div>

              {/* 返回按钮 */}
              <div className="text-center">
                <Button
                  type="primary"
                  icon={<HomeOutlined />}
                  size="large"
                  onClick={handleGoHome}
                  className="px-8"
                >
                  返回首页
                </Button>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}
