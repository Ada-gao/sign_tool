<template>
  <div class="page">
    <x-header :left-options="{showBack: false}">登陆</x-header>
    <div class="wrapper">
      <input type="tel" v-model="tel">
      <input type="number" v-model="num">
      <button class="btn" @click="commit">提交</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { XHeader } from 'vux'

export default {
  data () {
    return {
      tel: null,
      num: null
    }
  },
  components: {
    XHeader
  },
  methods: {
    commit () {
      this.$store.state.isLogin = 100
    }
  }
}
</script>

<style scoped lang="less">
</style>
