'use client';
import React, { useEffect, useState } from 'react';
import { Button, List, Spin } from 'antd';
import PortalAPI from '@/apis/portalApi';
import HomeServiceTitle from '../common/HomeServiceTitle';
import ServiceListItem from './ServiceListItem';
import { useRouter } from 'next/navigation';

const NewsList: React.FC = () => {
  const [news, setNews] = useState<PortalNewsModel[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await PortalAPI.getNewsList(1, 3);
      if (response && response.rows) {
        // status == 1 已发布，才会显示
        const filteredNews = response.rows.filter(item => (item.status ?? '0') == '1');
        setNews(filteredNews);
      } else {
        throw new Error('API response is empty');
      }
    } catch (error) {
      console.error('Error fetching news:', error);
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

  const router = useRouter();

  // 了解更多
  const onLearnMoreClick = () => {
    // navigate to news list page
    router.push('/news');
  };

  if (loading) {
    return (
      <div className="bg-white p-6">
        <HomeServiceTitle title='行业动态' />
        <div className="flex justify-center py-8">
          <Spin size="large" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6">
      <HomeServiceTitle title='行业动态' />
      <List
        split={false}
        style={{ marginTop: '36px' }}
        dataSource={news}
        renderItem={(item, index) => (
          <ServiceListItem itemModel={item} firstItem={index === 0} onClick={() => onNewsClick(item)} />
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

export default NewsList;
