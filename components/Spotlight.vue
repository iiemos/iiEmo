<template>
  <div class="spotlight-wrapper">
    <div class="fixed z-10 left-0 right-0 spotlight"></div>
  </div>
</template>
<style scoped>
.z-10 {
  z-index: 10;
}
.left-0 {
  left: 0px;
}
.right-0 {
  right: 0px;
}
.fixed {
  position: fixed;
}
.spotlight-wrapper {
  opacity: 0.5;
  transition: opacity 0.4s ease-in;
}
.spotlight {
  z-index: -1;
  background: linear-gradient(45deg, #00dc82 0%, #36e4da 50%, #0047e1 100%);
  filter: blur(20vh);
  height: 50vh;
  bottom: -40vh;
}
</style>
