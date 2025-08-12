'use client';
import { useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import { setUserAuth } from '@/utils/utils';

/**
 * 应用初始化组件
 * 负责在应用启动时初始化用户状态和设置请求头
 */
export function AppInitializer() {
  const { initializeAuth, userToken } = useUserStore();

  useEffect(() => {
    // 初始化用户认证状态
    initializeAuth();
    
    // 如果有token，设置请求头
    if (userToken) {
      setUserAuth(userToken);
    }
  }, [initializeAuth, userToken]);

  return null; // 这个组件不渲染任何UI
}

export default AppInitializer;
