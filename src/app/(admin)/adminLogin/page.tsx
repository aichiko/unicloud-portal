"use client"
import React, { useState, useEffect } from 'react';
import { LoginFormPage, ProFormText } from "@ant-design/pro-components";
import { LockOutlined, UserOutlined, SafetyOutlined } from '@ant-design/icons';
import { Button, App } from 'antd';
import { useRouter } from 'next/navigation';
import AdminAPI from '@/apis/adminApi';
import { useAdminUserStore } from '@/store/adminUserStore';

interface LoginFormData {
  username: string;
  password: string;
  captcha: string;
}

function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [captchaUrl, setCaptchaUrl] = useState('');
  const [captchaUuid, setCaptchaUuid] = useState('');
  
  const { message } = App.useApp();
  const { login } = useAdminUserStore();

  // 生成验证码
  const generateCaptcha = async () => {
    try {
      const captchaData = await AdminAPI.getCaptchaImage();
      setCaptchaUrl(`data:image/gif;base64,${captchaData.img}`);
      setCaptchaUuid(captchaData.uuid);
    } catch (error) {
      console.error('获取验证码失败:', error);
      message.error('获取验证码失败，请重试');
    }
  };

  // 处理登录
  const handleLogin = async (values: LoginFormData) => {
    try {
      setLoading(true);

      // 调用真实的登录API
      const token = await AdminAPI.adminLogin({
        username: values.username,
        password: values.password,
        code: values.captcha,
        uuid: captchaUuid
      });

      // 获取用户信息
      const userInfo = await AdminAPI.getUserInfo(token);

      // 使用store保存登录状态
      login(token, userInfo);

      message.success('登录成功！');
      router.push('/admin');
      
    } catch (error: any) {
      console.error('登录失败:', error);
      
      // 处理不同类型的错误
      if (error.response?.status === 400) {
        message.error('验证码错误或已过期！');
      } else if (error.response?.status === 401) {
        message.error('用户名或密码错误！');
      } else {
        message.error('登录失败，请重试！');
      }
      
      // 重新生成验证码
      generateCaptcha();
    } finally {
      setLoading(false);
    }
  };

  // 组件挂载时生成验证码
  useEffect(() => {
    generateCaptcha();
  }, []);

  return (
    <div className="flex items-stretch justify-center h-screen bg-gray-100">
      <LoginFormPage
        title="门户管理系统"
        subTitle="欢迎登录后台管理系统"
        backgroundImageUrl="/login-background.jpg"
        onFinish={handleLogin}
        loading={loading}
        initialValues={{ username: 'admin', password: 'admin123', captcha: '' }}
        style={{ flex: '1' }}
        submitter={{
          searchConfig: {
            submitText: '登录'
          }
        }}
      >
        <ProFormText
          name="username"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className="prefixIcon" />,
            placeholder: 'admin'
          }}
          placeholder="用户名"
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        />

        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className="prefixIcon" />,
            placeholder: 'admin123'
          }}
          placeholder="密码"
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />

        <div className="flex flex-row justify-center items-start gap-2 space-x-2 mb-2">
          <ProFormText
            name="captcha"
            fieldProps={{
              size: 'large',
              prefix: <SafetyOutlined className="prefixIcon" />,
              placeholder: '验证码'
            }}
            placeholder="验证码"
            rules={[
              {
                required: true,
                message: '请输入验证码!',
              },
            ]}
            className="flex-1"
          />
          <div className="flex-shrink-0">
            {captchaUrl && (
              <img  
                src={captchaUrl}
                alt="验证码"
                className="h-10 w-24 border border-gray-300 rounded cursor-pointer"
                onClick={generateCaptcha}
                title="点击刷新验证码"
              />
            )}
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm mb-4">
          <p>测试账号：admin / admin123</p>
          <p>验证码：1234（点击图片刷新）</p>
        </div>
      </LoginFormPage>
    </div>
  )
}

export default AdminLoginPage;