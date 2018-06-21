<template>
  <div>
    <x-header :left-options="{backText: ''}">新增潜客</x-header>
    <group class="wrapper">
      <x-dialog v-model="alertMsg" class="dialog-demo quitDialog" hide-on-blur>
        <div class="quit">{{alertCont}}</div>
        <x-button type="primary" @click.native="hideAlert">确 定</x-button>
      </x-dialog>
      <x-dialog v-model="verificate.isShow" class="dialog-demo msg_dialog">
        <div class="msg_title">请输入验证码：</div>
        <input type="text" class="msg_ipt" v-model="verificate.code">
        <x-button type="primary" @click.native="hideVerBox">确 定</x-button>
      </x-dialog>

      <div class="add_tit">
        <i class="iconfont">&#xe61a;</i>
        <span style="color: #2672ba">客户信息</span>
      </div>
      <div class="space"></div>
      <mt-field disableClear
                label="客户姓名："
                placeholder="输入客户姓名"
                v-model="name"
                class="new_field"></mt-field>
      <x-input title="国籍:"
               v-model="nationality"
               isASelection="true"
               @selectOne="selectNation"
               ref="input02"
               :show-clear="false"
               required></x-input>
      <x-address id="x_address"
                 v-show="num === 1"
                 :title="title"
                 v-model="value"
                 raw-value
                 :list="addressData"
                 @on-shadow-change="onShadowChange"
                 placeholder="请选择地址"
                 :show.sync="showAddress"></x-address>
      <mt-field disableClear
                type="tel"
                label="手机号码："
                placeholder="输入客户手机号码"
                :attr="{ maxlength: 11 }"
                v-model="mobile"
                class="new_field">
        <span class="verificate"
              v-if="!verificate.isTimeout"
              @click="sendVer">发送验证码</span>
        <span class="verificate"
              v-else>{{verificate.num}}s</span>
      </mt-field>
      <mt-field disableClear
                type="email"
                label="邮箱（非必填项）："
                placeholder="输入客户邮箱"
                v-model="email"
                class="new_field"></mt-field>
    </group>
    <button class="next" @click="submitCustomer">确 定</button>
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
  import {Field, Toast} from 'mint-ui'
  import {addCusomer, sendVerCode, confirmVercode} from '@/service/api/customers'

  export default {
    name: 'NewCustomer',
    components: {
      XHeader,
      Group,
      XDialog,
      XInput,
      XButton,
      XAddress,
      'mt-field': Field
    },
    data () {
      return {
        verificate: {
          isShow: false,
          timer: null,
          num: 60,
          isTimeout: false,
          code: ''
        },
        alertMsg: false,
        alertCont: '还有必填项没填',
        num: 1,
        isMod: -1,
        name: '',
        nationality: '',
        mobile: '',
        email: '',
        city: '',
        mobile_validated: '1',
//        validated_timestamp: '',
        validated_by: '',
        popupVisible: false,
        title: '常住中国城市',
        value: [],
        addressData: ChinaAddressV4Data,
        showAddress: false
      }
    },
    mounted () {
      this.isMod = Number(this.$route.params.isMod)
      if (this.isMod === 1) {
        console.log('需要获取数据')
      }
    },
    methods: {
      hideVerBox () {
        this.verificate.isShow = this.verificate.isTimeout = false
        clearInterval(this.verificate.timer)
        this.verificate.num = 60
        let params = {
          code: this.verificate.code,
          mobile: this.mobile
        }
        if (params.code) {
          confirmVercode(params).then(res => {
            if (res.status === 200) {
//                this.validated_timestamp = res.data.validated_timestamp
              this.mobile_validated = res.data.mobile_validated
              this.validated_by = res.data.validated_by
              this.verificate.code = ''
            }
          })
        }
      },
      sendVer () {
        if (!this.mobile || this.mobile.length !== 11) {
          Toast({
            message: '请输入有效的手机号',
            position: 'top',
            duration: 1500,
            className: 'toast_class'
          })
          return false
        }
//        this.verificate.isShow = this.verificate.isTimeout = true
        let params = {
          username: this.mobile,
          code_flag: 1
        }
        sendVerCode(params).then(res => {
          this.verificate.isShow = this.verificate.isTimeout = true
        }).catch(err => {
          if (err.message === '请求错误') {
            Toast({
              message: '该手机号已被验证',
              position: 'top',
              duration: 1500,
              className: 'toast_class'
            })
          }
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
      hideAlert () {
        this.alertMsg = false
      },
      onShadowChange (ids, names) {
//        this.names = names.join()
//        this.myAddressProvince = names[0]
//        this.myAddressCity = names[1]
        this.city = names[1]
      },
      showPopup () {
        this.popupVisible = true
      },
      selectNation (num) {
        this.num = num
        this.myAddressProvince = this.myAddressCity = this.myAddresscounty = ''
        this.city = ''
      },
      submitCustomer () {
        let params = {
          name: this.name,
          nationality: this.num === 1 ? '0' : '1',
          mobile: this.mobile,
          email: this.email,
          city: this.city,
          mobile_validated: this.mobile_validated,
//          validated_timestamp: this.validated_timestamp,
          validated_by: this.validated_by
        }
//        console.log(params)
        if (!params.name || !params.mobile || params.mobile.length !== 11) {
          this.alertMsg = true
          return false
        }
        addCusomer(params).then(res => {
//          console.log(res)
          if (res.status === 200) {
            this.$router.push({name: 'CustomerList'})
          }
        })
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

  .wrapper {
    height: auto;
    .weui-label {
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
        color: #333;
        font-size: 30px;
        width: auto;
      }
      .mint-field-core {
        text-align: right;
        font-size: 30px;
        color: #999;
      }
      .mint-field-state {
        display: none;
      }
    }
    .space {
      height: 20px;
      background-color: #f5f5f5;
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
      .vux-cell-primary {
        padding-right: 15px;
        position: relative;
        right: -60px;
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
</style>
