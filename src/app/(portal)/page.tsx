import type { Metadata } from "next";
import { Row, Col } from "antd";
import { PlatformIntro, ServiceModules, NoticeList, NewsList, PolicyList, AcademicPolicyList, NewsTitle } from "@/components"

export const metadata: Metadata = {
  title: "区域智汇病理云平台",
  description: "欢迎来到区域智汇病理云平台",
};

function Page() {
  return (
    <div className="min-h-screen">
      {/* 平台介绍 */}
      <PlatformIntro />
      
      {/* 功能模块 */}
      <ServiceModules />
      
      {/* 更多资讯标题 */}
      <NewsTitle />
      
      {/* 信息展示区域 */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* 上半部分 */}
          <Row gutter={[32, 32]} className="mb-8" style={{
            backgroundColor: '#FFFFFF',
            minHeight: '488px',
            maxHeight: '600px'
          }}>
            {/* 左侧：通知公告（大区域） */}
            <Col xs={24} lg={12}>
              <NoticeList />
            </Col>
            
            {/* 右侧：学术政策 */}
            <Col xs={24} lg={12}>
              <AcademicPolicyList />
            </Col>
          </Row>
          
          {/* 下半部分 */}
          <Row gutter={[32, 32]} style={{
            backgroundColor: '#FFFFFF',
            minHeight: '488px',
            maxHeight: '600px'
          }}>
            {/* 左侧：行业动态 */}
            <Col xs={24} lg={12}>
              <NewsList />
            </Col>
            
            {/* 右侧：卫健委政策 */}
            <Col xs={24} lg={12}>
              <PolicyList />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Page;
