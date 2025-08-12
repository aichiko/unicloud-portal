'use client';
import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import PortalAPI from '@/apis/portalApi';

const PolicyList: React.FC = () => {
  const [policies, setPolicies] = useState<PortalPolicyModel[]>([]);
  const [selectedPolicy, setSelectedPolicy] = useState<PortalPolicyModel | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPolicies = async () => {
    try {
      setLoading(true);
      const response = await PortalAPI.getPolicyList(1, 5);
      if (response && response.rows) {
        setPolicies(response.rows);
        if (response.rows.length > 0) {
          setSelectedPolicy(response.rows[0]);
        }
      } else {
        throw new Error('API response is empty');
      }
    } catch (error) {
      console.error('Error fetching policies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  const onPolicyClick = (policyItem: PortalPolicyModel) => {
    if (policyItem.linkUrl) {
      window.open(policyItem.linkUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">政策法规</h2>
        <div className="flex justify-center py-8">
          <Spin size="large" />
        </div>
      </div>
    );
  }

  if (!policies.length) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">政策法规</h2>
        <div className="text-center py-8 text-gray-500">暂无政策法规</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold mb-4">政策法规</h2>
      
      {/* 主要内容区域 */}
      <div className="bg-blue-50 rounded-lg p-6 mb-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-medium text-gray-900 leading-tight">
            {selectedPolicy?.title}
          </h3>
          <div className="text-lg font-medium text-blue-600">
            {selectedPolicy?.createTime}
          </div>
        </div>
        
        <p className="text-gray-700 leading-relaxed">
          {selectedPolicy?.description || '点击查看政策详情...'}
        </p>
        
        {selectedPolicy?.linkUrl && (
          <div className="mt-4">
            <button
              onClick={() => selectedPolicy && onPolicyClick(selectedPolicy)}
              className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
            >
              查看详情 →
            </button>
          </div>
        )}
      </div>

      {/* 其他政策列表 */}
      <div className="space-y-2">
        {policies.slice(1).map((policy) => (
          <div
            key={policy.id}
            className="flex justify-between items-center py-2 px-3 hover:bg-blue-50 rounded cursor-pointer transition-colors"
            onClick={() => setSelectedPolicy(policy)}
          >
            <span className="text-gray-700 truncate flex-1">
              {policy.title}
            </span>
            <span className="text-gray-500 text-sm ml-4">
              {policy.createTime}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PolicyList;
