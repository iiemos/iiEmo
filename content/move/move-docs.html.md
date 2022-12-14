---
title: 'Move 学习指南'
keywords: '一朵大呲花,IT博客,技术博客,区块链博客'
description: 'Move 学习记录'

layout: 'markdown-full'

summary:
  title: 'Move 学习指南'
  type: 'Move'
  icon: '🌰'
  desc: 'Move - 牛刀小试'
  tags: 'Move'
  createtime: '2022-08-11'
  pic: ''
---

# 为什么要学习Move

## 🍊 Move语言有什么优势
> * 面向资源编程
> * 原生态避免双花攻击
> * 安全和形式化验证
> * 学习门槛较低
> * 合约可升级（相对solidity来说）

------

## 🍈 Move的结构
  - Modules
    - 结构化定义
    - 函数功能
    - 全局存储
  - Scripts
    - 暂时的代码片段
    - 可以调用Modules的函数
    - 一个script中只能有一个函数

------


## 🍍 Move 的数据类型及变量定义
  
  > 三种数据类型
  -  ### 整数
  ``` ts
  U8(1个字节)、U64(8字节)、U128(16字节)
  ```

  - ### 布尔值
  ``` ts
  bool: true || false
  ```
    
  - ### 地址
  ``` ts
  address
  // address是Move中的地址类型，与solidity中的address类型没有任何关系，作用也不一样
  // Std、0x1、Sender等都是address类型
  ```


  - ### 变量的定义方式
```ts
sctipt{
  /// 类型推导
  let a = 10;
  
  // 显示定义
  let b:u64 = 11;

  // 值+类型表示
  let c = 1u128;
  
  // 先定义后赋值
  let d:u8;
  d = 13;

}
```

---------

## 🥭 Move中的函数
``` ts
// 函数原型
[public] fun func_name( param1:type, ... ): ReturnType{
  // 函数体
}
```
- 说明： 
  - `[public]` public 用于控制访问权，无public则仅限于Module内访问
  - `fun` 定义函数的关键字 == js中的 `function` 关键字
  - `func_name` 自定义函数名称 官方推荐`func_name`（小写字母_小写字母）
  - `( param1:type, ... )`  函数的参数，参数类型后置，`(name: type, ...)` 可以是0个或者多个
  - `:ReturnType` 函数返回值， 可以是0个或多个，如果多个返回值，就要用`()`
---------
## 🍑 函数举例
``` ts
// 编写sum 函数，计算两数之和
module 0x01::Math{
  public fun sum(a:u64, b:u64): u64 {
    a + b // 此处不能加分号 ; 可以加 return
  }
}

script {
  use 0x01::Math;
  use 0x1::Debug;
  // 0x01 == 0x1 此处为了好区分，故分开写
  fun main(a:u64, b:u64){
    let c = Math::sun(a, b);
    Debug::print(&c);
  }
}
```

未完待续........