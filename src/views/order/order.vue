<!-- 订单页面 -->
<template>
  <div>
    <van-nav-bar
      title="标题"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="body">
      <div class="left">
        <div class="info">
          <span>{{ address.name }}</span
          ><br />
          <span>{{ address.phone }}</span>
        </div>
        <div class="address">
          {{ address.province }}/{{ address.city }}/{{ address.county }}/{{
            address.address
          }}
        </div>
      </div>
      <div class="right" @click="goto"><van-icon name="arrow" /></div>
    </div>
    <hr />
    <div class="goods">
      <van-swipe-cell v-for="item in cartList" :key="item.index">
        <van-card
          :num="item.num"
          :price="item.goods.price"
          :title="item.goods.title"
          class="goods-card"
          :thumb="item.goods.cover_url"
        />
      </van-swipe-cell>
    </div>
    <van-submit-bar
      :price="total * 100"
      button-text="提交订单"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { orderPreview, createOrder } from 'api/order.js'
import { Toast } from 'vant'
export default {
  name: 'orders',
  setup () {
    // '1-开始创建组件-setup'
    const data = reactive({
      cartList: [],
      address: {}
    })
    const router = useRouter()
    const onClickLeft = () => {
      router.go(-1)
    }
    const init = () => {
      Toast.loading({ message: '加载中...', forbidClick: true })
      orderPreview().then((res) => {
        console.log(res)
        data.cartList = res.data.carts
        const _address = res.data.address.filter((n) => n.is_default === 1)
        if (_address.length === 0) {
          data.address = {
            address: '还没有默认地址，请选择或填写默认地址信息'
          }
        } else {
          data.address = _address[0]
        }
        Toast.clear()
      })
    }
    // 选择或填写地址
    const goto = () => {
      router.push({ path: '/address' })
    }
    const total = computed(() => {
      let sum = 0
      data.cartList.forEach((item) => {
        sum += parseInt(item.num) * parseFloat(item.goods.price)
      })
      return sum
    })
    const onSubmit = () => {
      // 提交订单
      const params = {
        address_id: data.address.id
      }
      createOrder(params).then((res) => {
        console.log(res)
        if (res.status === 200) {
          Toast.success('提交成功')
        }
      })
    }
    onBeforeMount(() => {
      // '2.组件挂载页面之前执行----onBeforeMount'
    })
    onMounted(() => {
      // '3.-组件挂载到页面之后执行-------onMounted'
      init()
    })
    return {
      ...toRefs(data),
      init,
      onClickLeft,
      goto,
      total,
      onSubmit
    }
  }
}
</script>
<style scoped lang="less">
.body {
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 70px;
    margin-left: 8px;
  }
  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
  }
}

.goods-card {
  margin: 0;
  background-color: white;
}

.delete-button {
  height: 100%;
}
</style>
