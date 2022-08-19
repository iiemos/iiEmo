<script setup>
onMounted(() => {})
</script>
<template>
  <NuxtLayout>
    <div :class="$style['_essay_ctx']" class="mx-auto">
      <div class="_markdown_body">
        <ContentDoc />
      </div>
    </div>
  </NuxtLayout>
</template>
<style lang="scss" module>
._essay_ctx {
  max-width: 800px;
}
</style>
