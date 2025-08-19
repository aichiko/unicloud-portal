'use client';
import React, { useRef, useState } from 'react';
import {
  ProTable,
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormDigit,
  ActionType,
  ProColumns,
  ModalForm,
  ProFormInstance
} from '@ant-design/pro-components';
import {
  Button,
  Space,
  Popconfirm,
  Tag,
  Image,
  Tooltip,
  Modal,
  App
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined
} from '@ant-design/icons';
import AdminAPI from '@/apis/adminApi';
import { useAdminUserStore, hasPermission } from '@/store/adminUserStore';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';

// 动态导入富文本编辑器
const MDEditor = dynamic(
  () => import('@uiw/react-md-editor'),
  { ssr: false }
);

// 动态导入 Markdown 预览组件
const MarkdownPreview = dynamic(
  () => import('@uiw/react-md-editor').then(mod => ({ default: mod.default.Markdown })),
  { ssr: false }
);

const NewsManagement: React.FC = () => {
  const actionRef = useRef<ActionType>(null);
  const formRef = useRef<ProFormInstance>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<PortalNewsModel | null>(null);
  const [viewingRecord, setViewingRecord] = useState<PortalNewsModel | null>(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<string>('');

  const { message } = App.useApp();

  // 列定义
  const columns: ProColumns<PortalNewsModel>[] = [
    {
      title: '标题',
      dataIndex: 'title',
      ellipsis: true,
      width: 300,
      render: (_, record) => (
        <Tooltip title={record.title}>
          <span>{record.title}</span>
        </Tooltip>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (_, record) => {
        const statusMap = {
          '0': { color: 'default', text: '未发布' },
          '1': { color: 'success', text: '已发布' },
          '2': { color: 'warning', text: '草稿' },
        };
        const status = statusMap[record.status as keyof typeof statusMap] || statusMap['0'];
        return <Tag color={status.color}>{status.text}</Tag>;
      },
      valueEnum: {
        '0': { text: '未发布', status: 'Default' },
        '1': { text: '已发布', status: 'Success' },
        '2': { text: '草稿', status: 'Warning' },
      },
    },
    {
      title: '发布时间',
      dataIndex: 'publishDate',
      width: 160,
      sorter: true,
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '排序',
      dataIndex: 'sortOrder',
      width: 80,
      search: false,
      sorter: true,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 150,
      render: (_, record) => [
        <Tooltip key="view" title="查看详情">
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          />
        </Tooltip>,
        hasPermission('system:news:edit') && (
          <Tooltip key="edit" title="编辑">
            <Button
              type="link"
              size="small"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
        ),
        hasPermission('system:news:delete') && (
          <Popconfirm
            key="delete"
            title="确定要删除这条新闻吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Tooltip title="删除">
              <Button
                type="link"
                size="small"
                danger
                icon={<DeleteOutlined />}
              />
            </Tooltip>
          </Popconfirm>
        ),
      ].filter(Boolean),
    },
  ];

  // 获取新闻列表
  const fetchNewsList = async (params: any) => {
    try {
      const response = await AdminAPI.news.getList({
        pageNum: params.current,
        pageSize: params.pageSize,
        ...params,
      });

      return {
        data: response.rows || [],
        success: true,
        total: response.total || 0,
      };
    } catch (error:any) {
      console.error('获取新闻列表失败:', error);
      message.error(error.message ?? '获取新闻列表失败');
      return {
        data: [],
        success: false,
        total: 0,
      };
    }
  };

  // 处理新增
  const handleAdd = () => {
    setEditingRecord(null);
    setModalVisible(true);
    setContent('');
    formRef.current?.resetFields();
  };

  // 处理编辑
  const handleEdit = (record: PortalNewsModel) => {
    setEditingRecord(record);
    setModalVisible(true);
    setContent(record.content || '');
    // 延迟设置表单值，确保modal已经打开
    setTimeout(() => {
      formRef.current?.setFieldsValue({
        ...record,
        publishDate: record.publishDate ? dayjs(record.publishDate) : undefined,
      });
    }, 100);
  };

  // 处理查看
  const handleView = (record: PortalNewsModel) => {
    setViewingRecord(record);
    setDetailModalVisible(true);
  };

  // 处理删除
  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      await AdminAPI.news.delete(id);
      message.success('删除成功');
      actionRef.current?.reload();
    } catch (error:any) {
      console.error('删除失败:', error);
      message.error(error.message ?? '删除失败');
    } finally {
      setLoading(false);
    }
  };

  // 处理表单提交
  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const submitData = {
        ...values,
        content: content, // 使用富文本编辑器的内容
        publishDate: values.publishDate ? dayjs(values.publishDate).format('YYYY-MM-DD HH:mm:ss') : undefined,
        id: editingRecord?.id,
      };

      if (editingRecord) {
        // 编辑
        await AdminAPI.news.update(submitData);
        message.success('更新成功');
      } else {
        // 新增
        await AdminAPI.news.create(submitData);
        message.success('创建成功');
      }

      setModalVisible(false);
      setContent('');
      actionRef.current?.reload();
      return true;
    } catch (error:any) {
      console.error('操作失败:', error);
      message.error(error.message ?? '操作失败');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <ProTable<PortalNewsModel>
        headerTitle="新闻管理"
        actionRef={actionRef}
        columns={columns}
        request={fetchNewsList}
        rowKey="id"
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        search={{
          labelWidth: 120,
          collapsed: false,
          collapseRender: (collapsed) => (collapsed ? '展开' : '收起'),
        }}
        dateFormatter="string"
        toolBarRender={() => [
          hasPermission('system:news:add') && (
            <Button
              key="add"
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAdd}
            >
              新增新闻
            </Button>
          ),
        ].filter(Boolean)}
        options={{
          reload: true,
          density: true,
          fullScreen: true,
          setting: true,
        }}
        scroll={{ x: 1200 }}
      />

      {/* 新增/编辑模态框 */}
      <ModalForm
        title={editingRecord ? '编辑新闻' : '新增新闻'}
        open={modalVisible}
        formRef={formRef}
        onOpenChange={setModalVisible}
        onFinish={handleSubmit}
        loading={loading}
        width={800}
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        modalProps={{
          destroyOnHidden: true,
          maskClosable: false,
        }}
      >
        <ProFormText
          name="title"
          label="新闻标题"
          placeholder="请输入新闻标题"
          rules={[
            { required: true, message: '请输入新闻标题' },
            { max: 200, message: '标题长度不能超过200个字符' },
          ]}
        />
        {/* 富文本编辑器 */}
        <div style={{ marginBottom: 24 }}>
          <label style={{
            display: 'block',
            marginBottom: 8,
            fontSize: 14,
            color: 'rgba(0, 0, 0, 0.85)',
            fontWeight: 500
          }}>
            新闻内容 <span style={{ color: '#ff4d4f' }}>*</span>
          </label>
          <MDEditor
            value={content}
            onChange={(val) => setContent(val || '')}
            height={300}
            data-color-mode="light"
            visibleDragbar={false}
          />
        </div>

        <ProFormText
          name="linkUrl"
          label="外部链接"
          placeholder="请输入外部链接URL"
          rules={[
            { type: 'url', message: '请输入有效的URL地址' },
          ]}
        />

        <ProFormSelect
          name="status"
          label="发布状态"
          placeholder="请选择发布状态"
          initialValue="2"
          options={[
            { label: '未发布', value: '0' },
            { label: '已发布', value: '1' },
            { label: '草稿', value: '2' },
          ]}
          rules={[
            { required: true, message: '请选择发布状态' },
          ]}
        />

        <ProFormDateTimePicker
          name="publishDate"
          label="发布时间"
          placeholder="请选择发布时间"
          rules={[
            { required: true, message: '请选择发布时间' },
          ]}
        />

        <ProFormDigit
          name="sortOrder"
          label="排序权重"
          placeholder="请输入排序权重(数字越大越靠前)"
          min={0}
          max={9999}
          initialValue={0}
          fieldProps={{
            precision: 0,
          }}
        />
      </ModalForm>

      {/* 查看详情模态框 */}
      <Modal
        title="新闻详情"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDetailModalVisible(false)}>
            关闭
          </Button>,
        ]}
        width={800}
      >
        {viewingRecord && (
          <div style={{ padding: '16px 0' }}>
            <div style={{ marginBottom: 16 }}>
              <strong>标题：</strong>{viewingRecord.title}
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>状态：</strong>
              <Tag color={viewingRecord.status === '1' ? 'green' : viewingRecord.status === '0' ? 'red' : 'orange'}>
                {viewingRecord.status === '1' ? '已发布' : viewingRecord.status === '0' ? '未发布' : '草稿'}
              </Tag>
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>发布时间：</strong>{viewingRecord.publishDate}
            </div>
            {viewingRecord.linkUrl && (
              <div style={{ marginBottom: 16 }}>
                <strong>外部链接：</strong>
                <a href={viewingRecord.linkUrl} target="_blank" rel="noopener noreferrer">
                  {viewingRecord.linkUrl}
                </a>
              </div>
            )}
            <div style={{ marginBottom: 16 }}>
              <strong>内容：</strong>
              <div style={{
                border: '1px solid #d9d9d9',
                borderRadius: 6,
                padding: 16,
                marginTop: 8,
                background: '#fafafa'
              }}>
                <MarkdownPreview source={viewingRecord.content || '暂无内容'} />
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default NewsManagement;
