<template>
  <div class="homeSwiper">
    <van-swipe :autoplay="6000"
               class="swiperStyle"
               indicator='#ccc'
               lazy-render>
      <van-swipe-item v-for="item in banner"
                      :key="item.id"
                      @click="itemClick(item.id)">
        <img class='imgStyle'
             v-lazy="item.img_url" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'homeSwiper',
  props: {
    // 接收来自父组件的数据
    banner: Array
  },
  setup () {
    // '1-开始创建组件-setup'
    const data = reactive({

    })
    const router = useRouter()
    const itemClick = (id) => {
      router.push({ path: '/detail', query: { id: id } })
    }
    onBeforeMount(() => {
      // '2.组件挂载页面之前执行----onBeforeMount'
    })
    onMounted(() => {
      // '3.-组件挂载到页面之后执行-------onMounted'
    })
    // 修改轮播图样式
    const themeVars = {
      SwipeIndicatorsWidth: 20,
      SwipeIndicatorsOpacity: 1,
      SwiperIndicatorsBackground: '#fff'
    }
    return {
      ...toRefs(data),
      themeVars,
      itemClick
    }
  }
}

</script>
<style scoped lang='less'>
.homeSwiper {
  background: var(--color-grayground);
  padding-top: 45px;
}
.swiperStyle {
  width: 100%;
  height: auto !important;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  .imgStyle {
    height: 100%;
  }
}
/deep/ .van-swipe__indicator {
  width: 100px;
  border-radius: 5px;
  padding: 3px;
}
/deep/ .van-swipe__indicators {
  position: absolute;
  bottom: var(--van-swipe-indicator-margin);
  left: 10%;
  background: #ccc;
  width: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transform: translateX(-50%);
}
</style>
