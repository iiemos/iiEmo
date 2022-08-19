<script setup lang="ts">
import { ElTimeline, ElTimelineItem } from 'element-plus'
const { data } = await useAsyncData(() => queryContent('/').find())
const types = data.value.map((i)=> i.summary.type ) // 获取type
const newTypes = Array.from(new Set(types)) // 去重
let typeList = newTypes.map((s)=>{ return { id: s, list: [] } } )
data.value.forEach((i)=>{ typeList.forEach((e)=>{ if( e.id == i.summary.type ) e.list.push(i) }) })
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
  <div :class="$style['_categs_ctx']" class="mx-auto shadow-lg">
    <!-- 分类 -->
    <el-timeline :class="$style['_categs_timeline']">
      <el-timeline-item v-for="item in typeList" :key="item.id" :timestamp="item.id" placement="top" size="normal" type="primary" :hollow="true">
        <nuxt-link v-for="itemlist in item.list" :key="itemlist._path" :to="itemlist._path" :class="$style['_categs_link']">
          <span :class="$style['_categs_tags']" :style="{ background: t() }">{{ itemlist.summary.icon }} {{ itemlist.summary.tags }}</span> {{ itemlist.summary.desc }}
        </nuxt-link>
      </el-timeline-item>
    </el-timeline>
  </div>
  </NuxtLayout>
</template>
<style lang="scss" module>
._categs_ctx {
  max-width: 800px;
  border-radius: 0.5rem;
  padding: 2rem 1rem;
}
._categs_link{
  display: block;
  line-height: 3;
  transition: all .3s;
  &:hover{
    transform: translateY(-3px);
  }
}
._categs_tags{
  color: #fff;
  padding: 6px 10px;
  border-radius: 4px;
  margin-right: 4px;
}
@media screen and (max-width: 768px) {
  ._categs_ctx{
    width: 90%;
  }
  ._categs_timeline{
    padding-left: 0;
  }
}
</style>
