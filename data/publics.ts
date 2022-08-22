export default {
  logo: '/logo.png',
  shortName: 'iiEmo',
  header: {
    nav: [
      { name: '首页', icon: '😃' , link: '/' },
      { name: '分类', icon: '😄', link: '/categories.html' },
      { name: '标签', icon: '😁', link: '/tags.html' },
      { name: '友链', icon: '😆', link: '/links.html' },
      { name: '关于', icon: '😂', link: '/about.html' },
      { name: 'Emoji', icon: '😳', link: '/emoji.html' },
    ],
    isShowAnimation: true,
    themes: [
      {
        name: '星空白',
        code: 'light',
        bgColor: '#FFFFFF',
        textColor: '#000000',
        codeColor: '#f8f8f8',
        mdColor: '#35cb00',
        mdBgColor: '#daf5d0',
        mdBorderColor: '#b0f895',
        bannerColor: '#D3F2C8',
      },
      {
        name: '御瓷青',
        code: 'blue',
        bgColor: '#BFDBFE',
        textColor: '#3B82F6',
        codeColor: '#ffffff54',
        mdColor: '#0353b7',
        mdBgColor: '#98bdec',
        mdBorderColor: '#97c6ff',
        bannerColor: '#BFDBFE',
      },
      {
        name: '午夜黑',
        code: 'dark',
        bgColor: '#1D1D1D',
        textColor: '#FFFFFF',
        codeColor: '#ffffff3b',
        mdColor: '#ffffff',
        mdBgColor: '#ffffff3b',
        mdBorderColor: '#a2a2a2',
        bannerColor: '#1D1D1D',
      }
    ],
  },
  banner:{
    name: 'iiEmo',
    desc: '一朵大呲花 🍀',
  },
  footer: {
    nav: [
      { name: '首页', link: '/' },
      { name: '友链', link: '/links.html' },
      { name: '隐私', link: '/about.html' },
    ],
    copyright: {
      // beian: '沪ICP备19036122号',
      beian: '',
      beianLink: 'https://beian.miit.gov.cn/',
      desc: 'iiEmo.com © 2022. All rights reserved.',
    },
  },
}
