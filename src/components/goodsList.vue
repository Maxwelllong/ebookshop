<template>
  <!-- 商品列表 -->
  <div class="goods">
    <div class='itemStyle'
         v-for="item in currentType"
         :key="item.index">
      <div class="goods-item"
           @click="itemClick(item.id)">
        <img :src="item.cover_url"
             alt="" />
        <div class="goods-info">
          <p>{{ item.title }}</p>
          <span class="price"><small>￥</small>{{ item.price }}</span>
          <span class="collect"><i class="iconfont icon-shoucang1"></i>
            {{ item.collects_count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router' // 1-2 引入路由器
export default {
  name: 'GoodsList',
  props: ['currentType'],
  setup () {
    const router = useRouter() // 1-3 声明路由器
    return {
      itemClick: (id) => {
        router.push({ path: '/Detail', query: { id } })
      }
    }
  },

  components: {}
}
</script>

<style lang="less" scoped>
.goods {
  display: flex;
  flex-wrap: wrap; // 自动换行
  justify-content: space-around; // 环绕
  padding: 0px;
  width: 100%;
  .goods-item {
    width: 40%;
    padding-bottom: 40px;
    position: relative; // 内层，相对外层定位
    img {
      width: 100%;
      border-radius: 5px;
    }

    .goods-info {
      font-size: 12px;
      position: absolute;
      bottom: 5px;
      left: 0; // 左右为 0 内容就会居中
      right: 0; // 左右为 0 内容就会居中
      overflow: hidden; // 超出范围隐藏
      text-align: center;

      p {
        overflow: hidden; // 标题超出范围隐藏
        text-overflow: ellipsis; // 文本超出范围显示 ...
        white-space: nowrap; // 文本不进行换行
        margin-bottom: 3px;
      }

      .price {
        color: red;
        margin-right: 20px;
      }

      .collect {
        position: relative;
      }
    }
  }
}
</style>
