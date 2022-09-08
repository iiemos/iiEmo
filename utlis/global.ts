// 获取assets静态资源
export const getAssetsFile = (url: string) => {
  return new URL(`../assets/img/${url}`, import.meta.url).href
}

// 随机颜色
export const randomColor = () => {
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
  return c[Math.floor(Math.random() * c.length)]
}
