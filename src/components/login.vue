<template>
  <div class="page">
    <x-header :left-options="{showBack: false}">登陆</x-header>
    <div class="wrapper">
      <input type="tel" v-model="tel" placeholder="请输入手机号/邮箱地址"><br>
      <input type="number" v-model="num" placeholder="请输入验证码">
      <button class="idt">获取验证码</button>
      <!-- <x-button class="btn" @click="commit">提交</x-button> -->
      <div class="btn_wrap" :class="isPosition ? 'position' : ''">
        <x-button type="primary" @click.native="nextStep">提交</x-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { XHeader, XButton } from 'vux'

export default {
  data () {
    return {
      tel: null,
      num: null,
      isPosition: false
    }
  },
  components: {
    XHeader,
    XButton
  },
  methods: {
    nextStep () {
      this.$store.state.isLogin = 100
      console.log(this.$router.currentRoute)
      let queryUrl = this.$router.currentRoute.query
      let url = ''
      if (queryUrl) {
        url = this.$router.currentRoute.query.Rurl
      } else {
        url = 'customerList'
      }
      // let url = this.$router.currentRoute.query.Rurl
      this.$router.push({path: decodeURIComponent(url)})
    }
  }
}
</script>

<style scoped lang="less">
.wrapper {
  input {
    border: none;
    height: 107px;
    font-size: 30px; /*px*/
    text-indent: 60px;
  }
  .idt {
    font-size: 26px; /*px*/
    border-radius: 6px;
    padding: 16px 18px;
  }
}
</style>
