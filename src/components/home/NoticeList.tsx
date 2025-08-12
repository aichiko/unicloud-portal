"use client";
import React, { useState, useEffect } from 'react';
import { Card, List, Tag, Spin } from 'antd';
import PortalAPI from '@/apis/portalApi';
import HomeServiceTitle from '../common/HomeServiceTitle';
import DateTimeComponent from '../common/DateTimeComponent';
import InformListItem from '../common/InformListItem';

const NoticeList: React.FC = () => {
  const [notices, setNotices] = useState<PortalNoticeModel[]>([]);
  const [selectedNotice, setSelectedNotice] = useState<PortalNoticeModel | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchNotices = async () => {
    try {
      // 尝试获取API数据
      const response = await PortalAPI.getNoticeList(1, 1);
      if (response && response.rows) {
        setNotices(response.rows);
        if (response.rows.length > 0) {
          setSelectedNotice(response.rows[0]);
        }
      } else {
        throw new Error('API response is empty');
      }
    } catch (error) {
      console.log('API failed, using mock data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6">
        <div className="flex justify-center py-8">
          <Spin size="large" />
        </div>
      </div>
    );
  }


  return (
    <div className="bg-white p-6">
      <HomeServiceTitle title="通知公告" />
      <div className='border-[#2769AF] border-2 mt-4 min-h-[388px] p-14'>
        
        {
          selectedNotice && (
            <>
          <DateTimeComponent dateString={selectedNotice?.publishTime} />
            <InformListItem
              title={selectedNotice.noticeTitle}
              content={selectedNotice.noticeContent}
              firstItem={true}
            />
            </>
          )
        }
      </div>
    </div>
  );
};

export default NoticeList;
