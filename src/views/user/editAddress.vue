<template>
  <div>
    <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-address-edit
      :area-list="areaList"
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import { reactive, toRefs, ref, onBeforeMount, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { areaList } from '@vant/area-data'
import {
  editAddress,
  deleteAddress,
  addAddress,
  getAddressDetail
} from 'api/address.js'
import { Toast } from 'vant'
export default {
  name: 'editAddress',
  setup () {
    // '1-开始创建组件-setup'
    const router = useRouter()
    const route = useRoute()
    const data = reactive({
      type: 'add',
      title: '添加地址',
      areaList: areaList,
      searchResult: [],
      addressInfo: {}
    })
    const isEdit = ref(false)
    const onClickLeft = () => {
      router.go(-1)
    }

    const title = computed(() => {
      return isEdit.value ? '修改地址' : '添加地址'
    })
    const onSave = (data) => {
      const params = {
        name: data.name,
        phone: data.tel,
        province: data.province,
        city: data.city,
        county: data.county,
        address: data.addressDetail,
        is_default: data.isDefault ? 1 : 0
      }
      console.log('--isEdit---')
      console.log(isEdit.value)
      if (isEdit.value) {
        editAddress(route.query.id, params).then((res) => {
          if (res.status < 400) {
            Toast.success('修改成功')
            setTimeout(() => {
              router.go(-1)
            }, 1000)
          } else {
            // 存储用户地址信息
            addAddress(params).then((res) => {
              console.log(res)
              if (res.status === 201) {
                Toast.success('添加成功')
              }
              setTimeout(() => {
                router.push('/myAddress')
              }, 1000)
            })
          }
        })
      }
    }
    const onDelete = () => {}
    const onChangeDetail = () => {}

    onBeforeMount(() => {
      // '2.组件挂载页面之前执行----onBeforeMount'
      console.log('---route query---')
      console.log(route.query)
    })
    onMounted(() => {
      // '3.-组件挂载到页面之后执行-------onMounted'
      if (route.query.id) {
        isEdit.value = true
        getAddressDetail(route.query.id).then((res) => {
          // 获取需要修改用户地址信息
          console.log('修改用户信息')
          console.log(res)
          const { province, city, county } = res
          data.addressInfo = {
            name: res.name,
            tel: res.phone,
            province,
            city,
            county,
            addressDetail: res.address,
            isDefault: !!res.is_default
          }
        })
      }
    })
    return {
      ...toRefs(data),
      onClickLeft,
      onSave,
      onDelete,
      isEdit,
      onChangeDetail,
      title
    }
  }
}
</script>
<style scoped lang="less"></style>
