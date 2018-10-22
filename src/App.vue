<template>
  <div id="app">
    <!-- <tab-bottom v-show="$route.meta.navShow"></tab-bottom> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件 -->
      </router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件 -->
    </router-view>
  </div>
</template>

<script>
import TabBottom from '@/base/tabBottom/tabBottom'
import Vue from 'vue'
export default {
  name: 'App',
  components: {
  	TabBottom
  },
  watch: {
    $route (to, from) {
      console.log(to)
      console.log(from)
      if (to.path.includes('HomePage')) {
        Vue.cordova.statusBar && Vue.cordova.statusBar.styleDefault()
        console.log(Vue.cordova.statusBar)
      } else {
        console.log('不是首页')
        Vue.cordova.statusBar && Vue.cordova.statusBar.styleBlackTranslucent()
      }
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  // color: #666;
  height: 100%;
}
</style>
