import { defineStore } from "pinia";

export default defineStore({
    id: 'iiemo',
    // persist: true,
    persist: {
      storage:  process.client ? sessionStorage : null,
      paths: ['iiemoState'],
    },
    state: () => {
      return {
        counter: 0,
        name: 'Eduardo',
        isAdmin: true,
        isAnimation: true,
        // themeColor: 'light', // 主题颜色
        themeColor:       {
          name: '星空白',
          code: 'light',
          bgColor: '#FFFFFF',
          textColor: '#000000',
          mdColor: '#35cb00',
          bannerColor: '#D3F2C8',
        }, // 主题颜色
        isHorizontal: false, // 文章列表横竖排版
      }
    },
    getters: {},
    actions: {},
})
