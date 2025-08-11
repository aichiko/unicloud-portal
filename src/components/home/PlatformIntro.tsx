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
                  病理诊断是疾病诊断的 “金标准”，但传统病理流程存在资源分布不均、效率低、协作难等问题。智汇病理云平台通过数字化与智能化技术，为医疗机构、病理医生及患者提供高效、精准的解决方案。
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default PlatformIntro;
