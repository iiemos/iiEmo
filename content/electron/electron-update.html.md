---
title: 'Electron 自动更新 - 全量更新'
keywords: '一朵大呲花,IT博客,技术博客,区块链博客'
description: 'Electron 使用 electron-updater 自动更新 - 全量更新'

layout: 'markdown-full'

summary:
  title: 'Electron 自动更新 - 全量更新'
  type: '学习笔记'
  icon: '🍑'
  desc: 'Electron 使用 electron-updater 自动更新 - 全量更新'
  tags: 'Electron updater'
  createtime: '2022-10-27'
  pic: ''
---


# Electron 自动更新 - 全量更新

## 线上客户端版本需要更新一般有两种方式 `全量更新` 和 `增量更新`
 > 当前为全量更新：
  - 更新流程：应用内通知、下载后（打包后的.exe文件或者.zip），唤起安装过程重新安装覆盖之前的版本
  - 适用场景：重大 BUG 的修复、大的改版。让你 **「 无法保持情绪稳定 」** 的更新

 - 当应用代码改动较大时，比如 Electron 的版本升级、项目架构调整等，我们就可能需要用户下载全量的升级包来升级。Electron 官方提供了多种[应用更新方案](https://www.electronjs.org/zh/docs/latest/tutorial/updates){:target="_blank"}主要包括使用 Electron 团队维护的 `update.electron.org` 实现自动更新，以及 `electron-builder` 打包方案。
 - Electron 应用的自动更新推荐使用 [electron-builder](https://www.electron.build/){:target="_blank"} 中的 `AutoUpdate` 功能。
 - 在打包配置文件中，需要配置 `publish` 选项，指定 `provider` 和 `url`，其中 `url` 是存放升级更新包的服务器。
  ```ts
    // @see https://www.electron.build/configuration/configuration
  ```
  ```json
    {
      "appId": "com.test.app",
      "asar": true,
      "directories": {
        "output": "dist/",
      },
      "mac": {
        "target": ["dmg", "zip"]
      },
      "win": {
        "target": [
          {
            "target": "nsis",
            "arch": ["x64"],
          },
        ],
      },
      "publish": {
        "provider": "generic",
        "url": "https://www.test.com/download/", // 资源服务器
        "channel": "latest",
      },
    }
  ```
  - 打包完成后，我们将打包目录下生成的`latest.yml`和`app-0.0.2.exe`放到资源服务器，给应用提供下载。
  ```md
    ├── dist
    ├── win-unpacked
    ├── app-0.0.2.exe
    ├── app-0.0.2.exe.blockmap
    ├── builder-effective-config.yaml
    ├── latest.yml
  ```
  - 更新步骤：
    1. 客户端通过定时检测、或者服务端推送方式检测是否有更新
    2. 执行 `autoUpdater.checkForUpdates()` 的检测逻辑，读取资源服务器 `latest.yml` 文件，对比文件摘要
    3. 有更新则执行文件下载操作，可以配合显示下载进度
    4. 下载完成之后，通知渲染进程页面显示本次更新的相关内容
    5. 应用重启进行更新
  
  - 主进程代码
  ```ts
    import { app, BrowserWindow, shell, ipcMain, session, Menu, Tray, safeStorage } from 'electron'
    import { autoUpdater } from 'electron-updater'

    
    // 执行自动更新检查
    ipcMain.on('checkForUpdate', () => {
      isRobot = false
      autoUpdater.checkForUpdates()
    })

    // 主进程推送消息到渲染进程
    function sendUpdateMessage(obj: any) {
      win?.webContents.send('updateMessage', obj)
    }
    
    // 执行下载
    ipcMain.on('downloadUpdate', () => {
      autoUpdater.downloadUpdate()
    })

    // 是否自动下载更新，设置为 false 时将通过 API 触发更新下载
    autoUpdater.autoDownload = false;
    // 是否允许版本降级，也就是服务器版本低于本地版本时，依旧以服务器版本为主
    autoUpdater.allowDowngrade = true;
    // 更新错误
    autoUpdater.on('error', function (err) {
      sendUpdateMessage({ action: 'update-error', errorInfo: err })
    })
    // 检查中
    autoUpdater.on('checking-for-update', function () {
      sendUpdateMessage({ action: 'checking' })
    })
    // 发现新版本,通知渲染进程吊起确认下载更新按钮
    autoUpdater.on('update-available', function (info) {
      sendUpdateMessage({ action: 'updateAva', updateInfo: info })
    })
    // 当前版本为最新版本
    autoUpdater.on('update-not-available', function (info) {
      setTimeout(function () {
        // 项目中做了增量更新，所以加了增量更新逻辑
        //hotUpdate() // 增量更新检查
      }, 1000)
    })
    // 更新下载进度事件
    autoUpdater.on('download-progress', function (progressObj) {
      console.log('触发下载。。。')
      console.log(progressObj)
      win?.webContents.send('downloadProgress', progressObj)
    })
    // 安装包下载完成
    autoUpdater.on('update-downloaded', function () {
      // 安装包下载进度
      win?.webContents.send('downloadProgress', { percent: 100 })
      // ipcMain.on('isUpdateNow', (e, arg) => {
      // 可以手动选择是否立即退出并更新
      ipcMain.on('isUpdateNow', (e, arg) => {
        // some code here to handle event
        autoUpdater.quitAndInstall()
      })
    })
  ```

  - 渲染进程
  ```ts
    import { ipcRenderer } from 'electron'

    // 添加自动更新事件的监听
    ipcRenderer.on('updateMessage', (event, obj) => {
      if (obj.action === 'updateAva') {
        // 发现新版本
      } else if (obj.action === 'update-error') {
        // 更新错误
      } else if (obj.action === 'updateNotAva') {
        // 没有新版本
      } else {
      }
    })
  ```

  - 要使上面流程能正确地执行下去，还需要提供一个正确的服务返回一个正确的更新配置：
  - `electron-updater` 将会请求该链接的服务地址，这个地址需要返回一个更新配置信息文件，这个文件就是 `electron-builder` 打包出来的 YML 文件。
  - 需要注意下面几点：
   1. `electron-updater` 会校验配置中 `version` 的格式，需要符合为 semver version 规范，但是一般 Windows 应用是四位版本号，所以采用像 `*.*.*-*` 这种形式能通过检验
   2. `electron-updater` 会校验配置中的 `sha512` 值与更新下载下来的文件的 `sha512` 值，不匹配会抛出更新错误，所以不能随意修改安装程序（只要文件 MD5 值不变即可）
   3. 配置中的 `path` 值即是 `electron-updater` 执行下载更新的目标地址，是新版本程序安装包的文件地址
   - 全量更新方案的优缺点：
     - 优点
       -  打包配置简单，只需添加 `publish` 即可
       -  代码逻辑简单，添加 `autoUpdater` 即可
     - 优点
       -  安装包体积过大时，浪费带宽，增加用户升级时间
       -  代码改动量小时，全量升级完全没有必要
       -  当我们的应用依赖一些第三方 SDK 时，当第三方 SDK 有打包问题时，可能会出现升级失败的情况