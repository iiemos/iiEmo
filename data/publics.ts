export default {
  logo: '/assets/img/logo.png',
  shortName: 'iiEmo',
  header: {
    nav: [
      { name: '首页', link: '/' },
      { name: '分类', link: '/categories.html' },
      { name: '标签', link: '/tags.html' },
      { name: '友链', link: '/links.html' },
      { name: '关于', link: '/about.html' },
      { name: 'Emoji', link: '/emoji.html' },
    ],
    isShowAnimation: true,
    themes: [
      {
        name: '星空白',
        code: 'light',
        bgColor: '#FFFFFF',
        textColor: '#000000',
        mdColor: '#35cb00',
        bannerColor: '#D3F2C8',
      },
      {
        name: '御瓷青',
        code: 'blue',
        bgColor: '#BFDBFE',
        textColor: '#3B82F6',
        mdColor: '#0353b7',
        bannerColor: '#BFDBFE',
      },
      {
        name: '午夜黑',
        code: 'dark',
        bgColor: '#1D1D1D',
        textColor: '#FFFFFF',
        mdColor: '#ffffff',
        bannerColor: '#1D1D1D',
      },
      {
        name: '自动',
        code: 'system',
        bgColor: '',
        textColor: '',
        mdColor: '',
        bannerColor: '',
      },
    ],
  },
  footer: {
    nav: [
      { name: '首页', link: '/' },
      { name: '友链', link: '/links.html' },
      { name: '隐私', link: '/about.html' },
    ],
    copyright: {
      beian: '沪ICP备19036122号',
      beianLink: 'https://beian.miit.gov.cn/',
      desc: 'iiEmo.com © 2022. All rights reserved.',
    },
  },
}
