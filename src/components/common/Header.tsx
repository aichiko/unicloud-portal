'use client';
import { Layout, Menu, Space, Typography } from "antd";
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import LogoImg from '@/assets/header_logo.png';

const { Header: AntdHeader } = Layout;
const { Text } = Typography;

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
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* 左侧 Logo 和标题 */}
          <div className="flex items-center space-x-4">
            <Image
              src={LogoImg}
              alt="智汇病理云平台"
              height={48}
              className="object-contain cursor-pointer"
              onClick={() => router.push('/')}
            />
            <span className="text-blue-600 font-bold text-2xl">智汇病理云平台</span>
          </div>

          {/* 右侧联系信息 */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <MailOutlined className="text-blue-500" />
              <Text style={{ color: '#4b5563' }}>邮件地址</Text>
              <Text className="font-medium" style={{ color: '#2563eb' }}>support@unicloud-med.com</Text>
            </div>
            <div className="flex items-center space-x-2">
              <PhoneOutlined className="text-blue-500" />
              <Text style={{ color: '#4b5563' }}>联系电话</Text>
              <Text className="font-medium" style={{ color: '#2563eb' }}>027-59320986</Text>
            </div>
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