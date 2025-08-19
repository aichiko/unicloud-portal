'use client';
import React from 'react';
import { FileProtectOutlined } from '@ant-design/icons';
import ListView from '@/components/common/ListView';
import PortalAPI from '@/apis/portalApi';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
  
export default function PoliciesPage() {
  const searchParams = useSearchParams();
  // academic policy and national policy
  const policyType = searchParams.get('type');

  const policyAlt = policyType === 'academic' ? '学术政策' : '卫健委政策';

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
          alt={`${policyAlt}宣传图`}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* ListView 内容 */}
      <div className="py-8">
        <ListView<PortalPolicyModel>
          title={policyAlt}
          icon={<FileProtectOutlined style={{ fontSize: '24px', color: '#B83531' }} />}
          themeColor="#B83531"
          borderColor="#B83531"
          tagColor="#B83531"
          tagText="政策"
          fetchData={policyType === 'academic' ? PortalAPI.getAcademicPolicyList : PortalAPI.getNationalPolicyList}
          renderTitle={(item) => item.title}
          renderDate={(item) => item.createTime || ''}
          onItemClick={handleItemClick}
          pageSize={10}
        />
      </div>
    </div>
  );
}
