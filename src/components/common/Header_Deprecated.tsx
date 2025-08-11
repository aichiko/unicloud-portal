'use client';
import { Layout, Menu, Button, Space, MenuProps } from "antd";
import { useEffect, useState } from "react";
import PortalAPI from "@/apis/portalApi";
import Image from 'next/image';
import LogoImg from '@/assets/header_logo.png';

const { Header: AntdHeader } = Layout;

type MenuItemsType = MenuProps['items'];

function Header() {
  const [menuTreeItems, setMenuTreeItems] = useState<MenuItemsType>([]);

  // 构建菜单树结构
  const buildMenuTree = (titleList: PortalTitleModel[]): MenuItemsType => {
    const menuItems: MenuItemsType = [];

    // 获取顶级菜单项（parentId为"0"）
    const topLevelItems = titleList.filter(item => item.parentId === "0");

    // 根据sortOrder排序
    topLevelItems.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

    topLevelItems.forEach(topItem => {
      // 查找子菜单项
      const children = titleList
        .filter(item => item.parentId === topItem.id.toString())
        .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
        .map(child => ({
          key: child.id.toString(),
          label: child.title,
          onClick: () => {
            if (child.linkUrl) {
              window.open(child.linkUrl, '_blank');
            }
          }
        }));

      const menuItem = {
        key: topItem.id.toString(),
        label: topItem.title,
        children: children.length > 0 ? children : undefined,
        onClick: children.length === 0 ? () => {
          if (topItem.linkUrl) {
            window.open(topItem.linkUrl, '_blank');
          }
        } : undefined
      };

      menuItems.push(menuItem);
    });

    return menuItems;
  };

  async function fetchTitleListData() {
    try {
      const titleList = await PortalAPI.getTitleList();
      console.log("Fetched title list:", titleList);

      // 过滤出type为"title"的项目来构建菜单
      const titleItems = titleList.filter((item: PortalTitleModel) => item.type === "title");
      const menuItems = buildMenuTree(titleItems);
      setMenuTreeItems(menuItems);
    } catch (error) {
      console.error("Error fetching title list:", error);
    }
  }

  useEffect(() => {
    console.log("Header mounted");
    fetchTitleListData();
    return () => {
      console.log("Header unmounted");
    };
  }, []);

  return (
    <AntdHeader className="px-6 h-16 flex items-center justify-between">
      {/* 左侧 Logo 和标题 */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <Image
            src={LogoImg}
            alt="区域智汇病理云平台"
            height={36}
            className="object-contain cursor-pointer"
            onClick={() => window.location.href = '/'}
          />
          <span className="text-white font-medium text-3xl">区域智汇病理云平台</span>
        </div>
      </div>

      {/* 中间导航菜单 */}
      <Menu
        mode="horizontal"
        items={menuTreeItems}
        selectedKeys={[]}
        className="border-none flex-1 justify-end"
        theme="dark"
        style={{
          backgroundColor: 'transparent',
          fontSize: '18px',
        }}
      />

    </AntdHeader>
  ); 
}

export default Header;