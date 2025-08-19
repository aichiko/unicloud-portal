'use client';
import React, { useEffect, useState } from 'react';
import { Button, List, Space, Spin } from 'antd';
import PortalAPI from '@/apis/portalApi';
import HomeServiceTitle from '../common/HomeServiceTitle';
import ServiceListItem from './ServiceListItem';
import { useRouter } from 'next/navigation';

const AcademicPolicyList: React.FC = () => {
  const [policies, setPolicies] = useState<AcademicPolicyModel[]>([]);
  const [selectedPolicy, setSelectedPolicy] = useState<AcademicPolicyModel | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPolicies = async () => {
    try {
      setLoading(true);
      const response = await PortalAPI.getAcademicPolicyList(1, 3);
      if (response && response.rows) {
        setPolicies(response.rows);
        if (response.rows.length > 0) {
          setSelectedPolicy(response.rows[0]);
        }
      } else {
        throw new Error('API response is empty');
      }
    } catch (error) {
      console.error('Error fetching academic policies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  const onPolicyClick = (policyItem: AcademicPolicyModel) => {
    if (policyItem.linkUrl) {
      window.open(policyItem.linkUrl, '_blank');
    }
  };

  const router = useRouter();

  // 了解更多
  const onLearnMoreClick = () => {
    router.push('/policies?type=academic');
  };

  if (loading) {
    return (
      <div className="bg-white p-6">
        <HomeServiceTitle title='学术政策'  />
        <div className="flex justify-center py-8">
          <Spin size="large" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6">
      <HomeServiceTitle title='学术政策' />
      <List
        split={false}
        style={{ marginTop: '36px' }}
        dataSource={policies}
        renderItem={(item, index) => (
          <ServiceListItem itemModel={item} firstItem={index === 0} onClick={() => onPolicyClick(item)} />
        )}
      />
      {/* 底部的button，了解更多 */}
      <div className="flex justify-end py-4 mt-12 mr-6">
        <Button type='default' variant='outlined'
          onClick={onLearnMoreClick}
          style={{
            borderColor: '#2769AF',
            color: '#2769AF',
            padding: '0 48px',
            fontSize: '16px',
          height: '40px',
          lineHeight: '40px',
          borderRadius: '4px',
        }}>了解更多</Button>
      </div>
    </div>
  );
};

export default AcademicPolicyList;
