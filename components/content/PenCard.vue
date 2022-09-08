<script setup lang="ts">
// import { ElPagination } from 'element-plus'
import { ElSwitch } from 'element-plus'
import { randomColor } from '@/utlis/global'
import MenuIcon from '@/components/icon/MenuIcon.vue'
import ListIcon from '@/components/icon/ListIcon.vue'
const isHorizontal: any = ref(false)
const isAnimation: any = ref(false)
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
</script>

<template>
  <div class="">
    <div :class="$style['content_head']" class="container mx-auto mb-6 px-6 mt-10">
      <h5 class="text-xl fw-600">
        全部文章 <span class="text-sm ml-1">({{ types.length }})</span>
      </h5>
      <div :class="$style['content_switch']">
        <el-switch v-model="isHorizontal" size="default" :active-icon="ListIcon" :inactive-icon="MenuIcon" style="--el-switch-on-color: #13ce66" />
      </div>
    </div>
    <div :class="$style['home_type']" class="container mx-auto mb-6">
      <!-- <nuxt-link v-for="(item) in typeList" :key="item.id" :class="$style['home_type_item']" to="/categories.html" class="py-4">
          {{ item.id }}
        </nuxt-link> -->
      <!-- <ContentNavigation v-slot="{ navigation }">
        {{ navigation }}
          <div v-for="link of navigation" :key="link._path">
            <NuxtLink :to="link._path">{{ link.title }}</NuxtLink>
          </div>
        </ContentNavigation> -->
    </div>
    <div :class="[$style['pen_card'], [isHorizontal ? $style['_h'] : '']]" class="container mx-auto mb-6 px-6">
      <ContentList path="/" v-slot="{ list }">
        <template v-for="cItem in list" :key="cItem._id">
          <nuxt-link
            v-if="cItem.summary && cItem.summary.type"
            :to="cItem._path"
            :class="[$style['pen_card_item'], isAnimation ? 'listLeftIn' : '']"
            class="py-4 shadow-md p-4 rounded dark:bg-primary-800"
          >
            <div :class="$style['_text_warp']">
              <div :class="$style['_item_top']" class="pb-3">
                <div :class="$style['_item_top_l']" class="">
                  <span :class="$style['_type']" class="mr-3 px-2 py-1 text-sm rounded" :style="{ background: randomColor() }">
                    {{ cItem.summary.type }}
                  </span>
                  <span :class="$style['_time']" class="text-sm"> {{ cItem.summary.createtime }}</span>
                </div>
                <div :class="$style['_title']" class="text-2xl mt-2">
                  {{ cItem.summary.title }}
                </div>
              </div>
              <div :class="$style['_desc']" class="text-base mt-2">
                {{ cItem.summary.desc }}
              </div>
            </div>
            <div :class="$style['_img_warp']" class="mt-2">
              <img v-if="cItem.summary.pic" :src="cItem.summary.pic" />
              <div v-else :style="{ background: randomColor() }" :class="$style['_img_nopic']">{{ cItem.summary.tags }}</div>
            </div>
          </nuxt-link>
        </template>
      </ContentList>
    </div>
  </div>
</template>

<style lang="scss" module>
.content_head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  h5 {
    display: flex;
    align-items: baseline;
  }
}
@media screen and (max-width: 768px) {
  .content_switch {
    display: none;
  }
}
.home_type {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3%;
}
.home_type_item {
  flex-basis: 25%;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0ecfc;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  &::after {
    position: absolute;
    content: '';
    width: 100%;
    height: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    border-radius: 5px;
    transition: all 0.3s ease;
  }
  &:nth-child(1) {
    background: transparent;
    background-image: linear-gradient(315deg, #ffffff 0%, #a2e888 74%);
    &::after {
      background-color: #d3f2c8;
      background-image: linear-gradient(315deg, #ffffff 0%, #d3f2c8 74%);
    }
    &:hover {
      &::after {
        top: 0;
        height: 100%;
      }
    }
  }
  &:nth-child(2) {
    background-image: linear-gradient(315deg, #ffffff 0%, #74e0d7 74%);
    &::after {
      background-color: #aeefea;
      background-image: linear-gradient(315deg, #ffffff 0%, #aeefea 74%);
    }
    &:hover {
      &::after {
        top: auto;
        bottom: 0;
        height: 100%;
      }
    }
  }
  &:nth-child(3) {
    background-image: linear-gradient(315deg, #ffffff 0%, #bd84e9 74%);
    &::after {
      height: 100%;
      width: 0;
      background-color: #c797eb;
      background-image: linear-gradient(315deg, #ffffff 0%, #c797eb 74%);
    }
    &:hover {
      &::after {
        left: 0;
        width: 100%;
      }
    }
  }
  &:nth-child(4) {
    background-image: linear-gradient(315deg, #ffffff 0%, #797bee 74%);
    &::after {
      height: 100%;
      width: 0;
      background-color: #999bed;
      background-image: linear-gradient(315deg, #ffffff 0%, #999bed 74%);
    }
    &:hover {
      &::after {
        left: auto;
        right: 0;
        width: 100%;
      }
    }
  }
}
.pen_card {
  margin-top: 6rem;
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: unset;
  gap: 3%;
  &._h {
    flex-direction: column;
    .pen_card_item {
      flex: 1;
      align-items: center;
      flex-direction: row-reverse;
    }
    ._img_nopic {
      font-size: 1.2rem;
    }
    ._text_warp {
      margin-left: 30px;
    }
    ._img_warp {
      width: 240px;
      height: 160px;
      border-radius: 10px;
      flex-shrink: 0;
      margin: 0;
      img {
        width: 240px;
        height: 160px;
      }
    }
  }
}
.pen_card_item {
  flex-basis: 31.33%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 5px;
  margin-bottom: 2rem;
  transition: transform 0.3s ease-in-out, translateY 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgb(84 81 81 / 15%);
    z-index: 1;
    ._img_warp {
      ._img_nopic {
        color: #fff;
      }
    }
  }
}

._text_warp {
  display: flex;
  flex-direction: column;
  ._type {
    color: #fff;
  }
}
._item_top {
  border-bottom: 1px solid hsla(210, 8%, 51%, 0.09) !important;
}
._item_top_l {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

._img_warp {
  margin: 0 auto;
  border-radius: 6px;
  overflow: hidden;
  height: 100%;
  ._img_nopic {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 1.7rem;
    color: #ffffff69;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
.pen_pagination {
  padding: 5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
@media screen and (min-width: 1536px) {
  ._img_warp {
    width: 434px;
    height: 307px;
  }
}
@media (max-width: 1536px) and (min-width: 1440px) {
  ._img_warp {
    width: 404px;
    height: 286px;
  }
}
@media (max-width: 1440px) and (min-width: 976px) {
  ._img_warp {
    width: 258px;
    height: 183px;
  }
}
@media (max-width: 976px) and (min-width: 768px) {
  ._img_warp {
    width: 192px;
    height: 137px;
  }
}

@media (max-width: 768px) and (min-width: 100px) {
  .home_type {
    padding: 0 20px;
  }
  .pen_card {
    flex-direction: column;
    .pen_card_item {
      flex-direction: column-reverse;
    }
    ._text_warp {
      margin-top: 20px;
      margin-left: 0px;
    }
    ._img_warp {
      margin: 0 auto;
      width: 240px;
      height: 160px;
      border-radius: 10px;
      flex-shrink: 0;
      ._img_nopic {
        font-size: 1.3rem;
      }
      img {
        width: 240px;
        height: 160px;
      }
    }
  }
}
</style>
