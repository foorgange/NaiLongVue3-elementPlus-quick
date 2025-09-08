# vite-nailong 项目说明

这是一个基于 Vue 3 和 Vite 的前端项目模板，集成了 Element Plus 组件库、Axios 网络请求库和 Vue Router 路由管理，旨在可以帮助开发者快速搭建现代化的 Vue 单页应用。

## 项目基础信息

- **技术栈**：Vue 3 + Vite
- **核心框架**：Vue 3.5.13
- **构建工具**：Vite 5.1.4
- **UI 组件库**：Element Plus 2.9.9
- **路由管理**：Vue Router 4.2.5
- **网络请求**：Axios 1.6.7

## 快速开始

### 环境要求

- Node.js：v18.0.0 或更高版本
- npm：v8.0.0 或更高版本（通常随 Node.js 一同安装）

### 安装依赖

bash

```bash
npm install
```

### 开发环境运行

bash

```bash
npm run dev
```

运行后，项目将默认在本地启动一个开发服务器，通常地址为 `http://localhost:5173`（具体端口可能因配置或端口占用情况而有所不同）。

### 构建生产版本

bash

```bash
npm run build
```

构建完成后，生成的静态文件将存放在 `dist` 目录下，可直接部署到服务器。

### 预览生产版本

bash

```bash
npm run preview
```

用于在本地预览 `build` 命令构建后的生产版本效果。

## 项目结构说明

plaintext

```plaintext
vite-nailong/
├── node_modules/        # 项目依赖包
├── dist/                # 构建后的生产文件（执行 build 后生成）
├── public/              # 静态资源目录
├── src/                 # 源代码目录
│   ├── assets/          # 图片、样式等资源
│   ├── components/      # 自定义组件
│   ├── router/          # 路由配置
│   ├── views/           # 页面组件
│   ├── App.vue          # 根组件
│   └── main.js          # 入口文件
├── .gitignore           # Git 忽略文件配置
├── index.html           # 入口 HTML 文件
├── package.json         # 项目依赖和脚本配置
├── package-lock.json    # 依赖版本锁定文件
└── vite.config.js       # Vite 配置文件（若有）
```

## 主要依赖说明

### 核心依赖

- **vue**：Vue 3 核心库，采用了 `<script setup>` 语法糖，简化组件开发
- **vue-router**：Vue 官方路由管理器，用于实现单页应用的路由跳转
- **axios**：基于 Promise 的 HTTP 客户端，用于发送网络请求
- **element-plus**：基于 Vue 3 的企业级 UI 组件库
-  **@element-plus/icons-vue**：Element Plus 配套图标库

### 开发依赖

- **vite**：下一代前端构建工具，提供快速的热更新和构建性能
-  **@vitejs/plugin-vue**：Vite 的 Vue 插件，用于处理 Vue 单文件组件

## 开发指南

### 使用 Vue 3 `<script setup>`

本项目推荐使用 Vue 3 的 `<script setup>` 语法进行组件开发，它具有以下优势：

- 更少的样板代码，更简洁的语法
- 自动注册组件，无需手动声明 `components` 选项
- 更好的 TypeScript 支持

详细文档请参考 [Vue 官方文档](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup)。

### 路由管理

使用 Vue Router 进行路由配置，可在 `src/router` 目录下定义路由规则，示例：

javascript

运行

```javascript
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

### 网络请求

使用 Axios 发送网络请求，可封装一个请求工具：

javascript

运行

```javascript
// src/utils/request.js
import axios from 'axios'

const request = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 可在此添加请求头，如 token 等
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default request
```

### UI 组件使用

直接从 Element Plus 导入组件即可使用：

vue

```vue
<template>
  <el-button type="primary">这是一个按钮</el-button>
</template>

<script setup>
import { ElButton } from 'element-plus'
</script>
```

## 构建与部署

1. 执行 `npm run build` 生成生产环境代码
2. 将 `dist` 目录下的所有文件部署到你的 Web 服务器
3. 确保服务器正确配置了静态资源访问，对于单页应用，通常需要配置所有路由指向 index.html

## 常见问题

### 安装依赖失败

- 检查 Node.js 和 npm 版本是否符合要求
- 尝试清除 npm 缓存：`npm cache clean --force`
- 尝试使用淘宝 npm 镜像：`npm config set registry https://registry.npm.taobao.org`

### 开发服务器启动失败

- 检查端口是否被占用，可在 vite.config.js 中配置其他端口
- 检查是否有语法错误或依赖缺失