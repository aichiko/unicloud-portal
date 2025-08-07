'use client';
import React from 'react';
import { Row, Col, Card } from 'antd';
import { 
  DesktopOutlined, 
  ExperimentOutlined, 
  FileTextOutlined, 
  BookOutlined 
} from '@ant-design/icons';

const ServiceModules: React.FC = () => {
  const modules = [
    {
      id: 1,
      title: "远程会诊",
      icon: <DesktopOutlined className="text-4xl text-white" />,
      description: "远程会诊",
      bgColor: "bg-blue-500",
      hoverColor: "hover:bg-blue-600"
    },
    {
      id: 2,
      title: "AI辅助诊断",
      icon: <ExperimentOutlined className="text-4xl text-white" />,
      description: "AI辅助诊断",
      bgColor: "bg-purple-500",
      hoverColor: "hover:bg-purple-600"
    },
    {
      id: 3,
      title: "案例分享",
      icon: <FileTextOutlined className="text-4xl text-white" />,
      description: "案例分享",
      bgColor: "bg-teal-500",
      hoverColor: "hover:bg-teal-600"
    },
    {
      id: 4,
      title: "培训考核",
      icon: <BookOutlined className="text-4xl text-white" />,
      description: "培训考核",
      bgColor: "bg-orange-500",
      hoverColor: "hover:bg-orange-600"
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">核心服务</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            提供全方位的数字病理服务，助力医疗诊断现代化
          </p>
        </div>
        
        <Row gutter={[24, 24]} justify="center">
          {modules.map((module) => (
            <Col xs={24} sm={12} lg={6} key={module.id}>
              <Card
                className={`${module.bgColor} ${module.hoverColor} border-0 shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer h-48`}
                styles={{
                  body:{ padding: '32px 24px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }
                }}
              >
                <div className="text-center">
                  <div className="mb-4">
                    {module.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {module.title}
                  </h3>
                  <p className="text-white/90 text-sm">
                    {module.description}
                  </p>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default ServiceModules;
