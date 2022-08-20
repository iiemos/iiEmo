<script setup lang="ts">
useHead({
  title: '标签 - 一朵大呲花',
  meta:[
    { hid: 'keywords', name: 'keywords', content: '一朵大呲花,IT博客,技术博客,区块链博客' },
    { hid: 'description', name: 'description', content: '关于一朵大呲花的博客标签' },
  ]
})
const c = [
  'rgb(110,64,170)',
  'rgb(150,61,179)',
  'rgb(191,60,175)',
  'rgb(228,65,157)',
  'rgb(254,75,131)',
  'rgb(255,94,99)',
  'rgb(255,120,71)',
  'rgb(251,150,51)',
  'rgb(226,183,47)',
  'rgb(198,214,60)',
  'rgb(175,240,91)',
  'rgb(127,246,88)',
  'rgb(82,246,103)',
  'rgb(48,239,130)',
  'rgb(29,223,163)',
  'rgb(26,199,194)',
  'rgb(35,171,216)',
  'rgb(54,140,225)',
  'rgb(76,110,219)',
  'rgb(96,84,200)',
]
function t() {
  return c[Math.floor(Math.random() * c.length)]
}
</script>
<template>
  <NuxtLayout>
    <div :class="$style['_tags_ctx']" class="mx-auto shadow-lg">
      <h1 class="text-xl fw-600 mb-2">标签</h1>
      <div :class="$style['_tags_warp']" class="gap-1">
      <ContentList path="/" v-slot="{ list }">
        <a
          :class="$style['_tags_item']"
          :style="{ color: t() }"
          class="px-3 py-1 rounded-lg"
          v-for="(item, index) in list"
          :key="index"
          :href="item._path">
          {{ item.summary.icon }} {{ item.summary.tags }}
        </a>
      </ContentList>
      </div>
    </div>
  </NuxtLayout>
</template>
<style lang="scss" module>
._tags_ctx {
  max-width: 800px;
  border-radius: 0.5rem;
  padding: 2rem 1rem;
}
._tags_warp {
  display: flex;
  flex-wrap: wrap;
}
._tags_item {
  line-height: 1.3;
  color: #fff;
  transition: all 0.2s;
  &:hover {
    transform: translateY(-2px);
  }
}
@media screen and (max-width: 768px) {
  ._tags_ctx{
    width: 90%;
  }
}
</style>
