import { defineNuxtConfig } from "nuxt";
const lifecycle = process.env.npm_lifecycle_event;
import { visualizer } from "rollup-plugin-visualizer";
export default defineNuxtConfig({
  css: ['@/assets/scss/index.scss'],
  modules: ["@nuxt/content"],
  build: {
    transpile: [
      lifecycle === 'build' || lifecycle === 'generate' ? 'element-plus' : '',
      'compute-scroll-into-view',
    ]
  },
  buildModules: [
    /**
 * @see https://cn.windicss.org/integrations/nuxt.html
  */
  'nuxt-windicss',
  /**
  * @see https://vueuse.org/guide/#installation
  */
  '@vueuse/nuxt',
  /**
  * @see https://pinia.vuejs.org/ssr/nuxt.html#installation
  */
  '@pinia/nuxt',
],
  pages: true,
  content: {
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
});
