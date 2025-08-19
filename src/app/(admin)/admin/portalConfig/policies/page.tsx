'use client';
import React, { useRef, useState } from 'react';
import {
  ProTable,
  ProColumns,
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormDigit,
  ActionType,
  ProFormInstance
} from '@ant-design/pro-components';
import {
  Button,
  Popconfirm,
  Tooltip,
  Modal,
  App,
  Space,
  Tag
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  LinkOutlined
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

const PolicyManagement: React.FC = () => {
  const actionRef = useRef<ActionType>(null);
  const formRef = useRef<ProFormInstance>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<PortalPolicyModel | null>(null);
  const [viewingRecord, setViewingRecord] = useState<PortalPolicyModel | null>(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<string>('');

  const { message } = App.useApp();

  // 列定义
  const columns: ProColumns<PortalPolicyModel>[] = [
    {
      title: '政策标题',
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
      title: '政策类型',
      dataIndex: 'subType',
      width: 120,
      render: (_, record) => {
        const typeMap = {
          'national': { color: 'blue', text: '卫健委政策' },
          'academic': { color: 'green', text: '学术政策' },
        };
        const type = typeMap[record.subType as keyof typeof typeMap];
        return type ? <Tag color={type.color}>{type.text}</Tag> : <Tag>未分类</Tag>;
      },
      valueEnum: {
        'national': { text: '卫健委政策', status: 'Processing' },
        'academic': { text: '学术政策', status: 'Success' },
      },
    },
    {
      title: '链接地址',
      dataIndex: 'linkUrl',
      ellipsis: true,
      width: 250,
      search: false,
      render: (_, record) => (
        record.linkUrl ? (
          <Space>
            <a href={record.linkUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#1890ff' }}>
              查看原文
            </a>
            <LinkOutlined style={{ color: '#1890ff' }} />
          </Space>
        ) : '-'
      ),
    },
    {
      title: '排序',
      dataIndex: 'sortOrder',
      width: 80,
      search: false,
      sorter: true,
      render: (text) => text || 0,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 160,
      sorter: true,
      valueType: 'dateTime',
      search: false,
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
        hasPermission('system:policy:edit') && (
          <Tooltip key="edit" title="编辑">
            <Button
              type="link"
              size="small"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
        ),
        hasPermission('system:policy:delete') && (
          <Popconfirm
            key="delete"
            title="确定要删除这条政策吗？"
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

  // 获取政策列表
  const fetchPoliciesList = async (params: any) => {
    try {
      const response = await AdminAPI.policies.getList({
        pageNum: params.current,
        pageSize: params.pageSize,
        ...params,
      });

      return {
        data: response.rows || [],
        success: true,
        total: response.total || 0,
      };
    } catch (error) {
      console.error('获取政策列表失败:', error);
      message.error('获取政策列表失败');
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
  const handleEdit = (record: PortalPolicyModel) => {
    setEditingRecord(record);
    setModalVisible(true);
    setContent(record.content || '');
    // 延迟设置表单值，确保modal已经打开
    setTimeout(() => {
      formRef.current?.setFieldsValue({
        title: record.title,
        subType: record.subType,
        linkUrl: record.linkUrl,
        sortOrder: record.sortOrder || 0,
      });
    }, 100);
  };

  // 处理查看
  const handleView = (record: PortalPolicyModel) => {
    setViewingRecord(record);
    setDetailModalVisible(true);
  };

  // 处理删除
  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      await AdminAPI.policies.delete(id);
      message.success('删除成功');
      actionRef.current?.reload();
    } catch (error) {
      console.error('删除失败:', error);
      message.error('删除失败');
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
        type: 'policy', // 固定为 policy 类型
        id: editingRecord?.id,
      };

      if (editingRecord) {
        // 编辑
        await AdminAPI.policies.update(submitData);
        message.success('更新成功');
      } else {
        // 新增
        await AdminAPI.policies.create(submitData);
        message.success('创建成功');
      }

      setModalVisible(false);
      setContent('');
      actionRef.current?.reload();
      return true;
    } catch (error) {
      console.error('操作失败:', error);
      message.error('操作失败');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <ProTable<PortalPolicyModel>
        headerTitle="政策管理"
        actionRef={actionRef}
        columns={columns}
        request={fetchPoliciesList}
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
          hasPermission('system:policy:add') && (
            <Button
              key="add"
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAdd}
            >
              新增政策
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
        title={editingRecord ? '编辑政策' : '新增政策'}
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
          label="政策标题"
          placeholder="请输入政策标题"
          rules={[
            { required: true, message: '请输入政策标题' },
            { max: 200, message: '标题长度不能超过200个字符' },
          ]}
        />

        <ProFormSelect
          name="subType"
          label="政策类型"
          placeholder="请选择政策类型"
          options={[
            { label: '卫健委政策', value: 'national' },
            { label: '学术政策', value: 'academic' },
          ]}
          rules={[
            { required: true, message: '请选择政策类型' },
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
            政策内容 <span style={{ color: '#ff4d4f' }}>*</span>
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
          label="链接地址"
          placeholder="请输入原文链接地址"
          rules={[
            { type: 'url', message: '请输入有效的URL地址' },
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
        title="政策详情"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDetailModalVisible(false)}>
            关闭
          </Button>,
        ]}
        width={900}
      >
        {viewingRecord && (
          <div style={{ padding: '16px 0' }}>
            <div style={{ marginBottom: 16 }}>
              <strong>标题：</strong>{viewingRecord.title}
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>政策类型：</strong>
              <Tag color={viewingRecord.subType === 'national' ? 'blue' : 'green'}>
                {viewingRecord.subType === 'national' ? '卫健委政策' : viewingRecord.subType === 'academic' ? '学术政策' : '未分类'}
              </Tag>
            </div>
            {viewingRecord.linkUrl && (
              <div style={{ marginBottom: 16 }}>
                <strong>原文链接：</strong>
                <a href={viewingRecord.linkUrl} target="_blank" rel="noopener noreferrer">
                  {viewingRecord.linkUrl}
                </a>
              </div>
            )}
            <div style={{ marginBottom: 16 }}>
              <strong>排序权重：</strong>{viewingRecord.sortOrder || 0}
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>创建时间：</strong>{viewingRecord.createTime}
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>更新时间：</strong>{viewingRecord.updateTime}
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>内容：</strong>
              <div style={{
                border: '1px solid #d9d9d9',
                borderRadius: 6,
                padding: 16,
                marginTop: 8,
                background: '#fafafa',
                maxHeight: 400,
                overflow: 'auto'
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

export default PolicyManagement;
