---
title: 'Electron Module format cjs does not support top-level await. Use the "es" or "system" output formats rather'
keywords: '一朵大呲花,IT博客,技术博客,区块链博客'
description: 'Electron Module format cjs does not support top-level await. Use the "es" or "system" output formats rather'

layout: 'markdown-full'

summary:
  title: 'Electron import.meta.glob异步引入模块报错'
  type: '学习笔记'
  icon: '🍑'
  desc: 'Electron Module format cjs does not support top-level await. Use the "es" or "system" output formats rather'
  tags: 'Vite import'
  createtime: '2022-09-01'
  pic: ''
---


# Electron 自动更新 - 全量更新

## 线上客户端版本需要更新一般有两种方式 `全量更新` 和 `增量更新`
 ### 全量更新：
  - 更新流程：应用内通知、下载后（打包后的.exe文件或者.zip），唤起安装过程重新安装覆盖之前的版本
  - 适用场景：重大 BUG 的修复、大的改版。让你 **「 无法保持情绪稳定 」** 的更新
 ### 增量更新：
  - 更新流程：应用内通知、重新启动打开即新版
  - 适用场景：功能特性的改进、小功能的上线、普通 BUG 的修复。让你 **「 情绪保持稳定 」** 的更新

>>> 未完待续.....