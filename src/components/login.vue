<template>
  <div class="login-page" @touchmove="touchScreen">
    <!-- <x-header :left-options="{showBack: false}">登录</x-header> -->
    <!-- <div class="wrapper"> -->
      <div class="title">
        <div class="welcome">欢迎登录</div>
        <div class="slogan">签单更轻松 工作更从容</div>
      </div>
      <div class="edit">
        <div class="username">
          <i class="iconfont vertical-align">&#xe60b;</i>
          <mt-field style="display: inline-block" class="vertical-align" placeholder="请输入手机号或邮箱" :disableClear="clearAll" @blur.native.capture="userChange(username)" v-model="username"></mt-field>
        </div>
        <div class="user-tip">{{msgTip}}</div>
        <div class="num">
          <i class="iconfont vertical-align">&#xe612;</i>
          <mt-field style="display: inline-block" class="vertical-align" placeholder="请输入验证码" :disableClear="clearAll" v-model="num" @focus.native.capture="numChange"></mt-field>
          <button class="send right text-center" @click="getIdentifyingCode" v-show="show">发送验证码</button>
          <span class="count right text-center" v-show="!show">{{count}}s后重新发送</span>
        </div>
        <div class="error" >{{errorMsg}}</div>
      </div>
      <mt-button :disabled="logIn" class="login" @click.native="nextStep">登 录</mt-button>
      <!-- <group>
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
      <div class="btn_wrap">
        <x-button type="primary" :disabled="logIn" @click.native="nextStep">登录</x-button>
      </div> -->
    <!-- </div> -->
  </div>
</template>

<script type="text/ecmascript-6">
import { XHeader, XButton, XInput, Group } from 'vux'
import { setInterval, clearInterval, setTimeout } from 'timers'
import * as types from 'common/js/types'
import { getVerificationCode, getAuthToken, getDict } from '@/service/api/login'
// import { getTags } from '@/service/api/mineJPush'
import Vue from 'vue'
import { getStore } from '@/config/mUtils'

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
      disabledSend: true,
      registrationId: getStore('registrationId'),
      clearAll: true,
      timeout: 60
      // tempCount: 0,
      // leavePageNum: 0
      // telTip: false
      // start: false
    }
  },
  components: {
    XHeader,
    XButton,
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
    touchScreen () {
      Array.from(document.querySelectorAll("input[type='text']")).map(item => {
        item.blur()
      })
    },
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
      if (username === '') {
        console.log('未输入')
        this.telTip = true
        this.msgTip = '请输入手机号或邮箱'
        this.disabledSend = false
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
      this.$store.state.token = '100'
      getAuthToken({
        code: this.num,
        username: this.username,
        platform: this.platform === 'iOS' ? 2 : 1,
        app_version: 'v1.0',
        registration_id: window.localStorage.getItem('registrationId')
      }).then(res => {
        if (res.status === 200) {
          this.$store.state.token = res.data.token
          window.localStorage.setItem('token', this.$store.state.token)
          this.storeDict()
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
            'name': res.data.name,
            'gender': res.data.gender
          }
          window.localStorage.setItem('data', JSON.stringify(data))
//          this.$router.push({path: decodeURIComponent(url)})
          this.$router.push({name: 'HomePage'})
          // this.$router.push({name: name, params: {email: res.data.email, userId: res.data.user_id}})
          // 获取用户tags
          // getTags().then(res => {
          //   if (!res.tags) return
          //   window.JPush.setTags({ sequence: 1, tags: [].concat(res.tags) }, (result) => {
          //     console.log(tags)
          //   }, (error) => {
          //     console.log(error)
          //   })
          // })
        } else {
          return false
        }
      })
      .catch(err => {
        if (err) {
          this.errorTip = true
          this.errorMsg = '验证码错误，请重新发送！'
          clearInterval(this.timer)
          this.timer = null
          this.show = true
          setTimeout(() => {
            this.errorMsg = ''
          }, 5000)
        }
      })
    },
    getIdentifyingCode () {
      window.JPush.getRegistrationID((id) => {
        window.localStorage.setItem('registrationId', id)
      })
      if (!this.disabledSend) return
      const TIME_COUNT = 60
      if (!this.timer) {
        this.count = TIME_COUNT
        this.show = false
        this.timer = setInterval(() => {
          if (this.count > 0) {
            this.count--
          } else {
            this.show = true
            this.timer = null
            clearInterval(this.timer)
          }
        }, 1000)
      }
      // let domain = document.domain === 'localhost' ? '10.60.2.141' : document.domain
      this.device = Vue.cordova.device
      // 浏览器环境拿不到设备号处理。
      let uuid = ''
      if (this.device) uuid = this.device.uuid
      let obj = {
        username: this.username,
        platform: this.platform,
        app_version: 'v1.0',
        code_flag: 0,
        registration_id: uuid
      }
      getVerificationCode(obj).then(res => {
        if (res.data.code === 404) {
          this.msgTip = res.data.message
          clearInterval(this.timer)
          this.timer = null
          this.show = true
          setTimeout(() => {
            this.msgTip = ''
          }, 3000)
        } else {
          // console.log('数据库查看验证码')
        }
      })
      .catch(err => {
        if (err) {
          this.errorMsg = '验证码发送失败'
          clearInterval(this.timer)
          this.timer = null
          this.show = true
          setTimeout(() => {
            this.errorMsg = ''
          }, 5000)
        }
      })
      // }
    },
    storeDict () {
      getDict().then(res => {
        res.data.forEach(item => {
          localStorage.setItem(item.type, JSON.stringify(item.dict))
        })
      })
    }
  }
}
</script>

<style lang="less">
@import "../common/style/variable.less";
// @import "../common/style/base.less";
.login-page{
  height: 100%;
  background: #fff;
  padding-top: 185px;
  .title{
    padding-left: 99px;
    margin-bottom: 199px;
    .welcome{
      font-family: @font-family-M;
      font-size: 48px;/*px*/
      color: #2D2D2B;
      margin-bottom: 37px;
      line-height: 67px;
    }
    .slogan{
      font-family: @font-family-R;
      font-size: @font-size-thirtyT;/*px*/
      color: @font-color-999;
      line-height: 45px;
    }
  }
  .edit{
    width: 650px;
    margin: 0 auto;
    margin-bottom: 150px;
    .username, .num{
      border-bottom: 1px solid #DADADA;/*no*/
      .iconfont{
        color: #DADADA;
        font-size: 33px;/*px*/
      }
      .mint-cell.mint-field{
        background-image: none;
      }
      .right{
        position: absolute;
        right: 0;
        border-radius: 4px;/*no*/
        font-size: @font-size-twentyS;/*px*/
        font-family: @font-family-R;
      }
      .send{
        width: 170px;
        height: 54px;
        border: 1px solid #BD9D62;/*no*/
      }
      .count{
        width: 228px;
        height: 54px;
        line-height: 54px;
        background: #FFFFFF;
        border: 1px solid #B0B0B0;/*no*/
        color: #B0B0B0;
      }
    }
    .num{
      position: relative;
      margin-top: 50px;
    }
    .user-tip, .error{
      position: absolute;
      // text-align: left;
      /*width: 650px;*/
      // width: 86.67%;
      // height: 33px;
      line-height: 50px;
      // margin: 12px auto;
      font-size: 24px;/*px*/
      color: @font-color-red;
    }
  }
  // .spaceAll{
  //   position: absolute;
  //   top: 0;
  //   width: 100%;
  //   height: 100%;
  //   background: transparent;
  //   z-index: 101;
  // }
  // .wrapper {
  //   .weui-cells{
  //     background: #F5F5F5;
  //   }
  //   .weui-cells:after,.weui-cells:before{
  //     border: none;
  //   }
  //   .borderB-1{
  //     /*width: 650px;*/
  //     width: 86.67%;
  //     height: 80px;
  //     color: #666666;
  //     margin: 0 auto;
  //     background: #FFFFFF;
  //     border: 1px solid #AFAFAF;
  //     border-radius: 8px;
  //     font-size: 28px;
  //     text-indent: 26px;
  //     .weui-cell__hd{
  //       i{
  //         color: #666;
  //         font-size: 28px;
  //         margin-right: 0;
  //       }
  //     }
  //   }
  //   .weui-cell{
  //     padding: 0;
  //   }
  //   .user{
  //     margin-top: 150px;
  //     // margin-bottom: 50px;
  //   }
  //   .btn-gray {
  //     background-color: #999;
  //     padding: 0;
  //   }
  //   .group {
  //     position: relative;
  //     .idt {
  //       color: #F0F0F0;
  //       font-size: 20px; /*px*/
  //       border-radius: 10px;
  //       width: 156px;
  //       height: 50px;
  //       line-height: 50px;
  //       text-align: center;
  //       right: 65px;
  //       box-sizing: border-box;
  //       outline: none;
  //     }
  //   }
  //   .error,.noError{
  //     text-align: left;
  //     /*width: 650px;*/
  //     width: 86.67%;
  //     height: 33px;
  //     line-height: 33px;
  //     margin: 33px auto;
  //     font-size: 24px;
  //     color: #B30000;
  //   }
  //   .userTip{
  //     text-align: left;
  //     /*width: 650px;*/
  //     width: 86.67%;
  //     height: 33px;
  //     line-height: 33px;
  //     margin: 12px auto;
  //     font-size: 24px;
  //     color: #B30000;
  //   }
  //   .btn_wrap{
  //     position: static;
  //     text-align: center;
  //     padding: 0;
  //     margin: 0 auto;
  //     margin-top: 0px;
  //     width: 86.67%;
  //     .weui-btn.weui-btn_primary{
  //       /*width: 650px;*/
  //       width: 100%;
  //       height: 80px;
  //       background: #2A7DC1;
  //       border-radius: 10px;
  //       font-size: 28px;
  //       color: #F0F0F0;
  //     }
  //     .weui-btn.weui-btn_primary.weui-btn_disabled{
  //       background: #999999;
  //     }
  //   }
  // }
}
</style>
