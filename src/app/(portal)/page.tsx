import type { Metadata } from "next";
import { Row, Col } from "antd";
import BannerCarousel from "@/components/home/BannerCarousel";
import ServiceModules from "@/components/home/ServiceModules";
import NoticeList from "@/components/home/NoticeList";
import NewsList from "@/components/home/NewsList";
import PolicyList from "@/components/home/PolicyList";

export const metadata: Metadata = {
  title: "区域智汇病理云平台",
  description: "欢迎来到区域智汇病理云平台",
};

function Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Banner轮播图 */}
      <BannerCarousel />
      
      {/* 功能模块 */}
      <ServiceModules />
      
      {/* 信息展示区域 */}
      <div className="py-12 bg-white">
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
