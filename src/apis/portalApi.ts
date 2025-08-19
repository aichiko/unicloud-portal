import request from './request';

const PortalAPI = {
  /**
   * 获取门户标题列表
   */
  getTitleList: async () => {
    const response = await request.get('/prod-api/website/title/list');
    const { code, msg, rows } = response.data as ApiListResponse<PortalTitleModel>;
    if (code === 200) {
      return rows;
    } else {
      throw new Error(msg);
    }
  },

  /**
   * 获取门户轮播图列表
   */
  getBannerList: async () => {
    const response = await request.get('/prod-api/website/title/list', {
      params: { type: 'lunbo' }
    });
    const { code, msg, rows } = response.data as ApiListResponse<PortalTitleModel>;
    if (code === 200) {
      return rows;
    } else {
      throw new Error(msg);
    }
  },

  /**
   * 获取门户新闻列表
   * @param pageNum 页码
   * @param pageSize 每页大小
   */
  getNewsList: async (pageNum: number, pageSize: number) => {
    const response = await request.get('/prod-api/website/news/list', {
      params: { pageNum, pageSize }
    });
    const { code, msg, rows, total } = response.data as ApiListResponse<PortalNewsModel>;
    if (code === 200) {
      return { rows, total, code, msg };
    } else {
      throw new Error(msg);
    }
  },

  /**
   * 获取门户政策列表
   * @param pageNum 页码
   * @param pageSize 每页大小
   */
  getPolicyList: async (pageNum: number, pageSize: number) => {
    const response = await request.get('/prod-api/website/policy/list', {
      params: { pageNum, pageSize, type: 'policy' }
    });
    const { code, msg, rows, total } = response.data as ApiListResponse<PortalPolicyModel>;
    if (code === 200) {
      return { rows, total, code, msg };
    } else {
      throw new Error(msg);
    }
  },

   /**
   * 获取门户学术政策列表
   * @param pageNum 页码
   * @param pageSize 每页大小
   */
  getAcademicPolicyList: async (pageNum: number, pageSize: number) => {
    const response = await request.get('/prod-api/website/policy/list', {
      params: { pageNum, pageSize, type: 'policy', subType: 'academic' }
    });
    const { code, msg, rows, total } = response.data as ApiListResponse<PortalPolicyModel>;
    if (code === 200) {
      return { rows, total, code, msg };
    } else {
      throw new Error(msg);
    }
  },

   /**
   * 获取门户卫健委政策列表
   * @param pageNum 页码
   * @param pageSize 每页大小
   */
  getNationalPolicyList: async (pageNum: number, pageSize: number) => {
    const response = await request.get('/prod-api/website/policy/list', {
      params: { pageNum, pageSize, type: 'policy', subType: 'national' }
    });
    const { code, msg, rows, total } = response.data as ApiListResponse<PortalPolicyModel>;
    if (code === 200) {
      return { rows, total, code, msg };
    } else {
      throw new Error(msg);
    }
  },

  /**
   * 获取门户通知列表
   * @param pageNum 页码
   * @param pageSize 每页大小
   */
  getNoticeList: async (pageNum: number, pageSize: number) => {
    const response = await request.get('/prod-api/website/notice/list', {
      params: { pageNum, pageSize }
    });
    const { code, msg, rows, total } = response.data as ApiListResponse<PortalNoticeModel>;
    if (code === 200) {
      return { rows, total, code, msg };
    } else {
      throw new Error(msg);
    }
  },

  /**
   * 用户登录
   * @param username 用户名
   * @param password 密码
   * 登录成功的用户信息
   */
  portalLogin: async (username: string, password: string) => {
    const response = await request.post('/prod-api/combination/login', {
      username,
      password
    });
    const { code, msg, data } = response.data as ApiResponse<PortalLoginData>;
    if (code === 200) {
      return data;
    } else {
      throw new Error(msg);
    }
  },

  /**
   * 用户登出
   */
  portalLogout: async (token: string) => {
    const response = await request.post('/prod-api/combination/logout', { token });
    const { code, msg } = response.data as ApiResponse<string>;
    if (code === 200) {
      return true;
    } else {
      throw new Error(msg);
    }
  },

  portalGetUserInfo: async () => {
    const response = await request.get('/prod-api/getInfo');
    const { code, msg, data } = response.data as ApiResponse<PortalUserModel>;
    if (code === 200) {
      return data;
    } else {
      throw new Error(msg);
    }
  },

  /**
   * 生成 SSO 签名 token（调用 Next.js API 路由）
   */
  generateSSOToken: async (userId: number, token: string) => {
    try {
      const response = await fetch('/api/generateSSOToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          token
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('生成 SSO token 失败:', error);
      throw error;
    }
  },

  // /combination/validateToken
  validateToken: async (token: string, username?: string) => {
    const response = await request.post('/prod-api/combination/validateToken', { token, username });
    const { code, msg } = response.data as ApiResponse<string>;
    if (code === 200) {
      return true;
    } else {
      throw new Error(msg);
    }
  }

};

export default PortalAPI;