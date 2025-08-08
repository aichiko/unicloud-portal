'use client';
import React from 'react';
import { FileProtectOutlined } from '@ant-design/icons';
import ListView from '@/components/common/ListView';
import PortalAPI from '@/apis/portalApi';
import Image from 'next/image';

export default function PoliciesPage() {
  const handleItemClick = (item: PortalPolicyModel) => {
    // 处理点击事件，如果有外链则打开
    if (item.linkUrl) {
      window.open(item.linkUrl, '_blank');
    } else {
      console.log('打开政策详情:', item);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部宣传图片 */}
      <div className="relative w-full h-128 overflow-hidden">
        <Image
          src="/top_propaganda.jpg"
          alt="卫健委政策宣传图"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* ListView 内容 */}
      <div className="py-8">
        <ListView<PortalPolicyModel>
          title="卫健委政策"
          icon={<FileProtectOutlined style={{ fontSize: '24px', color: '#dc2626' }} />}
          themeColor="#dc2626"
          borderColor="#ef4444"
          tagColor="red"
          tagText="政策"
          fetchData={PortalAPI.getPolicyList}
          renderTitle={(item) => item.title}
          renderDate={(item) => item.createTime || ''}
          onItemClick={handleItemClick}
          pageSize={10}
        />
      </div>
    </div>
  );
}
