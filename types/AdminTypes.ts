
/**
{
  "msg": "操作成功",
  "code": 200,
  "permissions": [
    "*:*:*"
  ],
  "roles": [
    "admin"
  ],
  "user": {
    "createBy": "admin",
    "createTime": "2025-05-01 20:54:37",
    "updateBy": null,
    "updateTime": null,
    "remark": "管理员",
    "params": {
      "@type": "java.util.HashMap"
    },
    "userId": 1,
    "deptId": 103,
    "userName": "admin",
    "nickName": "若依",
    "email": "ry@163.com",
    "phonenumber": "15888888888",
    "sex": "1",
    "avatar": null,
    "password": "$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAu2",
    "status": "0",
    "delFlag": "0",
    "loginIp": "192.168.100.31",
    "loginDate": "2025-08-18T15:06:27.000+08:00",
    "dept": {
      "createBy": null,
      "createTime": null,
      "updateBy": null,
      "updateTime": null,
      "remark": null,
      "params": {
        "@type": "java.util.HashMap"
      },
      "deptId": 103,
      "parentId": 101,
      "ancestors": "0,100,101",
      "deptName": "研发部门",
      "orderNum": 1,
      "leader": "若依",
      "phone": null,
      "email": null,
      "status": "0",
      "delFlag": null,
      "parentName": null,
      "children": []
    },
    "roles": [
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "remark": null,
        "params": {
            "@type": "java.util.HashMap"
        },
        "roleId": 1,
        "roleName": "超级管理员",
        "roleKey": "admin",
        "roleSort": 1,
        "dataScope": "1",
        "menuCheckStrictly": false,
        "deptCheckStrictly": false,
        "status": "0",
        "delFlag": null,
        "flag": false,
        "menuIds": null,
        "deptIds": null,
        "permissions": null,
        "admin": true
      }
    ],
    "roleIds": null,
    "postIds": null,
    "roleId": null,
    "admin": true
  }
}
 */

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
interface AdminUserInfoModel {
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
export interface AdminLoginParams {
  username: string;
  password: string;
  code: string;
  uuid: string;
}

/** 登录响应数据模型 */
export interface AdminLoginResponse {
  token: string;
}

// 导出所有接口
export type {
  AdminUserDepartment,
  AdminUserRole,
  AdminUser,
  AdminUserInfoModel as AdminUserInfo,
  AdminCaptchaImageModel,
};
