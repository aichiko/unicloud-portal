import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AdminUserInfo, AdminUser } from '../../types/AdminTypes';

interface AdminState {
  isLoggedIn: boolean;
  adminToken: string | null;
  adminUserInfo: AdminUserInfo | null;
  permissions: string[];
  roles: string[];
  
  // 管理后台相关状态
  currentMenuItem: string; // 当前选中的菜单项
  breadcrumbs: Array<{ title: string; path?: string }>; // 面包屑导航
  sidebarCollapsed: boolean; // 侧边栏是否折叠
  
  // Actions
  login: (token: string, userInfo: AdminUserInfo) => void;
  logout: () => void;
  setAdminUserInfo: (userInfo: AdminUserInfo) => void;
  setCurrentMenuItem: (menuItem: string) => void;
  setBreadcrumbs: (breadcrumbs: Array<{ title: string; path?: string }>) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  initializeAuth: () => void;
}

export const useAdminUserStore = create<AdminState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      adminToken: null,
      adminUserInfo: null,
      permissions: [],
      roles: [],
      currentMenuItem: '/admin',
      breadcrumbs: [{ title: '首页' }],
      sidebarCollapsed: false,

      login: (token: string, userInfo: AdminUserInfo) => {
        // 保存到localStorage和Cookie
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminUserInfo', JSON.stringify(userInfo));
        
        // 设置Cookie以便middleware访问
        document.cookie = `adminToken=${token}; path=/; max-age=86400`; // 24小时

        // 更新状态
        set({
          isLoggedIn: true,
          adminToken: token,
          adminUserInfo: userInfo,
          permissions: userInfo.permissions || [],
          roles: userInfo.roles || [],
        });
      },

      logout: () => {
        // 清除localStorage
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUserInfo');
        
        // 清除Cookie
        document.cookie = 'adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

        // 重置状态
        set({
          isLoggedIn: false,
          adminToken: null,
          adminUserInfo: null,
          permissions: [],
          roles: [],
          currentMenuItem: '/admin',
          breadcrumbs: [{ title: '首页' }],
        });
      },

      setAdminUserInfo: (userInfo: AdminUserInfo) => {
        localStorage.setItem('adminUserInfo', JSON.stringify(userInfo));
        set({ 
          adminUserInfo: userInfo,
          permissions: userInfo.permissions || [],
          roles: userInfo.roles || [],
        });
      },

      setCurrentMenuItem: (menuItem: string) => {
        set({ currentMenuItem: menuItem });
      },

      setBreadcrumbs: (breadcrumbs: Array<{ title: string; path?: string }>) => {
        set({ breadcrumbs });
      },

      setSidebarCollapsed: (collapsed: boolean) => {
        set({ sidebarCollapsed: collapsed });
      },

      // 简化的初始化函数，主要用于设置 Cookie
      initializeAuth: () => {
        const state = get();
        if (state.adminToken) {
          // 确保 Cookie 存在
          document.cookie = `adminToken=${state.adminToken}; path=/; max-age=86400`;
        }
      },
    }),
    {
      name: 'admin-user-store', // localStorage中的key名称
      partialize: (state) => ({
        // 只持久化这些字段
        adminToken: state.adminToken,
        adminUserInfo: state.adminUserInfo,
        isLoggedIn: state.isLoggedIn,
        permissions: state.permissions,
        roles: state.roles,
        currentMenuItem: state.currentMenuItem,
        breadcrumbs: state.breadcrumbs,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
      // 当状态从存储中恢复时的回调
      onRehydrateStorage: () => (state) => {
        if (state?.adminToken) {
          // 恢复状态时设置 Cookie
          document.cookie = `adminToken=${state.adminToken}; path=/; max-age=86400`;
        }
      },
    }
  )
);

// 权限检查辅助函数
export const hasPermission = (permission: string): boolean => {
  const state = useAdminUserStore.getState();
  return state.permissions.includes('*:*:*') || state.permissions.includes(permission);
};

// 角色检查辅助函数
export const hasRole = (role: string): boolean => {
  const state = useAdminUserStore.getState();
  return state.roles.includes('admin') || state.roles.includes(role);
};

// 检查是否为超级管理员
export const isSuperAdmin = (): boolean => {
  const state = useAdminUserStore.getState();
  return state.adminUserInfo?.user?.admin === true || state.roles.includes('admin');
};

export default useAdminUserStore;
