'use client';

import { useState, useEffect } from 'react';

interface Todo {
  id: number;
  title: string;
  content: string | null;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function TodoComponent() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // 获取所有Todo
  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos');
      const data = await response.json();
      
      // 确保data是数组
      if (Array.isArray(data)) {
        setTodos(data);
      } else if (data.error) {
        setError(data.error);
        console.error('获取Todo失败:', data.error);
      } else {
        // 如果返回的不是数组也不是错误，记录类型
        console.error('返回的数据不是数组:', typeof data, data);
        setTodos([]);
      }
    } catch (error) {
      console.error('获取Todo失败:', error);
      setError('获取数据失败，请检查网络连接');
    }
  };

  // 创建新Todo
  const createTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });
      
      if (response.ok) {
        setTitle('');
        setContent('');
        fetchTodos();
      } else {
        const errorData = await response.json();
        setError(errorData.error || '创建失败');
      }
    } catch (error) {
      console.error('创建Todo失败:', error);
      setError('创建失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">待办事项</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}
      
      <form onSubmit={createTodo} className="mb-6">
        <div className="mb-4">
          <label htmlFor="title" className="block mb-1">标题</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block mb-1">内容</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button 
          type="submit" 
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-300"
        >
          {isLoading ? '提交中...' : '添加待办'}
        </button>
      </form>
      
      <div>
        <h2 className="text-xl font-semibold mb-2">待办列表</h2>
        {todos.length === 0 ? (
          <p className="text-gray-500">暂无待办事项</p>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li key={todo.id} className="border p-3 rounded">
                <h3 className="font-bold">{todo.title}</h3>
                {todo.content && <p className="text-gray-600">{todo.content}</p>}
                <div className="flex justify-between items-center mt-2">
                  <span className={`text-sm ${todo.completed ? 'text-green-500' : 'text-yellow-500'}`}>
                    {todo.completed ? '已完成' : '进行中'}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(todo.createdAt).toLocaleString()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 