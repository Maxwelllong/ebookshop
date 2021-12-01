<template>
  <div class="userInfo">
    <van-nav-bar title="用户信息"></van-nav-bar>
    <div class="header">
      <div class="infoBar">
        <div class="Img">
          <img :src="user.avatar_url" alt="用户头像" />
        </div>
        <div class="info">
          <p>
            昵称：<span>{{ user.name }}</span>
          </p>
          <p>
            登录名：<span>{{ user.email }}</span>
          </p>
          <p>个性签名：<span>时间是把杀猪刀</span></p>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="tabItem" @click="goTo('/collection')">
        <p>我的收藏</p>
        <van-icon name="arrow" />
      </div>
      <div class="tabItem" @click="goTo('/order')">
        <p>我的订单</p>
        <van-icon name="arrow" />
      </div>
      <div class="tabItem" @click="goTo('/setting')">
        <p>我的账号管理</p>
        <van-icon name="arrow" />
      </div>
      <div class="tabItem" @click="goTo('/myAddress')">
        <p>地址管理</p>
        <van-icon name="arrow" />
      </div>
      <div class="tabItem" @click="goTo('/aboutUs')">
        <p>关于我们</p>
        <van-icon name="arrow" />
      </div>
      <div class="button">
        <van-button type="warning" @click="toLogout" block>退出登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { logout, getUser } from 'api/user.js'
import { Toast } from 'vant'
export default {
  name: 'userInfo',
  setup () {
    // '1-开始创建组件-setup'
    const data = reactive({
      user: {},
      isLogin: false
    })
    const router = useRouter()
    const goback = () => {
      router.go(-1)
    }
    // 退出
    const toLogout = () => {
      logout().then((res) => {
        console.log(res)
        if (res.status === 204) {
          Toast.success('退出成功')
          window.sessionStorage.clear('token')
          router.push('/login')
        }
      })
    }
    const goTo = (path, queryInfo) => {
      router.push({ path, query: queryInfo || {} })
    }
    onBeforeMount(() => {
      // '2.组件挂载页面之前执行----onBeforeMount'
    })
    onMounted(() => {
      // '3.-组件挂载到页面之后执行-------onMounted'
      getUser().then((res) => {
        data.user = res.data
        console.log(data.user)
      })
    })
    return {
      ...toRefs(data),
      goback,
      toLogout,
      goTo
    }
  }
}
</script>
<style scoped lang="less">
.header {
  padding: 10px;
  .infoBar {
    background: #fff;
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    border-radius: 10px;
    .Img {
      width: 100px;
      padding: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 70px;
        height: 70px;
        border-radius: 10px;
      }
    }
    .info {
      flex: 1;
      display: flex;
      justify-content: center;
      flex-direction: column;
      p {
        margin: 2px;
        font-size: 15px;
        span {
          font-size: 14px;
        }
      }
    }
  }
}
.body {
  .tabItem {
    display: flex;
    justify-content: space-between;
    padding: 20px 10px;
  }
  .button {
    position: absolute;
    bottom: 100px;
    padding: 10px;
    width: 100%;
    /deep/ .van-button {
      border-radius: 30px;
    }
  }
}
</style>
