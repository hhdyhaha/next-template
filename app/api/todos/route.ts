import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// 获取所有Todo
export async function GET() {
  try {
    const todos = await prisma.todo.findMany();
    // 确保返回的是数组，即使是空数组
    return NextResponse.json(Array.isArray(todos) ? todos : []);
  } catch (error) {
    console.error('获取Todo失败:', error);
    return NextResponse.json({ error: '获取Todo失败' }, { status: 500 });
  }
}

// 创建新Todo
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content } = body;

    if (!title) {
      return NextResponse.json({ error: '标题不能为空' }, { status: 400 });
    }

    const newTodo = await prisma.todo.create({
      data: {
        title,
        content
      }
    });

    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    console.error('创建Todo失败:', error);
    return NextResponse.json({ error: '创建Todo失败' }, { status: 500 });
  }
} 