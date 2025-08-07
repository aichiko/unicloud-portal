'use client';
import React, { useEffect, useState } from 'react';
import { Carousel, Card } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import PortalAPI from '@/apis/portalApi';
import Image from 'next/image';
import { format } from 'path';
import { formatCoverUrl } from '@/utils/utils';

interface BannerCarouselProps {
  className?: string;
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({ className }) => {
  const [bannerList, setBannerList] = useState<PortalTitleModel[]>([]);
  const [loading, setLoading] = useState(true);

  // 自定义箭头组件
  const CustomArrow = ({ direction, onClick }: { direction: 'left' | 'right', onClick?: () => void }) => (
    <div
      className={`absolute top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full p-3 cursor-pointer transition-all duration-300 ${
        direction === 'left' ? 'left-4' : 'right-4'
      }`}
      onClick={onClick}
    >
      {direction === 'left' ? (
        <LeftOutlined className="text-gray-700 text-lg" />
      ) : (
        <RightOutlined className="text-gray-700 text-lg" />
      )}
    </div>
  );

  const fetchBannerData = async () => {
    try {
      setLoading(true);
      const banners = await PortalAPI.getBannerList();
      // 按sortOrder排序
      const sortedBanners = banners.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
      setBannerList(sortedBanners);
    } catch (error) {
      console.error('Error fetching banner list:', error);
      // 如果API失败，使用默认数据
      setBannerList([
        {
          id: 1,
          title: "智慧医疗 引领未来",
          description: "运用人工智能技术，提供精准病理诊断服务，助力医疗质量提升",
          coverUrl: "/banner1.jpg",
          type: "lunbo",
          parentId: "",
          linkUrl: "",
          sortOrder: 1
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBannerData();
  }, []);

  if (loading) {
    return (
      <div className={`h-96 bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center ${className}`}>
        <div className="text-white text-xl">加载中...</div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Carousel
        autoplay
        autoplaySpeed={5000}
        dots={{ className: 'custom-dots' }}
        arrows
        prevArrow={<CustomArrow direction="left" />}
        nextArrow={<CustomArrow direction="right" />}
      >
        {bannerList.map((banner) => (
          <div key={banner.id}>
            <div className="relative h-96 bg-gradient-to-r from-blue-500 to-teal-400 overflow-hidden">
              {banner.coverUrl && (
                <Image
                  src={formatCoverUrl(banner.coverUrl)}
                  alt={banner.title}
                  fill
                  className="object-cover"
                  priority
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-30" />
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-8">
                  <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                      {banner.title}
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                      {banner.description}
                    </p>
                    <button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors duration-300">
                      了解更多
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
      
      <style jsx global>{`
        .custom-dots {
          bottom: 20px !important;
        }
        .custom-dots li button {
          width: 12px !important;
          height: 12px !important;
          border-radius: 50% !important;
          background: rgba(255, 255, 255, 0.5) !important;
        }
        .custom-dots li.slick-active button {
          background: white !important;
        }
      `}</style>
    </div>
  );
};

export default BannerCarousel;
