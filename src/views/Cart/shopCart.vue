<template>
  <div>
    <van-nav-bar title="购物车">
    </van-nav-bar>
    <div class="body">
      <div class="slideItem">
        <van-field name="checkbox">
          <template #input>
            <van-checkbox v-model="checked"
                          shape="square" />
            <div class="goodsInfo">
              <div class="Img">
                <img src="https://img.yzcdn.cn/vant/cat.jpeg"
                     alt="">
              </div>
              <div class="info">
                <div class="left">
                  <div class='goodhead'>
                    <p>商品标题</p>
                    <span>商品信息</span>
                  </div>
                  <span><small>￥</small><span>12.00</span></span>
                </div>
                <div class="right">
                  <van-field name="stepper">
                    <template #input>
                      <van-stepper v-model="goodsNum" />
                    </template>
                  </van-field>
                </div>
              </div>
            </div>
          </template>
        </van-field>

      </div>
    </div>
    <div>
      <!-- 订单提交页 -->
      <van-submit-bar :price="3050"
                      button-text="提交订单"
                      @submit="onSubmit">
        <van-checkbox v-model="checked"></van-checkbox> &nbsp;全选
        <template #tip>
          你的收货地址不支持配送, <span @click="onClickLink">修改地址</span>
        </template>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount, onMounted } from 'vue'
export default {
  name: 'shopCart',
  setup () {
    // '1-开始创建组件-setup'
    const checked = ref('1')
    const goodsNum = ref(1)
    onBeforeMount(() => {
      // '2.组件挂载页面之前执行----onBeforeMount'
    })
    onMounted(() => {
      // '3.-组件挂载到页面之后执行-------onMounted'
    })
    return {
      checked, goodsNum
    }
  }
}

</script>
<style scoped lang='less'>
/deep/.van-submit-bar {
  margin-bottom: 50px;
}
/deep/ .van-card {
  display: flex;
  align-content: space-between;
  width: 100%;
}
/deep/.goods-card {
  display: flex;
  background: rgba(0, 0, 0, 0);
  justify-content: space-between;
  flex-direction: column;
}
/deep/.van-card__header {
  display: flex;
  align-items: space-between;
}
/deep/.van-radio__icon {
  margin: 3px;
}
/deep/.van-checkbox {
  border-radius: 10px;
  background: #fff;
  border: 1px solid #ccc;
}
/deep/ .van-checkbox__icon .van-icon {
  border: none;
}
/deep/.van-stepper {
  width: 80px;
  .van-stepper__minus,
  .van-stepper__plus,
  .van-stepper__input {
    width: 20px;
  }
}

.swipItem {
  display: flex;
  margin: 0 10px;
  flex-direction: row;
  align-items: center;
}
.goodsInfo {
  width: 100%;
  margin-left: 10px;
  display: flex;
  .Img {
    width: 30%;
    overflow: hidden;
    border-radius: 15px;
    padding: 5px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .info {
    width: 70%;
    display: flex;
    align-content: space-between;
    .left {
      flex: 7;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      span {
        font-size: 4px;
      }
    }
    .right {
      position: relative;
      flex: 3;
      .van-cell {
        padding: 0;
        width: 200px;
        position: absolute;
        bottom: 4px;
        margin-right: 20px;
      }
    }
  }
}
</style>
