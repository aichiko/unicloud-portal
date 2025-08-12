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
