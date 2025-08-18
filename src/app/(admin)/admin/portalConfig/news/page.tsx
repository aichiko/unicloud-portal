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
  message,
  Tag,
  Image,
  Tooltip
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

const NewsManagement: React.FC = () => {
  const actionRef = useRef<ActionType>(null);
  const formRef = useRef<ProFormInstance>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<PortalNewsModel | null>(null);
  const [viewingRecord, setViewingRecord] = useState<PortalNewsModel | null>(null);
  const [loading, setLoading] = useState(false);

  const { setBreadcrumbs } = useAdminUserStore();

  React.useEffect(() => {
    setBreadcrumbs([
      { title: '首页', path: '/admin' },
      { title: '新闻管理' }
    ]);
  }, [setBreadcrumbs]);

  // 列定义
  const columns: ProColumns<PortalNewsModel>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80,
      sorter: true,
    },
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
      title: '封面图',
      dataIndex: 'coverUrl',
      width: 100,
      search: false,
      render: (_, record) => (
        record.coverUrl ? (
          <Image
            src={record.coverUrl}
            alt="封面"
            width={60}
            height={40}
            style={{ objectFit: 'cover' }}
            fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN2AaHcRisgMVisIENdsAGOwAD2wEb2AE42AY7gAPcgQ1sgBvYgQ1sgQNs7QCGbQC7FQhEsVLePc67/2rp6X5/2q/6q+qb/u8qdWZEZT0yRnk="
          />
        ) : (
          <span style={{ color: '#999' }}>无封面</span>
        )
      ),
    },
    {
      title: '新闻类型',
      dataIndex: 'newsType',
      width: 100,
      valueEnum: {
        news: { text: '普通新闻', status: 'Default' },
        announcement: { text: '公告', status: 'Processing' },
        activity: { text: '活动', status: 'Success' },
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
      title: '是否热点',
      dataIndex: 'isHot',
      width: 100,
      search: false,
      render: (_, record) => (
        <Tag color={record.isHot ? 'red' : 'default'}>
          {record.isHot ? '热点' : '普通'}
        </Tag>
      ),
    },
    {
      title: '发布日期',
      dataIndex: 'publishDate',
      width: 120,
      sorter: true,
      valueType: 'date',
    },
    {
      title: '排序',
      dataIndex: 'sortOrder',
      width: 80,
      search: false,
      sorter: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 120,
      search: false,
      valueType: 'dateTime',
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
    } catch (error) {
      console.error('获取新闻列表失败:', error);
      message.error('获取新闻列表失败');
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
    formRef.current?.resetFields();
  };

  // 处理编辑
  const handleEdit = (record: PortalNewsModel) => {
    setEditingRecord(record);
    setModalVisible(true);
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
        publishDate: values.publishDate ? dayjs(values.publishDate).format('YYYY-MM-DD') : undefined,
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
          destroyOnClose: true,
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

        <ProFormTextArea
          name="content"
          label="新闻内容"
          placeholder="请输入新闻内容"
          fieldProps={{
            rows: 6,
          }}
          rules={[
            { required: true, message: '请输入新闻内容' },
          ]}
        />

        <ProFormText
          name="coverUrl"
          label="封面图片URL"
          placeholder="请输入封面图片URL"
          rules={[
            { type: 'url', message: '请输入有效的URL地址' },
          ]}
        />

        <ProFormText
          name="linkUrl"
          label="外部链接"
          placeholder="请输入外部链接URL"
          rules={[
            { type: 'url', message: '请输入有效的URL地址' },
          ]}
        />

        <ProFormSelect
          name="newsType"
          label="新闻类型"
          placeholder="请选择新闻类型"
          options={[
            { label: '普通新闻', value: 'news' },
            { label: '公告', value: 'announcement' },
            { label: '活动', value: 'activity' },
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

        <ProFormSelect
          name="isHot"
          label="是否热点"
          placeholder="请选择是否为热点新闻"
          initialValue={0}
          options={[
            { label: '普通', value: 0 },
            { label: '热点', value: 1 },
          ]}
        />

        <ProFormDatePicker
          name="publishDate"
          label="发布日期"
          placeholder="请选择发布日期"
          rules={[
            { required: true, message: '请选择发布日期' },
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
    </div>
  );
};

export default NewsManagement;
