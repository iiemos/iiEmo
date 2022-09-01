# Module format cjs does not support top-level await. Use the "es" or "system" output formats rather.
 - 今天在`electron + vite`项目开发完成，打测试包的时候出现这个错误
  - 原因： vite打包模式不支持顶级模块进行await（异步），建议使用es或者system输出格式（同步）
  - 解决方案： `import.meta.glob` 替换成 `import.meta.globEager` 异步换成同步
## 源码
``` typescript
/* 报错源码
    动态异步引入所有文件然后导出
*/ 
const modulesFiles = import.meta.glob("./apis/**.ts")
async function Files() {
  let modules:any = {}
  for (const key in modulesFiles) {
    const moduleName = key.replace(/^\.\/apis\/(.*)\.\w+$/, '$1')
    const res = await modulesFiles[key]()
    modules[moduleName] = res.default
  }
  return modules
}
export default await Files()
```

```typescript
// 更改后
const modulesFiles = import.meta.globEager('./apis/**.ts')
let modules: any = {}
for (const key in modulesFiles) {
  const moduleName = key.replace(/^\.\/apis\/(.*)\.\w+$/, '$1')
  modules[moduleName] = modulesFiles[key].default
}
export default modules
```
