<script setup lang="ts">
import { ElPagination } from 'element-plus'

import { storeToRefs } from 'pinia'
let  { isHorizontal, isAnimation } = storeToRefs(iiemoStore()) 
const { data } = await useAsyncData(() => queryContent('/').find())
const types = data.value.map((i)=> i.summary.type ) // 获取type
const newTypes = Array.from(new Set(types)) // 去重
let typeList = newTypes.map((s)=>{ return { id: s, list: [] } } )
data.value.forEach((i)=>{ typeList.forEach((e)=>{ if( e.id == i.summary.type ) e.list.push(i) }) })

</script>

<template>
  <div class="">
    <div :class="$style['home_type']" class="container mx-auto mb-6">
      <div v-for="(item) in typeList" :key="item.id" :class="$style['home_type_item']" class="py-4">
        {{ item.id }}
      </div>
    </div>
    <div
      :class="[$style['pen_card'], [isHorizontal ? $style['_h'] : '']]"
      class="container mx-auto mb-6 px-6"
    >
      <nuxt-link
        v-for="cItem in data"
        :key="cItem._id"
        :to="cItem._path"
        :class="[$style['pen_card_item'], isAnimation ? 'listLeftIn' : '']"
        class="py-4 shadow-md p-4 rounded"
      >
        <div :class="$style['_text_warp']">
          <div :class="$style['_item_top']" class="pb-3">
            <div :class="$style['_item_top_l']" class="">
              <span
                :class="$style['_type']"
                class="bg-violet-300 mr-3 px-2 py-1 text-sm rounded"
              >
                {{ cItem.summary.type }}
              </span>
              <span :class="$style['_time']" class="text-sm text-purple-700">{{
                cItem.summary.createtime
              }}</span>
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
          <img
            src="https://static.facebstore.com/public/uploads/_/originals/lunar-pro-screen-01.jpg?x-oss-process=image/auto-orient,1/interlace,1/resize,p_60/quality,q_90"
          />
        </div>
      </nuxt-link>
    </div>
    <div :class="$style['pen_pagination']" class="">
      <el-pagination
        :page-size="9"
        :pager-count="9"
        layout="prev, pager, next"
        :total="typeList.length"
      />
    </div>
  </div>
</template>

<style lang="scss" module>
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
  justify-content: space-between;
  align-items: unset;
  gap: 3%;
  &._h {
    flex-direction: column;
    .pen_card_item {
      flex: 1;
      align-items: center;
      flex-direction: row-reverse;
    }
    ._text_warp {
      margin-left: 30px;
    }
    ._img_warp {
      width: 240px;
      height: 160px;
      border-radius: 10px;
      flex-shrink: 0;
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
  transition: transform 0.3s ease-in-out, translateY 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgb(84 81 81 / 15%);
    z-index: 1;
    ._img_warp {
    }
  }
}
._text_warp {
  display: flex;
  flex-direction: column;
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
}
.pen_pagination {
  padding: 5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
