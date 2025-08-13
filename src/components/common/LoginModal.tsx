import React, { use } from 'react';
import { Modal, Input, Button, Form, App } from 'antd';
import { UserOutlined, LockOutlined, CloseOutlined } from '@ant-design/icons';
import PortalAPI from '@/apis/portalApi';
import logger from '@/utils/logger';
import { setUserAuth } from '@/utils/utils';
import { useUserStore } from '@/store/userStore';

interface LoginModalProps {
  open: boolean;
  onCancel: () => void;
  onSuccess?: (values: { username: string; password: string }) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const { login } = useUserStore();

  const handleLogin = async (values: { username: string; password: string }) => {
    try {
      console.log('登录信息:', values);

      // 调用登录API
      const userInfoData = await PortalAPI.portalLogin(values.username, values.password);
      logger.main.info('登录结果:', userInfoData);

      // 获取用户信息
      const userInfoArr = userInfoData.appUserInfoList;

      logger.main.info('用户信息:', userInfoArr);
      const token = userInfoData.token;

      // 使用zustand保存登录状态和用户信息
      login(token, {
        username: values.username,
      }, userInfoArr);

      message.success('登录成功！');

      // 关闭Modal
      onCancel();

      // 调用成功回调
      if (onSuccess) {
        onSuccess(values);
      }

      return true;
    } catch (error: any) {
      console.error('登录失败:', error);
      // 显示错误信息
      message.error(error.message || '登录失败，请检查您的用户名和密码，并重试。');
      return false;
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={480}
      closeIcon={false}
      destroyOnHidden
      styles={{
        body: { padding: 0 },
        content: { borderRadius: '12px', overflow: 'hidden' }
      }}
    >
      <div className="relative bg-white">
        {/* 关闭按钮 */}
        <button
          onClick={onCancel}
          className="absolute top-2 right-2 z-10 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
        >
          <CloseOutlined style={{ fontSize: 24 }} />
        </button>

        {/* 登录表单区域 */}
        <div className="px-12 py-10">
          {/* 标题 */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-medium text-gray-800 tracking-wide">登 录</h1>
          </div>

          {/* 登录表单 */}
          <Form
            form={form}
            onFinish={handleLogin}
            layout="vertical"
            size="large"
            className="space-y-4"
          >
            {/* 账号输入框 */}
            <Form.Item
              name="username"
              rules={[
                { required: true, message: '请输入用户名' },
                { message: '请输入用户名' }
              ]}
              className="mb-6"
            >
              <Input
                placeholder="用户名"
                prefix={<UserOutlined className="text-gray-400" />}
                className="h-12 rounded-lg border-gray-200 text-base"
                style={{
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #e9ecef'
                }}
              />
            </Form.Item>

            {/* 密码输入框 */}
            <Form.Item
              name="password"
              rules={[
                { required: true, message: '请输入密码' },
                { min: 6, message: '密码至少6位' }
              ]}
              className="mb-8"
            >
              <Input.Password
                placeholder="密码"
                prefix={<LockOutlined className="text-gray-400" />}
                className="h-12 rounded-lg border-gray-200 text-base"
                style={{
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #e9ecef'
                }}
              />
            </Form.Item>

            {/* 登录按钮 */}
            <Form.Item className="mb-6 mt-12">
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                className="h-12 rounded-lg text-base font-medium"
                style={{
                  marginTop: 24,
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
                }}
              >
                登 录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
