<script setup lang="ts">
import { randomColor } from '@/utlis/global'
useHead({
  title: '标签 - 一朵大呲花',
  meta: [
    { hid: 'keywords', name: 'keywords', content: '一朵大呲花,IT博客,技术博客,区块链博客' },
    { hid: 'description', name: 'description', content: '关于一朵大呲花的博客标签' },
  ],
})
</script>
<template>
  <div :class="$style['_tags_ctx']" class="mx-auto shadow-lg dark:bg-primary-800 sm:rounded">
    <h1 class="text-xl fw-600 mb-2">标签</h1>
    <div :class="$style['_tags_warp']" class="gap-1">
      <ContentList path="/" v-slot="{ list }">
        <template v-for="(item, index) in list" :key="index">
          <a v-if="item.summary" :class="$style['_tags_item']" :style="{ color: randomColor() }" class="px-3 py-1 rounded-lg" :href="item._path"> {{ item.summary.icon }} {{ item.summary.tags }} </a>
        </template>
      </ContentList>
    </div>
  </div>
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
  ._tags_ctx {
    width: 90%;
  }
}
</style>
