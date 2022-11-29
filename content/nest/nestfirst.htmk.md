---
title: 'NestJS 学习（一）'
keywords: '一朵大呲花,IT博客,技术博客,区块链博客'
description: 'NestJS 学习（一）'

layout: 'markdown-full'

summary:
  title: 'NestJS 学习（一）'
  type: '学习笔记'
  icon: '🍑'
  desc: 'NestJS 学习（一）'
  tags: 'NestJS'
  createtime: '2022-11-29'
  pic: ''
---

nestJS 中的路由
nest 中没有单独配置路由的地方，定义好控制器后nestjs会自动给我们分配对应的路由。

下面代码定义了一个新闻控制器，装饰器为 `@Controller('article')`，装饰器参数里面的'article'就是我们的路由。

如果我们要返回 index 方法里面的内容我们在浏览器中输入 http://localhost:3000/article
如果我们要返回 add 方法里面的内容我们在浏览器中输入 http://localhost:3000/article/add

```ts
  import { Controller, Get } from '@nestjs/common';

  @Controller('article')
  export class ArticleController {
    // 主要根据装饰器来找的路由，装饰器后面不要写分号
    @Get('')
    index(){
      return '我是文章页面'
    }

    @Get('add')
    addArticle(){
      return '添加文章'
    }
  }

```