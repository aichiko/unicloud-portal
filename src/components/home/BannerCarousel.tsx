'use client';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import PortalAPI from '@/apis/portalApi';
import { formatCoverUrl } from '@/utils/utils';
import Image from 'next/image';

interface BannerCarouselProps {
  className?: string;
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({ className }) => {
  const [bannerList, setBannerList] = useState<PortalTitleModel[]>([]);
  const [loading, setLoading] = useState(true);

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
          linkUrl: "",
          sortOrder: 1,
          parentId: "",
          createTime: new Date().toISOString(),
          updateTime: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBannerData();
  }, []);

  const onBannerClick = (banner: PortalTitleModel) => {
    // TODO: Implement banner click handling
    console.log('Banner clicked:', banner);
    const link = banner.linkUrl || '';
    if (link && link.length > 0) {
      window.open(link, '_blank');
    }
  };

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
        autoplay={{ dotDuration: true }}
        autoplaySpeed={5000}
        arrows
      >
        {bannerList.map((banner) => (
          <div key={banner.id}>
            <div className="relative h-128 bg-gradient-to-r from-blue-500 to-teal-400 overflow-hidden">
              {banner.coverUrl && (
                <Image
                  src={formatCoverUrl(banner.coverUrl)}
                  alt={banner.title}
                  fill
                  className="object-cover"
                  priority
                  placeholder='empty'
                />
              )}
              <div className="absolute inset-0 bg-opacity-30" />
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-8">
                  <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                      {banner.title}
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                      {banner.description}
                    </p>
                    <button onClick={() => onBannerClick(banner)} className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors duration-300">
                      了解更多
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default BannerCarousel;
