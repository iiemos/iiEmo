export default defineEventHandler( async(event) => {
  const url = 'https://pv.sohu.com/cityjson?ie=utf-8'
  const res:any = await $fetch(url)
  return res ? res.toString().split('=')[1].replace(';','') : ''
})