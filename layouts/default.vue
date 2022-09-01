<script setup lang="ts">
import { ElNotification } from 'element-plus/dist/index.full.js'
import { useStorage } from '@vueuse/core'
import { storeToRefs } from 'pinia'
let  { isConsole } = storeToRefs(iiemoStore())
const IP = useStorage('IP', '')
const setConsloe = () =>{
  console.log('\n%c一朵大呲花 - 林深时见鹿 🍀\n', 'font-weight: 600;')
  if(IP.value) console.log("🌰 Hi，来自 %c" + (IP.value ? JSON.parse(IP.value).cname : '五湖四海') + " %c的朋友！", "color: #50a1ff; font-family: monoscope; font-weight: bold", "")
  console.log('\n%c🍄 网站介绍：\n', 'font-weight: 600;')
  console.log('\n🥕 纯静态： Nuxt3 + Vite + @nuxt/content + windi + 几个Element-Plus 组件 + 手撸\n')
  console.log('\n🥕 UI： 乱七八糟随便整的\n')
  console.log('\n🥕 初衷： 改善之前的wordPress笨重博客\n')
  console.log('\n🥕 建立时间： 2022-08-01（建军节）有幸服过两年兵役\n')
  console.log('\n%c想拥有自己博客吗？\n', 'font-weight: 600;')
  console.log('\n本博客github完全开源，完全以配置文件的形式进行搭建，%c'+ '开箱即用' +'%c！\n', "color: #50a1ff; font-family: monoscope; font-weight: bold", "")
  console.log('\n%c'+ '欢迎添加友链哦~~~~~~~~~~' +'%c\n', "color: #50a1ff; font-family: monoscope; font-weight: bold", "")

  // 消息弹框
  let msgTlt = IP.value ? `来自<span style="color:#7c3aed;">${IP.value ? JSON.parse(IP.value).cname : ''}</span>的` : ''
  let msgHTML = `
    <div class="nottion_warp">
      <div class="nottion_tlt">🥕 Hi, ${msgTlt}朋友</div>

      <div id="clock" class="progress-clock">
        <button class="progress-clock__time-date" data-group="d" type="button">
          <small data-unit="w">Sunday</small><br>
          <span data-unit="mo">January</span>
          <span data-unit="d">1</span>
        </button>
        <button class="progress-clock__time-digit" data-unit="h" data-group="h" type="button">12</button><span
          class="progress-clock__time-colon">:</span><button class="progress-clock__time-digit" data-unit="m" data-group="m"
          type="button">00</button><span class="progress-clock__time-colon">:</span><button
          class="progress-clock__time-digit" data-unit="s" data-group="s" type="button">00</button>
        <span class="progress-clock__time-ampm" data-unit="ap">AM</span>
        <svg class="progress-clock__rings" width="256" height="256" viewBox="0 0 256 256">
          <defs>
            <linearGradient id="pc-red" x1="1" y1="0.5" x2="0" y2="0.5">
              <stop offset="0%" stop-color="hsl(343,90%,55%)" />
              <stop offset="100%" stop-color="hsl(323,90%,55%)" />
            </linearGradient>
            <linearGradient id="pc-yellow" x1="1" y1="0.5" x2="0" y2="0.5">
              <stop offset="0%" stop-color="hsl(43,90%,55%)" />
              <stop offset="100%" stop-color="hsl(23,90%,55%)" />
            </linearGradient>
            <linearGradient id="pc-blue" x1="1" y1="0.5" x2="0" y2="0.5">
              <stop offset="0%" stop-color="hsl(223,90%,55%)" />
              <stop offset="100%" stop-color="hsl(203,90%,55%)" />
            </linearGradient>
            <linearGradient id="pc-purple" x1="1" y1="0.5" x2="0" y2="0.5">
              <stop offset="0%" stop-color="hsl(283,90%,55%)" />
              <stop offset="100%" stop-color="hsl(263,90%,55%)" />
            </linearGradient>
          </defs>
          <!-- Days of Month -->
          <g data-units="d">
            <circle class="progress-clock__ring" cx="128" cy="128" r="74" fill="none" opacity="0.1" stroke="url(#pc-red)"
              stroke-width="12" />
            <circle class="progress-clock__ring-fill" data-ring="mo" cx="128" cy="128" r="74" fill="none"
              stroke="url(#pc-red)" stroke-width="12" stroke-dasharray="465 465" stroke-dashoffset="465"
              stroke-linecap="round" transform="rotate(-90,128,128)" />
          </g>
          <!-- Hours of Day -->
          <g data-units="h">
            <circle class="progress-clock__ring" cx="128" cy="128" r="90" fill="none" opacity="0.1" stroke="url(#pc-yellow)"
              stroke-width="12" />
            <circle class="progress-clock__ring-fill" data-ring="d" cx="128" cy="128" r="90" fill="none"
              stroke="url(#pc-yellow)" stroke-width="12" stroke-dasharray="565.5 565.5" stroke-dashoffset="565.5"
              stroke-linecap="round" transform="rotate(-90,128,128)" />
          </g>
          <!-- Minutes of Hour -->
          <g data-units="m">
            <circle class="progress-clock__ring" cx="128" cy="128" r="106" fill="none" opacity="0.1" stroke="url(#pc-blue)"
              stroke-width="12" />
            <circle class="progress-clock__ring-fill" data-ring="h" cx="128" cy="128" r="106" fill="none"
              stroke="url(#pc-blue)" stroke-width="12" stroke-dasharray="666 666" stroke-dashoffset="666"
              stroke-linecap="round" transform="rotate(-90,128,128)" />
          </g>
          <!-- Seconds of Minute -->
          <g data-units="s">
            <circle class="progress-clock__ring" cx="128" cy="128" r="122" fill="none" opacity="0.1"
              stroke="url(#pc-purple)" stroke-width="12" />
            <circle class="progress-clock__ring-fill" data-ring="m" cx="128" cy="128" r="122" fill="none"
              stroke="url(#pc-purple)" stroke-width="12" stroke-dasharray="766.5 766.5" stroke-dashoffset="766.5"
              stroke-linecap="round" transform="rotate(-90,128,128)" />
          </g>
        </svg>
      </div>
    </div>
  `
  ElNotification({
      duration: 0,
      title: ``,
      appendTo: 'footer',
      dangerouslyUseHTMLString: true,
      message: msgHTML,
      position: 'bottom-right',
    })
    ProgressClock('#clock')
}

onMounted(()=>{
  if((window as any).returnCitySN){
    IP.value = JSON.stringify((window as any).returnCitySN) 
  }
// Window拓展属性
  let timer = setTimeout(()=>{
    isConsole.value = true
    clearTimeout(timer)
  },1000)
  if(!isConsole.value){
    setConsloe()
  }
})
const ProgressClock = (qs:any)=>{
    const el = document.querySelector(qs)
    const time = ref<any>(0)
    const updateTimeout:any = ref<any>(null)
    const ringTimeouts = ref<any>([])
    const getDayOfWeek = (day:any)=>{
      switch (day) {
        case 1:
          return "星期一"; // "Monday"
        case 2:
          return "星期二"; // Tuesday
        case 3:
          return "星期三"; // Wednesday
        case 4:
          return "星期四";// Thursday
        case 5:
          return "星期五"; // Friday
        case 6:
          return "星期六"; // Saturday
        default:
          return "星期日"; // Sunday
      }
    }
    const getMonthInfo = (mo:any, yr:any) => {
      switch (mo) {
        case 1:
          return { name: "February", days: yr % 4 === 0 ? 29 : 28 };
        case 2:
          return { name: "March", days: 31 };
        case 3:
          return { name: "April", days: 30 };
        case 4:
          return { name: "May", days: 31 };
        case 5:
          return { name: "June", days: 30 };
        case 6:
          return { name: "July", days: 31 };
        case 7:
          return { name: "August", days: 31 };
        case 8:
          return { name: "September", days: 30 };
        case 9:
          return { name: "October", days: 31 };
        case 10:
          return { name: "November", days: 30 };
        case 11:
          return { name: "December", days: 31 };
        default:
          return { name: "January", days: 31 };
      }
    }
    const update = () =>{
      time.value = new Date()
      if(el){
        // date and time
        const dayOfWeek = time.value.getDay()
        const year = time.value.getFullYear()
        const month = time.value.getMonth()
        const day = time.value.getDate()
        const hr = time.value.getHours()
        const min = time.value.getMinutes()
        const sec = time.value.getSeconds()
        const dayOfWeekName = getDayOfWeek(dayOfWeek)
        const monthInfo = getMonthInfo(month, year)
        const m_progress = sec / 60
        const h_progress = (min + m_progress) / 60
        const d_progress = (hr + h_progress) / 24
        const mo_progress = ((day - 1) + d_progress) / monthInfo.days
                  const units = [
          {
            label: "w",
            value: dayOfWeekName
          },
          {
            label: "mo",
            value: monthInfo.name,
            progress: mo_progress
          },
          {
            label: "d",
            value: day,
            progress: d_progress
          },
          {
            label: "h",
            value: hr > 12 ? hr - 12 : hr,
            progress: h_progress
          },
          {
            label: "m",
            value: min < 10 ? "0" + min : min,
            progress: m_progress
          },
          {
            label: "s",
            value: sec < 10 ? "0" + sec : sec
          },
          {
            label: "ap",
            value: hr > 12 ? "PM" : "AM"
          }
        ]

        // flush out the timeouts
        ringTimeouts.value.forEach((t:any) => {
          clearTimeout(t)
        })
        ringTimeouts.value = []

        // update the display
        units.forEach(u => {
          // rings
          const ring = el.querySelector(`[data-ring="${u.label}"]`);

          if (ring) {
            const strokeDashArray = ring.getAttribute("stroke-dasharray");
            const fill360 = "progress-clock__ring-fill--360";

            if (strokeDashArray) {
              // calculate the stroke
              const circumference = +strokeDashArray.split(" ")[0];
              const strokeDashOffsetPct = 1 - u.progress;

              ring.setAttribute(
                "stroke-dashoffset",
                strokeDashOffsetPct * circumference
              );

              // add the fade-out transition, then remove it
              if (strokeDashOffsetPct === 1) {
                ring.classList.add(fill360);

                ringTimeouts.value.push(
                  setTimeout(() => {
                    ring.classList.remove(fill360);
                  }, 600)
                );
              }
            }
          }

          // digits
          const unit = el.querySelector(`[data-unit="${u.label}"]`);

          if (unit)
            unit.innerText = u.value;
        })
      }
    }
    clearInterval(updateTimeout.value)
    // updateTimeout.value = setTimeout(update.bind(this), 1e3)
    updateTimeout.value = setInterval(()=>{
      update()
    },1000)
    update()

}

</script>
<template>
  <div class="_layouts">
    <Header />
      <section :class="$style['_layouts_slot']">
        <slot />
        <BackTop />
      </section>
    <!-- <Spotlight /> -->
    <Footer />
  </div>
</template>
<style>
.el-notification{
  padding: 14px;
}
.nottion_warp{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.nottion_tlt{
  margin-bottom: 10px;
}
.progress-clock {
  display: grid;
  justify-content: center;
  align-content: center;
  position: relative;
  text-align: center;
  width: 16em;
  height: 16em;
}

.progress-clock__time-date,
.progress-clock__time-digit,
.progress-clock__time-colon,
.progress-clock__time-ampm {
  transition: color 0.2s linear;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  z-index: 1;
  position: relative;
}

.progress-clock__time-date,
.progress-clock__time-digit {
  background: transparent;
}

.progress-clock__time-date,
.progress-clock__time-ampm {
  grid-column: 1 / 6;
}

.progress-clock__time-date {
  font-size: 0.75em;
  line-height: 1.33;
}

.progress-clock__time-digit,
.progress-clock__time-colon {
  font-size: 2em;
  font-weight: 400;
  grid-row: 2;
}

.progress-clock__time-colon {
  line-height: 1.275;
}

.progress-clock__time-ampm {
  cursor: default;
  grid-row: 3;
}

.progress-clock__rings {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.progress-clock__ring {
  opacity: 0.1;
}

.progress-clock__ring-fill {
  transition:
    opacity 0s 0.3s linear,
    stroke-dashoffset 0.3s ease-in-out;
}

.progress-clock__ring-fill--360 {
  opacity: 0;
  stroke-dashoffset: 0;
  transition-duration: 0.3s;
}

[data-group]:focus {
  outline: transparent;
}

[data-units] {
  transition: opacity 0.2s linear;
}

[data-group="d"]:focus,
[data-group="d"]:hover {
  color: hsl(333, 90%, 55%);
}

[data-group="h"]:focus,
[data-group="h"]:hover {
  color: hsl(33, 90%, 55%);
}

[data-group="m"]:focus,
[data-group="m"]:hover {
  color: hsl(213, 90%, 55%);
}

[data-group="s"]:focus,
[data-group="s"]:hover {
  color: hsl(273, 90%, 55%);
}

[data-group]:focus~.progress-clock__rings [data-units],
[data-group]:hover~.progress-clock__rings [data-units] {
  opacity: 0.2;
}

[data-group="d"]:focus~.progress-clock__rings [data-units="d"],
[data-group="d"]:hover~.progress-clock__rings [data-units="d"],
[data-group="h"]:focus~.progress-clock__rings [data-units="h"],
[data-group="h"]:hover~.progress-clock__rings [data-units="h"],
[data-group="m"]:focus~.progress-clock__rings [data-units="m"],
[data-group="m"]:hover~.progress-clock__rings [data-units="m"],
[data-group="s"]:focus~.progress-clock__rings [data-units="s"],
[data-group="s"]:hover~.progress-clock__rings [data-units="s"] {
  opacity: 1;
}

/* Dark theme */
@media (prefers-color-scheme: dark) {
  :root {
    --bg: hsl(var(--hue), 10%, 10%);
    --fg: hsl(var(--hue), 10%, 90%);
  }

  .progress-clock__ring {
    opacity: 0.2;
  }
}
</style>
<style lang="scss" module>
._layouts_slot{
  margin-top: 1.25rem;
  min-height: calc(100vh - 150px) !important;
}
</style>