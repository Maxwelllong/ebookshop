<!--入口文件-->
<template>
  <div id='App'>
    <router-view />
    <tab-bar v-if='$route.meta.isShow'></tab-bar>
  </div>
</template>
<script>
import tabBar from './views/profile/footerBar.vue'
export default {
  name: 'App',
  components: {
    tabBar
  }
  // setup () {
  //   const getInfo = () => {
  //     console.log($route.meta.isShow)
  //   }
  //   return {
  //     getInfo
  //   }
  // }
}
</script>
<style scoped>
@import "assets/css/base.css";
</style>
