<template>
  <div class='tabChange'>
    <van-tabs v-model="active"
              color='#fff'
              sticky
              @click="changeMenu"
              offset-top='45px'
              background="#ccc">
      <van-tab :title='item'
               v-for="item in goodsTag"
               :key="item.index">
        <div class='contentBox'>
          <div class="itemBox"
               @click="itemClick(items.id)"
               v-for="items in showGoods"
               :key="items.id">
            <img v-lazy="items.cover_url"
                 :alt="items.description">
            <p>{{items.title}}</p>
            <span><i>￥</i>{{items.price}} 已售 {{items.sales}}本</span>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { reactive, ref, computed, onBeforeMount, onMounted } from 'vue'
import { getGoods } from 'api/home'
import { useRouter } from 'vue-router'
export default {
  name: 'tabChange',
  setup () {
    // '1-开始创建组件-setup'
    const goodsTag = ref(['热销书', '新书', '精选书'])
    const active = ref('')
    const router = useRouter()
    const itemClick = (id) => {
      router.push({ path: '/detail', query: { id: id } })
    }
    const goods = reactive({
      sales: { page: 1, list: [] },
      new: { page: 1, list: [] },
      recommend: { page: 1, list: [] }
    })
    const currentType = ref('sales')
    const showGoods = computed(() => {
      console.log(goods[currentType.value].list)
      return goods[currentType.value].list
    })
    const changeMenu = function(index) {
      const types = ['sales', 'new', 'recommend']
      currentType.value = types[index]
      if (currentType.value == 'sales') {
        getGoods('sales').then(res => {
          goods.sales.list = res.data.goods.data
        })
      } else if (currentType.value == 'new') {
        getGoods('new').then(res => {
          goods.new.list = reg.data.goods.data
        })
      } else if (currentType.value == 'recommend') {
        getGoods('recommend').then(res => {
          goods.recommend.list = res.data.goods.data
          console.log(goods.recommend.list)
        })
      }
    }
    onBeforeMount(() => {
      // '2.组件挂载页面之前执行----onBeforeMount'
    })
    onMounted(() => {
      // '3.-组件挂载到页面之后执行-------onMounted'
      getGoods('sales').then(res => {
        console.log(res)
        goods.sales.list = res.data.goods.data
        // console.log(goods.sales.list);
      })
    })
    return {
      goods, showGoods, getGoods, goodsTag, changeMenu, active, itemClick
    }
  }
}

</script>
<style scoped lang='less'>
/deep/ .van-tab__pane {
  background: #fff;
}
.tabChange {
  margin-bottom: 50px;
}
.contentBox {
  display: flex;
  flex-wrap: wrap;
  .itemBox {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      padding: 10px;
    }
    p,
    span {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: hidden;
    }
  }
}
</style>
