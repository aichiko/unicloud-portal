'use client';
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Form, 
  Input, 
  Upload, 
  Button, 
  Space, 
  message, 
  Divider,
  Row,
  Col
} from 'antd';
import { UploadOutlined, SaveOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload';

interface SystemConfig {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  logo?: string;
  favicon?: string;
}

export default function SystemConfigPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [logoFileList, setLogoFileList] = useState<UploadFile[]>([]);
  const [faviconFileList, setFaviconFileList] = useState<UploadFile[]>([]);

  // 模拟从服务器加载配置
  useEffect(() => {
    // 这里应该调用API获取当前配置
    const mockConfig: SystemConfig = {
      siteName: '智汇病理云平台',
      siteDescription: '专业的病理诊断云平台',
      contactEmail: 'support@unicloud-med.com',
      contactPhone: '027-59320986',
    };
    form.setFieldsValue(mockConfig);
  }, [form]);

  const handleSave = async (values: SystemConfig) => {
    try {
      setLoading(true);
      
      // 这里应该调用API保存配置
      console.log('保存配置:', values);
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      message.success('配置保存成功！');
    } catch (error) {
      console.error('保存配置失败:', error);
      message.error('保存配置失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    beforeUpload: (file: File) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('只能上传图片文件！');
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('图片大小不能超过 2MB！');
        return false;
      }
      return false; // 阻止自动上传
    },
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Card title="系统配置" className="shadow-sm">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSave}
            autoComplete="off"
          >
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label="网站名称"
                  name="siteName"
                  rules={[{ required: true, message: '请输入网站名称' }]}
                >
                  <Input placeholder="请输入网站名称" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="网站描述"
                  name="siteDescription"
                  rules={[{ required: true, message: '请输入网站描述' }]}
                >
                  <Input placeholder="请输入网站描述" />
                </Form.Item>
              </Col>
            </Row>

            <Divider />

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label="联系邮箱"
                  name="contactEmail"
                  rules={[
                    { required: true, message: '请输入联系邮箱' },
                    { type: 'email', message: '请输入正确的邮箱格式' }
                  ]}
                >
                  <Input placeholder="请输入联系邮箱" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="联系电话"
                  name="contactPhone"
                  rules={[{ required: true, message: '请输入联系电话' }]}
                >
                  <Input placeholder="请输入联系电话" />
                </Form.Item>
              </Col>
            </Row>

            <Divider />

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="网站Logo" name="logo">
                  <Upload
                    {...uploadProps}
                    fileList={logoFileList}
                    onChange={({ fileList }) => setLogoFileList(fileList)}
                    listType="picture"
                    maxCount={1}
                  >
                    <Button icon={<UploadOutlined />}>上传Logo</Button>
                  </Upload>
                </Form.Item>
                <div className="mt-2 text-gray-500 text-sm">
                  建议尺寸：160x32px，支持 PNG、JPG 格式，不超过 2MB
                </div>
              </Col>
              <Col span={12}>
                <Form.Item label="网站图标" name="favicon">
                  <Upload
                    {...uploadProps}
                    fileList={faviconFileList}
                    onChange={({ fileList }) => setFaviconFileList(fileList)}
                    listType="picture"
                    maxCount={1}
                  >
                    <Button icon={<UploadOutlined />}>上传图标</Button>
                  </Upload>
                </Form.Item>
                <div className="mt-2 text-gray-500 text-sm">
                  建议尺寸：32x32px 或 16x16px，支持 ICO、PNG 格式
                </div>
              </Col>
            </Row>

            <Divider />

            <Form.Item>
              <Space>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={loading}
                  icon={<SaveOutlined />}
                >
                  保存配置
                </Button>
                <Button onClick={() => form.resetFields()}>
                  重置
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}
