<template>
  <div id="app">
    <tab-bottom v-show="$route.meta.navShow"></tab-bottom>
    <router-view/>
  </div>
</template>

<script>
import TabBottom from '@/base/tabBottom/tabBottom'
export default {
  name: 'App',
  components: {
  	TabBottom
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
  color: #666;
  height: 100%;
}
</style>
