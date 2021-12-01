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
        <van-checkbox-group v-model="isShecked" @change="isSelectGroup">
          <van-swipe-cell v-for="(item, index) in list" :key="index">
            <!-- 商品信息 -->
            <div class="goodsItem">
              <van-checkbox :name="item.id"></van-checkbox>
              <div class="card">
                <div class="img">
                  <img :src="item.goods.cover_url" alt="商品图片" />
                </div>
                <div class="goodsInfo">
                  <div class="goodsTitle">
                    <p>{{ item.goods.title }}</p>
                    <span>商品信息</span>
                  </div>
                  <div class="goodsPrice">
                    <small style="color: red">￥</small
                    ><span>{{ item.goods.price }}</span>
                  </div>
                </div>
                <div class="goodsNum">
                  <div></div>
                  <van-field name="stepper">
                    <template #input>
                      <van-stepper
                        v-model="item.num"
                        :min="1"
                        :max="item.goods.stock"
                        :name="item.goods_id"
                        async-change
                        @change="onChange"
                      />
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
                @click="deleteGoods(item.id)"
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
        <van-button round color="#1baeae" type="primary" block @click="gotoShop"
          >前往选购</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount, reactive, onMounted, toRefs, computed } from 'vue'
import { editCart, getCart, deleteCart } from 'api/cart.js'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
export default {
  name: 'shopCart',
  setup () {
    // '1-开始创建组件-setup'
    const goodsNum = ref(1)
    const router = useRouter()
    const goods = reactive({
      list: [],
      isShecked: [], // 选中的Id
      checkAll: false
    })
    const isSelectGroup = (res) => {
      if (res.length === goods.list.length) {
        goods.checkAll = true
      } else {
        goods.checkAll = false
      }
    }
    // 返回按钮
    const onClickLeft = () => {
      router.go(-1)
    }
    // 没有商品列表，去购物按钮
    const gotoShop = () => {
      router.push('/')
    }
    // 购物车数量发生变化与后台进行同步
    const onChange = (value, detail) => {
      Toast.loading({ message: '请稍后...', forbidClick: true })
      console.log('修改数量')
      console.log(value)
      console.log('detail值')
      console.log(detail)
      editCart(detail.name, { num: value }).then((res) => {
        goods.list.forEach((item) => {
          if (item.id === detail.name) {
            item.num = value
          }
        })
        Toast.clear()
      })
      goods.list.forEach((item) => {
        if (item === detail.name) {
          item.num = value
        }
      })
    }
    // 删除商品
    const deleteGoods = (id) => {
      console.log(id)
      console.log('删除商品ID:' + id)
      deleteCart(id).then((res) => {
        init() // 重新初始化
      })
    }
    // 提交订单
    const onSubmit = () => {
      console.log('提交订单')
      if (goods.isShecked.length === 0) {
        Toast.fail('未选择商品！')
      } else {
        router.push({ path: '/createorder' })
      }
    }
    // 计算求和
    const total = computed(() => {
      let sum = 0
      // 过滤掉没有选中的商品 再求和
      console.log('商品列表')
      console.log(goods.list)
      console.log('商品列表')
      goods.list
        .filter((item) => {
          // console.log(item)
          return goods.isShecked.includes(item.id)
        })
        .forEach((item) => {
          sum += parseInt(item.num) * parseFloat(item.goods.price)
          // console.log('总价' + sum)
        })
      console.log('共计' + sum)
      return sum
    })
    // 全选
    const allCheck = () => {
      goods.checkAll = !goods.checkAll
      if (!goods.checkAll) {
        goods.isShecked = goods.list.map((item) => {
          return item.id
        })
      } else {
        goods.isShecked = []
        goods.checkAll = false
      }
    }
    // 初始化页面数据
    const init = () => {
      // 提醒页面加载
      Toast.loading({ message: '加载中...', forbidClick: true })
      getCart('include=goods').then((res) => {
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
      onChange,
      goodsNum,
      onClickLeft,
      gotoShop,
      onSubmit,
      total,
      isSelectGroup,
      allCheck,
      deleteGoods
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
        font-size: 13px;
        padding: 5px 0;
      }
      .goodsTitle span {
        font-size: 12px;
        margin-left: 5px;
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
.delete-button {
  height: 100%;
  width: 50px;
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
