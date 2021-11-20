<template>
  <div>
    <van-tabs v-model:active="active"
              background='#cccccc'>
      <van-tab title="新书">新书</van-tab>
      <van-tab title="畅销">畅销</van-tab>
      <van-tab title="精选">精选</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { reactive, toRefs, ref, onBeforeMount, onMounted } from 'vue'
export default {
  name: '',
  setup () {
    const active = ref(0)
    //'1-开始创建组件-setup'
    const data = reactive({
    })
    onBeforeMount(() => {
      //'2.组件挂载页面之前执行----onBeforeMount'
    })
    onMounted(() => {
      //'3.-组件挂载到页面之后执行-------onMounted'
    })
    return {
      ...toRefs(data), active
    }
  },
}

</script>
<style scoped lang='less'>
</style>