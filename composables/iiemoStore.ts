import { defineStore } from "pinia";

export default defineStore({
    id: 'iiemo',
    // persist: true,
    // persist: {
    //   storage:  process.client ? sessionStorage : null,
    //   paths: ['iiemoState'],
    // },
    state: () => {
      return {
        counter: 0,
        name: 'Eduardo',
        isAdmin: true,
        isAnimation: true,
        isConsole: false, // 是否打印过
        // themeColor: 'light', // 主题颜色
        themeColor:       {
          name: '星空白',
          code: 'light',
          bgColor: '#FFFFFF',
          textColor: '#000000',
          codeColor: '#f8f8f8',
          mdColor: '#35cb00',
          mdBgColor: '#daf5d0',
          mdBorderColor: '#b0f895',
          bannerColor: '#D3F2C8',
        }, // 主题颜色
        isHorizontal: false, // 文章列表横竖排版
      }
    },
    actions: {  // 和vue中的methods一样
      // updateConsole(newConsole) {
      //   this.isConsole = newConsole // 可以使用this访问和修改state中的数据
      // },
    },
    getters: {},
})
