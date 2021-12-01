<!--detail-->
<template>
  <div>
    <van-nav-bar
      title="商品详情"
      left-text="返回"
      left-arrow
      fixed
      @click-left="onClickLeft"
    />
    <van-image
      width="100%"
      style="margin-top: 45px"
      height="70%"
      :src="detail.cover_url"
    />
    <van-card
      style="text-align: left"
      :num="detail.stock"
      :price="detail.price + '.00'"
      :desc="detail.description"
      :title="detail.title"
    >
      <template #tags>
        <van-tag plain type="danger">新书</van-tag>
        <van-tag v-if="detail.is_recommend == 1" plain type="danger"
          >推荐</van-tag
        >
      </template>
      <template #footer>
        <van-button type="danger" @click="handleAddCart">加入购物车</van-button>
        <van-button type="warning" @click="goToCart">立即购买</van-button>
      </template>
    </van-card>
    <!-- 立即购买弹出框 -->
    <van-popup
      v-model:show="isShow"
      position="bottom"
      :style="{ height: '45%' }"
    >
      <h4>商品分类信息</h4>
    </van-popup>
    <!-- 标签 -->
    <van-tabs v-model:active="active" offset-top="45px" sticky>
      <van-tab title="概述">
        <div class="content" v-html="detail.details"></div>
      </van-tab>
      <van-tab title="热评">
        <div class="content" v-html="detail.details"></div>
      </van-tab>
      <van-tab title="相关图书">
        <div class="content">
          <goods-list :currentType="like_goods" />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import {
  ref,
  onMounted,
  reactive,
  computed,
  WatchEffect,
  nextTick,
  toRefs
} from 'vue'
import { getDetail } from '../../api/detail.js'
import { addCart } from 'api/cart.js'
import GoodsList from '@/components/goodsList'
import { useRoute, useRouter } from 'vue-router'
import { Toast, Notify } from 'vant'

export default {
  name: 'Detail',
  components: {
    GoodsList
  },
  setup () {
    const route = useRoute()
    const Id = ref(0)
    const isShow = ref(false)
    const router = useRouter()
    const Books = reactive({
      detail: {},
      like_goods: [],
      comments: []
    })
    const onClickLeft = () => {
      router.go(-1)
    }
    // 添加购物车
    const handleAddCart = () => {
      console.log('添加购物车')
      const isToken = window.sessionStorage.getItem('token')
      if (!isToken) {
        Notify('您没有登录，请登录')
        router.push('/login')
      }
      addCart({ goods_id: Books.detail.id, num: 1 }).then((res) => {
        console.log(res)
        if (res.status === 201 || res.status === 204) {
          Toast.success({ message: '添加成功', position: 'top' })
        }
      })
    }
    // 立即购买
    const goToCart = () => {
      console.log('立即购买')
      isShow.value = true
    }
    onMounted(() => {
      Id.value = route.query.id
      getDetail(Id.value).then((res) => {
        Books.detail = res.data.goods
        Books.like_goods = res.data.like_goods
        Books.comments = res.data.comments
      })
    })
    return {
      Id,
      ...toRefs(Books),
      onClickLeft,
      handleAddCart,
      goToCart,
      isShow
    }
  }
}
</script>
<style scoped lang="less">
/deep/ .van-card {
  margin-top: -4px;
}
.content {
  padding: 10px;
  margin-bottom: 50px;
  img {
    max-width: 100%;
    height: auto;
  }
}
</style>
