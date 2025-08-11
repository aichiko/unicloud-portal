'use client';
import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import PortalAPI from '@/apis/portalApi';

// 需要导出类型
export interface PortalPolicyModel {
  id: number;
  title: string;
  type: string;
  description: string;
  linkUrl: string;
  parentId: string;
  sortOrder?: number;
  createTime?: string;
  content?: string;
}

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
      // 如果API失败，使用模拟数据
      const mockData = [
        {
          id: 1,
          title: "省人民政府办公厅印发《关于深化改革促进乡村医疗卫生体系健康发展的实施方案》的通知",
          type: "policy",
          description: "深化改革促进乡村医疗卫生体系健康发展，加强基层医疗服务能力建设，提升乡村医疗卫生服务水平，保障农村居民健康...",
          linkUrl: "http://wjw.hubei.gov.cn/bmdt/ztzl/jkfp/zcwj/202505/t20250515_5651578.shtml",
          parentId: "",
          sortOrder: 1,
          createTime: "2025.06"
        },
        {
          id: 2,
          title: "省卫健委解读：《关于深化改革促进乡村医疗卫生体系健康发展的实施方案》",
          type: "policy",
          description: "详细解读乡村医疗卫生体系改革方案的实施细则和具体要求...",
          linkUrl: "http://wjw.hubei.gov.cn/bmdt/ztzl/jkfp/bsjd/202505/t20250515_5651541.shtml",
          parentId: "",
          sortOrder: 2,
          createTime: "2025.06"
        },
        {
          id: 3,
          title: "医疗机构药品采购管理规定",
          type: "policy",
          description: "规范医疗机构药品采购行为，确保药品质量和供应安全...",
          linkUrl: "http://example.com/policy3",
          parentId: "",
          sortOrder: 3,
          createTime: "2025.05"
        }
      ];
      setPolicies(mockData);
      setSelectedPolicy(mockData[0]);
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
