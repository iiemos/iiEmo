<script setup lang="ts">
import about from '@/data/about'
const { title, slogin, myCode, myInfo } = about
let timer: any
onMounted(() => {
  const colortap = function (r) {
    function t() {
      return b[Math.floor(Math.random() * b.length)]
    }
    function e() {
      return String.fromCharCode(94 * Math.random() + 33)
    }
    function n(r) {
      for (var n = document.createDocumentFragment(), i = 0; r > i; i++) {
        var l = document.createElement('span')
        ;(l.textContent = e()), (l.style.color = t()), n.appendChild(l)
      }
      return n
    }
    function i() {
      var t = o[c.skillI]
      c.step
        ? c.step--
        : ((c.step = g),
          c.prefixP < l.length
            ? (c.prefixP >= 0 && (c.text += l[c.prefixP]), c.prefixP++)
            : 'forward' === c.direction
            ? c.skillP < t.length
              ? ((c.text += t[c.skillP]), c.skillP++)
              : c.delay
              ? c.delay--
              : ((c.direction = 'backward'), (c.delay = a))
            : c.skillP > 0
            ? ((c.text = c.text.slice(0, -1)), c.skillP--)
            : ((c.skillI = (c.skillI + 1) % o.length), (c.direction = 'forward'))),
        (r.textContent = c.text),
        r.appendChild(n(c.prefixP < l.length ? Math.min(s, s + c.prefixP) : Math.min(s, t.length - c.skillP))),
        setTimeout(i, d)
    }
    var l = '',
      o = slogin.map(function (r) {
        return r + ''
      }),
      a = 2,
      g = 1,
      s = 5,
      d = 75,
      b = [
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
      ],
      c = {
        text: '',
        prefixP: -s,
        skillI: 0,
        skillP: 0,
        direction: 'forward',
        delay: a,
        step: g,
      }
    i()
  }
  timer = setTimeout(() => {
    colortap(document.getElementById('colortap'))
    clearTimeout(timer)
  }, 3000)
})
onUnmounted(() => {
  clearTimeout(timer)
})
</script>
<template>
  <div :class="$style['iiemo_about']" class="container mx-auto mb-6">
    <h1 :class="$style['iiemo_about']" class="mb-6 text-4xl">
      {{ title }}
    </h1>
    <h1 id="colortap" class="mb-6 text-xl"></h1>
    <div :class="$style['_code_warp']" class="iiemo_code mb-6">
      <div :class="$style['_code_warp_tlt']" class="iiemo_code_tlt py-1">
        <div :class="$style['_code_lang']" class="">BASH</div>
      </div>
      <div :class="$style['_code_warp_con']">
        <div :class="$style['_code_item']" class="">
          <pre>
            <code class="language-javascript">{{ myCode }}</code>
          </pre>
        </div>
      </div>
    </div>
    <div :class="$style['_my_info']" class="container mx-auto py-4 bg-lime-50 dark:bg-primary-800">
      <div :class="$style['_info_item']" class="my-4 bg-lime-100 dark:bg-primary-600" v-for="mItem in myInfo" :key="mItem.title">
        <div :class="$style['_info_item_tlt']" class="text-xl bg-lime-200 dark:bg-primary-700">
          {{ mItem.title }}
        </div>
        <div :class="$style['_info_item_ctx']" class="" v-html="mItem.desc"></div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" module>
.iiemo_about {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
._code_warp {
  overflow: hidden;
  border-radius: 7px;
  width: 70%;
}
._code_lang {
  font-weight: bold;
  font-size: 1rem;
  padding-left: 4.8rem;
}
._code_warp_tlt {
  display: flex;
  align-items: center;
  position: relative;
  &::after {
    position: absolute;
    left: 0.7rem;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #fc625d;
    -webkit-box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b;
    box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b;
    content: ' ';
  }
}
._my_info {
  width: 70%;
  // background: $themeMarkdownBgColor;
  box-shadow: 0 5px 10px 0 rgb(144 164 174 / 40%);
  border-radius: 7px;
}
._info_item {
  // background: $themeBannerColor;
  border-radius: 12px;
  backdrop-filter: blur(8px) saturate(180%);
  position: relative;
  left: -20px;
  box-shadow: 0 5px 10px 0 rgb(144 164 174 / 40%);
}
._info_item_tlt {
  border-radius: 12px 12px 0 0;
  font-weight: normal;
  padding: 8px 14px;
  font-weight: bold;
  // background: $themeMarkdownBorderColor;
}
._info_item_ctx {
  padding: 8px 14px 8px 20px;
}
@media screen and (max-width: 768px) {
  ._my_info,
  ._code_warp {
    width: 85%;
  }
}
</style>
