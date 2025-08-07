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
