<template>
  <div class="_layouts">
    <Header />
      <section :class="$style['_layouts_slot']">
        <slot />
        <BackTop />
      </section>
    <!-- <Spotlight /> -->
    <Footer />
  </div>
</template>
<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { storeToRefs } from 'pinia'
let  { isConsole } = storeToRefs(iiemoStore())
const IP = useStorage('IP', '')
if(!IP.value){
  const userData = await $fetch('/api/getIP')
  IP.value = userData  
}
const setConsloe = () =>{
  console.log('\n%c一朵大呲花 - 林深时见鹿 🍀\n', 'font-weight: 600;')
  if(IP.value) console.log("🌰 Hi，来自 %c" + JSON.parse(IP.value).cname + " %c的朋友！", "color: #50a1ff; font-family: monoscope; font-weight: bold", "")
  console.log('\n%c🍄 网站介绍：\n', 'font-weight: 600;')
  console.log('\n🥕 纯静态： Nuxt3 + Vite + @nuxt/content + windi + 几个Element-Plus 组件 + 手撸\n')
  console.log('\n🥕 UI： 乱七八糟随便整的\n')
  console.log('\n🥕 初衷： 改善之前的wordPress笨重博客\n')
  console.log('\n🥕 建立时间： 2022-08-01（建军节）有幸服过两年兵役\n')
  console.log('\n%c想拥有自己博客吗？\n', 'font-weight: 600;')
  console.log('\n本博客github完全开源，完全以配置文件的形式进行搭建，%c'+ '开箱即用' +'%c！\n', "color: #50a1ff; font-family: monoscope; font-weight: bold", "")
  console.log('\n%c'+ '欢迎添加友链哦~~~~~~~~~~' +'%c\n', "color: #50a1ff; font-family: monoscope; font-weight: bold", "")
  let timer = setTimeout(()=>{
    isConsole.value = true
    clearTimeout(timer)
  },1000)
}
if(!isConsole.value){
  setConsloe()
}

</script>
<style lang="scss" module>
._layouts_slot{
  margin-top: 1.25rem;
  min-height: calc(100vh - 150px) !important;
}
</style>