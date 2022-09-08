---
title: 'Nuxt3 踩坑记录'
keywords: '一朵大呲花,IT博客,技术博客,区块链博客'
description: 'Nuxt3 踩坑记录'

layout: 'markdown-full'

summary:
  title: 'Nuxt3 踩坑记录'
  type: 'Nuxt3'
  icon: '🍉'
  desc: 'Nuxt3 - 博客搭建路程'
  tags: 'Nuxt3'
  createtime: '2022-08-01'
  pic: '/img/pic/nuxt3_icon.jpg'
---

# nuxt3学习笔记

---
## 创建新项目

- 打开一个终端，或者从Visual Studio Code打开一个集成终端并使用以下命令创建一个新的启动项目：

``` javascript
npx nuxi init nuxt-app || pnpm dlx nuxi init nuxt-app
```

- 安装依赖项：

``` javascript
yarn install || npm install || pnpm install --shamefully-hoist
```

---

## 启动项目
- 现在你可以在开发模式下启动你的 Nuxt 应用了：、

``` javascript
yarn dev -o || npm run dev -- -o || pnpm run dev -o
```
> ✨ 项目启动！http://localhost:3000自动打开一个浏览器窗口。

---

## 目录结构

``` javascript
根目录
│  .nuxt // dev运行之后自动生成
│  .output // 打包编译之后生成的文件
│  assets // 静态文件
│  components // 组件文件夹
│  composables // 会自动导入依赖项，不需要手动引入
│  content // 必须下载@nuxt/content 才能使用该文件夹
│  layouts // 公共布局目录
│  middleware // 中间件
│  node_modules // 依赖
│  pages // 页面文件夹
│  public // 不会被打包的静态文件夹
│  server // 服务端目录
│  app.vue // 入口文件
│  nuxt.config.ts // 配置文件
│  package.json // 包含应用程序的所有依赖项和脚本
└─ tsconfig.json // 自动生成的文件
```

---
## 项目中使用 element-plus+

- 安装依赖项
- 
```javascript

yarn add element-plus || npm install element-plus
// 如果使用icon 需要下载 @element-plus/icons-vue
yarn add @element-plus/icons-vue || npm install @element-plus/icons-vue
```

- 配置nuxt.config.ts || js

```javascript
// 判断运行环境
const lifecycle = process.env.npm_lifecycle_event;
import { defineNuxtConfig } from 'nuxt'
export default defineNuxtConfig({
  // ... 其他配置
  build: {
    transpile: lifecycle === "build" ? ["element-plus"] : [],
  },
})
```

- 按需引入element

```javascript
// 下载按需引入的依赖包
yarn add unplugin-auto-import unplugin-vue-components

// 判断运行环境
export default defineNuxtConfig({
  // ... 其他配置
  vite: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        dts: true,
        resolvers: [ElementPlusResolver()]
      }),
      visualizer,
    ]
  }
})
```
 - 在组件中使用
  ```javascript
    import { ElSwitch, ElDrawer } from 'element-plus/dist/index.full.js'
    import { Check, Close } from '@element-plus/icons-vue'
   · <el-switch
      v-model="false"
      class="ml-2"
      inline-prompt
      :active-icon="Check"
      :inactive-icon="Close"
      /> 
    
  ```
> @nuxt/content Markdown渲染 使用el-drawer踩的坑

- 添加完组件无法正常显示 并且报错 `Hydration children mismatch in <div>: server rendered element contains more child nodes than client vdom.`
  - 原因是因为服务端渲染，节点不匹配的造成的，组件插入到body元素就OK了
```javascript
// 需要把 append-to-body 设置为true
// Drawer 自身是否插入至 body 元素上。嵌套的 Drawer 必须指定该属性并赋值为 true

· <el-drawer :append-to-body="true"></el-drawer>

```





