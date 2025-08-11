import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 如果访问管理后台路径
  if (pathname.startsWith('/admin')) {
    // console.log('Admin access detected:', request);
    const hostname = request.headers.get('host') || request.headers.get('x-forwarded-host') || request.headers.get('x-forwarded-for') || 'unknown';
    
    // 去除端口号
    const clientIP = hostname.split(':')[0];

    // 检查是否为内网IP（根据你的网络环境调整）
    const isInternalIP = isInternalNetwork(clientIP);
    // console.log("isInternalIP:", clientIP, isInternalIP);
    
    // 如果不是内网访问，返回404
    if (!isInternalIP && process.env.NODE_ENV === 'production') {
      return new NextResponse('Page not found', { status: 404 });
    }
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