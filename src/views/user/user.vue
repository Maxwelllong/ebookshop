<template>
  <div>
    <van-nav-bar title="用户信息">
    </van-nav-bar>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'userInfo',
  setup () {
    // '1-开始创建组件-setup'
    const data = reactive({})
    const router = useRouter()
    const goback = () => {
      router.go(-1)
    }
    onBeforeMount(() => {
      // '2.组件挂载页面之前执行----onBeforeMount'
    })
    onMounted(() => {
      // '3.-组件挂载到页面之后执行-------onMounted'
    })
    return {
      ...toRefs(data), goback
    }
  }
}

</script>
<style scoped lang='less'>
</style>
