<template>
  <div>
    <x-header v-if="isMod==0" :left-options="{backText: ''}">新建客户</x-header>
    <x-header v-if="isMod==1" :left-options="{backText: ''}">修改资料</x-header>
    <group class="wrapper">
      <div class="add_tit">
        <i class="iconfont icon-web-icon-"></i>
        <span style="color: #2672ba">客户信息</span>
      </div>
      <x-input title="客户姓名:" v-model="name" placeholder="输入客户姓名" ref="input01" :show-clear="false" is-type="china-name"
               required></x-input>
      <x-input title="国籍:" v-model="nationality" isASelection=true  @selectOne="selectNation" placeholder="输入客户年龄"
               ref="input02" :show-clear="false" required></x-input>
      <x-input title="手机号码:" v-model="mobile" placeholder="输入客户手机号码" ref="input03" :max='13' mask="999 9999 9999"
               is-type="china-mobile" :show-clear="false" required></x-input>
      <x-input title="邮箱:" v-model="email" placeholder="输入客户邮箱" ref="input04" is-type="email" :show-clear="false"
               required></x-input>
      <div>
        <mt-popup
          v-model="popupVisible"
          position="bottom"
          popup-transition="popup-fade"
        >

          <mt-picker :slots="myAddressSlots" @change="onMyAddressChange"></mt-picker>
        </mt-popup>
        <p style="margin-top: 20px;text-align: center;">{{myAddressProvince}}  {{myAddressCity}} {{myAddresscounty}}</p>
      </div>
    </group>
    <div class="btn_wrap">
      <button class="next" @click="submitCustomer">确定</button>
    </div>
  </div>
</template>

<script>
  import {XHeader, Group, XInput, XButton} from 'vux'
  import {addCusomer} from '@/service/api/customers'
  import {Picker, Popup} from 'mint-ui'
  import myAddress from '@/service/api/address.json'

  export default {
    name: 'NewCustomer',
    components: {
      XHeader,
      Group,
      XInput,
      XButton,
      'mt-picker': Picker,
      'mt-popup': Popup
    },
    data () {
      return {
        num: 1,
        isMod: -1,
        name: '',
        nationality: '',
        mobile: '',
        email: '',
        popupVisible: false,
        myAddressProvince: '省',
        myAddressCity: '市',
        myAddresscounty: '区/县',
        myAddressSlots: [
          {
            flex: 1,
            defaultIndex: 1,
            values: Object.keys(myAddress),
            className: 'slot1',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: [],
            className: 'slot3',
            textAlign: 'center'
          },
          {
            divider: true,
            content: '-',
            className: 'slot4'
          },
          {
            flex: 1,
            values: [],
            className: 'slot5',
            textAlign: 'center'
          }
        ]
      }
    },
    mounted () {
      this.isMod = Number(this.$route.params.isMod)
      console.log(this.isMod)
      if (this.isMod === 1) {
        console.log('需要获取数据')
      }

      this.$nextTick(() => {
        this.myAddressSlots[0].defaultIndex = 0
      })
    },
    methods: {
      onMyAddressChange (picker, values) {
        if (myAddress[values[0]]) {
          picker.setSlotValues(1, Object.keys(myAddress[values[0]]))

          this.myAddressProvince = values[0]
          this.myAddressCity = values[1]
        }
        if (myAddress[values[0]][values[1]]) {
          picker.setSlotValues(2, Object.keys(myAddress[values[0]][values[1]]))

//          this.myAddressProvince = values[0]
//          this.myAddressCity = values[1]
          this.myAddresscounty = values[2]
        }
      },
      selectNation (num) {
        this.num = num
        console.log(this.num)
      },
      submitCustomer () {
        let params = {
          name: this.name,
          nationality: this.num === 1 ? '中国' : '其他',
          mobile: this.mobile,
          email: this.email
        }
        if (this.isMod === 0) {
          addCusomer(params).then(res => {
            console.log(res)
            if (res.status === 200) {
              this.$router.push({name: 'CustomerList'})
            }
          })
        } else {
          this.$router.push({name: 'CustomerManagement', params: {id: 1}})
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .wrapper {
    .add_tit {
      padding-left: 20px;
      height: 80px;
      line-height: 80px;
      i, span {
        vertical-align: middle;
        display: inline-block;
      }
    }
    .weui-cell {
      padding-left: 20px;
      padding-right: 20px;
    }
    // padding-top: 126px;
    .weui-cells .vux-x-input {
      height: 113px;
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
  }

  .btn_wrap {
    padding: 0 37px;
    margin-top: 2rem;
    position: fixed;
    width: 100%;
    bottom: 30px;
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
