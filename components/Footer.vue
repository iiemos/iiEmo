<script setup lang="ts">
import publics from '@/data/publics'
const { logo, shortName, footer } = publics
</script>

<template>
  <footer :class="$style['iiemo_footer']">
    <div :class="$style['iiemo_footer_warp']" class="container mx-auto py-3">
      <div :class="$style['iiemo_foot_l']">
        <nuxt-link to="/" :class="$style['iiemo_logo']" class="">
          <img class="_logo_img" :src="logo" alt="iiEmo 一朵大呲花 🍀" />
          <span>{{ shortName }}</span>
        </nuxt-link>
        <!-- <nav :class="$style['iiemo_nav']" class="">
          <nuxt-link :to="item.link" :class="$style['iiemo_nav_item']" class="px-3" v-for="item in footer.nav" :key="item.name">
            {{ item.name }}
          </nuxt-link>
        </nav> -->
      </div>
      <div :class="$style['iiemo_footer_cdn']">
        本网站由 <a href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral" target="_blank" rel="noopener noreferrer"> <img :class="$style['cdn_logo']" src="/img/cdn/cdn_logo8.svg" alt=""> </a>提供CDN加速
      </div>
      <div :class="$style['iiemo_foot_r']">
        <a :href="footer.copyright.beianLink" :class="$style['iiemo_beian']" target="_blank" class="mr-3"> {{ footer.copyright.beian }}</a>
        {{ footer.copyright.desc }}
      </div>
    </div>

  </footer>
</template>

<style lang="scss" module>
.iiemo_footer {
  // mix-blend-mode: hard-light;
}
.iiemo_footer_cdn{
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  .cdn_logo{
    margin: 0 6px; 
    width: 60px;
  }
}
.iiemo_footer_warp {
  box-shadow: inset 0px 1px 0px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.iiemo_foot_l {
  display: flex;
  align-items: center;
  // flex: 1;
  gap: 2%;
}
.iiemo_logo {
  font-weight: 600;
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
  a{ 
    display: block;
  }
  .iiemo_nav_item {
  }
}
.iiemo_foot_r {
}

@media screen and (max-width: 768px) {
  .iiemo_footer {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .iiemo_footer_warp{
    flex-direction: column;
  }
  .iiemo_foot_l {
    justify-content: center;
  }

  .iiemo_nav{
    display: none;
  }
  .iiemo_footer_cdn{
    margin-top: 10px;
  }
  .iiemo_foot_r {
    text-align: center;
    margin-top: 10px;
    .iiemo_beian{
      display: block;
    }
  }
}
</style>
