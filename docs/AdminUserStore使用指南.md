# Admin User Store 使用指南

## 概述

`adminUserStore` 是专门为管理后台设计的全局状态管理 store，基于 zustand 构建，提供了完整的管理员用户状态管理功能。

## 主要功能

### 状态管理
- ✅ 管理员登录状态
- ✅ 管理员用户信息
- ✅ 权限和角色管理
- ✅ 菜单导航状态
- ✅ 面包屑导航
- ✅ 侧边栏状态

### 数据持久化
- ✅ localStorage 自动持久化
- ✅ Cookie 管理（用于 middleware）
- ✅ 自动状态恢复

### 安全功能
- ✅ Token 自动管理
- ✅ 权限检查辅助函数
- ✅ 角色验证
- ✅ 超级管理员检测

## 基本使用

### 1. 导入 Store

```tsx
import { useAdminUserStore } from '@/store/adminUserStore';
```

### 2. 在组件中使用

```tsx
function MyAdminComponent() {
  const { 
    isLoggedIn,           // 登录状态
    adminUserInfo,        // 用户信息
    permissions,          // 权限列表
    roles,               // 角色列表
    login,               // 登录方法
    logout,              // 登出方法
    setCurrentMenuItem,   // 设置当前菜单
    setBreadcrumbs       // 设置面包屑
  } = useAdminUserStore();

  // 使用状态...
}
```

### 3. 权限检查

```tsx
import { hasPermission, hasRole, isSuperAdmin } from '@/store/adminUserStore';

function AdminComponent() {
  // 检查权限
  const canEdit = hasPermission('system:user:edit');
  const canDelete = hasPermission('system:user:delete');
  
  // 检查角色
  const isAdmin = hasRole('admin');
  const isSuper = isSuperAdmin();

  return (
    <div>
      {canEdit && <Button>编辑</Button>}
      {canDelete && <Button danger>删除</Button>}
      {isSuper && <Button type="primary">超级管理</Button>}
    </div>
  );
}
```

## API 参考

### 状态属性

| 属性 | 类型 | 描述 |
|------|------|------|
| `isLoggedIn` | `boolean` | 是否已登录 |
| `adminToken` | `string \| null` | 管理员 Token |
| `adminUserInfo` | `AdminUserInfo \| null` | 管理员用户信息 |
| `permissions` | `string[]` | 权限列表 |
| `roles` | `string[]` | 角色列表 |
| `currentMenuItem` | `string` | 当前选中菜单项 |
| `breadcrumbs` | `Array<{title: string, path?: string}>` | 面包屑导航 |
| `sidebarCollapsed` | `boolean` | 侧边栏是否折叠 |

### Actions 方法

| 方法 | 参数 | 描述 |
|------|------|------|
| `login` | `(token: string, userInfo: AdminUserInfo)` | 用户登录 |
| `logout` | `()` | 用户登出 |
| `setAdminUserInfo` | `(userInfo: AdminUserInfo)` | 设置用户信息 |
| `setCurrentMenuItem` | `(menuItem: string)` | 设置当前菜单 |
| `setBreadcrumbs` | `(breadcrumbs: Array<{title: string, path?: string}>)` | 设置面包屑 |
| `setSidebarCollapsed` | `(collapsed: boolean)` | 设置侧边栏状态 |
| `initializeAuth` | `()` | 初始化认证状态 |

### 辅助函数

| 函数 | 参数 | 返回值 | 描述 |
|------|------|--------|------|
| `hasPermission` | `(permission: string)` | `boolean` | 检查是否有指定权限 |
| `hasRole` | `(role: string)` | `boolean` | 检查是否有指定角色 |
| `isSuperAdmin` | `()` | `boolean` | 检查是否为超级管理员 |

## 实际使用示例

### 登录页面集成

```tsx
import { useAdminUserStore } from '@/store/adminUserStore';
import AdminAPI from '@/apis/adminApi';

function AdminLoginPage() {
  const { login } = useAdminUserStore();
  
  const handleLogin = async (values: LoginFormData) => {
    try {
      // 调用登录 API
      const token = await AdminAPI.adminLogin(values);
      const userInfo = await AdminAPI.getUserInfo();
      
      // 使用 store 保存状态
      login(token, userInfo);
      
      // 跳转到管理后台
      router.push('/admin');
    } catch (error) {
      message.error(error.message ?? '登录失败');
    }
  };
}
```

### 布局组件集成

```tsx
import { useAdminUserStore } from '@/store/adminUserStore';

function AdminLayout({ children }) {
  const { 
    isLoggedIn, 
    adminUserInfo, 
    logout, 
    initializeAuth 
  } = useAdminUserStore();

  useEffect(() => {
    // 初始化认证状态
    initializeAuth();
    
    if (!isLoggedIn) {
      router.push('/adminLogin');
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    logout();
    router.push('/adminLogin');
  };

  return (
    <ProLayout
      avatarProps={{
        src: adminUserInfo?.user?.avatar,
        title: adminUserInfo?.user?.nickName,
        render: () => (
          <Dropdown menu={{ 
            items: [
              { key: 'logout', label: '退出登录', onClick: handleLogout }
            ]
          }}>
            <Avatar src={adminUserInfo?.user?.avatar} />
          </Dropdown>
        )
      }}
    >
      {children}
    </ProLayout>
  );
}
```

### 权限控制组件

```tsx
import { hasPermission } from '@/store/adminUserStore';

function UserManagementPage() {
  return (
    <div>
      <Table
        columns={[
          // ... 其他列
          {
            title: '操作',
            render: (_, record) => (
              <>
                {hasPermission('system:user:edit') && (
                  <Button onClick={() => handleEdit(record)}>编辑</Button>
                )}
                {hasPermission('system:user:delete') && (
                  <Button danger onClick={() => handleDelete(record)}>删除</Button>
                )}
              </>
            )
          }
        ]}
      />
    </div>
  );
}
```

## 最佳实践

1. **初始化**: 在应用启动时调用 `initializeAuth()` 初始化认证状态
2. **权限检查**: 使用辅助函数而不是直接检查权限数组
3. **错误处理**: API 调用失败时自动清理状态
4. **状态同步**: Token 同时保存到 localStorage 和 Cookie
5. **类型安全**: 使用 TypeScript 接口确保类型安全

## 注意事项

- Store 会自动处理 localStorage 和 Cookie 的同步
- 权限检查函数会自动处理超级管理员权限
- 登出时会自动清理所有相关状态
- 支持浏览器刷新后状态恢复
