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
import { XHeader, XButton, Countdown, XInput, Group } from 'vux'
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
      registrationId: '',
      clearAll: true
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
    registJPush () {
    },
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
      console.log('getStore registrationId :' + getStore('registrationId'))
      getAuthToken({
        code: this.num,
        username: this.username,
        platform: this.platform === 'iOS' ? 2 : 1,
        app_version: 'v1.0',
        registration_id: getStore('registrationId')
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
          clearInterval(this.tiemr)
          this.timer = null
          this.show = true
          setTimeout(() => {
            this.errorMsg = ''
          }, 5000)
        }
      })
    },
    getIdentifyingCode () {
      this.registJPush()
      // window.JPush.getRegistrationID((id) => {
      //   this.registrationId = id
      // })
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
            clearInterval(this.tiemr)
            this.timer = null
            this.show = true
            setTimeout(() => {
              this.msgTip = ''
            }, 3000)
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
    },
    storeDict () {
      getDict().then(res => {
        const arr1 = res.data.find(item => item.type === 'appointment_status')
        const arr2 = res.data.find(item => item.type === 'refund_status')
        const arr3 = res.data.find(item => item.type === 'gender_type')
        const arr4 = res.data.find(item => item.type === 'education_type')
        const arr5 = res.data.find(item => item.type === 'id_type')
        const arr6 = res.data.find(item => item.type === 'marriage_status')
        const arr7 = res.data.find(item => item.type === 'product_status')
        const arr8 = res.data.find(item => item.type === 'certification_status')
        const arr9 = res.data.find(item => item.type === 'certification_type')
        const arr10 = res.data.find(item => item.type === 'client_type')
        const arr11 = res.data.find(item => item.type === 'client_class')
        const arr12 = res.data.find(item => item.type === 'status')
        const arr13 = res.data.find(item => item.type === 'realname_status')
        const arr14 = res.data.find(item => item.type === 'product_risk_level')
        const arr15 = res.data.find(item => item.type === 'risk_level')
        const arr16 = res.data.find(item => item.type === 'nationality')
        const arr17 = res.data.find(item => item.type === 'client_from')
        const arr18 = res.data.find(item => item.type === 'mobile_validated')
        const arr19 = res.data.find(item => item.type === 'auth_status')
        const arr20 = res.data.find(item => item.type === 'appointment_picture_type')
        const arr21 = res.data.find(item => item.type === 'express_type')
        const arr22 = res.data.find(item => item.type === 'fail_audit_type')
        const arr23 = res.data.find(item => item.type === 'transc_status')
        const arr24 = res.data.find(item => item.type === 'investment_horizon_unit')
        const arr25 = res.data.find(item => item.type === 'relevance_type')
        const arr26 = res.data.find(item => item.type === 'buying_crowds')
        const arr27 = res.data.find(item => item.type === 'interest_payment')
        const arr28 = res.data.find(item => item.type === 'dimission_reason')
        const arr29 = res.data.find(item => item.type === 'lock')
        const arr30 = res.data.find(item => item.type === 'share_channel')
        const arr31 = res.data.find(item => item.type === 'share_type')
        const arr32 = res.data.find(item => item.type === 'preserve_expired')
        const arr33 = res.data.find(item => item.type === 'mask_code')
        const arr34 = res.data.find(item => item.type === 'data_scope')
        const arr35 = res.data.find(item => item.type === 'platform')
        const arr36 = res.data.find(item => item.type === 'activity_type')
        const arr37 = res.data.find(item => item.type === 'activity_signin_status')
        const arr38 = res.data.find(item => item.type === 'activity_status')
			  localStorage.setItem('appointmentStatus', JSON.stringify(arr1.dict)) // 订单状态
			  localStorage.setItem('refundStatus', JSON.stringify(arr2.dict)) // 退款状态
			  localStorage.setItem('genderType', JSON.stringify(arr3.dict)) // 性别
			  localStorage.setItem('educationType', JSON.stringify(arr4.dict)) // 教育程度
			  localStorage.setItem('idType', JSON.stringify(arr5.dict)) // 证件类型
			  localStorage.setItem('marriageStatus', JSON.stringify(arr6.dict)) // 婚姻状态
			  localStorage.setItem('productStatus', JSON.stringify(arr7.dict)) // 产品状态
			  localStorage.setItem('certificationStatus', JSON.stringify(arr8.dict)) // 投资者认证状态
			  localStorage.setItem('certificationType', JSON.stringify(arr9.dict)) // 申请认证类型
			  localStorage.setItem('clientType', JSON.stringify(arr10.dict)) // 客户认证类型
			  localStorage.setItem('clientClass', JSON.stringify(arr11.dict)) // 客户类别
			  localStorage.setItem('status', JSON.stringify(arr12.dict)) // 用户状态
			  localStorage.setItem('realnameStatus', JSON.stringify(arr13.dict)) // 实名认证状态
			  localStorage.setItem('productRiskLevel', JSON.stringify(arr14.dict)) // 产品风险等级
			  localStorage.setItem('riskLevel', JSON.stringify(arr15.dict)) // 客户风险偏好
			  localStorage.setItem('nationality', JSON.stringify(arr16.dict)) // 国籍
			  localStorage.setItem('clientFrom', JSON.stringify(arr17.dict)) // 客户来源
			  localStorage.setItem('mobileValidated', JSON.stringify(arr18.dict)) // 手机号是否验证过
			  localStorage.setItem('authStatus', JSON.stringify(arr19.dict)) // 密钥状态
			  localStorage.setItem('appointmentPictureType', JSON.stringify(arr20.dict)) // 材料类型
			  localStorage.setItem('expressType', JSON.stringify(arr21.dict)) // 合同寄出方式
			  localStorage.setItem('failAuditType', JSON.stringify(arr22.dict)) // 不通过审核类型
			  localStorage.setItem('transcStatus', JSON.stringify(arr23.dict)) // 交易状态类别
			  localStorage.setItem('investmentHorizonUnit', JSON.stringify(arr24.dict)) // 投资期限单位
			  localStorage.setItem('relevanceType', JSON.stringify(arr25.dict)) // 产品关联类型
			  localStorage.setItem('buyingCrowds', JSON.stringify(arr26.dict)) // 购买人群
			  localStorage.setItem('interestPayment', JSON.stringify(arr27.dict)) // 付息方式
			  localStorage.setItem('dimissionReason', JSON.stringify(arr28.dict)) // 离职原因
			  localStorage.setItem('lock', JSON.stringify(arr29.dict)) // 账户锁定状态
			  localStorage.setItem('shareChannel', JSON.stringify(arr30.dict)) // 分享渠道
			  localStorage.setItem('shareType', JSON.stringify(arr31.dict)) // 分享类型
			  localStorage.setItem('preserveExpired', JSON.stringify(arr32.dict)) // 保护期是否过期
			  localStorage.setItem('maskCode', JSON.stringify(arr33.dict)) // 脱敏显示数据
			  localStorage.setItem('dataScope', JSON.stringify(arr34.dict)) // 数据权限
			  localStorage.setItem('platform', JSON.stringify(arr35.dict)) // 平台
			  localStorage.setItem('activityType', JSON.stringify(arr36.dict)) // 活动类型
			  localStorage.setItem('activitySigninStatus', JSON.stringify(arr37.dict)) // 活动报名签到状态
			  localStorage.setItem('activityStatus', JSON.stringify(arr38.dict)) // 活动状态
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
