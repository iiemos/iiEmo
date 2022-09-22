---
title: 'NSIS 多语言使用'
keywords: '一朵大呲花,IT博客,技术博客,区块链博客'
description: 'NSIS 多语言使用'

layout: 'markdown-full'

summary:
  title: 'NSIS 多语言使用'
  type: 'NSIS'
  icon: '🍍'
  desc: 'Windows 应用安装程序显示语言选项，选择多语言显示'
  tags: 'NSIS + Language'
  createtime: '2022-09-22'
  pic: ''
---

# NSIS 多语言使用, Windows安装程序多语言

- 当安装程序启动时通过以下步骤选择界面语言:
  - 1. 获取用户的默认 Windows 用户界面语言
  - 2. 查找一个最佳匹配的语言
  - 3. 如果没有最佳匹配的，则查找第一个匹配的语言
  - 4. 如果没有匹配的，使用脚本里定义的第一个语言(确认你的第一个语言是一个通用的语言，比如英语)
  - 5. 如果语言变量 `$LANGUAGE` 在 `.onInit` 里被改变， NSIS 将重新进行步骤 2 到步骤4 。



## 首先在NSI文件中添加需要支持语言的宏
```ts
  !insertmacro MUI_LANGUAGE "English" ; 英文
  !insertmacro MUI_LANGUAGE "SimpChinese" ; 中简
  !insertmacro MUI_LANGUAGE "TradChinese" ; 中繁
  // 这里只做中英繁文示例，其它语言相同，只是宏不一样。
```
## 添加完宏之后，有两种定义方式
  1. - 字符串定义方式（`名称 语言ID 字符串`）
        -  每一个语言字符串都有一个特定的名字和一个用于安装程序分配给每一种语言的值。 他们可以在脚本里用于任何运行时字符串。使用一个语言字符串你所需要做的就是把 $(LangString_name_here) 插入到你想插入字串的地方。
        
        - `注意:`
         - 不像定义使用花括号 - {} 一样，语言字符串使用圆括号 - () 。
         - 如果你想在 .onInit 函数里更改语言，需要注意的是在 .onInit 里的语言字符串将仍旧使用基于用户的默认 Windows 语言检测到的语言，因为语言的初始化在 .onInit 之后。
         - 总是在你的脚本里为所有语言设置语言字串。
         - 如果你把语言 ID 设为 0 则使用 LangString 或 LoadLanguageFile 最后使用的语言。
      ```ts
        ; 声明
        LangString message ${LANG_ENGLISH} "英语信息"
        LangString message ${LANG_SIMPCHINESE} "简体中文信息"
        LangString message ${LANG_TRADCHINESE} "繁体中文信息"
        
        ; 使用
        MessageBox MB_OK "A translated message: $(message)"

      ```
  2. - 文件引入方式（（`名称 语言ID 许可文件路径`）
        - 用法和 LangString 一样，但它仅从一个文本、RTF 文件载入字符串并且定义一个特殊且仅能用于 LicenseData 的 LangString 。
        ```ts
          ; 声明
            LicenseLangString license ${LANG_ENGLISH} license-english.txt
            LicenseLangString license ${LANG_FRENCH} license-french.txt
            LicenseLangString license ${LANG_GERMAN} license-german.txt
          ; 使用
            LicenseData $(license)
        ```


## 初始化函数中获取系统语言，弹出选择语言框
  ```ts
    ;初始化函数
    Function .onInit
      Push ""
      Push ${LANG_ENGLISH} ;添加英文代码 语言代码是系统变量，多语言引入后，自动加载，拼接方式是“LANG_语言”,可以查看NSIS手册，LANG_ENGLISH的编号为1033，LANG_SIMPCHINESE为2052；
      Push "English"
      Push ${LANG_SIMPCHINESE}   ;添加简体中文选项
      Push "简体中文"
      Push ${LANG_TRADCHINESE}   ;添加繁中中文选项
      Push "繁体中文"
      Push A ; A 表示自动计数语言的自动计数工作第一次空推送（Push ""）必须保持
      System::Call 'Kernel32::GetUserDefaultUILanguage() i.r0'
      ${If} $0 == '1033' ; 英文
        LangDLL::LangDialog "Installer Language" "Please select the language of the installer"
      ${OrIf} $0 == '3076' ; 繁体 Chinese - Hong Kong SAR
        LangDLL::LangDialog "安裝程序語言" "請選擇安裝程序的語言"
      ${OrIf} $0 == '1028' ; 繁体 Chinese - Taiwan
        LangDLL::LangDialog "安裝程序語言" "請選擇安裝程序的語言"
      ${OrIf} $0 == '2052' ; 简体
        LangDLL::LangDialog "安装程序语言" "请选择安装程序的语言"
      ${Else} ; 默认英文
        LangDLL::LangDialog "Installer Language" "Please select the language of the installer"
      ${EndIf}


      ; LangDLL::LangDialog "Installer Language" "Please select the language of the installer" ;显示语言选择对话框
      Pop $LANGUAGE ;获得用户对于语言的选择结果 ‘$LANGUAGE’是多语言变量，在安装程序结束后，语言代码会存储在这个变量中，手动修改‘$LANGUAGE’的值后，安装包会重新选择最匹配的语言，参考最上面NSIS手册中选择界面语言步骤
      StrCmp $LANGUAGE "cancel" 0 +2
      Abort
      StrCmp $LANGUAGE 2052 ZH_INI EN_INI
      EN_INI:
        ; 写你的代码
        Goto END
      ZH_INI:
        ; 写你的代码
      END:
    FunctionEnd
  ```
  - 在函数中使用
  ```ts
    ; 设置某个元素的text值
    nsNiuniuSkin::SetControlAttribute $hInstallDlg "元素Name" "text" $(自定义的字符串名称)
  ```