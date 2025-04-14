# Next.js 应用模版

这是一个基于 [Next.js](https://nextjs.org) 14.2.28 的应用模版，结合了 TailwindCSS、shadcn/ui 和 Zustand 等现代前端技术，提供了一个功能完整的开发起点。

## 特性

- ✅ 使用 **Next.js App Router** 架构
- ✅ 基于 **TailwindCSS** 的响应式设计
- ✅ 使用 **shadcn/ui** 组件库
- ✅ **Zustand** 状态管理
- ✅ 内置明暗主题切换
- ✅ 使用 **TypeScript** 类型安全
- ✅ 集成 **Vitest** 测试框架
- ✅ 使用 **Geist** 字体
- ✅ 推荐使用 **pnpm** 包管理器
- ✅ 符合最佳实践的项目结构

## 快速开始

首先，安装依赖并运行开发服务器（推荐使用 pnpm）:

```bash
# 安装依赖（推荐使用pnpm）
pnpm install
# 或
npm install
# 或
yarn install

# 启动开发服务器
pnpm dev
# 或
npm run dev
# 或
yarn dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

## 项目结构

```
/
├── app/                    # Next.js App Router（仅用于路由）
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   └── about/            # 关于页面
├── components/            # 全局共享组件
│   ├── common/           # 通用组件（如Navbar、ThemeToggle等）
│   └── ui/              # 基础UI组件(shadcn/ui)
├── lib/                  # 工具函数和库
├── store/                # Zustand 状态管理
│   ├── useThemeStore.ts  # 主题状态
│   └── useCounterStore.ts # 计数器示例
├── styles/               # 全局样式
├── public/              # 静态资源
│   └── fonts/          # Geist 字体文件
└── providers.tsx        # 全局Provider
```

## 主要功能

### 组件库

项目使用 [shadcn/ui](https://ui.shadcn.com/)，这是一个基于 Radix UI 的高质量组件集合，包括按钮、卡片、对话框等。组件都支持明暗主题切换。

### 状态管理

项目使用 [Zustand](https://github.com/pmndrs/zustand) 进行状态管理。示例包括:

- `useThemeStore`: 管理应用主题（支持持久化）
- `useCounterStore`: 基本计数器示例

### 主题支持

内置明暗主题切换，支持:

- 明亮模式
- 暗黑模式
- 跟随系统设置

主题状态使用 Zustand 持久化到 localStorage。

### 字体

项目使用 [Geist](https://vercel.com/font) 字体：

- Geist Sans: 用于一般文本
- Geist Mono: 用于等宽文本

### 测试

项目使用 Vitest 进行单元测试：

```bash
# 运行测试
pnpm test
# 监视模式
pnpm test:watch
```

## 构建生产版本

```bash
pnpm build
# 或
npm run build
# 或
yarn build
```

生成的应用可以用下面的命令启动:

```bash
pnpm start
# 或
npm run start
# 或
yarn start
```

## 学习更多

- [Next.js 文档](https://nextjs.org/docs) - 学习 Next.js 的特性和 API
- [TailwindCSS](https://tailwindcss.com/docs) - 了解 TailwindCSS
- [shadcn/ui](https://ui.shadcn.com/) - 了解组件库
- [Zustand](https://github.com/pmndrs/zustand) - 了解状态管理
- [Vitest](https://vitest.dev/) - 了解测试框架

## 在 Vercel 上部署

部署 Next.js 应用的最简单方式是使用 Next.js 创建者开发的 [Vercel 平台](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)。

查看 [Next.js 部署文档](https://nextjs.org/docs/app/building-your-application/deploying) 了解更多详情。

## 数据库设置 (Prisma + PostgreSQL)

本项目使用Prisma作为ORM，默认连接PostgreSQL数据库。

### 设置步骤

1. 确保您已安装PostgreSQL数据库
2. 创建一个数据库（例如`next-template`）
3. 在`.env`文件中更新数据库连接字符串：
   ```
   DATABASE_URL="postgresql://用户名:密码@主机:端口/数据库名?schema=public"
   ```

4. 运行数据库迁移命令：
   ```bash
   npx prisma migrate dev --name init
   ```

5. 生成Prisma客户端：
   ```bash
   npx prisma generate
   ```

### 填充示例数据

启动开发服务器后，访问以下URL填充示例数据：
```
http://localhost:3000/api/seed
```
