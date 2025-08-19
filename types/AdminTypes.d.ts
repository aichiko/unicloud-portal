
interface AdminUserDepartment {
  createBy: string | null;
  createTime: string | null;
  updateBy: string | null;
  updateTime: string | null;
  remark: string | null;
  params: {
    "@type": string;
  };
  deptId: number;
  deptName: string;
  parentId: number;
  ancestors: string;
  orderNum: number;
  leader: string;
  phone: string | null;
  email: string | null;
  status: string;
  delFlag: string | null;
  parentName: string | null;
  children: Array<AdminUserDepartment>;
}

interface AdminUserRole {
  createBy: string | null;
  createTime: string | null;
  updateBy: string | null;
  updateTime: string | null;
  remark: string | null;
  params: {
    "@type": string;
  };
  roleId: number;
  roleName: string;
  roleKey: string;
  roleSort: number;
  dataScope: string;
  menuCheckStrictly: boolean;
  deptCheckStrictly: boolean;
  status: string;
  delFlag: string | null;
  flag: boolean;
  menuIds: Array<number> | null;
  deptIds: Array<number> | null;
  permissions: Array<string> | null;
  admin: boolean;
}

interface AdminUser {
  createBy: string;
  createTime: string;
  updateBy: string | null;
  updateTime: string | null;
  remark: string;
  params: {
    "@type": string;
  };
  userId: number;
  deptId: number;
  userName: string;
  nickName: string;
  email: string;
  phonenumber: string;
  sex: string;
  avatar: string | null;
  password: string;
  status: string;
  delFlag: string;
  loginIp: string;
  loginDate: string;
  dept: AdminUserDepartment;
  roles: Array<AdminUserRole>;
  roleIds: Array<number> | null;
  postIds: Array<number> | null;
  roleId: number | null;
  admin: boolean;
}

/** 管理后台用户信息模型 */
interface AdminUserInfo {
  code: number;
  msg: string;
  user: AdminUser;
  permissions: Array<string>;
  roles: Array<string>;
}

/** 验证码图片数据模型 */
interface AdminCaptchaImageModel {
  img: string;
  msg: string;
  uuid: string;
  code: number;
  captchaEnabled: boolean;
}

/** 登录请求参数模型 */
interface AdminLoginParams {
  username: string;
  password: string;
  code: string;
  uuid: string;
}

/** 登录响应数据模型 */
interface AdminLoginResponse {
  token: string;
}


/**
 * 新闻请求参数模型
 */
interface AdminNewsParams {
  id?: number
  title: string;
  content: string;
  publishDate: string;
  coverUrl?: string;
  newsType?: string;
  isHot?: number;
  sortOrder?: number;
  status?: string;
  linkUrl?: string;
}

/**
 * 通知请求参数模型
 */
interface AdminNoticeParams {
  noticeId?: number;
  noticeTitle: string;
  noticeContent: string;
  noticeType: string;
  publishTime: string;
  status?: string;
}

/**
 * 卡片请求参数模型
 */
interface AdminCardParams {
  id?: number;
  parentId?: number;
  title: string;
  type: string;
  description?: string;
  linkUrl?: string;
  sortOrder?: number;
}

/**
 * 政策请求参数模型
 */
interface AdminPolicyParams {
  id?: number;
  title: string;
  content: string;
  // 固定为 policy
  type: string;
  // 政策的类型 national academic
  subType?: string;
  linkUrl?: string;
  sortOrder?: number;
}

/**
 * 应用配置请求参数模型
 */
interface AppConfigParams {
  appKey?: string;
  appLogoFile?: File;
  appName?: string;
  id?: number;
}

/**
 * 应用配置模型
 */
interface AppConfigModel {
  id?: number;
  appKey?: string;
  appLogo?: string;
  appName?: string;
  lastUpdateTime?: string;
  insertTime?: string;
}

/**
 * 应用配置项请求参数模型
 */
interface AppConfigItemParams {
  appKey?: string;
  configKey?: string;
  configValue?: string;
  id?: number;
  remark?: string;
}

/**
 * 应用配置项模型
 */
interface AppConfigItemModel {
  appKey?: string;
  configKey?: string;
  configValue?: string;
  id?: number;
  insertTime?: string;
  lastUpdateTime?: string;
  remark?: string;
}