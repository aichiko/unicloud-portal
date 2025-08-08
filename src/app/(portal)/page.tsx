import type { Metadata } from "next";
import { Row, Col } from "antd";
import { BannerCarousel, ServiceModules, NoticeList, NewsList, PolicyList } from "@/components"

export const metadata: Metadata = {
  title: "区域智汇病理云平台",
  description: "欢迎来到区域智汇病理云平台",
};

function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner轮播图 */}
      <BannerCarousel />
      
      {/* 功能模块 */}
      <ServiceModules />
      
      {/* 信息展示区域 */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <Row gutter={[24, 24]}>
            {/* 通知公告 */}
            <Col xs={24} lg={8}>
              <NoticeList />
            </Col>
            
            {/* 行业动态 */}
            <Col xs={24} lg={8}>
              <NewsList />
            </Col>
            
            {/* 卫健委政策 */}
            <Col xs={24} lg={8}>
              <PolicyList />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Page;
