'use client';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'antd';
import { 
  DesktopOutlined, 
  ExperimentOutlined, 
  FileTextOutlined, 
  BookOutlined,
  RightOutlined
} from '@ant-design/icons';
import PortalAPI from '@/apis/portalApi';

interface ServiceModule {
  id: number;
  title: string;
  icon: React.ReactNode;
  description: string;
  bgColor: string;
  hoverColor: string;
  linkUrl?: string;
  children?: ServiceModule[];
}

const ServiceModules: React.FC = () => {
  const [modules, setModules] = useState<ServiceModule[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredModule, setHoveredModule] = useState<number | null>(null);

  // 图标映射
  const iconMap: { [key: string]: React.ReactNode } = {
    '远程会诊': <DesktopOutlined style={{ fontSize: '2.5rem', color: '#ffffff' }} />,
    'AI辅助诊断': <ExperimentOutlined style={{ fontSize: '2.5rem', color: '#ffffff' }} />,
    '案例分享': <FileTextOutlined style={{ fontSize: '2.5rem', color: '#ffffff' }} />,
    '培训考核': <BookOutlined style={{ fontSize: '2.5rem', color: '#ffffff' }} />,
    '默认': <DesktopOutlined style={{ fontSize: '2.5rem', color: '#ffffff' }} />
  };

  // 颜色主题配置
  const colorThemes = [
    { bgColor: "#3b82f6", hoverColor: "#2563eb" }, // 蓝色
    { bgColor: "#8b5cf6", hoverColor: "#7c3aed" }, // 紫色
    { bgColor: "#14b8a6", hoverColor: "#0d9488" }, // 青色
    { bgColor: "#f97316", hoverColor: "#ea580c" }, // 橙色
    { bgColor: "#ef4444", hoverColor: "#dc2626" }, // 红色
    { bgColor: "#10b981", hoverColor: "#059669" }  // 绿色
  ];

  // 构建服务模块树结构
  const buildServiceTree = (titleList: PortalTitleModel[]): ServiceModule[] => {
    const modules: ServiceModule[] = [];

    // 获取顶级服务项（parentId为"0"）
    const topLevelItems = titleList.filter(item => item.parentId === "0");
    topLevelItems.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

    topLevelItems.forEach((topItem, index) => {
      // 查找子服务项
      const children = titleList
        .filter(item => item.parentId === topItem.id.toString())
        .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
        .map(child => ({
          id: child.id,
          title: child.title,
          description: child.description || child.title,
          icon: iconMap[child.title] || iconMap['默认'],
          bgColor: colorThemes[index % colorThemes.length].bgColor,
          hoverColor: colorThemes[index % colorThemes.length].hoverColor,
          linkUrl: child.linkUrl
        }));

      const colorTheme = colorThemes[index % colorThemes.length];
      const module: ServiceModule = {
        id: topItem.id,
        title: topItem.title,
        description: topItem.description || topItem.title,
        icon: iconMap[topItem.title] || iconMap['默认'],
        bgColor: colorTheme.bgColor,
        hoverColor: colorTheme.hoverColor,
        linkUrl: topItem.linkUrl,
        children: children.length > 0 ? children : undefined
      };

      modules.push(module);
    });

    // const filteredModules = modules.slice(0, 4);
    const filteredModules = modules;
    return filteredModules;
  };

  const fetchServiceData = async () => {
    try {
      setLoading(true);
      const titleList = await PortalAPI.getTitleList();
      
      // 过滤出type为"title"的项目来构建服务模块
      const titleItems = titleList.filter((item: PortalTitleModel) => item.type === "title");
      const serviceModules = buildServiceTree(titleItems);
      setModules(serviceModules);
    } catch (error) {
      console.error('Error fetching service data:', error);
      // 如果API失败，使用默认数据
      setModules([
        {
          id: 1,
          title: "远程会诊",
          icon: iconMap['远程会诊'],
          description: "远程会诊服务",
          bgColor: "#3b82f6",
          hoverColor: "#2563eb"
        },
        {
          id: 2,
          title: "AI辅助诊断",
          icon: iconMap['AI辅助诊断'],
          description: "AI智能辅助诊断",
          bgColor: "#8b5cf6",
          hoverColor: "#7c3aed"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceData();
  }, []);

  const handleModuleClick = (module: ServiceModule) => {
    if (module.children && module.children.length > 0) {
      return
    }
    if (module.linkUrl) {
      window.open(module.linkUrl, '_blank');
    }
  };

  const handleChildClick = (child: ServiceModule) => {
    if (child.linkUrl) {
      window.open(child.linkUrl, '_blank');
    }
  };

  return (
    <div className="py-16 bg-gray-50 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">核心服务</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            提供全方位的数字病理服务，助力医疗诊断现代化
          </p>
        </div>
        
        <Row gutter={[24, 24]} justify="start">
          {modules.map((module) => (
            <Col xs={24} sm={12} lg={6} key={module.id}>
              <div 
                className="relative group"
                onMouseEnter={() => setHoveredModule(module.id)}
                onMouseLeave={() => setHoveredModule(null)}
                style={{ position: 'relative' }}
              >
                <Card
                  className="border-0 shadow-lg transition-all duration-500 transform hover:scale-105 cursor-pointer h-48 overflow-visible"
                  style={{
                    backgroundColor: module.bgColor,
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: hoveredModule === module.id 
                      ? `0 20px 40px ${module.bgColor}40, 0 0 30px ${module.bgColor}30`
                      : '0 10px 25px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = module.hoverColor;
                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = module.bgColor;
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  }}
                  onClick={() => handleModuleClick(module)}
                  styles={{
                    body: { 
                      padding: '32px 24px', 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      justifyContent: 'center', 
                      alignItems: 'center' 
                    }
                  }}
                >
                  <div className="text-center relative z-10">
                    <div className="mb-4 transform transition-transform duration-300 group-hover:scale-110">
                      {module.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: '#ffffff' }}>
                      {module.title}
                    </h3>
                    <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                      {module.description}
                    </p>
                  </div>
                  
                  {/* 光效背景 */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${module.hoverColor}, transparent 70%)`,
                      animation: hoveredModule === module.id ? 'pulse 2s infinite' : 'none'
                    }}
                  />
                </Card>

                {/* 炫酷子菜单悬浮面板 */}
                {module.children && module.children.length > 0 && (
                  <>
                    {/* 不可见的连接区域，防止hover丢失 */}
                    <div 
                      className="absolute top-full left-0 right-0 h-4 z-50"
                      onMouseEnter={() => setHoveredModule(module.id)}
                      onMouseLeave={() => setHoveredModule(null)}
                      style={{ 
                        backgroundColor: 'transparent',
                        pointerEvents: hoveredModule === module.id ? 'auto' : 'none'
                      }}
                    />
                    
                    <div 
                      className={`absolute top-full left-0 right-0 mt-4 transition-all duration-300 ease-out transform ${
                        hoveredModule === module.id 
                          ? 'opacity-100 translate-y-0 scale-100' 
                          : 'opacity-0 translate-y-8 scale-90 pointer-events-none'
                      }`}
                      style={{
                        zIndex: 1000,
                        filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.25))'
                      }}
                      onMouseEnter={() => setHoveredModule(module.id)}
                      onMouseLeave={() => setHoveredModule(null)}
                    >
                    {/* 连接线 */}
                    <div 
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2"
                      style={{
                        width: '2px',
                        height: '16px',
                        background: `linear-gradient(180deg, ${module.bgColor}, transparent)`,
                        opacity: hoveredModule === module.id ? 1 : 0,
                        transition: 'opacity 0.5s ease'
                      }}
                    />
                    
                    {/* 主面板 */}
                    <div 
                      className="relative rounded-2xl p-6 border-0 overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, 
                          rgba(255, 255, 255, 0.95) 0%, 
                          rgba(255, 255, 255, 0.85) 100%)`,
                        backdropFilter: 'blur(20px) saturate(180%)',
                        border: `1px solid rgba(255, 255, 255, 0.3)`,
                        boxShadow: `
                          0 8px 32px rgba(0, 0, 0, 0.12),
                          inset 0 1px 0 rgba(255, 255, 255, 0.8),
                          0 0 0 1px ${module.bgColor}20
                        `
                      }}
                    >
                      {/* 背景装饰 */}
                      <div 
                        className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10"
                        style={{
                          background: `radial-gradient(circle, ${module.bgColor}, transparent 70%)`,
                          transform: 'translate(30%, -30%)'
                        }}
                      />
                      <div 
                        className="absolute bottom-0 left-0 w-16 h-16 rounded-full opacity-5"
                        style={{
                          background: `radial-gradient(circle, ${module.hoverColor}, transparent 70%)`,
                          transform: 'translate(-30%, 30%)'
                        }}
                      />
                      
                      {/* 标题 */}
                      <div className="flex items-center mb-4">
                        <div 
                          className="w-1 h-6 rounded-full mr-3"
                          style={{ background: `linear-gradient(180deg, ${module.bgColor}, ${module.hoverColor})` }}
                        />
                        <h4 
                          className="font-bold text-lg"
                          style={{ color: module.bgColor }}
                        >
                          {module.title}
                        </h4>
                      </div>
                      
                      {/* 子菜单项 */}
                      <div className="space-y-2">
                        {module.children.map((child, index) => (
                          <div
                            key={child.id}
                            className="group/item relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300"
                            style={{
                              background: 'rgba(255, 255, 255, 0.6)',
                              border: '1px solid rgba(255, 255, 255, 0.3)',
                              animationDelay: `${index * 150}ms`,
                              animation: hoveredModule === module.id ? 'slideInUp 0.6s ease-out forwards' : 'none'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = `linear-gradient(135deg, ${module.bgColor}15, ${module.bgColor}05)`;
                              e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                              e.currentTarget.style.boxShadow = `0 8px 25px ${module.bgColor}30`;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.6)';
                              e.currentTarget.style.transform = 'translateY(0) scale(1)';
                              e.currentTarget.style.boxShadow = 'none';
                            }}
                            onClick={() => handleChildClick(child)}
                          >
                            {/* 悬停光效 */}
                            <div 
                              className="absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"
                              style={{
                                background: `linear-gradient(45deg, transparent, ${module.bgColor}10, transparent)`,
                                transform: 'translateX(-100%)',
                                animation: 'shimmer 2s infinite'
                              }}
                            />
                            
                            <div className="relative z-10 flex items-center justify-between p-4">
                              <div className="flex items-center space-x-3">
                                <div 
                                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300"
                                  style={{
                                    background: `linear-gradient(135deg, ${module.bgColor}20, ${module.bgColor}10)`,
                                    border: `1px solid ${module.bgColor}30`
                                  }}
                                >
                                  <div 
                                    className="w-3 h-3 rounded-full"
                                    style={{ background: module.bgColor }}
                                  />
                                </div>
                                <span 
                                  className="font-semibold text-base transition-colors duration-300"
                                  style={{ color: '#1f2937' }}
                                >
                                  {child.title}
                                </span>
                              </div>
                              
                              <div 
                                className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 group-hover/item:scale-110"
                                style={{
                                  background: `linear-gradient(135deg, ${module.bgColor}, ${module.hoverColor})`,
                                  boxShadow: `0 2px 8px ${module.bgColor}40`
                                }}
                              >
                                <RightOutlined 
                                  style={{ 
                                    color: '#ffffff',
                                    fontSize: '10px'
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    </div>
                  </>
                )}
              </div>
            </Col>
          ))}
        </Row>
      </div>

      {/* 添加CSS动画 */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .group:hover .group-hover\\:scale-110 {
          transform: scale(1.1) rotate(5deg);
        }
        
        /* 玻璃态效果增强 */
        .backdrop-blur {
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
        }
      `}</style>
    </div>
  );
};

export default ServiceModules;
