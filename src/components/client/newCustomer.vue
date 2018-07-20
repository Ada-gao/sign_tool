<template>
  <div class="newCustomer">
    <x-header :left-options="{backText: '', preventGoBack:true}"
              @on-click-back="toLink">新增潜客</x-header>
    <div class="wrapper">
      <group>

        <div class="add_tit">
          <i class="iconfont">&#xe62c;</i>
          <span style="color: #2672ba">客户信息</span>
        </div>
        <div class="space"></div>
        <mt-field disableClear
                  label="客户姓名："
                  placeholder="输入客户姓名"
                  v-model="name"
                  class="new_field new_field_bb ipt"></mt-field>
        <div class="radio_box new_field" style="border:0">
          <mt-radio
            class="radio_item"
            title="国籍："
            v-model="nationality"
            @change="selectNation"
            :options="[{label: '中国', value: '0'}, {label: '其他', value: '1'}]">
          </mt-radio>
        </div>
        <x-address id="x_address"
                   v-show="num === '0'"
                   :title="title"
                   v-model="value"
                   raw-value
                   :list="addressData"
                   @on-shadow-change="onShadowChange"
                   @on-hide="onHide"
                   placeholder="请选择您的城市"></x-address>
        <mt-field disableClear
                  type="wechat"
                  label="(选填)微信："
                  placeholder="输入客户微信"
                  v-model="wechat"
                  class="new_field ipt"></mt-field>
        <mt-field disableClear
                  type="email"
                  label="(选填)邮箱："
                  placeholder="输入客户邮箱"
                  v-model="email"
                  class="new_field ipt"></mt-field>
      </group>
      <group>
        <mt-field disableClear
                  type="tel"
                  label="手机号码："
                  placeholder="输入客户手机号码"
                  :attr="{ maxlength: 11 }"
                  v-model="mobile"
                  class="new_field ipt">
          <span class="verificate"
                v-if="!verificate.isTimeout"
                @click="sendVer">发送邀请码</span>
          <span class="verificate"
                v-else>{{verificate.num}}s</span>
        </mt-field>
        <mt-field disableClear
                  type="tel"
                  label="客户邀请码："
                  :attr="{ maxlength: 6 }"
                  v-model="verificate.code"
                  class="new_field ipt">
        </mt-field>
      </group>
      <button class="next" @click="submitCustomer">确 定</button>
    </div>
    </div>
</template>

<script>
  import {
    XHeader,
    Group,
    XInput,
    XButton,
    XAddress,
    XDialog,
    ChinaAddressV4Data
  } from 'vux'
  import {Field, Radio} from 'mint-ui'
  import {addCusomer, sendVerCode, confirmVercode} from '@/service/api/customers'
  import {mobileValidate, toast, emailValidate} from '@/common/js/filter'

  export default {
    name: 'NewCustomer',
    components: {
      XHeader,
      Group,
      XDialog,
      XInput,
      XButton,
      XAddress,
      'mt-field': Field,
      'mt-radio': Radio
    },
    data () {
      return {
        verificate: {
          timer: null,
          num: 60,
          isTimeout: false,
          code: ''
        },
        alertCont: '',
        num: '0',
//        isMod: -1,
        name: '',
        nationality: '0',
        mobile: '',
        wechat: '',
        email: '',
        city: '',
        newCity: '',
        mobile_validated: '1',
        validated_by: '',
        title: '常住中国城市',
        value: [],
        addressData: ChinaAddressV4Data
      }
    },
    methods: {
      toLink () {
        this.$router.push({name: 'CustomerList', params: {mark: 0}})
      },
      sendVer () {
        if (!this.mobile || !mobileValidate(this.mobile).stat) {
          this.alertCont = '请输入有效的手机号码'
          toast(this.alertCont)
          return false
        }
        let params = {
          username: this.mobile,
          code_flag: 1
        }
        sendVerCode(params).then(res => {
          this.verificate.isTimeout = true
        })
        this.verificate.timer = setInterval(() => {
          --this.verificate.num
          if (this.verificate.num === 0) {
            this.verificate.isTimeout = false
            this.verificate.num = 60
            clearInterval(this.verificate.timer)
          }
        }, 1000)
      },
      onHide (stat) {
        if (stat) {
          this.newCity = this.city
        } else {
          this.newCity = ''
        }
      },
      onShadowChange (ids, names) {
//        this.names = names.join()
//        this.myAddressProvince = names[0]
//        this.myAddressCity = names[1]
        this.city = names[1] === '市辖区' ? names[0] : names[1]
      },
      selectNation (num) {
        this.num = num
        this.value = ['', '', '']
        this.myAddressProvince = this.myAddressCity = this.myAddresscounty = ''
        this.newCity = this.city = ''
      },
      submitCustomer () {
        let params = {
          name: this.name,
          nationality: this.num === '1' ? '1' : '0',
          mobile: this.mobile,
          email: this.email,
          wechat: this.wechat,
          city: this.newCity,
          mobile_validated: this.mobile_validated,
          validated_by: this.validated_by,
          client_class: null
        }
        console.log(params)
        if (!params.name) {
          this.alertCont = '请输入客户姓名'
          if (!params.mobile) {
            this.alertCont = '请输入客户姓名，手机号码'
          } else if (!mobileValidate(params.mobile).stat) {
            this.alertCont = '请输入客户姓名，有效的手机号码'
          }
        } else {
          if (!params.mobile) {
            this.alertCont = '请输入手机号码'
          } else if (!mobileValidate(params.mobile).stat) {
            this.alertCont = '请输入有效的手机号码'
          }
        }
        if (!params.name ||
            !params.mobile ||
            !mobileValidate(params.mobile).stat) {
          toast(this.alertCont)
          return false
        } else if (params.email) {
          if (!emailValidate(params.email).stat) {
            this.alertCont = '请输入正确的邮箱'
            toast(this.alertCont)
            return false
          }
        }
        if (params.nationality === '0' && params.city === '') {
          this.alertCont = '城市不能为空'
          toast(this.alertCont)
          return false
        }
        let params1 = {
          code: this.verificate.code,
          mobile: this.mobile
        }
        if (params1.code) {
          confirmVercode(params1).then(res => {
            if (res.status === 200) {
              params.mobile_validated = this.mobile_validated = res.data.mobile_validated
              params.validated_by = this.validated_by = res.data.validated_by
              params.client_class = res.data.client_class
              this.verificate.code = ''
              addCusomer(params).then(res => {
                if (res.status === 200) {
                  this.$router.push({name: 'CustomerList', params: {mark: 1}})
                }
              })
            }
          })
        } else {
          delete params.mobile_validated
          delete params.validated_by
          delete params.client_class
          addCusomer(params).then(res => {
            if (res.status === 200) {
              this.$router.push({name: 'CustomerList', params: {mark: 2}})
            }
          })
        }
      }
    }
  }
</script>

<style lang="less">
  .alert_message {
    color: #cd0000;
    margin-top: 10px;
    padding-left: 20px;
  }
  .newCustomer {
    .wrapper {
      height: auto;
      .weui-label {
        font-size: 30px;
        color: #333;
      }
      .weui-cell__bd {
        text-align: right;
      }
      .new_field {
        height: 82px;
        padding: 0 20px;
        border-top: 1px solid #d9d9d9;
        .mint-cell-wrapper {
          padding: 0;
        }
        .mint-cell-title {
          font-family: PingFangSC-Medium;
          color: #333;
          font-size: 30px;
          width: auto;
        }
        .mint-field-core {
          text-align: right;
          font-size: 30px;
          color: #666;
        }
        .mint-field-state {
          display: none;
        }
      }
      .space {
        height: 15px;
        background-color: #f5f5f5;
      }
      .radio_box {
          padding: 0 20px;
          background-color: #fff;
          height: 82px;
          .mint-radiolist.radio_item{
            height: 100%;
            .mint-radiolist-title{
              display: inline-block;
              line-height: 81px;
              vertical-align: top;
              padding: 0;
            }
            .mint-cell{
              display: inline-block;
              margin-top: 1px;
              .mint-radio-label {
                font-size: 28px;
                color: #666;
              }
            }
          }
          // .radio_item.mint-radiolist .mint-cell:nth-of-type(1) {
          //   left: 197px;
          // }
          .radio_item.mint-radiolist .mint-cell:nth-of-type(2) {
            margin-left: 172px;
          }
          .radio_item.mint-radiolist .mint-cell:last-child {
            background-image: none;
          }
          .radio_item {
            .mint-radiolist-title {
              font-family: PingFangSC-Medium;
              font-size: 30px;
              width: 150px;
              color: #333;
              line-height: 42px;
              padding: 18px 0 10px;
              margin: 0;
            }
            .mint-radio-core {
              width: 28px;
              height: 28px;
              border-radius: 8px;
              border-color: #979797;
            }
            .mint-radio-input:checked + .mint-radio-core {
              background-color: #fff;
              border-color: #2672BA;
            }
            .mint-radio-input:checked + .mint-radio-core::after {
              background-color: #2672BA;
            }
            .mint-radio-core::after {
              width: 16px;
              height: 16px;
            }
          }
          .mint-cell-wrapper {
            /*padding-top: 22px;*/
            background-image: none;
            -webkit-background-image: none;
          }
        }
        .add_tit {
          padding-left: 20px;
          height: 80px;
          line-height: 80px;
          i, span {
            vertical-align: middle;
            display: inline-block;
          }
        }
        #x_address {
          border-top: 1px solid #d9d9d9;
          .weui-cells {
            .weui-cell {
              padding: 0 20px;
            }
          }
        }
        .weui-cell {
          padding-left: 20px;
          padding-right: 20px;
        }
        .popup-picker .weui-cell {
          height: 84px;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          padding: 0 20px;
          .weui-cell__hd{
            font-family: PingFangSC-Medium;
          }
          .vux-cell-primary {
            font-size: 28px;
            padding-right: 15px;
            position: relative;
            color: #999;
            // right: -60px;
            .vux-popup-picker-select{
              .vux-popup-picker-value.vux-cell-value, .vux-popup-picker-placeholder.vux-cell-placeholder{
                color: #666;
              }
            }
          }
      }
      // padding-top: 126px;
      .weui-cells .vux-x-input {
        height: 84px;
        box-sizing: border-box;
        padding: 0 20px;
        button {
          width: 138px;
          height: 62px;
          font-size: 28px;
          background-color: #eee;
          color: #666;
          border-radius: 10px;
        }
      }
      .vux-x-input.weui-cell:before {
        border-top: 1px solid #D9D9D9; /*no*/
      }
      // .weui-cell:after {
      //   border-bottom: 1px solid #D9D9D9; /*no*/
      // }
      .mint-popup {
        width: 100%;
      }
      .confirm_picker {
        height: 40px;
        line-height: 40px;
        width: 80px;
        font-size: 24px;
        border: none;
      }
      .new_field_bb {
        border-bottom:1px solid #d9d9d9;
      }
    }
    .wrapper:nth-child(3) {
      padding-top: 20px;
    }
    .next {
      display: block;
      width: 710px;
      height: 72px;
      line-height: 72px;
      font-size: 28px;
      color: #fff;
      border-radius: 10px;
      background-color: #2672BA;
      margin: 0 auto;
      margin-top: 120px;
    }
  }
</style>
