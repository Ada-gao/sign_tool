<template>
  <div class="loginPage">
    <x-header :left-options="{showBack: false}">登录</x-header>
    <div class="wrapper">
      <!-- <input class="borderB-1 user" type="tel" v-model="username" placeholder="请输入手机号/邮箱地址"><br> -->
      <el-input
        class="borderB-1 user"
        placeholder="请您输入手机号"
        v-model="username"
        @change="userChange">
        <i slot="prefix" class="el-input__icon iconfont">&#xe631;</i>
      </el-input>
      <div class="group">
        <!-- <input class="borderB-1" type="number" v-model="num" placeholder="请输入验证码"> -->
        <el-input
          class="borderB-1"
          placeholder="请您输入验证码"
          v-model="num"
          @focus="numChange">
          <i slot="prefix" class="el-input__icon iconfont">&#xe61b;</i>
        </el-input>
        <button class="idt absolute-center-y" @click="getIdentifyingCode" v-show="show">获取验证码</button>
        <!-- <countdown class="btn btn-gray idt absolute-center-y" v-model="time1" @on-finish="finish" v-show="!show"></countdown> -->
        <span class="btn btn-gray idt absolute-center-y" v-show="!show">{{count}} s</span>
      </div>
      <div class="error" v-show="errorTip">验证码错误，请重新发送！</div>
      <div class="noError" v-show="!errorTip"></div>
      <!-- <x-button class="btn" @click="commit">提交</x-button> -->
      <div class="btn_wrap">
        <x-button type="primary" :disabled="logIn" @click.native="nextStep">登录</x-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { XHeader, XButton, Countdown } from 'vux'
import { setInterval, clearInterval, setTimeout } from 'timers'
import * as types from 'common/js/types'
import { getVerificationCode, getAuthToken } from '@/service/api/login'

export default {
  data () {
    return {
      username: '',
      num: '',
      // time1: 5,
      show: true,
      count: ' ',
      timer: null,
      logIn: true,
      userLog: false,
      numLog: false,
      errorTip: false
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
    userChange () {
      this.userLog = true
    },
    numChange () {
      this.numLog = true
      if (this.userLog === true && this.numLog === true) {
        this.logIn = false
      }
    },
     nextStep () {
        console.log('click...')
      this.$store.state.token = '100'
      getAuthToken({
        code: this.num,
        username: this.username
      }).then(res => {
        console.log(res)
        if (res.status === 200) {
//          debugger
          this.$store.state.token = res.data.token
          window.localStorage.setItem('token', this.$store.state.token)
          let queryUrl = this.$router.currentRoute.query
          let url = ''
          // let name = ''
          if (queryUrl) {
            // name = queryUrl.Rurl.slice(1) || queryUrl.redirect
            url = queryUrl.Rurl || queryUrl.redirect
          } else {
            // name = 'CustomerList'
            url = 'customerList'
          }
          console.log(queryUrl)
          let data = {
            'email': res.data.email,
            'userId': res.data.user_id
          }
          window.localStorage.setItem('data', JSON.stringify(data))
          this.$router.push({path: decodeURIComponent(url)})
          // this.$router.push({name: name, params: {email: res.data.email, userId: res.data.user_id}})
        } else {
          return false
        }
      })
      .catch(error => {
        console.log(error)
        this.errorTip = true
        setTimeout(() => {
          this.errorTip = false
          }, 5000)
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

<style lang="less">
.loginPage{
  height: 100%;
  font-family: PingFangSC-Regular;
  .wrapper {
    background: #F5F5F5;
    height: 100%;
    text-align: center;
    .user{
      margin-top: 150px;
      margin-bottom: 50px;
    }
    .el-input{
      width: 650px;
      height: 80px;
      color: #666666;
      .el-input__inner{
        width: 100%;
        height: 100%;
        border: 1px solid #AFAFAF;
        border-radius: 8px;
        font-size: 28px;
        text-indent: 66px;
        padding: 0;
      }
      .el-input__prefix{
        left: 26px;
        i{
          color: #666;
          font-size: 28px;
        }
      }
    }
    .btn-gray {
      background-color: #999;
      padding: 0;
    }
    .group {
      position: relative;
      .idt {
        color: #F0F0F0;
        font-size: 20px; /*px*/
        border-radius: 10px;
        width: 156px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        right: 65px;
        box-sizing: border-box;
      }
    }
    .error,.noError{
      text-align: left;
      width: 650px;
      height: 33px;
      line-height: 33px;
      margin: 33px auto;
      font-size: 24px;
      color: #B30000;
    }
    .btn_wrap{
      position: static;
      margin-top: 0px;
      .weui-btn.weui-btn_primary{
        width: 650px;
        height: 80px;
        background: #2A7DC1;
        border-radius: 10px;
        font-size: 28px;
        color: #F0F0F0;
      }
      .weui-btn.weui-btn_primary.weui-btn_disabled{
        background: #999999;
      }
    }
  }
}
</style>
