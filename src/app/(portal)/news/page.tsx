'use client';
import React from 'react';
import { LineChartOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import ListView from '@/components/common/ListView';
import PortalAPI from '@/apis/portalApi';
import Image from 'next/image';

export default function NewsPage() {
  const handleItemClick = (item: PortalNewsModel) => {
    // 处理点击事件，可以跳转到详情页或外链
    console.log('打开新闻详情:', item);
    if (item.linkUrl) {
      window.open(item.linkUrl, '_blank');
    }
  };

  const renderTags = (item: PortalNewsModel) => {
    const tags = [];
    if (item.isHot === 1) {
      tags.push(
        <Tag key="hot" color="red" className="text-xs font-medium">
          热门
        </Tag>
      );
    }
    return tags;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部宣传图片 */}
      <div className="relative w-full h-128 overflow-hidden">
        <Image
          src="/top_propaganda_2.png"
          alt="行业动态宣传图"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* ListView 内容 */}
      <div className="py-8">
        <ListView<PortalNewsModel>
          title="行业动态"
          icon={<LineChartOutlined style={{ fontSize: '24px', color: '#059669' }} />}
          themeColor="#059669"
          borderColor="#10b981"
          tagColor="green"
          tagText="动态"
          fetchData={PortalAPI.getNewsList}
          renderTitle={(item) => item.title}
          renderDate={(item) => item.publishDate}
          renderTags={renderTags}
          onItemClick={handleItemClick}
          pageSize={10}
        />
      </div>
    </div>
  );
}
