<template>
  <div class='loginStyle'>
    <!-- 顶部标题 -->
    <van-nav-bar title="登录"
                 left-text="取消"
                 right-text="注册"
                 left-arrow
                 @click-left="onClickLeft"
                 @click-right="onClickRight" />
    <!-- 用户名密码框 -->
    <van-form @submit="onSubmit"
              validate-first
              scroll-to-error
              show-error
              show-error-message
              label-width='0'>
      <van-field v-model="username"
                 name="用户名"
                 placeholder="邮箱地址"
                 :rules="[{ required: true, message: '请填写用户名' }]" />
      <van-field v-model="password"
                 type="password"
                 name="密码"
                 placeholder="密码"
                 :rules="[{ required: true, message: '请填写密码' }]" />
      <div style="margin: 16px;">
        <van-button round
                    block
                    type="info"
                    native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'Login',
  setup () {
    // '1-开始创建组件-setup'
    const data = reactive({})
    const router = useRouter()
    const onClickLeft = () => {
      router.push('/')
    }
    const onClickRight = () => {
      router.push('/reg')
    }
    onBeforeMount(() => {
      // '2.组件挂载页面之前执行----onBeforeMount'
    })
    onMounted(() => {
      // '3.-组件挂载到页面之后执行-------onMounted'
    })
    return {
      ...toRefs(data), onClickRight, onClickLeft
    }
  }
}

</script>
<style scoped lang='less'>
.loginStyle {
  background: rgb(218, 118, 118) !important;
  height: 100vh;
}
/deep/.van-form {
  margin-top: 50%;
  transform: translateY(-50%);
  padding: 2rem;
}
/deep/ .van-field {
  border-radius: 3rem;
  margin-bottom: 1rem;
}
</style>
