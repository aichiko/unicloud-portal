import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || "portal_secret_key";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, token } = body;

    // 验证必填参数
    if (!userId || !token) {
      return NextResponse.json(
        { 
          success: false,
          error: '缺少必填参数 userId 或 token' 
        },
        { status: 400 }
      );
    }

    // 生成签名的 token
    const data = {
      userId,
      token,
      timestamp: Date.now()
    };

    const signedToken = jwt.sign(data, SECRET_KEY, {
      expiresIn: '1h', // 1小时过期
      issuer: 'unicloud-portal'
    });

    return NextResponse.json({
      success: true,
      data: signedToken,
      message: 'SSO token 生成成功'
    });

  } catch (error) {
    console.error('生成 SSO token 失败:', error);
    return NextResponse.json(
      { 
        success: false,
        error: '生成 SSO token 失败' 
      },
      { status: 500 }
    );
  }
}