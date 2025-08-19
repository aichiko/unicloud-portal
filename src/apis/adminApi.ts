import request from './admin_request';

// 新闻列表接口
const newsListApi = '/prod-api/website/news/list';
// GET 新闻详情接口 DELETE 删除新闻接口
const newsDetailApi = '/prod-api/website/news/:id';
// PUT 是更新 POST 是新增
const updateNewsApi = '/prod-api/website/news';

// 获取系统应用配置
// /v2/sysAppConfig/selectAppConfig

const AdminAPI = {
  /**
   * 获取验证码图片
   */
  getCaptchaImage: async () => {
    const res = await request.get('/prod-api/captchaImage');
    const resData = res.data as AdminCaptchaImageModel;
    return resData;
  },

  /**
   * 用户登录
   * @param {Object} params 登录参数
   * @param {string} params.username 用户名
   * @param {string} params.password 密码
   * @param {string} params.code 验证码
   * @param {string} params.uuid 唯一标识
   * @returns 登录结果
   */
  adminLogin: async (params: { username: string, password: string, code: string, uuid: string }) => {
    const res = await request.post('/prod-api/login', {
      ...params
    });
    const token = res.data.token;
    return token;
  },

  /**
   * 退出登录
   */
  adminLogout: async () => {
    const res = await request.post('/prod-api/logout');
    return res.data;
  },

  /**
   * 获取用户信息
   */
  getUserInfo: async (token?: string) => {
    const res = await request.get('/prod-api/getInfo', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data as AdminUserInfo;
  },


  /** 新闻相关接口 */
  news: {
    /**
     * 获取新闻列表
     */
    getList: async (params: { pageNum: number; pageSize: number }) => {
      const res = await request.get(newsListApi, { params });
      return res.data as ApiListResponse<PortalNewsModel>;
    },

    /**
     * 获取新闻详情
     */
    getDetail: async (id: number) => {
      const res = await request.get(newsDetailApi.replace(':id', id.toString()));
      return res.data as ApiResponse<PortalNewsModel>;
    },

    create: async (data: AdminNewsParams) => {
      const res = await request.post(updateNewsApi, data);
      return res.data as ApiResponse<null>;
    },

    /**
     * 更新新闻
     */
    update: async (data: AdminNewsParams) => {
      const res = await request.put(updateNewsApi, data);
      return res.data as ApiResponse<null>;
    },

    /**
     * 删除新闻
     */
    delete: async (id: number) => {
      const res = await request.delete(newsDetailApi.replace(':id', id.toString()));
      return res.data as ApiResponse<null>;
    }
  },

  /** 通知相关接口 */
  notices: {
    /**
     * 获取通知列表
     */
    getList: async (params: { pageNum: number; pageSize: number }) => {
      const res = await request.get('/prod-api/website/notice/list', { params });
      return res.data as ApiListResponse<PortalNoticeModel>;
    },

    /**
     * 获取通知详情
     */
    getDetail: async (id: number) => {
      const res = await request.get(`/prod-api/website/notice/${id}`);
      return res.data as ApiResponse<PortalNoticeModel>;
    },

    /**
     * 创建通知
     */
    create: async (data: AdminNoticeParams) => {
      const res = await request.post('/prod-api/website/notice', data);
      return res.data as ApiResponse<null>;
    },

    /**
     * 更新通知
     */
    update: async (data: AdminNoticeParams) => {
      const res = await request.put('/prod-api/website/notice', data);
      return res.data as ApiResponse<null>;
    },

    /**
     * 删除通知
     */
    delete: async (id: number) => {
      const res = await request.delete(`/prod-api/website/notice/${id}`);
      return res.data as ApiResponse<null>;
    }
  },

  /** 卡片内容相关接口 */
  // /prod-api/website/title
  cards: {
    /**
     * 获取卡片内容
     */
    getList: async () => {
      const params = {
        type: 'title',
        pageNum: 1,
        pageSize: 99999
      }
      const res = await request.get('/prod-api/website/title/list', { params });
      return res.data as ApiListResponse<PortalTitleModel>;
    },

    /**
     * 获取卡片详情
     */
    getDetail: async (id: number) => {
      const res = await request.get(`/prod-api/website/title/${id}`);
      return res.data as ApiResponse<PortalTitleModel>;
    },

    /**
     * 创建卡片
     */
    create: async (data: AdminCardParams) => {
      const res = await request.post('/prod-api/website/title', data);
      return res.data as ApiResponse<null>;
    },

    /**
     * 更新卡片
     */
    update: async (data: AdminCardParams) => {
      const res = await request.put('/prod-api/website/title', data);
      return res.data as ApiResponse<null>;
    },

    /**
     * 删除卡片
     */
    delete: async (id: number) => {
      const res = await request.delete(`/prod-api/website/title/${id}`);
      return res.data as ApiResponse<null>;
    }
  },

  // /prod-api/website/policy
  /** 政策配置相关接口 */
  policies: {
    /**
     * 获取政策列表
     */
    getList: async (params: { pageNum: number; pageSize: number }) => {
      const res = await request.get('/prod-api/website/policy/list', { params: { ...params, type: 'policy' } });
      return res.data as ApiListResponse<PortalPolicyModel>;
    },

    /**
     * 获取政策详情
     */
    getDetail: async (id: number) => {
      const res = await request.get(`/prod-api/website/policy/${id}`);
      return res.data as ApiResponse<PortalPolicyModel>;
    },

    /**
     * 创建政策
     */
    create: async (data: AdminPolicyParams) => {
      const res = await request.post('/prod-api/website/policy', data);
      return res.data as ApiResponse<null>;
    },

    /**
     * 更新政策
     */
    update: async (data: AdminPolicyParams) => {
      const res = await request.put('/prod-api/website/policy', data);
      return res.data as ApiResponse<null>;
    },

    /**
     * 删除政策
     */
    delete: async (id: number) => {
      const res = await request.delete(`/prod-api/website/policy/${id}`);
      return res.data as ApiResponse<null>;
    }
  },

  /** App 配置相关接口 */
  appConfig: {
    // App config list
    /**
     * 获取系统应用配置列表
     */
    getAppConfigList: async (params: { pageNum: number; pageSize: number; appName?: string }) => {
      const res = await request.get('/prod-api/v2/sysAppConfig/selectAppConfig', { params });
      return res.data as ApiListResponse<AppConfigModel>;
    },

    updateAppConfig: async (data: AppConfigParams) => {
      const formData = new FormData();
      formData.append('appName', data.appName ?? '');
      formData.append('appKey', data.appKey ?? '');
      if (data.appLogoFile) {
        formData.append('appLogoFile', data.appLogoFile);
      }
      if (data.id) {
        formData.append('id', data.id.toString());
      }
      const res = await request.post('/prod-api/v2/sysAppConfig/updateAppConfig', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data as ApiResponse<null>;
    },

    createAppConfig: async (data: AppConfigParams) => {
      const formData = new FormData();
      formData.append('appName', data.appName ?? '');
      formData.append('appKey', data.appKey ?? '');
      formData.append('appLogoFile', data.appLogoFile ?? '');
      const res = await request.post('/prod-api/v2/sysAppConfig/addAppConfig', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data as ApiResponse<null>;
    },

    deleteAppConfig: async (id: number) => {
      const res = await request.post('/prod-api/v2/sysAppConfig/deleteById', { id });
      return res.data as ApiResponse<null>;
    },

    // App config item

    createAppConfigItem: async (data: AppConfigItemParams) => {
      const res = await request.post('/prod-api/v2/sysAppConfig/item/add', data);
      return res.data as ApiResponse<null>;
    },

    deleteAppConfigItem: async (id: number) => {
      const res = await request.post(`/prod-api/v2/sysAppConfig/item/deleteById`, { id });
      return res.data as ApiResponse<null>;
    },

    updateAppConfigItem: async (data: AppConfigItemParams) => {
      const res = await request.post('/prod-api/v2/sysAppConfig/item/update', data);
      return res.data as ApiResponse<null>;
    },

    getAppConfigItemListWithPage: async (params: { pageNum: number; pageSize: number; appKey?: string }) => {
      const res = await request.get('/prod-api/v2/sysAppConfig/item/page', { params });
      return res.data as ApiListResponse<AppConfigItemModel>;
    },

    getAppConfigItemList: async (appKey: string) => {
      const res = await request.get('/prod-api/v2/sysAppConfig/item/list', { params: { appKey } });
      return res.data as ApiResponse<Array<AppConfigItemModel>>;
    },
  },

  /**
   * 获取文件下载链接
   * @param path 文件路径
   */
  getFileURL(path: string) {
    return `${process.env.NEXT_PUBLIC_API_URL}/prod-api/v2/downloadFile?path=${encodeURIComponent(path)}`;
  }

}

export default AdminAPI;
