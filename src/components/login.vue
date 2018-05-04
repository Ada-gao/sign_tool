<template>
  <div class="page">
    <x-header :left-options="{showBack: false}">登陆</x-header>
    <div class="wrapper">
      <input class="borderB-1" type="tel" v-model="username" placeholder="请输入手机号/邮箱地址"><br>
      <div class="group">
        <input class="borderB-1" type="number" v-model="num" placeholder="请输入验证码">
        <button class="idt absolute-center-y" @click="getIdentifyingCode" v-show="show">获取验证码</button>
        <!-- <countdown class="btn btn-gray idt absolute-center-y" v-model="time1" @on-finish="finish" v-show="!show"></countdown> -->
        <span class="btn btn-gray idt absolute-center-y" v-show="!show">{{count}} s</span>
      </div>
      <!-- <x-button class="btn" @click="commit">提交</x-button> -->
      <div class="btn_wrap">
        <x-button type="primary" @click.native="nextStep">提交</x-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { XHeader, XButton, Countdown } from 'vux'
import { setInterval, clearInterval } from 'timers'
import * as types from 'common/js/types'
import { getVerificationCode, getAuthToken } from '@/service/api/login'

export default {
  data () {
    return {
      username: 'zhuangyinping@shuyun365.com',
      num: '',
      // time1: 5,
      show: true,
      count: ' ',
      timer: null
      // start: false
    }
  },
  components: {
    XHeader,
    XButton,
    Countdown
  },
  mounted () {
    this.$store.commit(types.TITLE, 'Your Repositories')
  },
  methods: {
     nextStep () {
      this.$store.state.token = '100'
      getAuthToken({
        code: this.num,
        username: this.username
      }).then(res => {
        if (res.status === 200) {
          debugger
          this.$store.state.token = res.data.token
          window.localStorage.setItem('token', this.$store.state.token)
          let queryUrl = this.$router.currentRoute.query
          let url = ''
          if (queryUrl) {
            url = queryUrl.Rurl || queryUrl.redirect
          } else {
            url = 'customerList'
          }
          console.log(queryUrl)
          this.$router.push({path: decodeURIComponent(url)})
        } else {
          return false
        }
      })
    },
    getIdentifyingCode () {
      const TIME_COUNT = 5
      if (!this.timer) {
        this.count = TIME_COUNT
        this.show = false
        this.tiemr = setInterval(() => {
          if (this.count > 0) {
            this.count--
          } else {
            this.show = true
            clearInterval(this.tiemr)
            this.timer = null
          }
        }, 1000)
      }
      // let domain = document.domain === 'localhost' ? '10.60.2.141' : document.domain
      getVerificationCode(this.username).then(res => {
        console.log('数据库查看验证码')
      })
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
    width: 100%;
  }
  .btn-gray {
    width: 165px;
    background-color: #999;
    color: #fff;
    text-align: center;
    height: 60px;
    box-sizing: border-box;
  }
  .borderB-1 {
    border-bottom: 1px solid #eee; /*no*/
  }
  .group {
    position: relative;
    .idt {
      font-size: 26px; /*px*/
      border-radius: 6px;
      padding: 14px 18px;
      right: 40px;
      height: 60px;
      box-sizing: border-box;
    }
  }
}
</style>
