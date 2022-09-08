<script setup lang="ts">
import publics from '@/data/publics'
import { ElDrawer } from 'element-plus'
const { logo, shortName, header } = publics
const route = useRoute()
onMounted(() => {})
const isOpenMeun = ref<boolean>(false)
const changeMeun = () => {
  isOpenMeun.value = !isOpenMeun.value
}
</script>

<template>
  <div :class="$style['iiemo_head']" class="bg-coolGray-50 dark:bg-coolGray-900 shadow-lg">
    <div :class="$style['iiemo_head_warp']" class="container mx-auto">
      <div :class="$style['iiemo_head_l']">
        <nuxt-link to="/" :class="$style['iiemo_logo']" class="">
          <img :src="logo" alt="iiEmo 一朵大呲花 🍀" />
          <span>{{ shortName }}</span>
        </nuxt-link>
        <nav :class="$style['iiemo_nav']" class="">
          <nuxt-link :to="navItem.link" :class="$style['iiemo_nav_item']" class="px-3" v-for="navItem in header.nav" :key="navItem.name">
            <span v-if="route.path == navItem.link">{{ navItem.icon }}</span>
            {{ navItem.name }}
          </nuxt-link>
        </nav>
      </div>
      <div :class="$style['iiemo_head_r']">
        <div :class="$style['color_mode']" class="">
          <ColorModeSwitch class="dark:text-primary-100 hover:text-primary-700 dark:hover:text-primary-300" />
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
    <el-drawer v-model="isOpenMeun" :customClass="($style['el_m_rawer'], 'dark:bg-primary-800')" :append-to-body="true" :with-header="false" size="50%">
      <div :class="$style['m_nav']">
        <nuxt-link :to="navItem.link" :class="[$style['m_iiemo_nav_item'], route.path == navItem.link ? $style['_ons'] : '']" class="px-3" v-for="navItem in header.nav" :key="navItem.name">
          <span :class="$style['m_nav_icon']">{{ navItem.icon }}</span>
          {{ navItem.name }}
        </nuxt-link>
      </div>
      <div :class="$style['m_color_mode']">
        <ColorModeSwitch class="dark:text-primary-100 hover:text-primary-700 dark:hover:text-primary-300" />
      </div>
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
.mobile_meun {
  padding: 6px;
  cursor: pointer;
  display: none;
  &._active {
    .meun_top {
      top: 6px;
      transform: translate(0) rotate(225deg);
    }
    .meun_middle {
      top: 6px;
      transform: translate(16px);
    }
    .meun_bottom {
      top: 6px;
      transform: translate(0) rotate(135deg);
    }
  }
  &._no_active {
    &:hover {
      .meun_top {
        transform: translate(0px);
      }
      .meun_middle {
        transform: translate(8px);
      }
      .meun_bottom {
        transform: translate(0px);
      }
    }
  }
  .meun_container {
    position: relative;
    overflow: hidden;
    width: 16px;
    height: 14px;
    span {
      position: absolute;
      width: 16px;
      height: 2px;
      background-color: #666;
      transition: top 0.25s, background-color 0.5s, transform 0.25s;
    }
  }
  .meun_top {
    top: 0;
    left: 0;
    transform: translate(4px);
  }
  .meun_middle {
    top: 6px;
    left: 0;
    transform: translate(0);
  }
  .meun_bottom {
    top: 12px;
    left: 0;
    transform: translate(8px);
  }
}
.el_m_rawer {
  background: $themeBgcolor;
}
.m_nav {
  display: flex;
  flex-direction: column;
  .m_iiemo_nav_item {
    width: 100%;
    text-align: left;
    font-size: 1.1rem;
    padding: 0.35rem 1rem 0.35rem 1.25rem;
    position: relative;
    padding-left: 30px;
    &::before {
      content: '';
      position: absolute;
      left: -20px;
      background: #44df84;
      width: 3px;
      top: 50%;
      -webkit-transform: translateY(-50%) scale(0);
      transform: translateY(-50%) scale(0);
      opacity: 0;
      height: 70%;
    }
    .m_nav_icon {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    &._ons {
      color: #44df84;
      &::before {
        transform: translateY(-50%) scale(1);
        opacity: 1;
      }
    }
  }
}
.m_color_mode {
  margin-top: 20px;
  padding-top: 20px;
  box-shadow: inset 0px 1px 0px rgba(0, 0, 0, 0.05);
  .m_color_item {
    width: 100%;
    text-align: left;
    font-size: 1rem;
    padding: 0.35rem 1rem 0.35rem 1.25rem;
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 30px;
    svg {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
      margin-left: 2px;
    }
  }
}

@media screen and (max-width: 768px) {
  .iiemo_head {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .mobile_meun {
    display: flex;
  }
  .iiemo_nav,
  .color_mode {
    display: none;
  }
}
</style>
