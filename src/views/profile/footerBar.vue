<template>
  <div>
    <van-tabbar v-model="active"
                @change='changeTab'>
      <van-tabbar-item icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="balance-list-o">菜单</van-tabbar-item>
      <van-tabbar-item icon="cart-o">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-circle-o">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { reactive, toRefs, ref, onBeforeMount, onMounted } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: '',
  setup () {
    //'1-开始创建组件-setup'
    const data = reactive({})
    const router = useRouter()
    const active = ref("");
    function changeTab () {
      if (active.value === 0) {
        router.push('/')
      }
      if (active.value === 1) {
        router.push('/index/menu')
      }
      if (active.value === 2) {
        router.push('/index/cart')
      }
      if (active.value === 3) {
        router.push('/index/user')
      }
    }
    onBeforeMount(() => {
      //'2.组件挂载页面之前执行----onBeforeMount'
    })
    onMounted(() => {
      //'3.-组件挂载到页面之后执行-------onMounted'
    })
    return {
      ...toRefs(data), changeTab, active
    }
  },
}

</script>
<style scoped lang='less'>
</style>