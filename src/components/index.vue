<template>
  <div class="index-wrapper">
    <router-view></router-view>
    <tab-bottom></tab-bottom>
  </div>
</template>

<script>
import TabBottom from '@/base/tabBottom/tabBottom'
export default {
  components: {
  	TabBottom
  }
}
</script>

<style lang="less">
  .index-wrapper{
    // height: 100%;
    background-color: #f5f5f5;
  }
</style>
