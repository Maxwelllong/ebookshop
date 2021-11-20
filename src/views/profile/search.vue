<!--search-->
<template>
  <div class='searchInner'>
    <van-search v-model="value"
                show-action
                placeholder="请输入搜索关键词"
                @search="onSearch">
      <template #action>
        <div @click="back">取消</div>
      </template>
    </van-search>
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
export default {
  name: 'search',
  setup () {
    const router = useRouter()
    function back () {
      router.back(-1)
    }
    return {
      back
    }
  }
}
</script>
<style scoped>
.searchInner {
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
</style>
