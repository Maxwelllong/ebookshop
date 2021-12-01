<template>
  <div class="login">
    <!-- 顶部标题 -->
    <van-nav-bar
      title="登录"
      left-text="取消"
      right-text="注册"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="loginStyle">
      <!-- 用户名密码框 -->
      <van-form
        @submit="onSubmit"
        validate-first
        scroll-to-error
        show-error
        show-error-message
        label-width="0"
      >
        <van-field
          v-model="user.email"
          name="用户名"
          placeholder="邮箱地址"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="user.password"
          type="password"
          name="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >提交</van-button
          >
        </div>
      </van-form>
      <hr />
      <!-- 第三方登陆 -->
      <div class="otherLogin">
        <van-button class="btnItem"
          ><van-icon name="wechat" size="20px" />
          <div class="ways">微信登陆</div></van-button
        >
        <van-button class="btnItem"
          ><van-icon name="alipay" size="20px" />
          <div class="ways">支付宝登陆</div></van-button
        >
        <van-button class="btnItem"
          ><van-icon name="fire" />
          <div class="ways">微博登陆</div></van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onBeforeMount, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { submitLogin } from 'api/user.js'
import { Toast } from 'vant'
export default {
  name: 'Login',
  setup () {
    // '1-开始创建组件-setup'
    const router = useRouter()
    const user = reactive({
      email: '',
      password: ''
    })
    const onClickLeft = () => {
      router.push('/')
    }
    const onClickRight = () => {
      router.push('/reg')
    }
    // 提交登录
    const onSubmit = () => {
      submitLogin(user).then((res) => {
        // 登录信息
        console.log('---res---')
        console.log(user)
        console.log(res)
        if (res.status === 200) {
          Toast.success('登录成功')
          window.sessionStorage.setItem('token', res.data.access_token)
          setTimeout(() => {
            router.push('/')
          }, 1000)
          // 登录成功，清空表单
          ;(user.email = ''), (user.password = '')
        }
      })
    }
    onBeforeMount(() => {
      // '2.组件挂载页面之前执行----onBeforeMount'
    })
    onMounted(() => {
      // '3.-组件挂载到页面之后执行-------onMounted'
    })
    return {
      onClickRight,
      onClickLeft,
      onSubmit,
      user
    }
  }
}
</script>
<style scoped lang="less">
.login {
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
}
.loginStyle {
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
/deep/.van-form {
  margin-top: 60%;
  transform: translateY(-50%);
  padding: 2rem;
}
/deep/.van-field {
  background: rgba(0, 0, 0, 0);
}
/deep/.van-cell::after {
  border-bottom: 1px solid rgba(0, 0, 0, 0);
}
/deep/ .van-field__control {
  background: rgba(9, 9, 9, 0.5);
  color: white;
  border-radius: 20px;
  padding: 5px 0 5px 10px;
}
/deep/.van-field__error-message {
  margin-left: 10px;
}
/deep/.van-button {
  border: none;
  opacity: 0.5;
}
.otherLogin {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .btnItem {
    height: 8vh;
    margin: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    flex-wrap: nowrap;
    .ways {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: hidden;
    }
  }
}
</style>
