<template>
  <div>
    <van-nav-bar
      title="购物车"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="cart-box">
      <div class="cart-body">
        <van-checkbox-group v-model="checked">
          <van-swipe-cell>
            <div class="goodsItem">
              <van-checkbox name="a"></van-checkbox>
              <div class="card">
                <div class="img">
                  <img
                    src="https://img.yzcdn.cn/vant/cat.jpeg"
                    alt="商品图片"
                  />
                </div>
                <div class="goodsInfo">
                  <div class="goodsTitle">
                    <p>商品名称</p>
                    <span>商品信息</span>
                  </div>
                  <div class="goodsPrice">
                    <small>￥</small><span>12.00</span>
                  </div>
                </div>
                <div class="goodsNum">
                  <div></div>
                  <van-field name="stepper">
                    <template #input>
                      <van-stepper v-model="stepper" />
                    </template>
                  </van-field>
                </div>
              </div>
            </div>
            <template #right>
              <van-button
                square
                text="删除"
                type="danger"
                class="delete-button"
              />
            </template>
          </van-swipe-cell>
        </van-checkbox-group>
      </div>
      <van-submit-bar
        class="submit-all"
        :price="total * 100"
        @submit="onSubmit"
        button-text="结算"
      >
        <van-checkbox @click="allCheck" v-model="checkAll">全选</van-checkbox>
      </van-submit-bar>

      <div class="empty" v-if="!list.length">
        <img
          class="empty-cart"
          src="~assets/img/empty-car.png"
          alt="空购物车"
        />
        <div class="title">购物车空空如也</div>
        <van-button round color="#1baeae" type="primary" block @click="goTo"
          >前往选购</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount, reactive, onMounted, toRefs } from 'vue'
import { addCart, editCart, selectCart, getCart, deleteCart } from 'api/cart.js'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
export default {
  name: 'shopCart',
  setup () {
    // '1-开始创建组件-setup'
    const checked = ref('1')
    const goodsNum = ref(1)
    const router = useRouter()
    const goods = reactive({
      list: []
    })
    const onClickLeft = () => {
      router.go(-1)
    }
    // 初始化页面数据
    const init = () => {
      // 提醒页面加载
      Toast.loading({ message: '加载中...', forbidClick: true })
      getCart('include="goods"').then((res) => {
        console.log(res)
        goods.list = res.data.data
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
      ...toRefs(goods),
      checked,
      goodsNum,
      onClickLeft,
      router
    }
  }
}
</script>
<style scoped lang="less">
/deep/.van-submit-bar {
  margin-bottom: 50px;
}
.goodsItem {
  display: flex;
  margin: 5px;
  .van-checkbox {
    padding: 0 5px;
  }
  .card {
    display: flex;
    width: 100%;
    justify-content: space-between;
    .img {
      width: 100px;
      margin: 0 5px;
      border: 1px solid #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .goodsInfo {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      .goodsTitle p {
        font-size: 17px;
      }
      .goodsTitle span {
        font-size: 12px;
      }
    }
    .goodsNum {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .van-cell {
        padding: 0;
      }
    }
  }
}
.empty {
  width: 50%;
  margin: 0 auto;
  text-align: center;
  margin-top: 200px;
  .empty-cart {
    width: 150px;
    margin-bottom: 20px;
  }
  .van-icon-smile-o {
    font-size: 50px;
  }
  .title {
    font-size: 16px;
    margin-bottom: 20px;
  }
}
</style>
