'use client';
import React, { useRef, useState } from 'react';
import {
  ProTable,
  ProColumns,
  ModalForm,
  ProFormText,
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
  Drawer,
  Row,
  Col,
  Tag,
  Image,
  Upload
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SettingOutlined,
  AppstoreAddOutlined,
  UploadOutlined
} from '@ant-design/icons';
import AdminAPI from '@/apis/adminApi';
import { useAdminUserStore, hasPermission } from '@/store/adminUserStore';
import { getFileURL, validateImageFile } from '@/utils/fileUtils';
import type { UploadFile } from 'antd/es/upload';

const AppConfigPage: React.FC = () => {
  const actionRef = useRef<ActionType>(null);
  const formRef = useRef<ProFormInstance>(null);
  const configActionRef = useRef<ActionType>(null);
  const configFormRef = useRef<ProFormInstance>(null);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [configDrawerVisible, setConfigDrawerVisible] = useState(false);
  const [configModalVisible, setConfigModalVisible] = useState(false);
  
  const [editingRecord, setEditingRecord] = useState<AppConfigModel | null>(null);
  const [viewingRecord, setViewingRecord] = useState<AppConfigModel | null>(null);
  const [currentApp, setCurrentApp] = useState<AppConfigModel | null>(null);
  const [editingConfigItem, setEditingConfigItem] = useState<AppConfigItemModel | null>(null);
  const [loading, setLoading] = useState(false);
  const [configItems, setConfigItems] = useState<AppConfigItemModel[]>([]);
  const [logoFileList, setLogoFileList] = useState<UploadFile[]>([]);

  const { message } = App.useApp();

  // 应用列表列定义
  const appColumns: ProColumns<AppConfigModel>[] = [
    {
      title: 'Logo',
      dataIndex: 'appLogo',
      width: 80,
      search: false,
      render: (_, record) => (
        record.appLogo ? (
          <Image
            width={120}
            height={120}
            src={getFileURL(record.appLogo)}
            style={{ borderRadius: 4 }}
            fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RUG8G+BgM2uBhBYLAgMeACHBQsODBY8wGJBgQODBQcODBYcODBYcODAYMGBwYIDgwUHDgwWHDhwYLDgwGDBgQEFBgQGBAQEBAbEQo4EfF7/ek/1a023urqr6/uq/l/ddXft+q+6qyWsT3/O3Y/D4fAF"
          />
        ) : (
          <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">
            无
          </div>
        )
      ),
    },
    {
      title: '应用名称',
      dataIndex: 'appName',
      ellipsis: true,
      width: 200,
      render: (_, record) => (
        <Space>
          <span className="font-medium">{record.appName}</span>
        </Space>
      ),
    },
    {
      title: '应用标识',
      dataIndex: 'appKey',
      ellipsis: true,
      width: 200,
      search: false,
      render: (text) => (
        <Tag color="blue">{text}</Tag>
      ),
    },
    {
      title: '更新时间',
      dataIndex: 'lastUpdateTime',
      width: 120,
      search: false,
      // lastUpdateTime 或者 insertTime lastUpdateTime 可能为空
      render: (_, record) => (
        <span>{record.lastUpdateTime || record.insertTime}</span>
      ),
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (_, record) => [
        <Tooltip key="config" title="配置管理">
          <Button
            type="link"
            size="small"
            icon={<SettingOutlined />}
            onClick={() => handleConfigManage(record)}
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
        hasPermission('system:app:edit') && (
          <Tooltip key="edit" title="编辑">
            <Button
              type="link"
              size="small"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
        ),
        hasPermission('system:app:delete') && (
          <Popconfirm
            key="delete"
            title="确定要删除这个应用吗？"
            onConfirm={() => handleDelete(record.id!)}
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

  // 配置项列定义
  const configColumns: ProColumns<AppConfigItemModel>[] = [
    {
      title: '配置键',
      dataIndex: 'configKey',
      ellipsis: true,
      width: 120,
      render: (text) => (
        <Tag color="geekblue">{text}</Tag>
      ),
    },
    {
      title: '配置值',
      dataIndex: 'configValue',
      ellipsis: true,
      width: 120,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      ellipsis: true,
      width: 120,
      search: false,
    },
    {
      title: '更新时间',
      dataIndex: 'lastUpdateTime',
      width: 120,
      search: false,
      valueType: 'dateTime',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 120,
      render: (_, record) => [
        <Tooltip key="edit" title="编辑">
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEditConfigItem(record)}
          />
        </Tooltip>,
        <Popconfirm
          key="delete"
          title="确定要删除这个配置项吗？"
          onConfirm={() => handleDeleteConfigItem(record.id!)}
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
        </Popconfirm>,
      ].filter(Boolean),
    },
  ];

  // 获取应用列表
  const fetchAppList = async (params: any) => {
    try {
      const response = await AdminAPI.appConfig.getAppConfigList({
        pageNum: params.current,
        pageSize: params.pageSize,
        appName: params.appName,
      });

      return {
        data: response.rows || [],
        success: true,
        total: response.total || 0,
      };
    } catch (error:any) {
      console.error('获取应用列表失败:', error);
      message.error(error.message ?? '获取应用列表失败');
      return {
        data: [],
        success: false,
        total: 0,
      };
    }
  };

  // 获取配置项列表
  const fetchConfigItems = async (appKey: string) => {
    try {
      const response = await AdminAPI.appConfig.getAppConfigItemList(appKey);
      setConfigItems(response.data || []);
      return {
        data: response.data || [],
        success: true,
        total: response.data.length || 0,
      };
    } catch (error:any) {
      console.error('获取配置项失败:', error);
      message.error(error.message ?? '获取配置项失败');
      return {
        data: [],
        success: false,
        total: 0,
      };
    }
  };

  // 处理新增应用
  const handleAdd = () => {
    setEditingRecord(null);
    setModalVisible(true);
    setLogoFileList([]);
    formRef.current?.resetFields();
  };

  // 处理编辑应用
  const handleEdit = (record: AppConfigModel) => {
    setEditingRecord(record);
    setModalVisible(true);
    
    // 设置Logo文件列表
    if (record.appLogo) {
      setLogoFileList([
        {
          uid: '-1',
          name: 'logo.png',
          status: 'done',
          url: getFileURL(record.appLogo),
        },
      ]);
    } else {
      setLogoFileList([]);
    }
    
    setTimeout(() => {
      formRef.current?.setFieldsValue({
        appName: record.appName,
        appKey: record.appKey,
      });
    }, 100);
  };

  // 处理查看应用
  const handleView = (record: AppConfigModel) => {
    setViewingRecord(record);
    setDetailModalVisible(true);
  };

  // 处理配置管理
  const handleConfigManage = (record: AppConfigModel) => {
    setCurrentApp(record);
    setConfigDrawerVisible(true);
    fetchConfigItems(record.appKey!);
  };

  // 处理删除应用
  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      await AdminAPI.appConfig.deleteAppConfig(id);
      message.success('删除成功');
      actionRef.current?.reload();
    } catch (error:any) {
      console.error('删除失败:', error);
      message.error(error.message ?? '删除失败');
    } finally {
      setLoading(false);
    }
  };

  // 处理应用表单提交
  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      
      // 创建FormData处理文件上传
      const formData = new FormData();
      formData.append('appName', values.appName);
      formData.append('appKey', values.appKey);
      
      if (editingRecord?.id) {
        formData.append('id', editingRecord.id.toString());
      }
      
      // 处理Logo文件上传
      if (logoFileList.length > 0 && logoFileList[0].originFileObj) {
        formData.append('appLogoFile', logoFileList[0].originFileObj);
      }

      const submitData = {
        appName: values.appName,
        appKey: values.appKey,
        id: editingRecord?.id,
        appLogoFile: logoFileList.length > 0 && logoFileList[0].originFileObj ? logoFileList[0].originFileObj : undefined,
      };

      if (editingRecord) {
        // 编辑
        await AdminAPI.appConfig.updateAppConfig(submitData);
        message.success('更新成功');
      } else {
        // 新增
        await AdminAPI.appConfig.createAppConfig(submitData);
        message.success('创建成功');
      }

      setModalVisible(false);
      setLogoFileList([]);
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

  // 处理新增配置项
  const handleAddConfigItem = () => {
    setEditingConfigItem(null);
    setConfigModalVisible(true);
    configFormRef.current?.resetFields();
  };

  // 处理编辑配置项
  const handleEditConfigItem = (record: AppConfigItemModel) => {
    setEditingConfigItem(record);
    setConfigModalVisible(true);
    setTimeout(() => {
      configFormRef.current?.setFieldsValue({
        configKey: record.configKey,
        configValue: record.configValue,
        remark: record.remark,
      });
    }, 100);
  };

  // 处理删除配置项
  const handleDeleteConfigItem = async (id: number) => {
    try {
      setLoading(true);
      await AdminAPI.appConfig.deleteAppConfigItem(id);
      message.success('删除成功');
      fetchConfigItems(currentApp!.appKey!);
    } catch (error:any) {
      console.error('删除失败:', error);
      message.error(error.message ?? '删除失败');
    } finally {
      setLoading(false);
    }
  };

  // 处理配置项表单提交
  const handleConfigItemSubmit = async (values: any) => {
    try {
      setLoading(true);
      const submitData = {
        ...values,
        appKey: currentApp!.appKey,
        id: editingConfigItem?.id,
      };

      if (editingConfigItem) {
        // 编辑
        await AdminAPI.appConfig.updateAppConfigItem(submitData);
        message.success('更新成功');
      } else {
        // 新增
        await AdminAPI.appConfig.createAppConfigItem(submitData);
        message.success('创建成功');
      }

      setConfigModalVisible(false);
      fetchConfigItems(currentApp!.appKey!);
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <ProTable<AppConfigModel>
        headerTitle="应用配置管理"
        actionRef={actionRef}
        columns={appColumns}
        request={fetchAppList}
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
        toolBarRender={() => [
          hasPermission('system:app:add') && (
            <Button
              key="add"
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAdd}
            >
              新增应用
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

      {/* 新增/编辑应用模态框 */}
      <ModalForm
        title={editingRecord ? '编辑应用' : '新增应用'}
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
        <ProFormText
          name="appName"
          label="应用名称"
          placeholder="请输入应用名称"
          rules={[
            { required: true, message: '请输入应用名称' },
            { max: 50, message: '应用名称长度不能超过50个字符' },
          ]}
        />

        <ProFormText
          name="appKey"
          label="应用标识"
          placeholder="请输入应用唯一标识"
          disabled={!!editingRecord}
          rules={[
            { required: true, message: '请输入应用标识' },
            { pattern: /^[a-zA-Z][a-zA-Z0-9_]*$/, message: '应用标识只能包含字母、数字和下划线，且以字母开头' },
            { max: 30, message: '应用标识长度不能超过30个字符' },
          ]}
        />

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            应用Logo
          </label>
          <Upload
            fileList={logoFileList}
            onChange={({ fileList }) => setLogoFileList(fileList)}
            beforeUpload={(file) => {
              const validation = validateImageFile(file, 2);
              if (!validation.valid) {
                message.error(validation.message);
                return false;
              }
              return false; // 阻止自动上传
            }}
            listType="picture-card"
            maxCount={1}
            accept="image/*"
          >
            {logoFileList.length === 0 && (
              <div className="flex flex-col items-center">
                <UploadOutlined className="text-2xl mb-2" />
                <div>上传Logo</div>
              </div>
            )}
          </Upload>
          <div className="text-xs text-gray-500 mt-1">
            建议尺寸：64x64px，支持 PNG、JPG 格式，不超过 2MB
          </div>
        </div>
      </ModalForm>

      {/* 应用详情模态框 */}
      <Modal
        title="应用详情"
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
          <div className="py-4">
            <Row gutter={16}>
              <Col span={6}>
                <div className="text-center">
                  {viewingRecord.appLogo ? (
                    <Image
                      width={80}
                      height={80}
                      src={getFileURL(viewingRecord.appLogo)}
                      className="rounded-lg"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center mx-auto">
                      无Logo
                    </div>
                  )}
                </div>
              </Col>
              <Col span={18}>
                <div className="mb-4">
                  <strong>应用名称：</strong>{viewingRecord.appName}
                </div>
                <div className="mb-4">
                  <strong>应用标识：</strong>
                  <Tag color="blue">{viewingRecord.appKey}</Tag>
                </div>
                <div className="mb-4">
                  <strong>应用ID：</strong>{viewingRecord.id}
                </div>
              </Col>
            </Row>
          </div>
        )}
      </Modal>

      {/* 配置管理抽屉 */}
      <Drawer
        title={`配置管理 - ${currentApp?.appName}`}
        open={configDrawerVisible}
        onClose={() => setConfigDrawerVisible(false)}
        width={900}
        extra={
          <Button
            type="primary"
            icon={<AppstoreAddOutlined />}
            onClick={handleAddConfigItem}
          >
            新增配置项
          </Button>
        }
      >
        <ProTable<AppConfigItemModel>
          actionRef={configActionRef}
          columns={configColumns}
          dataSource={configItems}
          rowKey="id"
          search={false}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
          }}
          options={{
            reload: false,
            density: true,
            setting: true,
          }}
        />
      </Drawer>

      {/* 新增/编辑配置项模态框 */}
      <ModalForm
        title={editingConfigItem ? '编辑配置项' : '新增配置项'}
        open={configModalVisible}
        formRef={configFormRef}
        onOpenChange={setConfigModalVisible}
        onFinish={handleConfigItemSubmit}
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
        <ProFormText
          name="configKey"
          label="配置键"
          placeholder="请输入配置键"
          rules={[
            { required: true, message: '请输入配置键' },
            { max: 50, message: '配置键长度不能超过50个字符' },
          ]}
        />

        <ProFormText
          name="configValue"
          label="配置值"
          placeholder="请输入配置值"
          rules={[
            { required: true, message: '请输入配置值' },
            { max: 500, message: '配置值长度不能超过500个字符' },
          ]}
        />

        <ProFormText
          name="remark"
          label="备注"
          placeholder="请输入备注信息"
          rules={[
            { max: 200, message: '备注长度不能超过200个字符' },
          ]}
        />
      </ModalForm>
    </div>
  );
};

export default AppConfigPage;
