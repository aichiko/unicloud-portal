'use client';
import React, { useRef, useState } from 'react';
import {
  ProTable,
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormDatePicker,
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

const NoticeManagement: React.FC = () => {
  const actionRef = useRef<ActionType>(null);
  const formRef = useRef<ProFormInstance>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<PortalNoticeModel | null>(null);
  const [viewingRecord, setViewingRecord] = useState<PortalNoticeModel | null>(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<string>('');

  const { message } = App.useApp();

  // 列定义
  const columns: ProColumns<PortalNoticeModel>[] = [
    {
      title: '通知标题',
      dataIndex: 'noticeTitle',
      ellipsis: true,
      width: 300,
      render: (_, record) => (
        <Tooltip title={record.noticeTitle}>
          <span>{record.noticeTitle}</span>
        </Tooltip>
      ),
    },
    {
      title: '通知类型',
      dataIndex: 'noticeType',
      width: 100,
      render: (_, record) => {
        const typeMap = {
          '0': { color: 'red', text: '重要' },
          '1': { color: 'blue', text: '通知' },
          '2': { color: 'orange', text: '紧急' },
        };
        const type = typeMap[record.noticeType as keyof typeof typeMap] || typeMap['1'];
        return <Tag color={type.color}>{type.text}</Tag>;
      },
      valueEnum: {
        '0': { text: '重要', status: 'Error' },
        '1': { text: '通知', status: 'Processing' },
        '2': { text: '紧急', status: 'Warning' },
      },
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
      dataIndex: 'publishTime',
      width: 160,
      sorter: true,
      valueType: 'date',
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
        hasPermission('system:notice:edit') && (
          <Tooltip key="edit" title="编辑">
            <Button
              type="link"
              size="small"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
        ),
        hasPermission('system:notice:delete') && (
          <Popconfirm
            key="delete"
            title="确定要删除这条通知吗？"
            onConfirm={() => handleDelete(record.noticeId)}
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

  // 获取通知列表
  const fetchNoticesList = async (params: any) => {
    try {
      const response = await AdminAPI.notices.getList({
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
      console.error('获取通知列表失败:', error);
      message.error(error.message ?? '获取通知列表失败');
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
  const handleEdit = (record: PortalNoticeModel) => {
    setEditingRecord(record);
    setModalVisible(true);
    setContent(record.noticeContent || '');
    // 延迟设置表单值，确保modal已经打开
    setTimeout(() => {
      formRef.current?.setFieldsValue({
        noticeTitle: record.noticeTitle,
        noticeType: record.noticeType,
        status: record.status,
        publishTime: record.publishTime ? dayjs(record.publishTime) : undefined,
      });
    }, 100);
  };

  // 处理查看
  const handleView = (record: PortalNoticeModel) => {
    setViewingRecord(record);
    setDetailModalVisible(true);
  };

  // 处理删除
  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      await AdminAPI.notices.delete(id);
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
        noticeContent: content, // 使用富文本编辑器的内容
        publishTime: values.publishTime ? dayjs(values.publishTime).format('YYYY-MM-DD') : undefined,
        noticeId: editingRecord?.noticeId,
      };

      if (editingRecord) {
        // 编辑
        await AdminAPI.notices.update(submitData);
        message.success('更新成功');
      } else {
        // 新增
        await AdminAPI.notices.create(submitData);
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
      <ProTable<PortalNoticeModel>
        headerTitle="通知管理"
        actionRef={actionRef}
        columns={columns}
        request={fetchNoticesList}
        rowKey="noticeId"
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
          hasPermission('system:notice:add') && (
            <Button
              key="add"
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAdd}
            >
              新增通知
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
        title={editingRecord ? '编辑通知' : '新增通知'}
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
          name="noticeTitle"
          label="通知标题"
          placeholder="请输入通知标题"
          rules={[
            { required: true, message: '请输入通知标题' },
            { max: 200, message: '标题长度不能超过200个字符' },
          ]}
        />

        <ProFormSelect
          name="noticeType"
          label="通知类型"
          placeholder="请选择通知类型"
          options={[
            { label: '重要', value: '0' },
            { label: '通知', value: '1' },
            { label: '紧急', value: '2' },
          ]}
          rules={[
            { required: true, message: '请选择通知类型' },
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
            通知内容 <span style={{ color: '#ff4d4f' }}>*</span>
          </label>
          <MDEditor
            value={content}
            onChange={(val) => setContent(val || '')}
            height={300}
            data-color-mode="light"
            visibleDragbar={false}
          />
        </div>

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

        <ProFormDatePicker
          name="publishTime"
          label="发布时间"
          placeholder="请选择发布时间"
          rules={[
            { required: true, message: '请选择发布时间' },
          ]}
        />
      </ModalForm>

      {/* 查看详情模态框 */}
      <Modal
        title="通知详情"
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
              <strong>标题：</strong>{viewingRecord.noticeTitle}
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>类型：</strong>
              <Tag color={viewingRecord.noticeType === '0' ? 'red' : viewingRecord.noticeType === '1' ? 'blue' : 'orange'}>
                {viewingRecord.noticeType === '0' ? '重要' : viewingRecord.noticeType === '1' ? '通知' : '紧急'}
              </Tag>
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>状态：</strong>
              <Tag color={viewingRecord.status === '1' ? 'green' : viewingRecord.status === '0' ? 'red' : 'orange'}>
                {viewingRecord.status === '1' ? '已发布' : viewingRecord.status === '0' ? '未发布' : '草稿'}
              </Tag>
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>发布时间：</strong>{viewingRecord.publishTime}
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>内容：</strong>
              <div style={{
                border: '1px solid #d9d9d9',
                borderRadius: 6,
                padding: 16,
                marginTop: 8,
                background: '#fafafa'
              }}>
                <MarkdownPreview source={viewingRecord.noticeContent || '暂无内容'} />
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default NoticeManagement;
