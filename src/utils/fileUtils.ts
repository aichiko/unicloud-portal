/**
 * 文件相关工具函数
 */

/**
 * 获取文件下载链接
 * @param path 文件路径
 */
export const getFileURL = (path: string): string => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_URL || '';
  return `${baseURL}/prod-api/v2/downloadFile?path=${encodeURIComponent(path)}`;
};

/**
 * 检查文件是否为图片类型
 * @param file 文件对象
 */
export const isImageFile = (file: File): boolean => {
  return file.type.startsWith('image/');
};

/**
 * 检查文件大小是否符合要求
 * @param file 文件对象
 * @param maxSizeMB 最大文件大小（MB）
 */
export const checkFileSize = (file: File, maxSizeMB: number = 2): boolean => {
  const fileSizeMB = file.size / 1024 / 1024;
  return fileSizeMB <= maxSizeMB;
};

/**
 * 文件上传前的校验
 * @param file 文件对象
 * @param maxSizeMB 最大文件大小（MB）
 */
export const validateImageFile = (file: File, maxSizeMB: number = 2): { valid: boolean; message?: string } => {
  if (!isImageFile(file)) {
    return { valid: false, message: '只能上传图片文件！' };
  }
  
  if (!checkFileSize(file, maxSizeMB)) {
    return { valid: false, message: `图片大小不能超过 ${maxSizeMB}MB！` };
  }
  
  return { valid: true };
};
