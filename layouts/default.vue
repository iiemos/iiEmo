<template>
  <div class="_layouts">
    <Header />
      <section :class="$style['_layouts_slot']">
        <slot />
        <BackTop />
      </section>
    <Spotlight />
    <Footer />
  </div>
</template>
<script setup lang="ts">
import { useStorage } from '@vueuse/core'
const IP = useStorage('IP', '')
if(!IP.value){
  const userData = await $fetch('/api/getIP')
  IP.value = userData
}
</script>
<style lang="scss" module>
._layouts_slot{
  margin-top: 1.25rem;
  min-height: calc(100vh - 150px) !important;
}
</style>