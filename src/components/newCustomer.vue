<template>
  <div>
    <x-header :left-options="{backText: ''}">新建潜客</x-header>
    <group class="wrapper">
      <div class="add_tit">
        <i class="iconfont">&#xe61a;</i>
        <span style="color: #2672ba">客户信息</span>
      </div>
      <div class="space"></div>
      <!--<x-input title="客户姓名:" v-model="name" placeholder="输入客户姓名" ref="input01" :show-clear="false"-->
      <mt-field label="客户姓名：" placeholder="输入客户姓名" v-model="name" class="new_field"></mt-field>

      <!--required></x-input>-->
      <x-input title="国籍:"
               v-model="nationality"
               isASelection="true"
               @selectOne="selectNation"
               ref="input02" :show-clear="false" required></x-input>
      <x-address
        id="x_address"
        v-show="num === 1"
        :title="title"
        v-model="value"
        raw-value
        :list="addressData"
        @on-shadow-change="onShadowChange"
        placeholder="请选择地址"
        :show.sync="showAddress"></x-address>
      <!--<x-input title="手机号码:" v-model="mobile" placeholder="输入客户手机号码" ref="input03" :max='13' mask="999 9999 9999"-->
               <!--is-type="china-mobile" :show-clear="false" required></x-input>-->
      <!--<x-input title="邮箱:" v-model="email" placeholder="输入客户邮箱" ref="input04" is-type="email" :show-clear="false"-->
               <!--required></x-input>-->
      <mt-field label="手机号码：" placeholder="输入客户手机号码" v-model="mobile" class="new_field"></mt-field>
      <mt-field label="邮箱：" placeholder="输入客户邮箱" v-model="email" class="new_field"></mt-field>
    </group>
    <!--<p class="alert_message" v-show="mustFill">有遗漏的必填项未填写～</p>-->

    <!--<div class="btn_wrap">-->
      <!--<button class="next" @click="submitCustomer">确定</button>-->
    <!--</div>-->
    <button class="next" @click="submitCustomer">确 定</button>
  </div>
</template>

<script>
//  import { MessageBox } from 'mint-ui'
  import {
      XHeader,
    Group,
    XInput,
    XButton,
    XAddress,
    ChinaAddressV4Data
  } from 'vux'
  import {Field} from 'mint-ui'
  import { addCusomer } from '@/service/api/customers'

  export default {
    name: 'NewCustomer',
    components: {
      XHeader,
      Group,
      XInput,
      XButton,
      XAddress,
      'mt-field': Field
    },
    data () {
      return {
        num: 1,
        isMod: -1,
        name: '',
        nationality: '',
        mobile: '',
        email: '',
        city: '',
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
          city: this.city
        }
        if (this.name &&
            this.mobile &&
            this.email) {
          addCusomer(params).then(res => {
            console.log(res)
            if (res.status === 200) {
              this.$router.push({name: 'CustomerList'})
            }
          })
        } else {
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
