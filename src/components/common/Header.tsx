'use client';
import { Layout, Menu, Space, Typography } from "antd";
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import LogoImg from '@/assets/header_logo.png';
import TitleImg from '@/assets/title_img.png';
import PlatformImg from '@/assets/Pathology_Cloud_Platform.png';

const { Header: AntdHeader } = Layout;
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
      <div className="flex flex-col">
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


function Header() {
  const router = useRouter();

  const menuItems = [
    {
      key: 'home',
      label: '首页',
      onClick: () => router.push('/')
    },
    {
      key: 'products',
      label: '产品服务',
      onClick: () => router.push('/products')
    },
    {
      key: 'contact',
      label: '联系我们',
      onClick: () => router.push('/contactUs')
    }
  ];

  return (
    <div className="bg-white">
      {/* 上半部分：Logo和联系信息 */}
      <div className="px-2 py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* 左侧 Logo 和标题 */}
          <div className="flex flex-row items-center space-x-4">
            <Image
              src={LogoImg}
              alt="智汇病理云平台"
              height={60}
              className="object-contain cursor-pointer"
              onClick={() => router.push('/')}
            />
            {/* <span className="text-blue-600 font-bold text-2xl">智汇病理云平台</span> */}
            <div>
              <Image
                src={TitleImg}
                alt="智汇病理云平台"
                height={40}
                className="object-contain cursor-pointer"
                onClick={() => router.push('/')}
              />
              <Image
                src={PlatformImg}
                alt="智汇病理云平台"
                height={20}
                className="object-contain cursor-pointer"
                onClick={() => router.push('/')}
              />
            </div>
          </div>

          {/* 右侧联系信息 */}
          <div className="flex items-center space-x-8">
            <HeaderContact title="email" contact="support@unicloud-med.com" />
            <HeaderContact title="phone" contact="027-59320986" />
          </div>
        </div>
      </div>

      {/* 下半部分：导航菜单 */}
      <AntdHeader className="px-6 h-16 bg-white shadow-sm" style={{
        backgroundColor: 'white',
      }}>
        <div className="max-w-7xl mx-auto">
          <Menu
            mode="horizontal"
            items={menuItems}
            selectedKeys={[]}
            className="border-none"
            style={{
              backgroundColor: 'transparent',
              fontSize: '16px',
              fontWeight: '500'
            }}
          />
        </div>
      </AntdHeader>
    </div>
  );
}

export default Header;