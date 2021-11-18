<!--regiser-->
<template>
  <div>
    <van-nav-bar title="注 &nbsp; 册" />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field v-model="userInfo.username"
                   name="用户名"
                   label="用户名"
                   placeholder="用户名"
                   :rules="[{ required: true, message: '请填写用户名' }]" />
        <van-field v-model="userInfo.passWord"
                   type="password"
                   name="密码"
                   label="密码"
                   placeholder="密码"
                   :rules="[{ required: true, message: '请填写密码' }]" />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round
                    block
                    type="primary"
                    native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { reactive } from 'vue'
export default {
  name: 'register',
  setup () {
    // eslint-disable-next-line no-undef
    const userInfo = reactive({
      userName: '',
      passWord: '',
      checkPWD: '',
      email: ''
    })
    return {
      userInfo
    }
  }
}
</script>
<style scoped>
</style>
