<script setup>
import links from '@/data/links'
const { linkSite, mirrorSite } = links
</script>
<template>
  <div :class="$style['iiemo_links']" class="container mx-auto mb-6 mt-10">
    <div :class="$style['_link_box']">
      <h1 :class="$style['_links_title']" class="text-xl font-semibold mb-10">友链<span class="text-sm ml-1">(9)</span></h1>
      <div :class="$style['_links_warp']" class="">
        <nuxt-link
          v-for="lItem in linkSite"
          :key="lItem.name"
          :to="lItem.link"
          target="_blcak"
          :class="$style['_link_item']"
          class="shadow-md px-4 py-4"
          :style="{
            background: `linear-gradient(to right top,transparent,${lItem.color}14)`,
          }"
        >
          <div :class="$style['_item_top']" class="row-start-auto">
            <div :class="$style['_link_logo']" class="mb-2 mr-4">
              <img :src="lItem.logo" />
            </div>
            <div>
              <div :class="$style['_link_name']" class="text-xl mb-2 font-semibold">
                {{ lItem.name }}
              </div>
              <div :class="$style['_link_desc']" class="text-sm">
                {{ lItem.desc }}
              </div>
            </div>
          </div>
          <div :class="$style['_item_bottom']" class="mt-4">
            <span
              class="bg-violet-300 mr-3 px-2 py-1 text-xs rounded"
              :style="{
                background: `${lItem.color}1A`,
                color: `${lItem.color}`,
              }"
              >{{ lItem.lab }}</span
            >
            <div :class="$style['_link_time']" class="text-sm">添加时间： {{ lItem.addTime }}</div>
          </div>
        </nuxt-link>
      </div>
    </div>
    <div :class="$style['_link_box']" class="mt-10">
      <h1 :class="$style['_links_title']" class="text-xl font-semibold mb-10">开源镜像站<span class="text-sm ml-1">(9)</span></h1>
      <div :class="$style['_links_warp']" class="">
        <nuxt-link
          v-for="mItem in mirrorSite"
          :key="mItem.name"
          :class="[$style['_link_item'], $style['_mirror']]"
          class="shadow-md px-4 py-4 mb-4"
          :to="mItem.link"
          target="_blcak"
          :style="{
            background: `linear-gradient(to right top,transparent,${mItem.color}14)`,
          }"
        >
          <div :class="$style['_item_top']" class="row-start-auto">
            <div :class="$style['_link_logo']" class="mb-2 mr-4">
              <img :src="mItem.logo" />
            </div>
            <div>
              <div :class="$style['_link_name']" class="text-xl mb-2 font-semibold">
                {{ mItem.name }}
              </div>
              <div :class="$style['_link_desc']" class="text-sm">
                {{ mItem.desc }}
              </div>
            </div>
          </div>
          <div :class="$style['_item_bottom']" class="mt-4">
            <span
              class="bg-violet-300 mr-3 px-2 py-1 text-xs rounded"
              :style="{
                background: `${mItem.color}1A`,
                color: `${mItem.color}`,
              }"
            >
              {{ mItem.lab }}
            </span>
            <div :class="$style['_link_time']" class="text-sm">添加时间： {{ mItem.addTime }}</div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<style lang="scss" module>
.iiemo_links {
}
._links_title {
}
._links_warp {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 3%;
}
._link_item {
  flex-basis: 30.3%;
  cursor: pointer;
  border: 1px solid #dee1e6;
  border-radius: 6px;
  transition: all 0.2s;
  &:hover {
    transform: translateY(-4px);
    ._link_logo {
      img {
        transform: scale(1);
      }
    }
  }
}
._link_logo {
  img {
    width: 72px;
    height: 72px;
    border-radius: 8px;
    overflow: hidden;
    transform: scale(0.9);
    transition: all 0.2s ease;
  }
}
._link_name {
}
._item_top {
  display: flex;
  align-items: center;
}
._item_bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    color: #fff;
  }
}
._link_desc {
}
._link_time {
  opacity: 0.5;
}
@media screen and (max-width: 976px) {
  ._link_item {
    flex-basis: 50%;
  }
}
// nim-width:768px
@media screen and (max-width: 976px) {
  ._link_item {
    flex-basis: 50%;
  }
}
@media (min-width: 768px) and (max-width: 976px) {
  ._link_item {
    flex-basis: 90%;
  }
}
@media screen and (max-width: 768px) {
  .iiemo_links {
    width: 90%;
  }
  ._links_warp {
    flex-direction: column;
  }
  ._link_item {
    width: 100%;
  }
}
</style>
