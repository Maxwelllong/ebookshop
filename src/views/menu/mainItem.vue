<template>
  <div>
    <van-nav-bar title="标题"
                 left-text="返回"
                 right-text="按钮"
                 left-arrow
                 @click-left="onClickLeft"
                 @click-right="onClickRight" />
    <h2>菜单页面</h2>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
export default {
  name: '',
  setup () {
    //'1-开始创建组件-setup'
    const data = reactive({})
    onBeforeMount(() => {
      //'2.组件挂载页面之前执行----onBeforeMount'
    })
    onMounted(() => {
      //'3.-组件挂载到页面之后执行-------onMounted'
    })
    return {
      ...toRefs(data),
    }
  },
}

</script>
<style scoped lang='less'>
</style>