<script setup lang="ts">
import publics from '@/data/publics'
const { logo, shortName, footer } = publics
</script>

<template>
  <footer :class="$style['iiemo_footer']" class="py-3">
    <div :class="$style['iiemo_footer_warp']" class="container mx-auto">
      <div :class="$style['iiemo_foot_l']">
        <nuxt-link to="/" :class="$style['iiemo_logo']" class="">
          <img :src="logo" alt="iiEmo 一朵大呲花 🍀" />
          <span>{{ shortName }}</span>
        </nuxt-link>
        <nav :class="$style['iiemo_nav']" class="">
          <nuxt-link :to="item.link" :class="$style['iiemo_nav_item']" class="px-3" v-for="item in footer.nav" :key="item.name">
            {{ item.name }}
          </nuxt-link>
        </nav>
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
  box-shadow: inset 0px 1px 0px rgba(0, 0, 0, 0.05);
  // mix-blend-mode: hard-light;
}
.iiemo_footer_warp {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.iiemo_foot_l {
  display: flex;
  align-items: center;
  flex: 1;
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
  .iiemo_foot_l {
    justify-content: center;
  }

  .iiemo_nav,
  .iiemo_foot_r {
    display: none;
  }
}
</style>
