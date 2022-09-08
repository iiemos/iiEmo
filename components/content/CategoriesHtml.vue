<script setup lang="ts">
import { ElTimeline, ElTimelineItem } from 'element-plus'
import { randomColor } from '@/utlis/global'

const { data } = await useAsyncData(() => queryContent('/').find())
const types = []
data.value.forEach((i) => {
  if (i?.summary?.type) {
    return types.push(i.summary.type)
  }
}) // 获取type

const newTypes = Array.from(new Set(types)) // 去重
let typeList = newTypes.map((s) => {
  return { id: s, list: [] }
})
data.value.forEach((i) => {
  typeList.forEach((e) => {
    if (e.id == i?.summary?.type) e.list.push(i)
  })
})

useHead({
  title: '分类 - 一朵大呲花',
  meta: [
    { hid: 'keywords', name: 'keywords', content: '一朵大呲花,IT博客,技术博客,区块链博客' },
    { hid: 'description', name: 'description', content: '博客文章分类、文章类别' },
  ],
})
</script>
<template>
  <div :class="$style['_categs_ctx']" class="dark:bg-primary-800 mx-auto shadow-lg">
    <!-- 分类 -->
    <el-timeline :class="$style['_categs_timeline']">
      <el-timeline-item v-for="item in typeList" :key="item.id" :timestamp="item.id" placement="top" size="normal" type="primary" :hollow="true">
        <nuxt-link v-for="itemlist in item.list" :key="itemlist._path" :to="itemlist._path" :class="$style['_categs_link']">
          <span :class="$style['_categs_tags']" :style="{ background: randomColor() }">{{ itemlist.summary.icon }} {{ itemlist.summary.tags }}</span> {{ itemlist.summary.desc }}
        </nuxt-link>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<style lang="scss" module>
._categs_ctx {
  max-width: 800px;
  border-radius: 0.5rem;
  padding: 2rem 1rem;
}
._categs_link {
  display: block;
  line-height: 3;
  transition: all 0.3s;
  &:hover {
    transform: translateY(-3px);
  }
}
._categs_tags {
  color: #fff;
  padding: 6px 10px;
  border-radius: 4px;
  margin-right: 4px;
}
@media screen and (max-width: 768px) {
  ._categs_ctx {
    width: 90%;
  }
  ._categs_timeline {
    padding-left: 0;
  }
}
</style>
