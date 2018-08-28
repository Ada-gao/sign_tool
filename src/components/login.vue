<template>
  <div class="loginPage" @touchmove.prevent>
    <x-header :left-options="{showBack: false}">登录</x-header>
    <div class="wrapper">
      <group>
        <x-input
          class="borderB-1 user"
          placeholder="请您输入手机号"
          v-model="username"
          :show-clear="clear"
          @on-blur="userChange(username)"
          @on-enter="userChange(username)">
          <i slot="label" class="iconfont">&#xe631;</i>
        </x-input>
        <div class="userTip">{{msgTip}}</div>
        <div class="group">
          <x-input
            class="borderB-1"
            placeholder="请您输入验证码"
            v-model="num"
            :show-clear="clear"
            @on-change="numChange">
            <i slot="label" class="iconfont">&#xe61b;</i>
          </x-input>
          <button class="idt absolute-center-y" @click="getIdentifyingCode" v-show="show">获取验证码</button>
          <span class="btn btn-gray idt absolute-center-y" v-show="!show">{{count}} s</span>
        </div>
      </group>
      <div class="error" >{{errorMsg}}</div>
      <!-- <div class="noError" v-show="!errorTip"></div> -->
      <!-- <x-button class="btn" @click="commit">提交</x-button> -->
      <div class="btn_wrap">
        <x-button type="primary" :disabled="logIn" @click.native="nextStep">登录</x-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { XHeader, XButton, Countdown, XInput, Group } from 'vux'
import { setInterval, clearInterval, setTimeout } from 'timers'
import * as types from 'common/js/types'
import { getVerificationCode, getAuthToken } from '@/service/api/login'
import Vue from 'vue'
import { POINT_CONVERSION_COMPRESSED } from 'constants';

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
      // errorTip: false,
      errorMsg: '',
      msgTip: '',
      clear: false,
      platform: '',
      device: '',
      disabledSend: true
      // telTip: false
      // start: false
    }
  },
  components: {
    XHeader,
    XButton,
    Countdown,
    XInput,
    Group
  },
  mounted () {
    this.$store.commit(types.TITLE, 'Your Repositories')
    const u = navigator.userAgent
    if ((u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) === true) {
      this.platform = 'Android'
    } else if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) === true) {
      this.platform = 'iOS'
    }
  },
  methods: {
    userChange (username) {
      if (/^[0-9]*$/.test(username)) {
        if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(username))) {
          console.log('手机号有误')
          this.telTip = true
          this.msgTip = '您输入的手机号有误'
          this.disabledSend = false
        } else {
          this.userLog = true
          this.disabledSend = true
        }
      } else if (!(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(username))) {
        console.log('邮箱有误')
        this.telTip = true
        this.msgTip = '您输入的邮箱有误'
        this.disabledSend = false
      } else {
        this.userLog = true
        this.disabledSend = true
      }
      setTimeout(() => {
          this.msgTip = ''
          }, 3000)
      // ^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$
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
      // window.JPush.getRegistrationID((id) => {
      //   console.log('getRegistrationID: ' + id)
      // })
      console.log(this.platform, this.device.uuid)
      getAuthToken({
        code: this.num,
        username: this.username,
        platform: this.platform,
        app_version: 'v1.0',
        registration_id: this.device.uuid
      }).then(res => {
        console.log(res)
        if (res.status === 200) {
//          debugger
          this.$store.state.token = res.data.token
          window.localStorage.setItem('token', this.$store.state.token)
//          let queryUrl = this.$router.currentRoute.query
//          let url = ''
          // let name = ''
//          if (queryUrl) {
            // name = queryUrl.Rurl.slice(1) || queryUrl.redirect
//            url = queryUrl.Rurl || queryUrl.redirect
//          } else {
            // name = 'CustomerList'
//            url = 'customerList'
//          }
//          console.log(queryUrl)
          let data = {
            'email': res.data.email,
            'userId': res.data.user_id,
            'mobile': res.data.mobile,
            'name': res.data.name
          }
          window.localStorage.setItem('data', JSON.stringify(data))
//          this.$router.push({path: decodeURIComponent(url)})
          this.$router.push({name: 'HomePage'})
          // this.$router.push({name: name, params: {email: res.data.email, userId: res.data.user_id}})
        } else {
          return false
        }
      })
      .catch(err => {
        if (err) {
          this.errorTip = true
          this.errorMsg = '验证码错误，请重新发送！'
          setTimeout(() => {
            this.errorMsg = ''
          }, 5000)
        }
      })
    },
    getIdentifyingCode () {
      if (this.disabledSend === true) {
        const TIME_COUNT = 60
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
        this.device = Vue.cordova.device
        let obj = {
          username: this.username,
          platform: this.platform,
          app_version: 'v1.0',
          code_flag: 0,
          registration_id: this.device.uuid
        }
        getVerificationCode(obj).then(res => {
          if (res.data.message === '用户不存在') {
            this.msgTip = '用户不存在'
            clearInterval(this.tiemr)
            this.timer = null
            this.show = true
          } else {
            console.log('数据库查看验证码')
          }
        })
        .catch(err => {
          if (err) {
            this.errorMsg = '验证码发送失败'
            clearInterval(this.tiemr)
            this.timer = null
            this.show = true
            setTimeout(() => {
              this.errorMsg = ''
            }, 5000)
          }
        })
      }
    }
  }
}
</script>

<style lang="less">
.loginPage{
  height: 100%;
  font-family: PingFangSC-Regular;
  background: #F5F5F5;
  .spaceAll{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    z-index: 101;
  }
  .wrapper {
    .weui-cells{
      background: #F5F5F5;
    }
    .weui-cells:after,.weui-cells:before{
      border: none;
    }
    .borderB-1{
      width: 650px;
      height: 80px;
      color: #666666;
      margin: 0 auto;
      background: #FFFFFF;
      border: 1px solid #AFAFAF;
      border-radius: 8px;
      font-size: 28px;
      text-indent: 26px;
      .weui-cell__hd{
        i{
          color: #666;
          font-size: 28px;
          margin-right: 0;
        }
      }
    }
    .weui-cell{
      padding: 0;
    }
    .user{
      margin-top: 150px;
      // margin-bottom: 50px;
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
        outline: none;
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
    .userTip{
      text-align: left;
      width: 650px;
      height: 33px;
      line-height: 33px;
      margin: 12px auto;
      font-size: 24px;
      color: #B30000;
    }
    .btn_wrap{
      position: static;
      margin-top: 0px;
      text-align: center;
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
