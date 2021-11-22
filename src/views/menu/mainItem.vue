<template>
  <div>
    <van-nav-bar title="菜单">
    </van-nav-bar>
    <div class="main">
      <div class="orderTab">
        <van-tabs v-model="currentTag"
                  @click="tabClick">
          <van-tab title="销量排序"></van-tab>
          <van-tab title="价格排序"></van-tab>
          <van-tab title="评论排序"></van-tab>
        </van-tabs>
      </div>
      <div class="leftMenu">
        <van-sidebar v-model="active">
          <van-collapse v-model="activeName"
                        size='small'
                        accordion>
            <van-collapse-item :title="items.name"
                               v-for="items in leftList"
                               :key="items.id">
              <van-sidebar-item v-for="item in items.children"
                                :key="item.index"
                                :title="item.name"
                                @click="getGoods(item.id)"></van-sidebar-item>
            </van-collapse-item>
          </van-collapse>
        </van-sidebar>
      </div>
      <div class="goodsList">
        <div class="content">
          <van-card v-for="items in showGoods"
                    :key="items.id"
                    :num="items.comments_count"
                    :tag="items.comments_count >= 0 ? '流行' : '标签'"
                    :price="items.price"
                    :desc="items.updated_at"
                    :title="items.title"
                    :thumb="items.cover_url"
                    @click="itemDetail(items.id)"
                    :lazy-load='true' />
        </div>
      </div>
    </div>
    <back-top @bTop='bTop'
              v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import { reactive, ref, toRefs, computed, onBeforeMount, onMounted, nextTick, watchEffect } from 'vue'
import { getLeftMenu, getConData } from 'api/menu.js'
import backTop from 'components/backTop.vue'
import BScroll from 'better-scroll'
import { useRouter } from 'vue-router'
export default {
  name: 'menu',
  components: {
    backTop
  },
  setup () {
    // '1-开始创建组件-setup'
    const data = reactive({})
    const router = useRouter()
    const activeName = ref('1')
    const active = ref(0)
    const tagList = ref(['销量排序', '价格排序', '评论排序'])
    const currentTag = ref(0)
    const leftList = ref([])
    const currentOrder = ref('sales')
    let bscroll = reactive({})
    const isShowBackTop = ref(false)
    const getGoods = (id) => {
      currentTag.value = id
      init()
    }
    const itemDetail = (id) => {
      router.push({ path: '/detail', query: { id } })
    }
    const goods = reactive({
      sales: { page: 1, list: [] },
      price: { page: 1, list: [] },
      comments_count: { page: 1, list: [] }
    })
    const showGoods = computed(() => {
      return goods[currentOrder.value].list
    })
    const init = () => {
      getConData('sales', currentTag.value).then(res => {
        goods.sales.list = res.data.goods.data
      })
      getConData('price', currentTag.value).then(res => {
        goods.price.list = res.data.goods.data
      })
      getConData('comments_count', currentTag.value).then(res => {
        goods.comments_count.list = res.data.goods.data
      })
    }
    const tabClick = function(index) {
      const orders = ['sales', 'price', 'comments_count']
      currentOrder.value = orders[index]
      getConData(orders[index], currentTag.value).then(res => {
        goods[currentOrder.value].list = res.data.goods.data
      })
    }
    onBeforeMount(() => {
      // '2.组件挂载页面之前执行----onBeforeMount'
    })
    onMounted(() => {
      // '3.-组件挂载到页面之后执行-------onMounted'
      getLeftMenu().then(res => {
        console.log(res)
        leftList.value = res.data.categories
      })
      init()
      bscroll = new BScroll(document.querySelector('.goodsList'), {
        probeType: 3, // 0,1,2,3, 3 只要在运行就触发 scroll 事件
        click: true, // 是否允许点击
        pullUpLoad: true // 上拉加载更多，默认 false
      })
      bscroll.on('scroll', position => {
        isShowBackTop.value = -position.y > 300
      })
      bscroll.on('pullingUp', () => {
        getConData(currentOrder.value, currentTag.value).then(res => {
          goods[currentOrder.value].list.push(...res.data.goods.data)
          goods[currentOrder.value].page += 1
        })
        // 完成上拉，等待数据请求完成，将数据展示出来
        bscroll.finishPullUp()
        nextTick(() => {
          bscroll && bscroll.refresh()
        })
      })
    })
    watchEffect(() => {
      nextTick(() => {
        console.log('---')
        bscroll && bscroll.refresh()
        console.log('123321')
        console.log(bscroll)
      })
    })
    // 回到顶部
    const bTop = () => {
      console.log('hello 123')
      bscroll.scrollTo(0, 0, 300)
    }
    return {
      ...toRefs(data),
      router,
      activeName,
      getGoods,
      isShowBackTop,
      bscroll,
      bTop,
      active,
      leftList,
      showGoods,
      currentTag,
      tagList,
      tabClick,
      currentOrder,
      itemDetail
    }
  }
}

</script>
<style scoped lang='less'>
.main {
  position: relative;
}
.orderTab {
  position: fixed;
  // z-index: 100;
  width: 75%;
  height: 44px;
  right: 0;
  background: blue;
}
.leftMenu {
  position: fixed;
  left: 0;
  width: 25%;
  height: 100%;
  background: var(--color-white-background);
}
.goodsList {
  position: fixed;
  z-index: -1000;
  overflow: hidden;
  margin-top: 44px;
  right: 0;
  width: 75%;
  height: 100%;
}
.content {
  display: flex;
  flex-direction: column;
}
/deep/ .van-cell {
  padding: 4px;
}
/deep/ .van-sidebar {
  margin-top: 44px;
  width: 100%;
}
/deep/ .van-sidebar-item {
  padding: 4px;
}
/deep/ .van-collapse-item {
  width: 100%;
}
/deep/ .van-collapse-item__content {
  padding: 2px;
}
/deep/.van-collapse-item__content {
  padding-left: 10px;
}
/deep/.van-sidebar-item--select::before {
  width: 2px;
}
/deep/ .van-tabs {
  height: 44px;
}
/deep/ .van-card:not(:first-child) {
  margin-top: 0;
}
</style>
