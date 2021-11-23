<template>
  <div class='goods'>
    <div v-for="item in currentType"
         :key="item.id"
         @click="itemClick(item.id)"
         class='goodsItem'>
      <img :src="item.cover_url"
           alt="">
      <div class='footer'>
        <span><small>￥</small>{{item.price}}</span>
        <span>
          <van-icon name="star-o"
                    @click='changeStyle' />{{item.collects_count}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { onBeforeRouteUpdate, useRouter } from 'vue-router'

export default {
  name: '',
  props: ['currentType'],
  // 参数发生变化更新视图

  setup () {
    // '1-开始创建组件-setup'
    const data = reactive({})
    const router = useRouter()
    onBeforeRouteUpdate((to, from, next) => {
      itemClick()
    })
    const itemClick = (id) => {
      router.push({ path: '/detail', query: { id } })
    }
    const changeStyle = function() {
      const iconStyle = document.querySelector('.footer')
      console.log(iconStyle)
    }
    return {
      ...toRefs(data),
      changeStyle,
      itemClick
    }
  }
}

</script>
<style scoped lang='less'>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background: var(--color-white-background);
}
.goodsItem {
  width: 45%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  img {
    width: 100%;
  }
  .footer {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  .van-icon {
    margin-right: 5px;
  }
}
</style>
