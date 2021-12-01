<template>
  <div>收藏信息</div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import { getCollection } from 'api/user.js'
export default {
  name: 'collection',
  setup () {
    // '1-开始创建组件-setup'
    const data = reactive({})
    onBeforeMount(() => {
      // '2.组件挂载页面之前执行----onBeforeMount'
    })
    onMounted(() => {
      // '3.-组件挂载到页面之后执行-------onMounted'
    })
    return {
      ...toRefs(data)
    }
  }
}
</script>
<style scoped lang="less"></style>
