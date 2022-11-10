---
title: 'Electron 自动更新 - 增量更新'
keywords: '一朵大呲花,IT博客,技术博客,区块链博客'
description: 'Electron 使用 electron-updater 自动更新 - 增量更新'

layout: 'markdown-full'

summary:
  title: 'Electron 自动更新 - 增量更新'
  type: '学习笔记'
  icon: '🍑'
  desc: 'Electron 使用 electron-updater 自动更新 - 增量更新'
  tags: 'Electron Hot updater'
  createtime: '2022-10-28'
  pic: '/img/pic/hot_update.jpg'
---


# Electron 自动更新 - 增量更新

## 线上客户端版本需要更新一般有两种方式 `全量更新` 和 `增量更新`
 > 当前为增量更新：
  - 适用场景：功能特性的改进、小功能的上线、普通 BUG 的修复。让你 **「 情绪保持稳定 」** 的更新
  - 更新流程：
    - 客户端通过定时检测、或者服务端推送方式检测是否有更新
    - 通过版本对比发现更新，并获取到需要更新的文件名称
    - 下载 `app.asar.upacked.xxx.tgz` 更新文件到应用的指定目录（路径因系统而异）
    - 解压覆盖原文件，重启应用


 - 应用在代码改动较少的情况下，用户体验好、比较优雅的更新方式就是增量更新了。增量更新的方案也有多种，具体的增量更新方案需要针对具体的业务需求进行定制。下边介绍两种常见的增量更新方案，我们仍然是基于 `electron-builder` 的打包方式来实现的。


#### 固定模块升级
  `asar` 是 Electron 提供的一种将多个文件合并成一个文件的类 `tar` 风格的归档格式，不仅可以缓解 Widows 下路径名过长的问题，还能略微加快 `require` 的速度，并且可以隐藏你的源代码（并非绝对隐藏，专业人士还是可以解压缩的），了解更多请查看官方文档 [asar](https://github.com/electron/asar){:target="_blank"}。

  基于 `electron-builder` 的 `asar` 打包配置。
  ```json
    {
      "appId": "com.test.app",
      "productName": "APP",
      "files": ["./build/**/*"],
      "compression": "maximum",
      "asar": true,
      "directories": {
        "output": "dist"
      },
      "mac": {
        "target": ["dmg", "zip"]
      }
    }
  ```

  打包生成的文件

  根据配置文件打包后会生成安装包和增量包，其中 `app.asar` 压缩文件就是基本不要变动的代码，`app.asar.upacked` 目录就是我们的增量文件，也就是需要变更的代码。最后注意我们要对增量包进行压缩，减少更新包体积，然后上传文件到服务器。

  ```md
    ├── dist
    ├── win-unpacked
      ├── resources
        ├── app.asar
        ├── app.asar.unpacked
        ├── 
      ├── app.exe
    ├── builder-effective-config.yaml
    ├── latest.yml
    ├── app-0.0.2.exe
    └── app-0.0.2.exe.blockmap
  ```
  >> 未完待续....