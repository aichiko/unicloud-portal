'use client';
import React, { useEffect, useState } from 'react';
import { Card, List, Tag, Spin } from 'antd';
import { NotificationOutlined, CalendarOutlined } from '@ant-design/icons';
import PortalAPI from '@/apis/portalApi';
import Link from 'next/link';

const NoticeList: React.FC = () => {
  const [notices, setNotices] = useState<PortalNoticeModel[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const response = await PortalAPI.getNoticeList(1, 5);
      setNotices(response.rows);
    } catch (error) {
      console.error('Error fetching notices:', error);
      // 如果API失败，使用模拟数据
      setNotices([
        {
          noticeId: 1,
          noticeTitle: "平原县推进DZSY牛投建监护明期指导毛手青",
          noticeContent: "",
          noticeType: "1",
          publishTime: "2025-05-08",
          status: "1"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <Card
      title={
        <div className="flex items-center">
          <NotificationOutlined className="text-blue-500 mr-2" />
          <span>通知公告</span>
        </div>
      }
      extra={
        <Link href="/notices" className="text-blue-500 hover:text-blue-600">
          更多 →
        </Link>
      }
      className="h-full"
    >
      <Spin spinning={loading}>
        <List
          dataSource={notices}
          renderItem={(item) => (
            <List.Item className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer px-2 py-3">
              <div className="w-full">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-gray-800 font-medium line-clamp-2 flex-1 mr-2">
                    {item.noticeTitle}
                  </h4>
                  <Tag color="blue" className="shrink-0">
                    公告
                  </Tag>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <CalendarOutlined className="mr-1" />
                  <span>{item.publishTime}</span>
                </div>
              </div>
            </List.Item>
          )}
        />
      </Spin>
    </Card>
  );
};

export default NoticeList;
