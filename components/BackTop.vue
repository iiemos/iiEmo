<script setup lang="ts">
import { ref } from 'vue'
let isShowBackTop = ref<boolean>(false) // 是否显示回顶
let goBack = function () {
  if (!window.requestAnimationFrame) document.documentElement.scrollTop = 0
  else window.requestAnimationFrame(toTop)
}
const toTop = function () {
  const currentPosition = document.documentElement.scrollTop || document.body.scrollTop
  const position = Math.floor(currentPosition / 1.3)
  if (currentPosition <= 0) return
  window.scrollTo(0, position)
  window.requestAnimationFrame(toTop)
}
onMounted(() => {
  const BODY = document.querySelector('body')
  BODY.onscroll = function () {
    if ((document.documentElement.scrollTop || document.body.scrollTop) >= 1000) isShowBackTop.value = true
    else isShowBackTop.value = false
  }
})
</script>

<template>
  <div v-show="isShowBackTop" :class="$style['_back_top']" class="" @click="goBack">
    <div :class="$style['_bg_bar']">
      <div :class="$style['_bar']">🖕</div>
    </div>
  </div>
</template>

<style lang="scss" module>
._back_top {
  cursor: pointer;
  position: fixed;
  z-index: 1;
  bottom: 2.8rem;
  right: 5rem;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  overflow: hidden;
}
._bg_bar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: relative;
  &::after {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    // background: #e5d2df;
    background: #af7fee;
  }
  ._bar {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 85%;
    height: 85%;
    border-radius: 50%;
    background: #fff;
  }
}
</style>
