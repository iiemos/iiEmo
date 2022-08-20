<script setup>
useHead({
  title: '一朵大呲花 - 林深时见鹿',
  meta:[
    { hid: 'keywords', name: 'keywords', content: '一朵大呲花,IT博客,技术博客,区块链博客' },
    { hid: 'description', name: 'description', content: '一朵大呲花，关注前沿技术、Web前端、NodeJs、区块链等技术的个人博客，记录个人经历、经验、想法的个人博客。' },
  ]
})
</script>
<template>
  <NuxtLayout>
    <HomeBanner />
    <ContentHeader />
    <PenCard />
  </NuxtLayout>
</template>