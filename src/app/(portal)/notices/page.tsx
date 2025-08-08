'use client';
import React from 'react';
import { NotificationOutlined } from '@ant-design/icons';
import ListView from '@/components/common/ListView';
import PortalAPI from '@/apis/portalApi';
import Image from 'next/image';

export default function NoticesPage() {
  const handleItemClick = (item: PortalNoticeModel) => {
    // 处理点击事件，可以跳转到详情页或外链
    if (item.noticeContent) {
      // 如果有内容，可以打开详情页
      console.log('打开通知详情:', item);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部宣传图片 */}
      <div className="relative w-full h-128 overflow-hidden">
        <Image
          src="/top_propaganda.jpg"
          alt="通知公告宣传图"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* ListView 内容 */}
      <div className="py-8">
        <ListView<PortalNoticeModel>
          title="通知公告"
          icon={<NotificationOutlined style={{ fontSize: '24px', color: '#2563eb' }} />}
          themeColor="#2563eb"
          borderColor="#3b82f6"
          tagColor="blue"
          tagText="公告"
          fetchData={PortalAPI.getNoticeList}
          renderTitle={(item) => item.noticeTitle}
          renderDate={(item) => item.publishTime}
          onItemClick={handleItemClick}
          pageSize={10}
        />
      </div>
    </div>
  );
}
