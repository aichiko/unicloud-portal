'use client';
import React, { useState, useEffect } from "react";
import '@ant-design/v5-patch-for-react-19';
import { ConfigProvider, App as AntdApp } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn'; 
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

function AntdComponents({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider locale={zhCN}
      componentSize="middle"
      theme={{
        token: {
          // #0b45a1 #4169e1 #242BA0
          colorPrimary: '#0b45a1',
        },
        components: {
          Layout: {
            headerHeight: 80,
          },
          Menu: {
            itemBg: '#ffffff',
            itemPaddingInline: 36
          },
          Carousel: {
            arrowSize: 32,
            arrowOffset: 16,
            dotActiveWidth: 36,
            dotWidth: 36,
            dotGap: 8
          }
        },
      }}>
      <AntdApp>
        {children}
      </AntdApp>
    </ConfigProvider>
  );
}

function AntdProvider({ children }: Readonly<{ children: React.ReactNode }>) {

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <AntdComponents>
        <div className="loading-container flex items-center justify-center h-screen">
          <span>Loading...</span>
        </div>
      </AntdComponents>
    );
  }

  return (
    <AntdComponents>
      {children}
    </AntdComponents>
  )
}

export default AntdProvider;