'use client';
import React, { useEffect, useState } from 'react';
import { Card, List, Tag, Spin } from 'antd';
import { FileProtectOutlined, CalendarOutlined } from '@ant-design/icons';
import PortalAPI from '@/apis/portalApi';
import Link from 'next/link';

const PolicyList: React.FC = () => {
  const [policies, setPolicies] = useState<PortalPolicyModel[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPolicies = async () => {
    try {
      setLoading(true);
      const response = await PortalAPI.getPolicyList(1, 5);
      setPolicies(response.rows);
    } catch (error) {
      console.error('Error fetching policies:', error);
      // 如果API失败，使用模拟数据
      setPolicies([
        {
          id: 1,
          title: "省人民政府办公厅印发《关于深化改革促进乡村医疗卫生体系健康发展的实施方案》的通知",
          type: "policy",
          description: "",
          linkUrl: "http://wjw.hubei.gov.cn/bmdt/ztzl/jkfp/zcwj/202505/t20250515_5651578.shtml",
          parentId: "",
          sortOrder: 1,
          createTime: "2025-06-06"
        },
        {
          id: 2,
          title: "省卫健委解读：《关于深化改革促进乡村医疗卫生体系健康发展的实施方案》",
          type: "policy",
          description: "",
          linkUrl: "http://wjw.hubei.gov.cn/bmdt/ztzl/jkfp/bsjd/202505/t20250515_5651541.shtml",
          parentId: "",
          sortOrder: 2,
          createTime: "2025-06-06"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  return (
    <Card
      title={
        <div className="flex items-center">
          <FileProtectOutlined className="text-red-500 mr-2" />
          <span>卫健委政策</span>
        </div>
      }
      extra={
        <Link href="/policies" className="text-blue-500 hover:text-blue-600">
          更多 →
        </Link>
      }
      className="h-full"
    >
      <Spin spinning={loading}>
        <List
          dataSource={policies}
          renderItem={(item) => (
            <List.Item className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer px-2 py-3">
              <div className="w-full">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-gray-800 font-medium line-clamp-2 flex-1 mr-2">
                    {item.title}
                  </h4>
                  <Tag color="red" className="shrink-0">
                    政策
                  </Tag>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <CalendarOutlined className="mr-1" />
                  <span>{item.createTime}</span>
                </div>
              </div>
            </List.Item>
          )}
        />
      </Spin>
    </Card>
  );
};

export default PolicyList;
