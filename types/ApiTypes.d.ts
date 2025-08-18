/**
 * API 通用响应类型
 */
interface ApiResponse<T> {
  code: number;
  msg: string;
  data: T;
}

/**
 * API 列表响应类型
 */
interface ApiListResponse<T> {
  code: number;
  msg: string;
  total: number;
  rows: T[];
}