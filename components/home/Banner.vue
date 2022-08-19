<template>
  <div :class="$style['home_banner']" class="mb-6">
    <canvas :class="$style['banner_canvas']" id="banner_canvas"></canvas>
    <div :class="$style['home_banner_txt']">
      <h1 class="text-5xl">WikiFX</h1>
      <p class="text-lg mt-4">全球交易商监管查询APP</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// import './banner.ts'
import {} from 'vue'
</script>
<style lang="scss" module>
.home_banner {
  width: 100%;
  height: 400px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.banner_canvas {
  background: linear-gradient(#d3f2c8, #fffffb);
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}
.home_banner_txt {
  position: relative;
  z-index: 2;
  text-align: center;
}
</style>
