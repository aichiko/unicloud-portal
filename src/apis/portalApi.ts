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
      params: { pageNum, pageSize }
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

};

export default PortalAPI;