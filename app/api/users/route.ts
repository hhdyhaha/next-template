import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  // 模拟数据
  const users = [
    { id: '1', name: '张三' },
    { id: '2', name: '李四' },
    { id: '3', name: '王五' },
  ];

  const user = users.find((u) => u.id === id);

  if (!user) {
    return NextResponse.json({ error: '用户不存在' }, { status: 404 });
  }

  return NextResponse.json({ message: `Hello, ${user.name}!` });
}
