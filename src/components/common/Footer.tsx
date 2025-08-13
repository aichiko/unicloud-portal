'use client';
import { Layout, Row, Col, Space, Typography } from "antd";
import Image from 'next/image';
import OfficialImg from '@/assets/official_scan.jpg';
import VideoImg from '@/assets/video_scan.png';

const { Footer: AntdFooter } = Layout;
const { Title, Text } = Typography;

function FooterDivider({ isPrimary = false }: { isPrimary?: boolean } ) {
  return (
    <div className={`flex flex-row justify-start items-center bg-[#2769AF] ${isPrimary ? 'w-30' : 'w-24'} my-5`}>
      <div className='w-7 bg-[#B83531]  h-0.5' />
      <div className='bg-[#2769AF] h-0.5' />
    </div>
  );
}

function Footer() {
  return (
    <AntdFooter className="bg-gray-800 text-white p-0" style={{
      backgroundColor: '#222834',
      color: '#ffffff'
    }}>
      {/* 主要内容区域 */}
      <div className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <Row gutter={[48, 32]}>
            {/* 公司信息 */}
            <Col xs={24} lg={16}>
              <div className="space-y-6">
                <Title level={3} className="mb-6" style={{ color: '#ffffff', fontSize: 24 }}>
                  武汉优云智能医疗科技有限公司
                </Title>

                <FooterDivider isPrimary />
                
                <div className="space-y-3 pt-6">
                  <div className="flex">
                    <Text className="w-12" style={{ color: '#d1d5db' }}>地址：</Text>
                    <Text style={{ color: '#d1d5db' }}>武汉市高科医疗器械园B区22栋3层</Text>
                  </div>
                  <div className="flex">
                    <Text className="w-12" style={{ color: '#d1d5db' }}>电话：</Text>
                    <Text style={{ color: '#d1d5db' }}>027-59320986</Text>
                  </div>
                  <div className="flex">
                    <Text className="w-12" style={{ color: '#d1d5db' }}>邮编：</Text>
                    <Text style={{ color: '#d1d5db' }}>430000</Text>
                  </div>
                </div>
              </div>
            </Col>

            {/* 关注我们 */}
            <Col xs={24} lg={8}>
              <div className="space-y-6">
                <Title level={3} className="mb-6" style={{ color: '#ffffff', fontSize: 24 }}>
                  关注我们
                </Title>
                
                <FooterDivider />

                <div className="flex space-x-12 pt-6">
                  <div className="text-center">
                    <div className="w-24 h-24 mb-3 border border-gray-600 rounded hover:scale-110 transition-transform duration-300">
                      <Image 
                        src={OfficialImg} 
                        alt="公众号" 
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <Text className="text-sm" style={{ color: '#d1d5db' }}>公众号</Text>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 mb-3 border border-gray-600 rounded hover:scale-110 transition-transform duration-300">
                      <Image 
                        src={VideoImg} 
                        alt="视频号" 
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <Text className="text-sm" style={{ color: '#d1d5db' }}>视频号</Text>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      {/* 底部版权信息 */}
      <div className="border-t border-gray-700 py-4">
        <div className="max-w-7xl mx-auto px-6 text-center cursor-pointer" onClick={() => {
          window.open('https://beian.miit.gov.cn/', '_blank');
        }}>
          <Text className="text-sm" style={{ color: '#9ca3af' }}>
            版权所有：武汉优云智能医疗科技有限公司  鄂ICP备2024068825号-1
          </Text>
        </div>
      </div>
    </AntdFooter>
  );
}

export default Footer;
