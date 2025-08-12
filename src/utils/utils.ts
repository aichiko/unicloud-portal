import request from "@/apis/request";

export function formatCoverUrl(url: string | undefined): string {
  if (!url) return '';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  const baseImageUrl = baseUrl + '/prod-api'
  if (url.startsWith('http')) return url;
  if (url.startsWith('/')) return `${baseImageUrl}${url}`;
  if (url.startsWith('./')) return `${baseImageUrl}/${url.slice(2)}`;
  if (url.startsWith('../')) return `${baseImageUrl}/${url.slice(3)}`;
  return url.startsWith('http') ? url : `http://${url}`;
}

/**
 * 登录成功后设置axios请求头
 */
export function setUserAuth(token: string) {
  request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
