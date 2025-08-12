import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserInfo {
  id: number;
  username: string;
  email: string;
  // 根据PortalUserModel添加的字段
  createTime?: string;
  updateTime?: string;
  status?: string;
}

interface UserState {
  isLoggedIn: boolean;
  userToken: string | null;
  userInfo: UserInfo | null;
  
  // Actions
  login: (token: string, userInfo: UserInfo) => void;
  logout: () => void;
  setUserInfo: (userInfo: UserInfo) => void;
  initializeAuth: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      userToken: null,
      userInfo: null,

      login: (token: string, userInfo: UserInfo) => {
        // 保存到localStorage
        localStorage.setItem('userToken', token);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        
        // 更新状态
        set({
          isLoggedIn: true,
          userToken: token,
          userInfo: userInfo,
        });
      },

      logout: () => {
        // 清除localStorage
        localStorage.removeItem('userToken');
        localStorage.removeItem('userInfo');
        
        // 重置状态
        set({
          isLoggedIn: false,
          userToken: null,
          userInfo: null,
        });
      },

      setUserInfo: (userInfo: UserInfo) => {
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        set({ userInfo });
      },

      initializeAuth: () => {
        try {
          const token = localStorage.getItem('userToken');
          const userInfoStr = localStorage.getItem('userInfo');
          
          if (token && userInfoStr) {
            const userInfo = JSON.parse(userInfoStr);
            set({
              isLoggedIn: true,
              userToken: token,
              userInfo: userInfo,
            });
          } else {
            // 如果没有有效的登录信息，确保状态是清空的
            set({
              isLoggedIn: false,
              userToken: null,
              userInfo: null,
            });
          }
        } catch (error) {
          console.error('初始化用户状态失败:', error);
          // 如果解析失败，清空状态
          set({
            isLoggedIn: false,
            userToken: null,
            userInfo: null,
          });
        }
      },
    }),
    {
      name: 'user-store', // localStorage中的key名称
      partialize: (state) => ({
        // 只持久化这些字段
        userToken: state.userToken,
        userInfo: state.userInfo,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);

export default useUserStore;
