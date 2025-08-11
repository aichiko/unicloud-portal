'use client';
import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import PortalAPI from '@/apis/portalApi';

// 需要导出类型
export interface AcademicPolicyModel {
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

const AcademicPolicyList: React.FC = () => {
  const [policies, setPolicies] = useState<AcademicPolicyModel[]>([]);
  const [selectedPolicy, setSelectedPolicy] = useState<AcademicPolicyModel | null>(null);
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
      console.error('Error fetching academic policies:', error);
      // 如果API失败，使用模拟数据
      const mockData = [
        {
          id: 1,
          title: "医学研究伦理委员会管理办法（试行）",
          type: "academic",
          description: "为规范医学研究伦理委员会的设立与管理，保障受试者的权益，促进医学研究的健康发展，制定本办法...",
          linkUrl: "http://example.com/academic-policy-1",
          parentId: "",
          sortOrder: 1,
          createTime: "2025.06"
        },
        {
          id: 2,
          title: "学术论文发表规范指导意见",
          type: "academic",
          description: "",
          linkUrl: "http://example.com/academic-policy-2",
          parentId: "",
          sortOrder: 2,
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

  const onPolicyClick = (policyItem: AcademicPolicyModel) => {
    if (policyItem.linkUrl) {
      window.open(policyItem.linkUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">学术政策</h2>
        <div className="flex justify-center py-8">
          <Spin size="large" />
        </div>
      </div>
    );
  }

  if (!policies.length) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">学术政策</h2>
        <div className="text-center py-8 text-gray-500">暂无学术政策</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold mb-4">学术政策</h2>
      
      {/* 主要内容区域 */}
      <div className="bg-purple-50 rounded-lg p-6 mb-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-medium text-gray-900 leading-tight">
            {selectedPolicy?.title}
          </h3>
          <div className="text-lg font-medium text-purple-600">
            {selectedPolicy?.createTime}
          </div>
        </div>
        
        <p className="text-gray-700 leading-relaxed">
          {selectedPolicy?.description || '点击查看学术政策详情...'}
        </p>
        
        {selectedPolicy?.linkUrl && (
          <div className="mt-4">
            <button
              onClick={() => selectedPolicy && onPolicyClick(selectedPolicy)}
              className="text-purple-600 hover:text-purple-700 font-medium cursor-pointer"
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
            className="flex justify-between items-center py-2 px-3 hover:bg-purple-50 rounded cursor-pointer transition-colors"
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

export default AcademicPolicyList;
