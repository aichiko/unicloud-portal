import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const adminStartPathArr = ['/admin', '/adminLogin'];
  // 如果访问管理后台路径
  if (adminStartPathArr.some(path => pathname.startsWith(path))) {
    console.log('Admin access detected:', pathname);
    
    // 检查IP限制（生产环境）
    if (process.env.NODE_ENV === 'production') {
      const hostname = request.headers.get('host') || request.headers.get('x-forwarded-host') || request.headers.get('x-forwarded-for') || 'unknown';
      const clientIP = hostname.split(':')[0];
      const isInternalIP = isInternalNetwork(clientIP);
      
      console.log("IP检查:", clientIP, isInternalIP);
      
      if (!isInternalIP) {
        // 返回404页面，不暴露管理后台的存在
        const url = request.nextUrl.clone();
        url.pathname = '/404';
        return NextResponse.redirect(url);
      }
    }

    // 如果是登录页面，允许访问
    if (pathname === '/adminLogin') {
      return NextResponse.next();
    }

    // 检查认证token（仅对/admin路径，不包括/adminLogin）
    // const adminToken = request.cookies.get('adminToken')?.value;
    
    // if (!adminToken) {
    //   // 未登录，重定向到登录页面
    //   const url = request.nextUrl.clone();
    //   url.pathname = '/adminLogin';
    //   return NextResponse.redirect(url);
    // }

    // TODO: 这里可以验证token的有效性
    // const isValidToken = await validateToken(adminToken);
    // if (!isValidToken) {
    //   const url = request.nextUrl.clone();
    //   url.pathname = '/adminLogin';
    //   return NextResponse.redirect(url);
    // }
  }

  return NextResponse.next();
}

function isInternalNetwork(ip: string): boolean {
  // 根据你的内网IP段配置
  const internalPatterns = [
    /^192\.168\./,
    /^10\./,
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
    /^127\./,
    /^localhost$/
  ];

  return internalPatterns.some(pattern => pattern.test(ip));
}

export const config = {
  matcher: ['/admin/:path*']
};