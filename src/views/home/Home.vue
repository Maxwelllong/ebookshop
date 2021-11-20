<!--home-->
<template>
  <div id="home">
    <div class="header">
      <div class="address"
           @click="toAddress">
        <van-icon name="location-o"
                  size="1.5em"></van-icon>
        <span>四川省...</span>
      </div>
      <div class="searchBar">
        <div class="search"
             @click="searchBtn">
          <van-icon name="search"
                    size="100%"></van-icon>
          <span>请输入您要搜索的图书...</span>
        </div>
      </div>
      <div class="scan">
        <van-icon name="qr"
                  size="30px"></van-icon>
      </div>
    </div>
    <div class="body">
      <!-- tab栏菜单滚动效果 -->
      <home-swiper :banner='banner'></home-swiper>
      <!-- 左右自由滑动功能 -->
      <freedom-swiper :freedom='freedom'></freedom-swiper>
      <!-- 图书分栏切换效果 -->
      <tab-change></tab-change>
    </div>
    <div class="footer">
      <footer-bar></footer-bar>
    </div>
  </div>
</template>
<script>
import { onMounted, ref, computed, reactive, watchEffect } from "vue";
import { useRouter } from 'vue-router'
import { getIndexData } from "api/home";
import homeSwiper from './childComps/Swiper.vue'
import freedomSwiper from './childComps/freedomSwiper.vue'
import tabChange from './childComps/tabChange.vue'
import footerBar from '../profile/footerBar.vue'


export default {
  name: "home",
  components: {
    homeSwiper, freedomSwiper, tabChange, footerBar
  },
  setup () {
    const router = useRouter()
    const banner = ref([])
    const freedom = ref([])
    function searchBtn () {
      router.push('/search')
    };
    function toAddress () {
      router.push('/address')
    };

    onMounted(() => {
      getIndexData().then((res) => {
        // console.log(res);
        freedom.value = res.data.goods.data
        banner.value = res.data.slides
      });

    });
    return {
      searchBtn, toAddress, banner, freedom
    };
  },
};
</script>
<style scoped lang="less">
.header {
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 45px;
  background: var(--color-header-background);
  display: flex;
  justify-items: center;
  .address {
    width: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    span {
      font-size: 0.3em;
    }
  }
  .searchBar {
    flex: 1;
    // background: chocolate;
    line-height: 45px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .search {
      display: flex;
      width: 100%;
      align-items: center;
      padding-left: 10px;
      border: 1px solid #ccc;
      height: 70%;
      border-radius: 50px;
      span {
        font-size: 7px;
      }
    }
  }
  .scan {
    width: 13%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .my-swipe {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
  .van-swipe-item {
    color: #fff;
    background: chartreuse;
  }
}
</style>
