"use client";
import React from 'react';
import { Layout } from 'antd';
import { Footer, Header } from '@/components';

const { Content } = Layout;

function PortalLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <Layout className="h-screen flex flex-col">
      <Header />
      <Content className='flex-1 overflow-auto'>
        {children}
        <Footer />
      </Content>
    </Layout>
  );
}

export default PortalLayout;