'use client';
import React, { useRef, useState, useEffect } from 'react';
import {
  ProTable,
  ProColumns,
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormDigit,
  ProFormTreeSelect,
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

interface TreeTableDataType extends PortalTitleModel {
  children?: TreeTableDataType[];
}

const CardManagement: React.FC = () => {
  const actionRef = useRef<ActionType>(null);
  const formRef = useRef<ProFormInstance>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<PortalTitleModel | null>(null);
  const [viewingRecord, setViewingRecord] = useState<PortalTitleModel | null>(null);
  const [loading, setLoading] = useState(false);
  const [treeData, setTreeData] = useState<TreeTableDataType[]>([]);

  const { message: messageApi } = App.useApp();

  // 将扁平数据转换为树形数据
  const buildTreeData = (flatData: PortalTitleModel[]): TreeTableDataType[] => {
    const dataMap = new Map<number, TreeTableDataType>();
    const result: TreeTableDataType[] = [];

    // 先创建所有节点
    flatData.forEach(item => {
      const node: TreeTableDataType = {
        ...item,
        children: []
      };
      dataMap.set(item.id, node);
    });

    // 构建父子关系
    flatData.forEach(item => {
      const node = dataMap.get(item.id);
      if (!node) return;

      if (item.parentId === '0' || !item.parentId) {
        // 根节点
        result.push(node);
      } else {
        // 子节点
        const parentId = typeof item.parentId === 'string' ? parseInt(item.parentId) : item.parentId;
        const parent = dataMap.get(parentId);
        if (parent) {
          parent.children = parent.children || [];
          parent.children.push(node);
        }
      }
    });

    // 按 sortOrder 排序
    const sortTreeData = (nodes: TreeTableDataType[]): TreeTableDataType[] => {
      return nodes.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)).map(node => ({
        ...node,
        children: node.children && node.children.length > 0 ? sortTreeData(node.children) : undefined
      }));
    };

    return sortTreeData(result);
  };

  // 定义表格列
  const columns: ProColumns<TreeTableDataType>[] = [
    {
      title: '标题',
      dataIndex: 'title',
      ellipsis: true,
      width: 200,
      render: (_, record) => (
        <Space>
          <span style={{ fontWeight: record.parentId === '0' ? 'bold' : 'normal' }}>
            {record.title}
          </span>
          {record.linkUrl && (
            <Tooltip title={record.linkUrl}>
              <LinkOutlined style={{ color: '#1890ff' }} />
            </Tooltip>
          )}
        </Space>
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      ellipsis: true,
      width: 300,
      search: false,
    },
    {
      title: '链接地址',
      dataIndex: 'linkUrl',
      ellipsis: true,
      width: 300,
      search: false,
      render: (text) => (
        text ? (
          <a href={text as string} target="_blank" rel="noopener noreferrer" style={{ color: '#1890ff' }}>
            {text}
          </a>
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
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (_, record) => [
        <Tooltip key="add" title="新增子项">
          <Button
            type="link"
            size="small"
            icon={<PlusOutlined />}
            onClick={() => handleAdd(record.id)}
          />
        </Tooltip>,
        <Tooltip key="view" title="查看详情">
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          />
        </Tooltip>,
        hasPermission('system:card:edit') && (
          <Tooltip key="edit" title="编辑">
            <Button
              type="link"
              size="small"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
        ),
        hasPermission('system:card:delete') && (
          <Popconfirm
            key="delete"
            title="确定要删除这个卡片吗？"
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

  // 获取卡片列表数据
  const fetchCardsData = async () => {
    try {
      const response = await AdminAPI.cards.getList();
      const flatData = response.rows || [];
      
      const tree = buildTreeData(flatData);
      setTreeData(tree);
      
      return {
        data: tree,
        success: true,
        total: flatData.length,
      };
    } catch (error) {
      console.error('获取卡片列表失败:', error);
      messageApi.error('获取卡片列表失败');
      return {
        data: [],
        success: false,
        total: 0,
      };
    }
  };

  // 获取树形选择器数据
  const getTreeSelectData = (): any[] => {
    const buildSelectTree = (nodes: TreeTableDataType[]): any[] => {
      return nodes.map(node => ({
        title: node.title,
        value: node.id.toString(),
        children: node.children && node.children.length > 0 ? buildSelectTree(node.children) : undefined
      }));
    };

    return [
      {
        title: '根目录',
        value: '0',
        children: buildSelectTree(treeData)
      }
    ];
  };

  // 处理新增
  const handleAdd = (parentId?: number) => {
    setEditingRecord(null);
    setModalVisible(true);
    setTimeout(() => {
      formRef.current?.resetFields();
      if (parentId !== undefined) {
        formRef.current?.setFieldsValue({ parentId: parentId.toString() });
      } else {
        formRef.current?.setFieldsValue({ parentId: '0' });
      }
    }, 100);
  };

  // 处理编辑
  const handleEdit = (record: PortalTitleModel) => {
    setEditingRecord(record);
    setModalVisible(true);
    setTimeout(() => {
      formRef.current?.setFieldsValue({
        title: record.title,
        description: record.description,
        linkUrl: record.linkUrl,
        parentId: record.parentId || '0',
        sortOrder: record.sortOrder || 0,
      });
    }, 100);
  };

  // 处理查看
  const handleView = (record: PortalTitleModel) => {
    setViewingRecord(record);
    setDetailModalVisible(true);
  };

  // 处理删除
  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      await AdminAPI.cards.delete(id);
      messageApi.success('删除成功');
      actionRef.current?.reload();
    } catch (error) {
      console.error('删除失败:', error);
      messageApi.error('删除失败');
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
        type: 'title', // 固定为 title 类型
        parentId: values.parentId === '0' ? '0' : values.parentId,
        id: editingRecord?.id,
      };

      if (editingRecord) {
        // 编辑
        await AdminAPI.cards.update(submitData);
        messageApi.success('更新成功');
      } else {
        // 新增
        await AdminAPI.cards.create(submitData);
        messageApi.success('创建成功');
      }

      setModalVisible(false);
      actionRef.current?.reload();
      return true;
    } catch (error) {
      console.error('操作失败:', error);
      messageApi.error('操作失败');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <ProTable<TreeTableDataType>
        headerTitle="卡片内容管理"
        actionRef={actionRef}
        columns={columns}
        request={fetchCardsData}
        rowKey="id"
        expandable={{
          defaultExpandAllRows: true,
        }}
        pagination={false}
        search={false}
        toolBarRender={() => [
          hasPermission('system:card:add') && (
            <Button
              key="add"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => handleAdd()}
            >
              添加根卡片
            </Button>
          ),
        ].filter(Boolean)}
        options={{
          reload: true,
          density: true,
          fullScreen: true,
          setting: true,
        }}
      />

      {/* 新增/编辑模态框 */}
      <ModalForm
        title={editingRecord ? '编辑卡片' : '新增卡片'}
        open={modalVisible}
        formRef={formRef}
        onOpenChange={setModalVisible}
        onFinish={handleSubmit}
        loading={loading}
        width={600}
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        modalProps={{
          destroyOnHidden: true,
          maskClosable: false,
        }}
      >
        <ProFormTreeSelect
          name="parentId"
          label="父级分类"
          placeholder="请选择父级分类"
          allowClear
          fieldProps={{
            treeData: getTreeSelectData(),
            treeDefaultExpandAll: true,
            showSearch: true,
            treeNodeFilterProp: 'title',
          }}
          rules={[
            { required: true, message: '请选择父级分类' },
          ]}
        />

        <ProFormText
          name="title"
          label="卡片标题"
          placeholder="请输入卡片标题"
          rules={[
            { required: true, message: '请输入卡片标题' },
            { max: 100, message: '标题长度不能超过100个字符' },
          ]}
        />

        <ProFormTextArea
          name="description"
          label="卡片描述"
          placeholder="请输入卡片描述"
          fieldProps={{
            rows: 3,
          }}
          rules={[
            { max: 500, message: '描述长度不能超过500个字符' },
          ]}
        />

        <ProFormText
          name="linkUrl"
          label="链接地址"
          placeholder="请输入链接地址"
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
        title="卡片详情"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDetailModalVisible(false)}>
            关闭
          </Button>,
        ]}
        width={600}
      >
        {viewingRecord && (
          <div style={{ padding: '16px 0' }}>
            <div style={{ marginBottom: 16 }}>
              <strong>标题：</strong>{viewingRecord.title}
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>描述：</strong>{viewingRecord.description || '暂无描述'}
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>链接地址：</strong>
              {viewingRecord.linkUrl ? (
                <a href={viewingRecord.linkUrl} target="_blank" rel="noopener noreferrer">
                  {viewingRecord.linkUrl}
                </a>
              ) : '暂无链接'}
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>父级ID：</strong>{viewingRecord.parentId === '0' ? '根目录' : viewingRecord.parentId}
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>排序权重：</strong>{viewingRecord.sortOrder || 0}
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>创建时间：</strong>{viewingRecord.createTime}
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>更新时间：</strong>{viewingRecord.updateTime}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CardManagement;
