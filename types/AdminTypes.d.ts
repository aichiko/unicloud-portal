
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


interface AdminNoticeParams {
  noticeId?: number;
  noticeTitle: string;
  noticeContent: string;
  noticeType: string;
  publishTime: string;
  status?: string;
}


// {"createBy":"","createTime":"2025-05-22 16:00:09","updateBy":"","updateTime":"2025-08-15 11:31:47",
// "remark":null,"id":16,"name":null,"title":"病理远程会诊","type":"title","subType":null,"slogan":null,
// "description":"病理远程会诊 ","coverUrl":null,"content":null,"categoryId":null,"sortOrder":1,"getDate":null,
// "status":null,"linkUrl":"http://113.57.115.197:30001","parentId":"0"}

interface AdminCardParams {
  id?: number;
  parentId?: number;
  title: string;
  type: string;
  description?: string;
  linkUrl?: string;
  sortOrder?: number;
}

// {"createBy":"","createTime":"2025-06-06 09:46:50","updateBy":"","updateTime":"2025-07-01 17:08:02","remark":null,"id":36,"name":null,
// "title":"省人民政府办公厅印发《关于深化改革促进乡村医疗卫生体系健康发展的实施方案》的通知",
// "type":"policy","subType":null,"slogan":null,"description":null,"coverUrl":null,
// "content": "<p>123</p>"
// "categoryId":null,"sortOrder":1,"getDate":null,"status":null,"linkUrl":"http://wjw.hubei.gov.cn/bmdt/ztzl/jkfp/zcwj/202505/t20250515_5651578.shtml","parentId":null}
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