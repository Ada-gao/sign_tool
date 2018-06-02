<template>
  <div>
    <x-header :left-options="{backText: ''}">新建客户</x-header>
    <!--<x-header v-if="isMod==0" :left-options="{backText: ''}">新建客户</x-header>-->
    <!--<x-header v-if="isMod==1" :left-options="{backText: ''}">修改资料</x-header>-->
    <group class="wrapper">
      <div class="add_tit">
        <i class="iconfont">&#xe62c;</i>
        <span style="color: #2672ba">客户信息</span>
      </div>
      <div class="space"></div>
      <x-input title="客户姓名:" v-model="name" placeholder="输入客户姓名" ref="input01" :show-clear="false"
               required></x-input>
      <x-input title="国籍:"
               v-model="nationality"
               isASelection="true"
               @selectOne="selectNation"
               placeholder="输入客户年龄"
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
      <x-input title="手机号码:" v-model="mobile" placeholder="输入客户手机号码" ref="input03" :max='13' mask="999 9999 9999"
               is-type="china-mobile" :show-clear="false" required></x-input>
      <x-input title="邮箱:" v-model="email" placeholder="输入客户邮箱" ref="input04" is-type="email" :show-clear="false"
               required></x-input>
    </group>
    <!--<p class="alert_message" v-show="mustFill">有遗漏的必填项未填写～</p>-->

    <div class="btn_wrap">
      <button class="next" @click="submitCustomer">确定</button>
    </div>
  </div>
</template>

<i18n>
  select address:
  zh-CN: 选择地址
</i18n>

<script>
//  import { MessageBox } from 'mint-ui'
  import { XHeader, Group, XInput, XButton, XAddress, ChinaAddressV4Data } from 'vux'
  import { addCusomer } from '@/service/api/customers'

  export default {
    name: 'NewCustomer',
    components: {
      XHeader,
      Group,
      XInput,
      XButton,
      XAddress
    },
    data () {
      return {
        num: 1,
        isMod: -1,
        name: '',
        nationality: '',
        mobile: '',
        email: '',
        ChinaLocation: '',
        popupVisible: false,

        title: '常住中国城市',
        value: [],
        addressData: ChinaAddressV4Data,
        showAddress: false,
        names: ''
      }
    },
    mounted () {
      this.isMod = Number(this.$route.params.isMod)
      console.log(this.isMod)
      if (this.isMod === 1) {
        console.log('需要获取数据')
      }
    },
    methods: {
      onShadowChange (ids, names) {
        this.names = names.join()
        this.myAddressProvince = names[0]
        this.myAddressCity = names[1]
      },
      showPopup () {
        this.popupVisible = true
      },
      selectNation (num) {
        this.num = num
        this.myAddressProvince = this.myAddressCity = this.myAddresscounty = ''
        this.ChinaLocation = ''
//        console.log(this.num)
      },
      submitCustomer () {
        let params = {
          name: this.name,
          nationality: this.num === 1 ? '中国' : '其他',
          mobile: this.mobile,
          email: this.email,
          ChinaLocation: this.num === 1 ? [this.myAddressProvince, this.myAddressCity] : null
        }
//        console.log(params)
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

//            this.mustFill = true
//          clearTimeout(this.timer)
//          setTimeout(() => {
//                this.mustFill = false
//          }, 1000)
  //          this.$router.push({name: 'CustomerManagement', params: {id: 1}})
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
    .space {
      height: 25px;
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
    }
    // padding-top: 126px;
    .weui-cells .vux-x-input {
      height: 84px;
      box-sizing: border-box;
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

  .btn_wrap {
    padding: 0 37px;
    margin-top: 119px;
    /*position: fixed;*/
    width: 100%;
    /*bottom: 30px;*/
    .next {
      text-decoration: none;
      border-radius: 60px;
      background-color: #3693E0;
      width: 644px;
      height: 88px;
      box-sizing: border-box;
      display: inline-block;
      text-align: center;
      color: #fff;
      line-height: 88px;
      font-size: 32px; /*px*/
      letter-spacing: 20px;
      cursor: pointer;
    }
  }
</style>
