<!--home-->
<template>
  <div id='home'>
    <van-nav-bar title="ebook" />
  </div>
</template>
<script>
export default {
  name: 'home',
  setup () {
    const onClickLeft = () => history.back()
    return {
      onClickLeft
    }
  }
}
</script>
<style scoped>
</style>
