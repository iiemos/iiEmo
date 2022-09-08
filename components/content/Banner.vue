<script setup lang="ts">
import publics from '@/data/publics'
const { banner } = publics

nextTick(() => {
  // useScriptTag('/assets/js/canvas.js', (el: HTMLScriptElement) => {})
})
</script>
<template>
  <div class="home_banner mb-6">
    <canvas class="banner_canvas" id="banner_canvas"></canvas>
    <div class="home_banner_txt">
      <h1 class="text-5xl">{{ banner.name }}</h1>
      <p class="text-lg mt-4">{{ banner.desc }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home_banner {
  width: 100%;
  height: 400px;
  // height: calc(100vh - 100px);
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
.dark .banner_canvas {
  background: linear-gradient(#1d1d1d, #fffffb);
}
.home_banner_txt {
  position: relative;
  z-index: 2;
  text-align: center;
}
@keyframes fadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0.4;
  }
}
</style>
