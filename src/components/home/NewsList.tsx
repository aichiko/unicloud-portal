'use client';
import React, { useEffect, useState } from 'react';
import { Card, List, Tag, Spin } from 'antd';
import { LineChartOutlined, CalendarOutlined } from '@ant-design/icons';
import PortalAPI from '@/apis/portalApi';

// 需要导出类型
export interface PortalNewsModel {
  id: number;
  title: string;
  content: string;
  publishDate: string;
  coverUrl?: string;
  newsType?: string;
  isHot?: number;
  sortOrder?: number;
  status?: string;
  linkUrl?: string;
}

const NewsList: React.FC = () => {
  const [news, setNews] = useState<PortalNewsModel[]>([]);
  const [selectedNews, setSelectedNews] = useState<PortalNewsModel | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await PortalAPI.getNewsList(1, 5);
      if (response && response.rows) {
        setNews(response.rows);
        if (response.rows.length > 0) {
          setSelectedNews(response.rows[0]);
        }
      } else {
        throw new Error('API response is empty');
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      // 如果API失败，使用模拟数据
      const mockData = [
        {
          id: 1,
          title: "医疗科技创新助力智慧医疗发展",
          content: "随着人工智能、大数据等技术的快速发展，医疗行业正迎来数字化转型的黄金时期。智慧医疗解决方案正在改变传统的医疗服务模式...",
          publishDate: "2023.05",
          isHot: 1,
          linkUrl: "https://example.com"
        }
      ];
      setNews(mockData);
      setSelectedNews(mockData[0]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const onNewsClick = (newsItem: PortalNewsModel) => {
    if (newsItem.linkUrl) {
      window.open(newsItem.linkUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">行业动态</h2>
        <div className="flex justify-center py-8">
          <Spin size="large" />
        </div>
      </div>
    );
  }

  if (!news.length) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">行业动态</h2>
        <div className="text-center py-8 text-gray-500">暂无行业动态</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold mb-4">行业动态</h2>
      
      {/* 主要内容区域 */}
      <div className="bg-green-50 rounded-lg p-6 mb-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-medium text-gray-900 leading-tight">
            {selectedNews?.title}
            {selectedNews?.isHot === 1 && (
              <Tag color="red" className="ml-2 text-xs">热门</Tag>
            )}
          </h3>
          <div className="text-lg font-medium text-green-600">
            {selectedNews?.publishDate}
          </div>
        </div>
        
        <p className="text-gray-700 leading-relaxed">
          {selectedNews?.content}
        </p>
        
        {selectedNews?.linkUrl && (
          <div className="mt-4">
            <button
              onClick={() => selectedNews && onNewsClick(selectedNews)}
              className="text-green-600 hover:text-green-700 font-medium cursor-pointer"
            >
              查看详情 →
            </button>
          </div>
        )}
      </div>

      {/* 其他新闻列表 */}
      <div className="space-y-2">
        {news.slice(1).map((newsItem) => (
          <div
            key={newsItem.id}
            className="flex justify-between items-center py-2 px-3 hover:bg-green-50 rounded cursor-pointer transition-colors"
            onClick={() => setSelectedNews(newsItem)}
          >
            <span className="text-gray-700 truncate flex-1 flex items-center">
              {newsItem.title}
              {newsItem.isHot === 1 && (
                <Tag color="red" className="ml-2 text-xs">热门</Tag>
              )}
            </span>
            <span className="text-gray-500 text-sm ml-4">
              {newsItem.publishDate}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsList;
