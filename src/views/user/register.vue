<template>
  <div>
    <van-nav-bar title="用户注册"
                 left-text="取消"
                 left-arrow
                 @click-left="onClickLeft" />
    <div class="body">
      <van-form @failed="onFailed">
        <van-image width="100"
                   class='headLogo'
                   round
                   height="100"
                   src="https://img01.yzcdn.cn/vant/cat.jpeg" />
        <van-cell-group inset>
          <!-- 通过 pattern 进行正则校验 -->
          <van-field v-model="userInfo.userName"
                     validate-first
                     submit-on-enter
                     show-error-message
                     show-error
                     width='200px'
                     name="pattern"
                     placeholder="用户名"
                     :rules="[{ pattern, message: '请输入正确内容' }]" />
          <!-- 通过 validator 进行密码校验 -->
          <van-field v-model="userInfo.passWord"
                     name="validator"
                     placeholder="密码"
                     :rules="[{ validator:vilidatorPwd, message: '请输入正确内容' }]" />
          <!-- 通过 validator 返回错误提示 -->
          <van-field v-model="userInfo.checkPwd"
                     name="checkPwd"
                     placeholder="确认密码"
                     :rules="[{ validator: validatorCheckPwd }]" />
          <!-- 通过 validator 进行异步函数校验 -->
          <van-field v-model="userInfo.email"
                     name="Email"
                     placeholder="请输入邮箱地址"
                     :rules="[{ validator: validatorEmail, message: '请输入邮箱地址' }]" />
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
  </div>
</template>

<script>
import { reactive, onBeforeMount, onMounted } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'register',
  setup () {
    // '1-开始创建组件-setup'
    const userInfo = reactive({
      userName: '',
      password: '',
      checkPwd: '',
      email: ''
    })
    const router = useRouter()
    const onClickLeft = () => {
      router.go(-1)
    }
    onBeforeMount(() => {
      // '2.组件挂载页面之前执行----onBeforeMount'
    })
    onMounted(() => {
      // '3.-组件挂载到页面之后执行-------onMounted'
    })
    return {
      userInfo, onClickLeft
    }
  }
}

</script>
<style scoped lang='less'>
/deep/.van-form {
  margin-top: 10%;
  display: flex;
  padding: 10px;
  flex-direction: column;
  .headLogo {
    margin-bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
