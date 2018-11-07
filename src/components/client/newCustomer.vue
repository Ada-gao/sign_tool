<template>
  <div class="newCustomer">
    <x-header :left-options="{backText: '', preventGoBack:true}"
              @on-click-back="toLink">新增客户</x-header>
    <div class="wrapper">
      <group>
        <div class="space"></div>
        <div class="add_tit">
          <span class="border_left"></span>
          <span class="text">客户信息</span>
        </div>
        <div class="warn">
          <span class="tit">提示：</span>
          <span>信息提交后，不可修改。为避免实名认证失败，请确保姓名准确!</span>
        </div>
        <div class="must_fill">
          <i class="iconfont necessary_icon">&#xe8d4;</i>
          <mt-field disableClear
                    label="客户姓名："
                    placeholder="请输入客户姓名"
                    v-model="name"
                    class="new_field ipt "></mt-field>
          <div class="bb"></div>
        </div>
        <div class="must_fill">
          <div class="radio_box new_field" style="border:0">
            <i class="iconfont necessary_icon">&#xe8d4;</i>
            <mt-radio
              class="radio_item"
              title="国籍："
              v-model="nationality"
              @change="selectNation"
              :options="[{label: '中国', value: '0'}, {label: '其他', value: '1'}]">
            </mt-radio>
          </div>
          <div class="bb"></div>
        </div>
        <div class="must_fill" v-if="num === '0'">
          <i class="iconfont necessary_icon">&#xe8d4;</i>
          <x-address id="x_address"
                     :title="title"
                     v-model="value"
                     raw-value
                     :list="addressData"
                     @on-shadow-change="onShadowChange"
                     @on-hide="onHide"
                     placeholder="请选择城市"></x-address>
          <div class="bb"></div>
        </div>
        <mt-field disableClear
                  type="wechat"
                  label="微信："
                  placeholder="请输入微信号"
                  v-model="wechat"
                  class="new_field ipt"></mt-field>
        <div class="bb"></div>
        <mt-field disableClear
                  type="email"
                  label="邮箱："
                  placeholder="请输入邮箱"
                  v-model="email"
                  class="new_field ipt"></mt-field>
      </group>
      <div class="space"></div>
      <group>
        <div class="must_fill">
          <i class="iconfont necessary_icon">&#xe8d4;</i>
          <mt-field disableClear
                    type="tel"
                    label="手机号码："
                    placeholder="请输入手机号"
                    :attr="{ maxlength: 11 }"
                    v-model="mobile"
                    class="new_field ipt tal">
          </mt-field>
        </div>
        <div class="bb"></div>
        <mt-field disableClear
                  type="tel"
                  label="客户邀请码："
                  placeholder="请输入邀请码"
                  :attr="{ maxlength: 6 }"
                  v-model="verificate.code"
                  class="new_field ipt tal">
          <span class="verificate"
                v-if="!verificate.isTimeout"
                @click="sendVer">发送邀请码</span>
          <span class="verificate1"
                v-else>{{verificate.num}}秒后重新发送</span>
        </mt-field>
      </group>
      <button class="next" @click="submitCustomer">提 交</button>
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
                  if (res.data.mobile_validated === '0') {
                    this.$router.push({name: 'CustomerList', params: {mark: 1}})
                  } else if (res.data.mobile_validated === '1') {
                    this.$router.push({name: 'CustomerList', params: {mark: 2}})
                  }
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
              toast('添加成功')
              if (res.data.mobile_validated === '0') {
                this.$router.push({name: 'CustomerList', params: {mark: 1}})
              } else if (res.data.mobile_validated === '1') {
                this.$router.push({name: 'CustomerList', params: {mark: 2}})
              }
            }
          })
        }
      }
    }
  }
</script>

<style lang="less">
  @import '../../common/style/variable';
  .alert_message {
    color: #cd0000;
    margin-top: 10px;
    padding-left: 20px;
  }
  .newCustomer {
    font-family: PingFangSC-Regular;
    .wrapper {
      height: auto;
      .warn{
        font-size: 26px;
        color: #A0A0A0;
        padding: 0 24px;
        .tit{
          color: #F05D59;
        }
      }
      .weui-label {
        font-size: 30px;
        color: #4a4a4a;
      }
      .weui-cell__bd {
        text-align: right;
      }
      .weui-cells {
        .new_field {
          height: 110px;
          padding: 0 40px;
          /*border-top: 1px solid #d9d9d9;*/
          .mint-cell-wrapper {
            padding: 0;
          }
          .mint-cell-title {
            font-family: PingFangSC-Regular;
            color: #333;
            font-size: 30px;
            width: auto;
            height: 100%;
          }
          .mint-field-core {
            font-family: PingFangSC-Medium;
            text-align: right;
            font-size: 30px;
            color: #4a4a4a;
          }
          .mint-field-state {
            display: none;
          }
        }
        .tal {
          .mint-field-core {
            text-align: left;
          }
        }
      }
      .space {
        height: 15px;
        background-color: #f5f5f5;
      }
      .radio_box {
          padding: 0 40px;
          background-color: #fff;
          height: 110px;
          .mint-radiolist.radio_item{
            height: 100%;
            position: relative;
            .mint-radiolist-title{
              display: inline-block;
              line-height: 110px;
              vertical-align: top;
              padding: 0;
            }
            .mint-cell{
              display: inline-block;
              margin-top: 1px;
              position: absolute;
              /*float: right;*/
              .mint-radio-label {
                font-size: 28px;
                color: #4a4a4a;
                font-family: PingFangSC-Medium;
              }
            }
          }
          .radio_item.mint-radiolist .mint-cell:nth-of-type(1) {
             right: 200px;
          }
          .radio_item.mint-radiolist .mint-cell:nth-of-type(2) {
            right: 0;
          }
          .radio_item.mint-radiolist .mint-cell:last-child {
            background-image: none;
          }
          .radio_item {
            .mint-radiolist-title {
              font-size: 30px;
              width: 150px;
              color: #333;
              line-height: 42px;
              padding: 18px 0 10px;
              margin: 0;
              color: #4a4a4a;
            }
            .mint-radiolist-label {
              margin-top: -6px;
            }
            .mint-radio-core {
              width: 28px;
              height: 28px;
              border-radius: 100%;
              border: 1px solid #979797;/*no*/
            }
            .mint-radio-input:checked + .mint-radio-core {
              background-color: #fff;
              border-color: #2672BA;
            }
            .mint-radio-core::after {
              width: 16px;
              height: 16px;
            }
          }
          .mint-cell-wrapper {
            background-image: none;
            -webkit-background-image: none;
          }
        }
        .popup-picker .weui-cell {
          height: 110px;
          padding: 0 40px;
          .weui-cell__hd{
          }
          .vux-cell-primary {
            font-size: 28px;
            padding-right: 15px;
            position: relative;
            color: #999;
            // right: -60px;
            .vux-popup-picker-select{
              .vux-popup-picker-value.vux-cell-value {
                color: #4a4a4a;
                font-family: PingFangSC-Medium;
              }
              .vux-popup-picker-placeholder.vux-cell-placeholder {
                color: #dcdcdc;
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
    }
    .wrapper:nth-child(3) {
      padding-top: 20px;
    }
    .next {
      display: block;
      width: 89.33%;
      height: 88px;
      line-height: 88px;
      font-size: 36px;
      color: #fff;
      /*border-radius: 10px;*/
      background: @back-color-linear;
      margin: 0 auto;
      margin-top: 40px;
    }
  }
</style>
