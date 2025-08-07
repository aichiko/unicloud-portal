import request from './request';

const PortalAPI = {
  // /prod-api/website/title/list
  getTitleList: async () => {
    const response = await request.get('/prod-api/website/title/list');
    const { code, msg, rows } = response.data as ApiListResponse<PortalTitleModel>;
      if (code === 200) {
        return rows;
      } else {
        throw new Error(msg);
      }
  }
}

export default PortalAPI;