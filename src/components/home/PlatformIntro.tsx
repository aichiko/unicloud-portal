'use client';
import { Row, Col } from 'antd';
import Image from 'next/image';
import IntroBgImg from '@/assets/intro_bg.png';

function PlatformIntro() {
  return (
    <div
      className="relative py-32"
      style={{
        backgroundImage: `url(${IntroBgImg.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        objectFit: 'fill',
        minHeight: '600px'
      }}
    >

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Row gutter={[48, 32]} align="middle">
          {/* 左侧文字内容 */}
          <Col xs={24} lg={14}>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">平台介绍</h2>
              <div className="text-lg text-gray-700 leading-relaxed space-y-4">
                <p>
                  优云智能智汇病理云平台作为新一代病理科数字化转型应用生态平台，从病理科室数字化应用需求出发，集成远程会诊、AI辅助诊断、区域标本送检、病理教学直播、切片智能质控等模块功能，构建“诊-疗-教-研”一体化闭环，深度融合云计算、AI算法、5G等先进技术，覆盖病理业务全场景需求，实现传统病理科室向数智协同模式的范式升级。                </p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default PlatformIntro;
