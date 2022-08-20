import { defineNuxtConfig } from 'nuxt'
import { visualizer } from "rollup-plugin-visualizer"; // 打包体积分析
export default defineNuxtConfig({
  pages: true,
  css: ['@/assets/scss/index.scss'],
  modules: [
    '@nuxt/content'
  ],
  buildModules: [
    'nuxt-windicss',
    '@vueuse/nuxt',
    '@pinia/nuxt',
  ],
  content: {
    // documentDriven: true, // 文档驱动时启动
    navigation: {
      fields: ['author', 'publishedAt']
    },
    highlight: {
      // See the available themes on https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-theme
      theme: "one-dark-pro",
      preload: ["html", "css", "ts", "js", "vue", "r"]
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "assets/scss/variable.scss";',
        }
      }
    },
    plugins: [
      visualizer,
    ]
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        types: [
          "@pinia/nuxt"
        ]
      }
    }
  }
})
