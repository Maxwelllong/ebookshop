<template>
  <div>
    <van-tabbar route>
      <van-tabbar-item replace
                       to="/index"
                       icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item replace
                       to="/menu"
                       icon="balance-list-o">菜单</van-tabbar-item>
      <van-tabbar-item replace
                       to="/cart"
                       icon="cart-o">购物车</van-tabbar-item>
      <van-tabbar-item replace
                       to="/user"
                       icon="user-circle-o">个人中心</van-tabbar-item>
    </van-tabbar>
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