import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// 此API仅用于开发环境初始化数据库
export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: '此API仅用于开发环境' }, { status: 403 });
  }

  try {
    // 创建一些示例Todo
    const examples = [
      { title: '学习Prisma', content: '了解Prisma的基本使用方法和优势' },
      { title: '配置PostgreSQL', content: '设置和配置PostgreSQL数据库' },
      { title: '完成Next.js项目', content: '使用Next.js和Prisma构建一个完整的应用', completed: true },
    ];

    // 依次创建示例数据
    for (const example of examples) {
      await prisma.todo.create({
        data: example
      });
    }

    return NextResponse.json({ message: '示例数据创建成功' }, { status: 200 });
  } catch (error) {
    console.error('创建示例数据失败:', error);
    return NextResponse.json({ error: '创建示例数据失败' }, { status: 500 });
  }
} 