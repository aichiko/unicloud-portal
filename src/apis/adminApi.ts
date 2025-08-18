import request from './request';

// 新闻列表接口
const newsListApi = '/prod-api/website/news/list';
// GET 新闻详情接口 DELETE 删除新闻接口
const newsDetailApi = '/prod-api/website/news/:id';
// PUT 是更新 POST 是新增
const updateNewsApi = '/prod-api/website/news';

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
  }
}

export default AdminAPI;
