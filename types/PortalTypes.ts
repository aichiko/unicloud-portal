/**
 {
    "createBy": "",
    "createTime": "2025-05-22 08:13:32",
    "updateBy": "",
    "updateTime": "2025-07-07 05:03:56",
    "remark": null,
    "id": 22,
    "name": null,
    "title": "胃肠肺",
    "type": "title",
    "subType": null,
    "slogan": null,
    "description": "消化系统和呼吸系统病理诊断",
    "coverUrl": null,
    "content": null,
    "categoryId": null,
    "sortOrder": 0,
    "getDate": null,
    "status": null,
    "linkUrl": "http://113.57.115.197:8888/login",
    "parentId": "18"
}
 */

/**
 * 门户标题模型
 */
interface PortalTitleModel {
  id: number;
  title: string;
  type: string;
  description: string;
  linkUrl: string;
  parentId: string;
  remark?: string;
  sortOrder?: number;
  coverUrl?: string;
  createTime?: string;
  updateTime?: string;
  createBy?: string;
  updateBy?: string;
  status?: string;
  name?: string;
  subType?: string;
  slogan?: string;
  content?: string;
  categoryId?: number;
  getDate?: string;
}

interface PortalPolicyModel {
  id: number;
  title: string;
  type: string;
  description: string;
  linkUrl: string;
  parentId: string;
  remark?: string;
  sortOrder?: number;
  coverUrl?: string;
  createTime?: string;
  updateTime?: string;
  createBy?: string;
  updateBy?: string;
  status?: string;
  name?: string;
  subType?: string;
  slogan?: string;
  content?: string;
  categoryId?: number;
  getDate?: string;
}

interface AcademicPolicyModel  {
  id: number;
  title: string;
  type: string;
  description: string;
  linkUrl: string;
  parentId: string;
  remark?: string;
  sortOrder?: number;
  coverUrl?: string;
  createTime?: string;
  updateTime?: string;
  createBy?: string;
  updateBy?: string;
  status?: string;
  name?: string;
  subType?: string;
  slogan?: string;
  content?: string;
  categoryId?: number;
  getDate?: string;
}

/**
{
  "createBy": "",
  "createTime": "2025-06-30 09:06:52",
  "updateBy": "",
  "updateTime": "2025-08-06 10:12:13",
  "remark": null,
  "id": 22,
  "title": "关于举办广西医学会病理学2025年学术年会 暨淋巴造血系统疾病病理诊断及 病理技术学习班的预通知",
  "content": "<p><br></p>",
  "publishDate": "2025-06-30",
  "coverUrl": null,
  "newsType": null,
  "isHot": 0,
  "sortOrder": 1,
  "status": "1",
  "linkUrl": "https://mp.weixin.qq.com/s/DRS5wUuaoBN6qnWZFz0eqQ"
}
 */

/**
 * 门户新闻模型
 */
interface PortalNewsModel {
  id: number;
  title: string;
  content: string;
  publishDate: string;
  coverUrl?: string;
  newsType?: string;
  isHot?: number;
  sortOrder?: number;
  status?: string;
  linkUrl?: string;
  createTime?: string;
  updateTime?: string;
  createBy?: string;
  updateBy?: string;
  remark?: string;
}

/**
{
  "createBy": "",
  "createTime": "2025-06-09 02:46:02",
  "updateBy": "",
  "updateTime": null,
  "remark": null,
  "noticeId": 5,
  "noticeTitle": "远程会诊平台2025年7月1日正式上线",
  "noticeType": "1",
  "noticeContent": "<p>远程会诊平台2025年7月1日正式上线</p>",
  "status": "1",
  "type": null,
  "publishTime": "2025-06-09"
}
 */

/**
 * 门户通知模型
 */
interface PortalNoticeModel {
  noticeId: number;
  noticeTitle: string;
  noticeType: string;
  noticeContent: string;
  status: string;
  publishTime: string;
  createBy?: string;
  createTime?: string;
  updateBy?: string;
  updateTime?: string;
  remark?: string;
  type?: string;
}

/** 登录成功的用户信息
{
    "username": "admin",
    "token": "9c152a5f964341fcac6f4f9c3427bd13",
    "appUserInfoList": [
        {
            "appName": "会诊",
            "flag": true,
            "userInfo": {
                "createUserId": 0,
                "gender": null,
                "signature": null,
                "certificate": null,
                "signatureFileMetadata": null,
                "type": 1,
                "title": null,
                "sysOrg": null,
                "orgId": null,
                "avatarFileMetadata": null,
                "id": 1,
                "email": null,
                "manager": null,
                "avatarFileCode": null,
                "mobile": null,
                "signaturePersistencePath": null,
                "avatar": null,
                "roleList": null,
                "insertTime": "2025-06-22 13:37:07",
                "lastLoginTime": "2025-08-13 14:08:21",
                "signatureFileCode": null,
                "name": null,
                "personId": null,
                "avatarPersistencePath": null,
                "age": null,
                "username": "admin",
                "status": 1,
                "lastUpdateTime": "2025-06-22 13:37:07"
            },
            "permissionInfo": {
                "menuTreeList": [
                    {
                        "id": 1,
                        "insertTime": "2025-06-04 12:50:37",
                        "lastUpdateTime": "2025-06-04 12:50:37",
                        "appId": null,
                        "type": 1,
                        "name": "首页",
                        "orderNum": 1,
                        "parentId": 0,
                        "url": "/diagnosis",
                        "perms": "system:dashboard:view",
                        "icon": "dashboard",
                        "parentName": null,
                        "children": null
                    },
                    {
                        "id": 2,
                        "insertTime": "2025-06-04 12:51:35",
                        "lastUpdateTime": "2025-06-04 13:41:44",
                        "appId": null,
                        "type": 1,
                        "name": "数据统计",
                        "orderNum": 2,
                        "parentId": 0,
                        "url": "/statistics",
                        "perms": "system:statistics:view",
                        "icon": "line-chart",
                        "parentName": null,
                        "children": null
                    },
                    {
                        "id": 3,
                        "insertTime": "2025-06-04 13:16:56",
                        "lastUpdateTime": "2025-06-04 13:16:56",
                        "appId": null,
                        "type": 0,
                        "name": "病例管理",
                        "orderNum": 3,
                        "parentId": 0,
                        "url": "",
                        "perms": "system:case:view",
                        "icon": "medicine-box",
                        "parentName": null,
                        "children": [
                            {
                                "id": 4,
                                "insertTime": "2025-06-04 13:18:19",
                                "lastUpdateTime": "2025-06-04 14:51:03",
                                "appId": null,
                                "type": 1,
                                "name": "常规病例",
                                "orderNum": 1,
                                "parentId": 3,
                                "url": "/diagnosis/cases/normal",
                                "perms": "system:case.normal:view",
                                "icon": "file-text",
                                "parentName": null,
                                "children": null
                            },
                            {
                                "id": 5,
                                "insertTime": "2025-06-04 13:43:01",
                                "lastUpdateTime": "2025-06-04 14:50:43",
                                "appId": null,
                                "type": 1,
                                "name": "冰冻病例",
                                "orderNum": 2,
                                "parentId": 3,
                                "url": "/diagnosis/cases/frozen",
                                "perms": "system:cases.frozen:view",
                                "icon": "schedule",
                                "parentName": null,
                                "children": null
                            }
                        ]
                    },
                    {
                        "id": 7,
                        "insertTime": "2025-06-04 13:54:31",
                        "lastUpdateTime": "2025-06-04 13:58:20",
                        "appId": null,
                        "type": 0,
                        "name": "读片会",
                        "orderNum": 4,
                        "parentId": 0,
                        "url": "",
                        "perms": "system:reading:view",
                        "icon": "read",
                        "parentName": null,
                        "children": [
                            {
                                "id": 8,
                                "insertTime": "2025-06-04 13:56:04",
                                "lastUpdateTime": "2025-06-04 13:56:04",
                                "appId": null,
                                "type": 1,
                                "name": "我的读片会",
                                "orderNum": 1,
                                "parentId": 7,
                                "url": "/reading/my",
                                "perms": "system:reading:view",
                                "icon": "team",
                                "parentName": null,
                                "children": null
                            },
                            {
                                "id": 9,
                                "insertTime": "2025-06-04 13:57:05",
                                "lastUpdateTime": "2025-06-04 13:57:05",
                                "appId": null,
                                "type": 1,
                                "name": "读片会审核",
                                "orderNum": 2,
                                "parentId": 7,
                                "url": "/reading/audit",
                                "perms": "system:reading:audit",
                                "icon": "audit",
                                "parentName": null,
                                "children": null
                            }
                        ]
                    },
                    {
                        "id": 10,
                        "insertTime": "2025-06-04 13:58:01",
                        "lastUpdateTime": "2025-06-04 13:58:01",
                        "appId": null,
                        "type": 0,
                        "name": "系统设置",
                        "orderNum": 8,
                        "parentId": 0,
                        "url": "",
                        "perms": "system:setting:view",
                        "icon": "setting",
                        "parentName": null,
                        "children": [
                            {
                                "id": 11,
                                "insertTime": "2025-06-04 13:59:04",
                                "lastUpdateTime": "2025-06-04 13:59:04",
                                "appId": null,
                                "type": 1,
                                "name": "个人设置",
                                "orderNum": 1,
                                "parentId": 10,
                                "url": "/setting/usersetting",
                                "perms": "system:user:view",
                                "icon": "user",
                                "parentName": null,
                                "children": null
                            },
                            {
                                "id": 12,
                                "insertTime": "2025-06-04 13:59:53",
                                "lastUpdateTime": "2025-06-04 13:59:53",
                                "appId": null,
                                "type": 1,
                                "name": "用户管理",
                                "orderNum": 2,
                                "parentId": 10,
                                "url": "/setting/usermanagement",
                                "perms": "system:user:list",
                                "icon": "user-add",
                                "parentName": null,
                                "children": null
                            },
                            {
                                "id": 13,
                                "insertTime": "2025-06-04 14:01:14",
                                "lastUpdateTime": "2025-06-26 10:33:40",
                                "appId": null,
                                "type": 1,
                                "name": "权限管理",
                                "orderNum": 3,
                                "parentId": 10,
                                "url": "/setting/rolemanagement",
                                "perms": "system:role:view",
                                "icon": "safety",
                                "parentName": null,
                                "children": null
                            },
                            {
                                "id": 14,
                                "insertTime": "2025-06-04 14:03:34",
                                "lastUpdateTime": "2025-06-04 14:03:34",
                                "appId": null,
                                "type": 1,
                                "name": "菜单管理",
                                "orderNum": 4,
                                "parentId": 10,
                                "url": "/setting/menu",
                                "perms": "system:menu:view",
                                "icon": "menu",
                                "parentName": null,
                                "children": null
                            },
                            {
                                "id": 15,
                                "insertTime": "2025-06-04 14:04:35",
                                "lastUpdateTime": "2025-06-04 14:04:35",
                                "appId": null,
                                "type": 1,
                                "name": "机构管理",
                                "orderNum": 5,
                                "parentId": 10,
                                "url": "/setting/orgmanagement",
                                "perms": "system:org:view",
                                "icon": "bank",
                                "parentName": null,
                                "children": null
                            },
                            {
                                "id": 16,
                                "insertTime": "2025-06-04 14:05:31",
                                "lastUpdateTime": "2025-06-04 14:05:31",
                                "appId": null,
                                "type": 1,
                                "name": "字典管理",
                                "orderNum": 6,
                                "parentId": 10,
                                "url": "/setting/dictmanagement",
                                "perms": "system:dict:view",
                                "icon": "database",
                                "parentName": null,
                                "children": null
                            }
                        ]
                    }
                ],
                "permissionList": [
                    "system:dashboard:view",
                    "system:statistics:view",
                    "system:case:view",
                    "system:case.normal:view",
                    "system:cases.frozen:view",
                    "system:reading:view",
                    "system:reading:audit",
                    "system:setting:view",
                    "system:user:view",
                    "system:user:list",
                    "system:role:view",
                    "system:menu:view",
                    "system:org:view",
                    "system:dict:view"
                ]
            }
        },
        {
            "appName": "分子",
            "flag": true,
            "userInfo": {
                "createUserId": 0,
                "menuList": [],
                "gender": null,
                "avatarFileCode": null,
                "mobile": "17763016201",
                "deptId": null,
                "permissionList": [],
                "signatureFileMetadata": null,
                "sysOrg": null,
                "roleList": [],
                "orgId": null,
                "sysDept": null,
                "avatarFileMetadata": null,
                "insertTime": "2025-07-01 11:47:40",
                "lastLoginTime": "2025-08-13 11:48:01",
                "signatureFileCode": null,
                "realName": null,
                "userType": null,
                "id": 1,
                "email": null,
                "age": null,
                "username": "admin",
                "status": 1,
                "lastUpdateTime": "2025-07-01 11:47:40"
            },
            "permissionInfo": null
        },
        {
            "appName": "AI",
            "flag": true,
            "userInfo": {
                "gender": "男",
                "electronicSignaturePath": "//app_data/admin/elec_name_file/551c4a3a-d4d9-463e-823d-b17121f54254.jpg",
                "roleId": 1,
                "collectionAreas": null,
                "avatarPath": "https://pipelinemedical.com/wp-content/uploads/2018/03/doctor-icon.png",
                "realname": "管理员",
                "allowSliceSize": null,
                "roleName": "主任",
                "id": 1,
                "hospital": "xx医院",
                "department": "病理科",
                "introduction": "科室主任",
                "username": "admin"
            },
            "permissionInfo": null
        }
    ]
}
 */


/**
 * 门户用户模型
 */
type PortalUserModel = DiagnosisUserModel | DeliveryUserModel | AssistantUserModel;

/**
 * 会诊用户模型
 */
interface DiagnosisUserModel {
    id: number;
  username: string;
  password?: string;
  email?: string | null;
  createTime?: string;
  updateTime?: string;
  status?: number;
  createUserId?: number;
  gender?: string | null;
  signature?: string | null;
  certificate?: string | null;
  signatureFileMetadata?: string | null;
  type?: number;
  title?: string | null;
  sysOrg?: string | null;
  orgId?: string | null;
  avatarFileMetadata?: string | null;
  manager?: string | null;
  avatarFileCode?: string | null;
  mobile?: string | null;
  signaturePersistencePath?: string | null;
  avatar?: string | null;
  roleList?: any[] | null;
  insertTime?: string;
  lastLoginTime?: string;
  signatureFileCode?: string | null;
  name?: string | null;
  personId?: string | null;
  avatarPersistencePath?: string | null;
  age?: number | null;
  lastUpdateTime?: string;
}

/**
 * 送检用户模型
 */
interface DeliveryUserModel {
    id: number;
  username: string;
  password?: string;
  email?: string | null;
  createTime?: string;
  updateTime?: string;
  status?: number;
  createUserId?: number;
  gender?: string | null;
  signature?: string | null;
  certificate?: string | null;
  signatureFileMetadata?: string | null;
  type?: number;
  title?: string | null;
  sysOrg?: string | null;
  orgId?: string | null;
  avatarFileMetadata?: string | null;
  manager?: string | null;
  avatarFileCode?: string | null;
  mobile?: string | null;
  signaturePersistencePath?: string | null;
  avatar?: string | null;
  roleList?: any[] | null;
  insertTime?: string;
  lastLoginTime?: string;
  signatureFileCode?: string | null;
  name?: string | null;
  personId?: string | null;
  avatarPersistencePath?: string | null;
  age?: number | null;
  lastUpdateTime?: string;
}

/**
 * AI 用户模型
 */
interface AssistantUserModel {
  id: number;
  hospital: string;
  department: string;
  introduction: string;
  username: string;
  roleName: string;
  roleId: number;
  allowSliceSize?: number | null;
  electronicSignaturePath?: string | null;
  avatarPath?: string | null;
  realname?: string | null;
  age?: number | null;
  gender?: string | null;
}

interface MenuTreeItem {
  id: number;
  insertTime: string;
  lastUpdateTime: string;
  appId?: string | null;
  type: number;
  name: string;
  orderNum: number;
  parentId: number;
  url: string;
  perms: string;
  icon: string;
  parentName?: string | null;
  children?: MenuTreeItem[] | null;
}

interface PortalPermissionModel {
  menuTreeList?: MenuTreeItem[];
  permissionList?: string[];
}

interface PortalAppUserInfo {
  appName: string;
  flag: boolean;
  userInfo: PortalUserModel | null;
  permissionInfo: PortalPermissionModel | null;
}

/**
 * 登录返回数据模型
 */
interface PortalLoginData {
  username: string;
  token: string;
  appUserInfoList: Array<PortalAppUserInfo>;
}