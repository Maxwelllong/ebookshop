<template>
  <div>
    <van-nav-bar
      title="地址管理"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      :disabled-list="disabledList"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script>
import { reactive, ref, toRefs, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAddressList } from 'api/address.js'
export default {
  name: 'Address',
  setup () {
    // '1-开始创建组件-setup'
    const data = reactive({
      list: []
    })
    const chosenAddressId = ref([])
    const router = useRouter()
    const onClickLeft = () => {
      router.back()
    }
    const onAdd = () => {
      console.log('---添加地址---')
      router.push('/myAddress/edit')
    }
    const onEdit = (item) => {
      console.log('---修改地址---')
      router.push({ path: '/myAddress/edit', query: { id: item.id } })
    }
    onMounted(() => {
      // '3.-组件挂载到页面之后执行-------onMounted'
      // 获取地址列表
      getAddressList().then((res) => {
        console.log(res)
        res.data.data.forEach((value) => {
          data.list.push({
            id: value.id,
            tel: value.phone,
            name: value.name,
            address: `${value.province} ${value.city} ${value.county} ${value.address}`,
            isDefault: !!value.is_default
          })
        })
      })
    })
    return {
      ...toRefs(data),
      chosenAddressId,
      onEdit,
      onAdd,
      onClickLeft
    }
  }
}
</script>
<style scoped lang="less"></style>
