import axios from "axios";

function logoutAction() {
  // 清除localStorage
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUserInfo');

  // 清除Cookie
  document.cookie = 'adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  // 跳转到登录页
  window.location.href = "/adminLogin";
}

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://192.168.10.252:9002",
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 封装 axios 拦截器
instance.interceptors.request.use(
  (config) => {
    const admin_token = localStorage.getItem("adminToken");
    if (admin_token) {
      config.headers.Authorization = `Bearer ${admin_token}`;
    }
    return config;
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // 401 需要重新登录
    if (response.status === 401) {
      logoutAction();
    }
    const data = response.data as ApiResponse<any>;

    const { code, msg } = data;
    if (code == 401) {
      logoutAction();
    }
    if (code !== 200) {
      // 处理业务错误
      throw new Error(msg || '请求失败');
    }
    return response;
  },
  (error) => {
    // 处理响应错误
    return Promise.reject(error);
  }
);

// 导出 axios 实例
export default instance;