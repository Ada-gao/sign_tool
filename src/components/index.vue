<template>
  <div class="index-wrapper">
    <tab-bottom></tab-bottom>
    <router-view></router-view>
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
</style>
