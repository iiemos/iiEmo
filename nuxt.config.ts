import { defineNuxtConfig } from 'nuxt'
import { visualizer } from "rollup-plugin-visualizer"; // 打包体积分析
// import AutoImport from 'unplugin-auto-import/vite'
// import Components from "unplugin-vue-components/vite";
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
const lifecycle = process.env.npm_lifecycle_event;
export default defineNuxtConfig({
  pages: true,
  css: ['@/assets/scss/index.scss'],
  modules: [
    '@nuxt/content'
  ],
  // build
  build: {
    transpile: lifecycle === "build" ? ["element-plus"] : [],
  },
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
      // AutoImport({
      //   resolvers: [ElementPlusResolver()]
      // }),
      // Components({
      //   dts: true,
      //   resolvers: [ElementPlusResolver()]
      // }),
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
