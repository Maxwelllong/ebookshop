<template>
  <div class='backTop'
       @click="backTop"></div>
</template>
<script>
export default {
  name: 'backTop',
  setup (props, { emit }) {
    // '1-开始创建组件-setup'
    return {
      backTop: () => {
        emit('bTop')
      }
    }
  }
}

</script>
<style scoped lang='less'>
.backTop {
  position: fixed;
  width: 35px;
  height: 35px;
  background: url("~assets/img/up.png") no-repeat center center;
  box-shadow: 3px 3px 3px #888;
  bottom: 60px;
  right: 10px;
  border-radius: 50%;
}
</style>
