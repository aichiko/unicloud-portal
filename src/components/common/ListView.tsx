'use client';
import React, { useEffect, useState } from 'react';
import { Card, List, Tag, Spin, Pagination, Typography } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface ListViewProps<T> {
  title: string;
  icon: React.ReactNode;
  themeColor: string;
  borderColor: string;
  tagColor: string;
  tagText: string;
  fetchData: (pageNum: number, pageSize: number) => Promise<{ rows: T[]; total: number }>;
  renderTitle: (item: T) => string;
  renderDate: (item: T) => string;
  renderTags?: (item: T) => React.ReactNode;
  onItemClick?: (item: T) => void;
  pageSize?: number;
}

function ListView<T>({
  title,
  icon,
  themeColor,
  borderColor,
  tagColor,
  tagText,
  fetchData,
  renderTitle,
  renderDate,
  renderTags,
  onItemClick,
  pageSize = 10
}: ListViewProps<T>) {
  const [dataSource, setDataSource] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const loadData = async (page: number) => {
    try {
      setLoading(true);
      const response = await fetchData(page, pageSize);
      setDataSource(response.rows);
      setTotal(response.total);
    } catch (error) {
      console.error('Error fetching data:', error);
      setDataSource([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemClick = (item: T) => {
    if (onItemClick) {
      onItemClick(item);
    }
  };

  return (
    <div className="container mx-auto px-4">
      {/* 页面标题 */}
      <Card 
        className="shadow-sm"
        style={{ 
          marginBottom: '24px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
        }}
      >
          <div className="flex items-center">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
              style={{ backgroundColor: `${themeColor}20` }}
            >
              {icon}
            </div>
            <Title level={2} className="mb-0" style={{ color: themeColor }}>
              {title}
            </Title>
          </div>
        </Card>

        {/* 列表内容 */}
        <Card 
          className="shadow-sm"
          style={{ 
            borderTopWidth: '4px',
            borderTopStyle: 'solid',
            borderTopColor: borderColor,
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
          }}
        >
          <Spin spinning={loading}>
            <List
              dataSource={dataSource}
              renderItem={(item, index) => (
                <List.Item 
                  className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer px-4 py-4 border-b border-gray-100 last:border-b-0"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="w-full">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-gray-800 font-medium text-lg leading-relaxed flex-1 mr-4">
                        {renderTitle(item)}
                      </h3>
                      <div className="shrink-0 flex gap-2">
                        {renderTags && renderTags(item)}
                        <Tag color={tagColor} className="font-medium">
                          {tagText}
                        </Tag>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <CalendarOutlined className="mr-2" />
                      <span>{renderDate(item)}</span>
                    </div>
                  </div>
                </List.Item>
              )}
              locale={{
                emptyText: loading ? '加载中...' : '暂无数据'
              }}
            />
            
            {/* 分页器 */}
            {total > 0 && (
              <div className="flex justify-center mt-8">
                <Pagination
                  current={currentPage}
                  total={total}
                  pageSize={pageSize}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                  showQuickJumper
                  showTotal={(total, range) => 
                    `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
                  }
                  className="text-center"
                />
              </div>
            )}
          </Spin>
        </Card>
    </div>
  );
}

export default ListView;
