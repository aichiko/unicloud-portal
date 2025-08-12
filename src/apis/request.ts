import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://192.168.10.252:9002",
  timeout: 10000, // 请求超时时间
  headers: {
    // 'official': true,
    "Content-Type": "application/json",
  },
});

// 封装 axios 拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    return config;
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // 对响应数据做些什么
    return response;
  },
  (error) => {
    // 处理响应错误
    return Promise.reject(error);
  }
);

// 导出 axios 实例
export default instance;