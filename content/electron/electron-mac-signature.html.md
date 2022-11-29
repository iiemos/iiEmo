---
title: 'Electron MacOS 签名'
keywords: '一朵大呲花,IT博客,技术博客,区块链博客'
description: 'Electron 使用 electron-updater 公正签名'

layout: 'markdown-full'

summary:
  title: 'Electron macOS - 公正签名'
  type: '学习笔记'
  icon: '🍑'
  desc: 'Electron 使用 electron-updater 公正签名'
  tags: 'Electron MacOS notarize'
  createtime: '2022-11-29'
  pic: ''
---

# Electron macOS 打包签名配置：  

未签名的应用程序运行报错：
> “Appname.dmg” can’t be opened because Apple cannot check it for malicious software. <br/>
> This software needs to be updated. Contact the developer for more information.

或中文：
> 无法打开“Appname.app”，因为无法验证开发者。<br/>
> macOS 无法验证此 App 不包含恶意软件。

- 项目中使用的`electron-builder`打包工具，就具体介绍`electron-builder`签名的方法， `electron-builder` 附带一个自定义解决方案，用于签署应用程序。 官方文档地址[它的文档](https://kilianvalkhof.com/2019/electron/notarizing-your-electron-application/){:target="_blank"}
- 其他方法可以去[官网文档](https://www.electronjs.org/docs/latest/tutorial/code-signing){:target="_blank"}进行查看


## 证书生成
 - 打开mac电脑钥匙串 - 钥匙串访问 - 证书助理 - 从证书颁发机构申请证书

  1、 打开钥匙串
  ![打开钥匙串](/img/works/sign01.jpg)
  2、 生成证书
  ![生成证书](/img/works/sign02.jpg)
  3、 导出证书
  ![导出证书](/img/works/sign03.jpg)

## 证书配置
 - [Apple 开发账号](https://developer.apple.com/)，首先需要有开发者账号，年费$99。

  1、登录Apple开发者后台，进入证书页面
  ![登录Apple开发者后台](/img/works/sign04.jpg)
  2、点击`Certificates` 添加证书，如果不在Apple store 发布的话选择：`Developer ID Application` 
  3、然后在你mac电脑登录打开`Xcode`并登录你的开发者账号（很重要）
## 打包配置（公正配置）
  - 使用 `Electron-notarize` 对 `Electron` 程序进行公证。

####  1、在你的配置文件中进行配置，例如`package.json`

    ```ts
      // package.json
      {
        "build": {
          "afterSign": './mac/notarize.js',
            "mac": {
            "hardenedRuntime": true, // 使用强化的运行时构建您的应用程序
            "gatekeeperAssess": false, // 禁用此健全性检查
            "artifactName": '${productName}_${version}.${ext}', // 应用名称
            "entitlements": './mac/entitlements.mas.plist',
            "entitlementsInherit": './mac/entitlements.mas.plist',
          },
        }
      }
    ```

` "afterSign": './mac/notarize.js'`
  - Electron-notarize 打包自动签名加载的js文件

`"hardenedRuntime": true,`
  - 使用强化的运行时构建您的应用程序（强化会拥有更多的权利）

`"gatekeeperAssess": false`
  - electron-builder 使用的签名工具称,为electron-osx-sign，会进行健全性检查以验证签名是否成功。在 MacOS 10.14.5 之前，此健全性检查会返回正数，但在 10.14.5 中，它会返回错误，因为虽然签名进行得很顺利，但应用程序尚未（尚未！）经过公证，这是一个错误。

`"entitlements": './mac/entitlements.mas.plist'`
  - 加载强化文件

#### 2、新增 `notarize.js`

  ```ts
    // ./mac/notarize.js
    require('dotenv').config()
    const { notarize } = require('electron-notarize')

    exports.default = async function notarizing(context) {
      const { electronPlatformName, appOutDir } = context
      if (electronPlatformName !== 'darwin') {
        return
      }
      const appName = context.packager.appInfo.productFilename
      return await notarize({
        appBundleId: 'com.ClientMacOS',  // appid
        appPath: `${appOutDir}/${appName}.app`, // 应用的路径 xxx.app 结尾的 
        appleId: 'User@.com', // 苹果开发者 id
        appleIdPassword: 'PassWord', // 应用专用密码（可以是你的登录密码，也可以在苹果官网申请专用密码）
        ascProvider: 'XXXXXXXXX',  // 证书提供者
      })
    }
  ```
  `appleId`
  - 你的 Apple 开发者账号

  `appleIdPassword`
  - 你的 Apple 开发者账号密码。出于安全考虑，建议不要直接将密码写出来，这儿 可以使用专用密码等。

  `ascProvider`
  - 此项是选填的，如果你的开发者账号与多个团队关联，运行时可能会遇到以下错误：

#### 3、 新增 `entitlements.mas.plist`  

  ```ts
    // ./mac/entitlements.mas.plist
    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
      <dict>
        <key>com.apple.security.cs.allow-unsigned-executable-memory</key>
        <true/>
      </dict>
    </plist>
  ```

### 打包
  - 完成以上配置后就可以进行打包了，正常运行`electron-builder` 的命令，就可以在完成打包之后，继续执行签名，公正的工作，
  - 成功和失败都会收到Apple 给你发的提醒邮件