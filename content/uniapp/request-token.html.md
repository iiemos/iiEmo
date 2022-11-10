---
title: '无痛刷新token（签名）解决方案'
keywords: '一朵大呲花,IT博客,技术博客,区块链博客'
description: '解决无用户需要token签名请求数据，无痛刷新token问题'

layout: 'markdown-full'

summary:
  title: '无痛刷新token（签名）解决方案'
  icon: '🍈'
  type: '工程方案'
  desc: '解决无用户需要token签名请求数据，无痛刷新token问题'
  tags: 'Request Token'
  createtime: '2022-10-10'
  pic: '/img/pic/req_token.jpg'
---

# 无痛刷新token（签名）解决方案

 #### 需求：小程序无用户登录，但是为了数据安全，API接口需要token进行签名验证，当token过期的时候，无感刷新token

- 实现逻辑： 
1. 通过请求拦截器判断token失效时间，如果token失效，挂起需要请求的接口(一个或多个)
2. 重新请求token接口，刷新token
3. 将挂起的接口恢复请求

##### 实现代码：

```ts
  import Request from 'luch-request'
  import Action from './config/config' // 开发环境配置项
  const { develop, production } = Action
  // 根据运行环境配置
  let apiAction
  if (process.env.NODE_ENV === 'development') apiAction = develop
  if (process.env.NODE_ENV === 'production') apiAction = production

  const services = new Request()

   /* 全局配置 */
  services.setConfig((config) => {
    config.baseURL = apiAction.BASE_URL + apiAction.API_PORT; /* 根域名 */
    config.header = {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': '',
      'X-Token': ''
    };
    return config
  })
  // 正在刷新的标记
  let isRefreshing = false
  // 挂起请求的数组
  let requests = []
  // 存储token的函数
  function setToken (obj) {
    try {
      services.config.header['X-Token'] = obj.access_token
      uni.setStorage({ // 调用uni本地存储
        key: 'token',
        data: JSON.stringify(obj), // 注意这里需要变成字符串后才能放到Storage中
        success: function () {
          console.log('token本地存储成功');
        }
      });
    } catch (e) {
      console.log('token本地存储失败', e);
    }
  };
  // 获取token
  function getToken(){
    let tokenObj = {}
    const value = uni.getStorageSync('token');
    if (value) tokenObj = JSON.parse(value);
    return tokenObj
  };
  // 往挂起请求数组里面push请求
  function subscribeTokenRefresh(cb) {
    requests.push(cb);
  }
  // 数组中的请求得到新的token之后自执行，用新的token去请求数据
  function onRrefreshed(token) {
    requests.map(cb => cb(token));
  }
  services.interceptors.request.use(
    config => {
      // 这里是因为小程序规定必须使用https请求作出的判断
      if (config.url.slice(0, 4) === "http" && config.url.slice(0, 5) !== "https") return console.error('请求地址不能为http，请修改为https')
      if (config.url.slice(0, 4) !== "http" && config.url.slice(0, 5) !== "https" && config.url.slice(0, 1) !== "/") return console.error(config.url, '请求地址不合法')
      if (config.url.slice(0, 5) === "https") config.baseURL = ''

      const tokenObj = getToken();
      const now = Date.now()
      // 如果有token并且token没有过期，给每个请求加上token
      if (Object.keys(tokenObj).length != 0 && now < tokenObj.expires_in) {
        config.header['Authorization'] = 'Bearer ' + tokenObj.access_token;
        return config;
      }else {
        // 如果token过期，并且没有在刷新中继续往下执行
        if (!isRefreshing) {
          isRefreshing = true;
          // 密码进行加密
          var crypto = require('crypto');
          apiAction.PASS_WORD = crypto.createHash('md5').update("gsw").digest("hex").toLocaleUpperCase();
          // 立即刷新token
          uni.request({
            url: apiAction.TOKEN_URL, // 请求token的地址
            data: {
              username: apiAction.USER_NAME,
              password:  apiAction.PASS_WORD
            },
            method:'GET',//请求方式  或GET
            success: res => {
              if(res.data){
                // 刷新成功, return config即是恢复当前请求
                setToken({
                  access_token: res.data.access_token,
                  expires_in: res.data.expires_in + Date.now()
                });
                config.header['Authorization'] = 'Bearer ' + res.data.access_token;
                onRrefreshed(res.data.access_token);
              }
            }
          })
        }
        let retry = new Promise((resolve, reject) => {
          /*(token) => {...}这个函数就是cb*/
          subscribeTokenRefresh((access_token) => {
            config.header['Authorization'] = 'Bearer ' + access_token
            console.log('service.defaults.url',config);
            /*将请求挂起*/
            resolve(config)
          })
        })
        return retry
      }
    }
  );
  // 响应拦截器
  services.interceptors.response.use((response) => {
    if (response.code  == 200 || response.data.code == 200  ) {
      return response.data
    } else {
      uni.showToast({
        title: res.data.msg,	
        icon: "none",
        duration: 3000
      })
      return Promise.reject(response);
    }
  }, (err) => { /*  对响应错误做点什么 （statusCode !== 200）*/
    return Promise.reject(err)
  })
  export default services
```


