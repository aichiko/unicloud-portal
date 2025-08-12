'use client';
import React, { useState, useEffect } from 'react';
import { DownOutlined } from '@ant-design/icons';
import Image from 'next/image';
import PortalAPI from '@/apis/portalApi';
import LoginModal from '@/components/common/LoginModal';
import { useUserStore } from '@/store/userStore';
import disgnosis_icon from '@/assets/auxiliary_diagnosis_icon.png'
import live_stream_icon from '@/assets/live_stream_icon.png'
import lungs_icon from '@/assets/lungs_icon.png'
import remote_diagnosis_icon from '@/assets/remote_diagnosis_icon.png'
import assess_icon from '@/assets/assess_icon.png'

const IconArray = [remote_diagnosis_icon, disgnosis_icon, lungs_icon, live_stream_icon, assess_icon]

interface ModuleItemsType {
  key: string;
  label?: string;
  icon?: React.ReactNode;
  bgColor?: string;
  hoverBgColor?: string;
  children?: Array<ModuleItemsType>;
  itemModel: PortalTitleModel
}

interface ServiceModuleItemProps {
  module: ModuleItemsType;
  index: number;
  totalCount: number;
  onItemClick: (item: ModuleItemsType) => void;
}

function ServiceModuleItem({ module, index, totalCount, onItemClick }: ServiceModuleItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // 根据索引获取背景色
  const getBgColor = (index: number) => {
    const colors = ['#2769AF', '#43B1D2', '#2769AF', '#43B1D2', '#2769AF'];
    return colors[index % colors.length];
  };

  const getGradientBgColor = (index: number) => {
    const colors = ['#2769AF', '#43B1D2', '#2769AF', '#43B1D2', '#2769AF'];
    return `linear-gradient(135deg, ${colors[index % colors.length]} 0%, ${colors[(index + 1) % colors.length]} 100%)`;
  };

  // 根据索引获取图标
  const getIcon = (index: number) => {
    if (index < IconArray.length) {
      return (
        <Image
          src={IconArray[index]}
          alt={module.label || ''}
          width={isMobile ? 30 : 50}
          height={isMobile ? 30 : 50}
        />
      );
    }
    return null;
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (module.children && module.children.length > 0) {
      setShowDropdown(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowDropdown(false);
  };

  const handleItemClick = (item: ModuleItemsType) => {
    if ((item.children ?? []).length > 0) {
      return;
    }
    onItemClick(item);
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div
      className="relative group cursor-pointer h-32 md:h-64 w-full md:flex-1 flex items-center justify-center transition-all duration-500 ease-in-out"
      style={{
        backgroundColor: isHovered ? getGradientBgColor(index) : getBgColor(index),
        borderRight: !isMobile && index < 4 ? '1px solid rgba(255,255,255,0.2)' : 'none',
        borderBottom: isMobile && index < totalCount - 1 ? '1px solid rgba(255,255,255,0.2)' : 'none'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => handleItemClick(module)}
    >
      <div className="text-center relative z-10 flex flex-col items-center">
        <div className="p-2 md:p-4 bg-white rounded-full mb-2 md:mb-4 flex justify-center transform transition-transform duration-300 group-hover:scale-110">
          {getIcon(index)}
        </div>
        <span className="text-lg md:text-4xl font-bold text-white px-2">
          {module.label}
        </span>
      </div>

      {/* 下拉箭头 */}
      {module.children && module.children.length > 0 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
          <DownOutlined className="text-white" style={{
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold',
            width: '40px'
          }} />
        </div>
      )}

      {/* 水波纹动画效果 */}
      {isHovered && (
        <>
          {/* 第一层水波纹 */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: `linear-gradient(45deg, 
                rgba(255,255,255,0.1) 0%, 
                rgba(255,255,255,0.3) 25%, 
                rgba(255,255,255,0.1) 50%, 
                rgba(255,255,255,0.3) 75%, 
                rgba(255,255,255,0.1) 100%)`,
              backgroundSize: '200% 200%',
              animation: 'ripple1 2s ease-in-out infinite'
            }}
          />
          {/* 第二层水波纹 */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `linear-gradient(-45deg, 
                transparent 0%, 
                rgba(255,255,255,0.2) 25%, 
                transparent 50%, 
                rgba(255,255,255,0.2) 75%, 
                transparent 100%)`,
              backgroundSize: '300% 300%',
              animation: 'ripple2 2.5s ease-in-out infinite'
            }}
          />
        </>
      )}

      {/* 下拉菜单 */}
      {showDropdown && module.children && module.children.length > 0 && (
        <div
          className="absolute top-full left-0 right-0 z-50 transform transition-all duration-300 ease-out animate-dropdown"
          style={{
            background: 'linear-gradient(135deg, rgba(39,105,175,0.95) 0%, rgba(67,177,210,0.95) 100%)',
            backdropFilter: 'blur(10px)',
            borderRadius: '0 0 12px 12px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 4px 16px rgba(39,105,175,0.2)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderTop: 'none'
          }}
        >
          {module.children.map((child, childIndex) => (
            <div
              key={child.key}
              className="relative px-6 py-4 text-white cursor-pointer last:border-b-0 transition-all duration-200 ease-in-out group/item"
              onClick={(e) => {
                e.stopPropagation();
                handleItemClick(child);
              }}
              style={{
                borderRadius: childIndex === (module.children?.length ?? 0) - 1 ? '0 0 12px 12px' : '0'
              }}
            >
              <div className="text-base font-semibold group-hover/item:translate-x-2 transition-transform duration-200">
                {child.label}
              </div>
              {child.itemModel.description && (
                <div className="text-sm text-white text-opacity-80 mt-1 group-hover/item:translate-x-2 transition-transform duration-200 delay-75">
                  {child.itemModel.description}
                </div>
              )}

              {/* 悬停时的箭头指示器 */}
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover/item:opacity-100 transition-all duration-200 ease-in-out">
                <div className="w-0 h-0 border-l-6 border-l-white border-t-4 border-b-4 border-t-transparent border-b-transparent" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const ServiceModules: React.FC = () => {
  const [moduleItems, setModuleItems] = useState<ModuleItemsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  // 使用zustand管理用户状态
  const { isLoggedIn, initializeAuth } = useUserStore();

  // 添加CSS动画样式
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ripple1 {
        0% { background-position: 0% 0%; }
        50% { background-position: 100% 100%; }
        100% { background-position: 0% 0%; }
      }
      
      @keyframes ripple2 {
        0% { background-position: 0% 0%; }
        33% { background-position: 50% 50%; }
        66% { background-position: 100% 100%; }
        100% { background-position: 0% 0%; }
      }
      
      @keyframes glow {
        0% { transform: scale(1); opacity: 0.2; }
        50% { transform: scale(1.1); opacity: 0.4; }
        100% { transform: scale(1); opacity: 0.2; }
      }
      
      @keyframes dropdown {
        0% { 
          opacity: 0; 
          transform: translateY(-10px) scale(0.95); 
        }
        100% { 
          opacity: 1; 
          transform: translateY(0) scale(1); 
        }
      }
      
      .animate-dropdown {
        animation: dropdown 0.3s ease-out forwards;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // 构建菜单树结构
  const buildModuleTree = (titleList: PortalTitleModel[]): ModuleItemsType[] => {
    const menuItems: ModuleItemsType[] = [];

    // 获取顶级菜单项（parentId为"0"）
    const topLevelItems = titleList.filter(item => item.parentId === "0");

    // 根据sortOrder排序
    topLevelItems.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

    topLevelItems.forEach(topItem => {
      // 查找子菜单项
      const children = titleList
        .filter(item => item.parentId === topItem.id.toString())
        .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
        .map(child => {
          const childItem: ModuleItemsType = {
            key: child.id.toString(),
            label: child.title,
            itemModel: child
          };
          return childItem;
        });

      const menuItem: ModuleItemsType = {
        key: topItem.id.toString(),
        label: topItem.title,
        itemModel: topItem,
        children: children.length > 0 ? children : undefined,
      };

      menuItems.push(menuItem);
    });

    return menuItems;
  };

  async function fetchTitleListData() {
    try {
      setLoading(true);
      const titleList = await PortalAPI.getTitleList();
      console.log("Fetched title list:", titleList);

      // 过滤出type为"title"的项目来构建菜单
      const titleItems = titleList.filter((item: PortalTitleModel) => item.type === "title");
      const moduleItemArr = buildModuleTree(titleItems);

      // 限制最多显示5个模块
      const limitedModules = moduleItemArr.slice(0, 5);
      setModuleItems(limitedModules);
    } catch (error) {
      console.error("Error fetching title list:", error);
      // 如果API失败，使用默认数据
      const defaultModules: ModuleItemsType[] = [
        {
          key: '1',
          label: '病理远程会诊',
          itemModel: { id: 1, title: '病理远程会诊', type: 'title', description: '', linkUrl: '', parentId: '0' }
        },
        {
          key: '2',
          label: '智能辅助诊断',
          itemModel: { id: 2, title: '智能辅助诊断', type: 'title', description: '', linkUrl: '', parentId: '0' },
          children: [
            {
              key: '2-1',
              label: 'AI病理诊断',
              itemModel: { id: 21, title: 'AI病理诊断', type: 'title', description: 'AI辅助病理诊断', linkUrl: '', parentId: '2' }
            }
          ]
        },
        {
          key: '3',
          label: '区域标本送检',
          itemModel: { id: 3, title: '区域标本送检', type: 'title', description: '', linkUrl: '', parentId: '0' }
        },
        {
          key: '4',
          label: '病理直播间',
          itemModel: { id: 4, title: '病理直播间', type: 'title', description: '', linkUrl: '', parentId: '0' }
        },
        {
          key: '5',
          label: '病理质检考核',
          itemModel: { id: 5, title: '病理质检考核', type: 'title', description: '', linkUrl: '', parentId: '0' }
        }
      ];
      setModuleItems(defaultModules);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTitleListData();
    
    // 初始化用户认证状态
    initializeAuth();
  }, [initializeAuth]);

  // 处理登录成功 - 现在由zustand管理，这里只需要关闭Modal
  const handleLoginSuccess = (values: { username: string; password: string }) => {
    console.log('登录成功:', values);
    setIsLoginModalOpen(false);
  };

  const handleItemClick = (item: ModuleItemsType) => {
    console.log(`Clicked on ${item.label}`, item);
    
    // 检查登录状态
    if (!isLoggedIn) {
      // 未登录，显示登录Modal
      setIsLoginModalOpen(true);
      return;
    }
    
    // 已登录，执行原有逻辑
    if (item.itemModel.linkUrl) {
      const token = localStorage.getItem('userToken');
      const auth_linkUrl = `${item.itemModel.linkUrl}?token=${token}`;
      window.open(auth_linkUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="py-0 bg-white">
        <div className="w-full h-32 flex items-center justify-center">
          <div className="text-gray-500">加载中...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-0 bg-white">
      <div className="w-full">
        <div className="flex flex-col md:flex-row">
          {moduleItems.map((module, index) => (
            <ServiceModuleItem
              key={module.key}
              module={module}
              index={index}
              totalCount={moduleItems.length}
              onItemClick={handleItemClick}
            />
          ))}
        </div>
      </div>
      
      {/* 登录Modal */}
      <LoginModal
        open={isLoginModalOpen}
        onCancel={() => setIsLoginModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default ServiceModules;
