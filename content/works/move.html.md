---
title: 'Move 学习总结'
keywords: '一朵大呲花,IT博客,技术博客,区块链博客'
description: 'Move 浅尝'

summary:
  title: 'Move 浅尝'
  type: '开发笔记'
  icon: '🍉'
  desc: 'Move - 牛刀小试'
  tags: 'Move'
  createtime: '2022-08-01'
  pic: '/img/pic/nuxt3_icon.jpg'
---

## Move 的数据类型及变量定义
> 三种数据类型
整数
U8、U64、U128
8bet 1个字节 8字节、16字节

布尔值
bool: true || false

地址
address是Move中的地址类型，与solidity中的address类型没有任何关系，作用也不一样
Std、0x1、Sender等都是address类型

> 变量的定义方式
```
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


## Move中的函数
``` ts
// 函数原型
[public] fun func_name( param1:type, ... ): ReturnType{
  // 函数体
}
```
- 说明
  - `[public]` public 用于控制访问权，无public则仅限于Module内访问
  - `fun` 定义函数的关键字 == js中的 `function` 关键字
  - `func_name` 自定义函数名称 官方推荐`func_name`（小写字母_小写字母）
  - `( param1:type, ... )`  函数的参数，参数类型后置，`(name: type, ...)` 可以是0个或者多个
  - `:ReturnType` 函数返回值， 可以是0个或多个，如果多个返回值，就要用`()`

### 函数举例
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