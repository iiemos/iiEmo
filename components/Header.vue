<script setup lang="ts">
import publics from '@/data/publics'
import { ElSwitch, ElDrawer } from 'element-plus/dist/index.full.js'
import { Check, Close } from '@element-plus/icons-vue'
import { useStorage } from '@vueuse/core'
import { storeToRefs } from 'pinia'

let  { themeColor, isAnimation } = storeToRefs(iiemoStore()) // use pinia is esay
const { logo, shortName, header } = publics

const myTheme = useStorage('myScheme', themeColor.value)

function changeSwitch() {}
const checkTheme = (i: any) => {
  document.documentElement.classList.remove(themeColor.value.code)
  themeColor.value.code = i.code
  myTheme.value = i
  if (i == 'system') {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark')
      console.log('(#^.^#)已开启深色模式')
    } else {
      document.documentElement.classList.add('light')
      console.log('(#^.^#)已开启浅色模式')
    }
  } else {
    document.documentElement.classList.add(i.code)
    document
      .getElementsByTagName('body')[0]
      .style.setProperty('--themeBgcolor', i.bgColor)
    document
      .getElementsByTagName('body')[0]
      .style.setProperty('--themeTextColor', i.textColor)
    document
      .getElementsByTagName('body')[0]
      .style.setProperty('--themeMarkdownColor', i.mdColor)
    document
      .getElementsByTagName('body')[0]
      .style.setProperty('--themeBannerColor', i.bannerColor)
  }
}
onMounted(()=>{
  themeColor.value = myTheme.value
  checkTheme(myTheme.value)
})

const isOpenMeun = ref<boolean>(false)
const changeMeun = ()=>{
  isOpenMeun.value = !isOpenMeun.value
}
</script>

<template>
  <div
    :class="$style['iiemo_head']"
    class="bg-coolGray-50 dark:bg-coolGray-900 shadow-lg"
  >
    <div :class="$style['iiemo_head_warp']" class="container mx-auto">
      <div :class="$style['iiemo_head_l']">
        <nuxt-link to="/" :class="$style['iiemo_logo']" class="">
          <img :src="logo" alt="" />
          <span>{{ shortName }}</span>
        </nuxt-link>
        <nav :class="$style['iiemo_nav']" class="">
          <nuxt-link
            :to="navItem.link"
            :class="$style['iiemo_nav_item']"
            class="px-3"
            v-for="navItem in header.nav"
            :key="navItem.name"
          >
            {{ navItem.name }}
          </nuxt-link>
        </nav>
      </div>
      <div :class="$style['iiemo_head_r']">
        <div
          :class="$style['is_animation']"
          class="text-xs px-2 mr-5 t_color"
          v-if="header.isShowAnimation"
        >
          动画
          <el-switch
            v-model="isAnimation"
            class="ml-2"
            inline-prompt
            :active-icon="Check"
            :inactive-icon="Close"
            @change="changeSwitch()"
          />
        </div>
        <div :class="$style['color_mode']" class="">
          <div
            :class="[
              $style['color_item'],
              { _active: themeColor.code == item.code },
            ]"
            class="text-xs px-2"
            v-for="item in header.themes"
            :key="item.code"
            @click="checkTheme(item)"
          >
            <svg
              class="mr-1"
              v-if="themeColor.code == item.code"
              color="#4338CA"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              data-v-78e17ca8=""
            >
              <path
                fill="currentColor"
                d="M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
              ></path>
              <path
                fill="currentColor"
                d="M745.344 361.344a32 32 0 0 1 45.312 45.312l-288 288a32 32 0 0 1-45.312 0l-160-160a32 32 0 1 1 45.312-45.312L480 626.752l265.344-265.408z"
              ></path>
            </svg>
            {{ item.name }}
          </div>
        </div>
        <div :class="[$style['mobile_meun'], isOpenMeun ? $style['_active'] : '_no_active']" @click="changeMeun">
          <div :class="$style['meun_container']">
            <span :class="$style['meun_top']"></span>
            <span :class="$style['meun_middle']"></span>
            <span :class="$style['meun_bottom']"></span>
          </div>
        </div>
      </div>
    </div>
    <el-drawer v-model="isOpenMeun" title="I am the title" :append-to-body="true" :with-header="false">
      12312312
    </el-drawer>
  </div>
</template>

<style lang="scss" module>
.iiemo_head {
  display: flex;
  align-items: center;
  height: 70px;
}
.iiemo_head_warp {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.iiemo_head_l {
  display: flex;
  align-items: center;
  flex: 1;
  gap: 2%;
}
.iiemo_logo {
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  img {
    width: 32px;
    height: 32px;
    margin-right: 4px;
  }
  span {
    flex-grow: 1;
  }
}
.iiemo_nav {
  display: flex;
  align-items: center;
  font-weight: 400;
  .iiemo_nav_item {
  }
}
.iiemo_head_r {
  display: flex;
  align-items: center;
}
.color_mode {
  display: flex;
  align-items: center;
}
.is_animation {
  display: flex;
  align-items: center;
}
.color_item {
  cursor: pointer;
  display: flex;
  align-items: center;
  svg {
    width: 14px;
    height: 14px;
  }
}
.mobile_meun{
  padding: 6px;
  cursor: pointer;
  display: none;
  &._active{
    .meun_top{
      top: 6px;
      transform: translate(0) rotate(225deg);
    }
    .meun_middle{
      top: 6px;
      transform: translate(16px);
    }
    .meun_bottom{
      top: 6px;
      transform: translate(0) rotate(135deg);
    }
  }
  &._no_active{
    &:hover{
      .meun_top{
        transform: translate(0px);
      }
      .meun_middle{
        transform: translate(8px);
      }
      .meun_bottom{
        transform: translate(0px);
      }
    }
  }
  .meun_container{
    position: relative;
    overflow: hidden;
    width: 16px;
    height: 14px;
    span{
      position: absolute;
      width: 16px;
      height: 2px;
      background-color: #666;
      transition: top .25s,background-color .5s,transform .25s;
    }
  }
  .meun_top{
    top: 0;
    left: 0;
    transform: translate(4px);
  }
  .meun_middle{
    top: 6px;
    left: 0;
    transform: translate(0);
  }
  .meun_bottom{
    top: 12px;
    left: 0;
    transform: translate(8px);
  }
}
@media screen and (max-width: 768px) {
  .iiemo_head{
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .mobile_meun{
    display: flex;
  }
  .iiemo_nav,.color_mode{
    display: none;
  }
}

</style>
