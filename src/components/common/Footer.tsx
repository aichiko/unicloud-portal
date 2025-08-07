'use client';
import { Layout, Row, Col, Space, Typography, Divider } from "antd";
import { PhoneOutlined, EnvironmentOutlined, MailOutlined, GlobalOutlined } from '@ant-design/icons';
import Image from 'next/image';
import OfficialImg from '@/assets/official_scan.jpg';

const { Footer: AntdFooter } = Layout;
const { Title, Text, Link } = Typography;

function Footer() {
  return (
    <AntdFooter className=" text-white p-0">
      {/* 主要内容区域 */}
      <div className="px-4">
        <div className="max-w-7xl mx-auto">
          <Row gutter={[48, 32]}>
            {/* 机构信息 */}
            <Col xs={24} md={6}>
              <div className="mb-6">
                <Title level={3} className="text-white mb-4">
                  武汉优云智能医疗科技
                </Title>
                <Text className="text-blue-100 text-base leading-relaxed">
                  致力于提供专业的病理诊断服务，运用人工智能技术，推动医疗卫生事业发展。
                </Text>
              </div>
            </Col>

            {/* 联系信息 */}
            <Col xs={24} md={6}>
              <Title level={4} className="text-white mb-2">联系我们</Title>
              <Space direction="vertical" size="middle" className="w-full">
                <div className="flex items-center space-x-3">
                  <EnvironmentOutlined className="text-blue-200 text-lg" />
                  <div>
                    <Text className="text-blue-100 block">湖北省武汉市东湖新技术开发区高新大道818号武汉高科医疗器械园</Text>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <PhoneOutlined className="text-blue-200 text-lg" />
                  <Text className="text-blue-100">027-59320986</Text>
                </div>
              </Space>
            </Col>

            {/* 快速链接 */}
            <Col xs={24} md={6}>
              <Title level={4} className="text-white mb-6">快速链接</Title>
              <Space direction="vertical" size="middle">
                <Link href="aboutMe" className="text-blue-100 hover:text-white transition-colors">
                  关于我们
                </Link>
                <Link href="contactUs" className="text-blue-100 hover:text-white transition-colors">
                  联系我们
                </Link>
              </Space>
            </Col>

            {/* 微信公众号 */}
            <Col xs={24} md={6}>
              <Title level={4} className="text-white mb-6">优云智能微信公众号</Title>
              <Space direction="vertical" size="middle">
                <div className="flex items-center space-x-3">
                  <Image src={OfficialImg} alt="微信公众号" className="w-24 h-24" />
                </div>
              </Space>
            </Col>
          </Row>
        </div>
      </div>
      <Divider className="border-blue-300 my-4" />

      <div className="text-center">
        <Space direction="vertical" size="small">
          <Text className="text-blue-200 text-sm">
            © 2025 区域智汇病理云平台. All rights reserved
          </Text>
          <Text className="text-blue-100 text-sm">
            武汉优云智能医疗科技有限公司 版权所有
            <Link
              href="https://beian.miit.gov.cn/"
              target="_blank"
              className="text-blue-200 hover:text-white ml-2"
            >
              鄂ICP备2024068825号-1
            </Link>
          </Text>
        </Space>
      </div>
    </AntdFooter>
  );
}

export default Footer;
