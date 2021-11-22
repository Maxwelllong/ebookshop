<template>
  <div>
    <van-swipe :loop='false'
               height='100px'
               :show-indicators="false"
               :width="80">
      <van-swipe-item v-for="item in freedom"
                      :key="item.id">
        <div class='swiperCon'>
          <a href="javascript:;"
             @click="itemClick(item.id)">
            <img :src="item.cover_url"
                 :alt="item.description">
            <p>{{item.title}}</p>
          </a>

        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'freedomSwiper',

  props: {
    freedom: {
      type: Array,
      default () {
        return []
      }
    }
  },
  setup () {
    // '1-开始创建组件-setup'
    const data = reactive({})
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
    return {
      ...toRefs(data), router, itemClick
    }
  }
}

</script>
<style scoped lang='less'>
/deep/ .van-swipe {
  background: #fff;
}
.swiperCon p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 10px;
}
</style>
