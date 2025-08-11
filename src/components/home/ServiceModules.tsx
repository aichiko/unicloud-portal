'use client';
import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { 
  DesktopOutlined, 
  ExperimentOutlined, 
  ClusterOutlined,
  PlayCircleOutlined,
  AuditOutlined
} from '@ant-design/icons';

interface ServiceModule {
  id: number;
  title: string;
  icon: React.ReactNode;
  bgColor: string;
  hoverBgColor: string;
}

const ServiceModules: React.FC = () => {
  const [hoveredModule, setHoveredModule] = useState<number | null>(null);

  // 根据设计稿定义5个服务模块
  const modules: ServiceModule[] = [
    {
      id: 1,
      title: "病理远程会诊",
      icon: <DesktopOutlined style={{ fontSize: '2.5rem', color: '#ffffff' }} />,
      bgColor: "#1e40af", // 蓝色
      hoverBgColor: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)"
    },
    {
      id: 2,
      title: "智能辅助诊断",
      icon: <ExperimentOutlined style={{ fontSize: '2.5rem', color: '#ffffff' }} />,
      bgColor: "#0891b2", // 青色
      hoverBgColor: "linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)"
    },
    {
      id: 3,
      title: "区域标本送检",
      icon: <ClusterOutlined style={{ fontSize: '2.5rem', color: '#ffffff' }} />,
      bgColor: "#1e40af", // 深蓝色
      hoverBgColor: "linear-gradient(135deg, #1e40af 0%, #3730a3 100%)"
    },
    {
      id: 4,
      title: "病理直播间",
      icon: <PlayCircleOutlined style={{ fontSize: '2.5rem', color: '#ffffff' }} />,
      bgColor: "#0891b2", // 青色
      hoverBgColor: "linear-gradient(135deg, #0891b2 0%, #0e7490 100%)"
    },
    {
      id: 5,
      title: "病理质检考核",
      icon: <AuditOutlined style={{ fontSize: '2.5rem', color: '#ffffff' }} />,
      bgColor: "#1e40af", // 蓝色
      hoverBgColor: "linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%)"
    }
  ];

  const handleModuleClick = (module: ServiceModule) => {
    console.log(`Clicked on ${module.title}`);
    // 这里可以添加路由跳转逻辑
  };

  return (
    <div className="py-0 bg-white">
      <div className="w-full">
        <Row gutter={0}>
          {modules.map((module) => (
            <Col xs={24} sm={12} md={4} lg={4} xl={4} key={module.id} style={{ width: '20%' }}>
              <div 
                className="relative group cursor-pointer h-32 flex items-center justify-center transition-all duration-500 ease-in-out"
                style={{
                  backgroundColor: module.bgColor,
                  background: hoveredModule === module.id ? module.hoverBgColor : module.bgColor,
                  borderRight: '1px solid rgba(255,255,255,0.2)'
                }}
                onMouseEnter={() => setHoveredModule(module.id)}
                onMouseLeave={() => setHoveredModule(null)}
                onClick={() => handleModuleClick(module)}
              >
                <div className="text-center relative z-10">
                  <div className="mb-3 transform transition-transform duration-300 group-hover:scale-110">
                    {module.icon}
                  </div>
                  <h3 className="text-lg font-semibold" style={{ color: '#ffffff' }}>
                    {module.title}
                  </h3>
                </div>
                
                {/* 智能辅助诊断的下拉箭头 */}
                {module.id === 2 && (
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white opacity-80"></div>
                  </div>
                )}
                
                {/* 悬停时的光效 */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%)`
                  }}
                />
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default ServiceModules;
