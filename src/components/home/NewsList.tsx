'use client';
import React, { useEffect, useState } from 'react';
import { Card, List, Tag, Spin } from 'antd';
import { LineChartOutlined, CalendarOutlined } from '@ant-design/icons';
import PortalAPI from '@/apis/portalApi';
import Link from 'next/link';

const NewsList: React.FC = () => {
  const [news, setNews] = useState<PortalNewsModel[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await PortalAPI.getNewsList(1, 5);
      setNews(response.rows);
    } catch (error) {
      console.error('Error fetching news:', error);
      // 如果API失败，使用模拟数据
      setNews([
        {
          id: 1,
          title: "牛肉类专委委办第新第书立省者",
          content: "",
          publishDate: "2025-07-08",
          status: "1",
          isHot: 1
        },
        {
          id: 2,
          title: "各类接触许犬还候增件申议无",
          content: "",
          publishDate: "2025-05-02",
          status: "1",
          isHot: 0
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <Card
      title={
        <div className="flex items-center">
          <LineChartOutlined className="text-green-500 mr-2" />
          <span>行业动态</span>
        </div>
      }
      extra={
        <Link href="/news" className="text-blue-500 hover:text-blue-600">
          更多 →
        </Link>
      }
      className="h-full"
    >
      <Spin spinning={loading}>
        <List
          dataSource={news}
          renderItem={(item) => (
            <List.Item className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer px-2 py-3">
              <div className="w-full">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-gray-800 font-medium line-clamp-2 flex-1 mr-2">
                    {item.title}
                  </h4>
                  <div className="shrink-0 flex gap-1">
                    {item.isHot === 1 && (
                      <Tag color="red" className="text-xs">
                        热门
                      </Tag>
                    )}
                    <Tag color="green" className="text-xs">
                      动态
                    </Tag>
                  </div>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <CalendarOutlined className="mr-1" />
                  <span>{item.publishDate}</span>
                </div>
              </div>
            </List.Item>
          )}
        />
      </Spin>
    </Card>
  );
};

export default NewsList;
