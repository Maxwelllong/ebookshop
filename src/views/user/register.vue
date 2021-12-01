<template>
  <div>
    <van-nav-bar
      title="用户注册"
      left-text="登录"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="body">
      <van-form @submit="onSubmit">
        <van-image
          width="100"
          class="headLogo"
          round
          height="100"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
        <van-cell-group inset>
          <!-- 校验用户名 -->
          <van-field
            v-model="userInfo.name"
            validate-first
            submit-on-enter
            show-error-message
            clearable
            show-error
            width="200px"
            name="pattern"
            placeholder="请输入用户名，长度4-12位"
            :rules="[
              {
                validator: validatorUserName,
                required: true,
                message: '用户名不能为空'
              }
            ]"
          />
          <!-- 通过 validator 进行密码校验 -->
          <van-field
            v-model="userInfo.password"
            name="validator"
            clearable
            placeholder="密码"
            :rules="[
              {
                validator: validatorPwd,
                required: true,
                message: '密码不能为空'
              }
            ]"
          />
          <!-- 确认密码 -->
          <van-field
            v-model="userInfo.password_confirmation"
            name="password_confirmation"
            clearable
            placeholder="确认密码"
            :rules="[{ validator: checkPwd }]"
          />
          <!-- 检查邮箱改地址 -->
          <van-field
            v-model="userInfo.email"
            clearable
            name="Email"
            placeholder="请输入邮箱地址"
            :rules="[{ validator: checkEmail, message: '请输入邮箱地址' }]"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">
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
import { submitInfo } from 'api/user.js'
import { Toast } from 'vant'
export default {
  name: 'register',
  setup () {
    // '1-开始创建组件-setup'
    const userInfo = reactive({
      name: 'admin',
      password: '123456',
      password_confirmation: '123456',
      email: 'as@as.com'
    })
    const router = useRouter()
    const onClickLeft = () => {
      router.push('/login')
    }
    // 校验规则
    // 校验用户名(^[a-zA-Z]{1}[a-zA-Z\s]{0,20}[a-zA-Z]{1}$)/ James Kevin Wayne Durant Dirk Nowitzki
    // const regName = ref(/(^[a-zA-Z]{1}[a-zA-Z\s]{0,20}[a-zA-Z]{1}$)/)
    // 英文姓名
    const regName = /^[a-zA-Z]{1}[a-zA-Z0-9\s]{2,10}[a-zA-Z0-9]{1}$/
    const validatorUserName = (val) => {
      if (regName.test(val)) {
        return true
      } else if (val.length < 6) {
        return '用户名长度不能少于6个字符'
      } else if (val.length > 12) {
        return '用户名长度不能超过12个字符'
      } else {
        return `${val}不合法，请重新输入！`
      }
    }
    // 校验密码
    // 密码强度校验，最少6位，包括至少1个大写字母，1个小写字母，1个数字
    // 例子Kd@curry666
    const regPwd = /^[A-Za-z0-9]{6,}$/
    const validatorPwd = (val) => {
      if (!val) {
        return '密码不能为空！'
      } else if (regPwd.test(val)) {
        return true
      } else if (val.length < 6) {
        return '密码长度不能少于6个字符'
      } else {
        return '密码必须包含至少一个大小写字符数字'
      }
    }
    // 确认密码
    const checkPwd = (val) => {
      if (!val) {
        return '确认密码不能为空'
      } else if (val === userInfo.password) {
        return true
      } else {
        return '两次输入的密码不一致，请检查'
      }
    }
    // 检查邮箱地址
    const checkEmail = (val) => {
      // 邮箱地址(email)
      // 例子
      // 90203918@qq.com
      // nbilly@126.com
      const regEmail =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      if (!val) {
        return '邮箱地址不能为空'
      } else if (regEmail.test(val)) {
        return true
      } else {
        return '邮箱地址不符合要求，请重新填写'
      }
    }
    // 提交表单
    const onSubmit = () => {
      // console.log(userInfo)
      submitInfo(userInfo)
        .then(
          (res) => {
            // const routers = router
            Toast.success('注册成功')
            // 注册成功后1秒钟跳转
            setTimeout(() => {
              router.push({ path: '/login' })
            }, 1000)
          },
          // 清空注册表信息
          (userInfo.name = ''),
          (userInfo.password = ''),
          (userInfo.password_confirmation = ''),
          (userInfo.email = '')
        )
        .catch((err) => {
          Toast.fail('注册失败')
          console.log(err)
        })
    }
    onBeforeMount(() => {
      // '2.组件挂载页面之前执行----onBeforeMount'
    })
    onMounted(() => {
      // '3.-组件挂载到页面之后执行-------onMounted'
    })
    return {
      userInfo,
      onClickLeft,
      validatorUserName,
      regName,
      validatorPwd,
      checkPwd,
      checkEmail,
      onSubmit
    }
  }
}
</script>
<style scoped lang="less">
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
/deep/ .van-field__control {
  background: var(--color-white-background);
}
</style>
