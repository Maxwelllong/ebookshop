<template>
  <div>
    <van-swipe :loop='false'
               height='100px'
               :show-indicators="false"
               :width="80">
      <van-swipe-item v-for="item in freedom"
                      :key="item.id">
        <div class='swiperCon'>
          <a href="javascript:;">
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
export default {
  name: '',
  props: {
    freedom: {
      type: Array,
      default () {
        return []
      }
    }
  },
  setup () {
    //'1-开始创建组件-setup'
    const data = reactive({})
    onBeforeMount(() => {
      //'2.组件挂载页面之前执行----onBeforeMount'
    })
    onMounted(() => {
      //'3.-组件挂载到页面之后执行-------onMounted'
    })
    return {
      ...toRefs(data),
    }
  },
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