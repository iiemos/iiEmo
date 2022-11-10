---
title: 'Nuxt3 ElementPlus 服务端渲染ID错误'
keywords: '一朵大呲花,IT博客,技术博客,区块链博客'
description: 'NSIS 多语言使用'

layout: 'markdown-full'

summary:
  title: 'Nuxt3 ElementPlus 服务端渲染ID错误'
  type: 'NSIS'
  icon: '🍍'
  desc: 'Nuxt3 ElementPlus Looks like you are using server rendering, you must provide a id provider to ensure the hydration process to be succeed'
  tags: 'Nuxt3 + ElementPlus ID Error'
  createtime: '2022-09-22'
  pic: '/img/pic/nuxt3_icon.jpg'
---

# 运行Nuxt3 项目时ElementPlus 报错： Looks like you are using server rendering, you must provide a id provider to ensure the hydration process to be succeed

> 报错代码：
  ```ts
    ElementPlusError: [IdInjection] Looks like you are using server rendering, you must provide a id provider to ensure the hydration process to be succeed
    usage: app.provide(ID_INJECTION_KEY, {
      prefix: number,
      current: number,
    })
  ```
> 官方源码：
  
  ### 是ElementPlus服务端渲染需要提供一个唯一ID [github链接](https://github.com/tolking/element-pro-components/blob/main/docs/src/entry-server.ts){:target="_blank"}
   
  ```ts
   // 源码是这样的
    const { app, router, head } = createApp()
    app.provide(ID_INJECTION_KEY, {
      prefix: Math.floor(Math.random() * 10000),
      current: 0,
    })
  ```
  
> **但是**这个段代码复制到项目中不能用，然后试了`Plugins`里面配置，也不行

  后来看了官方Demo直接在 **app.vue** 里面添加一下代码就OK了
     
  ```ts
    <script setup>
    import { ID_INJECTION_KEY } from 'element-plus'
    provide(ID_INJECTION_KEY, {
      prefix: 100,
      current: 0,
    })
    </script>
  ```
