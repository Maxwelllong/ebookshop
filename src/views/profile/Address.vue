<!--address-->
<template>
  <div>
    <van-area title="请选择地址"
              :area-list="areaList"
              @confirm='selected'
              @cancel='back'
              value="110101" />
  </div>
</template>
<script>
import { areaList } from '@vant/area-data';
import { reactive } from '@vue/reactivity'
import { useRouter } from 'vue-router'
export default {
  name: 'address',
  setup () {
    const router = useRouter()
    function back () {
      router.back(-1)
    }
    function selected () {
    }
    const state = reactive({
      areaList: [],
      value: 'selectAdress'
    })
    return { back, selected, state, areaList }
  }
}
</script>
<style scoped>
</style>