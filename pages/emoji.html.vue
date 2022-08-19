<script setup lang="ts">
import data from '@/data/emoji.json'
import { ElMessage } from 'element-plus'
const source = ref('')
const { copy } = useClipboard({ source })
let keys = []
for (var key in data) keys.push(key)

const copyEmoji = async (e: any) => {
  source.value = e
  await copy()
  if(!source.value) return alert('Copied error!')
  ElMessage({
    message: `Copied ${e}`,
    center: true,
    customClass: 'copTips',
    type: 'success',
  })
}
</script>
<template>
  <NuxtLayout>
    <div :class="$style['_emoji_ctx']" class="mx-auto">
      <span
        :class="$style['_emoji_item']"
        v-for="(item, idx) in keys"
        :key="idx"
        @click="copyEmoji(item)"
        >{{ item }}</span
      >
    </div>
  </NuxtLayout>
</template>
<style lang="scss">
.copTips {
  background: rgba(0, 0, 0, 0.75);
  border: 0;
  color: #fff;
  width: max-content;
  .el-message-icon--success {
    color: #fff;
    display: none;
  }
  .el-message__content {
    color: #fff;
  }
}
</style>
<style lang="scss" module>
._emoji_ctx {
  max-width: 800px;
  margin-bottom: 5rem;
  font-family: andalemono, menlo, monospace;
}
._emoji_item {
  font-family: AppleColorEmoji;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  display: inline-block;
  border-radius: 4px;
  font-size: 22px;
  &:hover {
    background: #e0dede;
  }
}
@media screen and (max-width: 768px) {
  ._emoji_ctx{
    width: 90%;
  }
}
</style>
