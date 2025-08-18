import { AdminUserInfo } from '../../types/AdminTypes';
import request from './request';


interface CaptchaImageData {
  img: string;
  msg: string;
  uuid: string;
  code: number;
  captchaEnabled: boolean;
}

const AdminAPI = {
  /**
   * 获取验证码图片
   */
  getCaptchaImage: async () => {
    const res = await request.get('/prod-api/captchaImage');
    const resData = res.data as CaptchaImageData;
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
  }
}

export default AdminAPI;
