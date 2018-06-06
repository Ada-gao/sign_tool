<template>
  <div class="bankcard">
    <x-header :left-options="{backText: ''}">客户认证</x-header>
    <div class="wrapper">
      <group class="bankcard_cont">
        <x-input title="持卡人："
                 v-model="personInfo.cardOwner"
        ></x-input>
        <popup-picker title="开户银行："
                      :data="bankList"
                      v-model="personInfo.bankName"
        ></popup-picker>
        <x-input title="支行："
                 v-model="personInfo.branchBank"
        ></x-input>
        <x-input title="银行卡号："
                 v-model="personInfo.bankCardNumber"
        ></x-input>
      </group>
      <div class="space"></div>
      <div class="upload">银行卡信息：&nbsp;<span>（请上传清晰的原件或复印件）</span></div>
      <div class="upload_box">
        <camera :popupVisible="popupVisible"
                @showPopup="showPopup"
                :cerId="client_certification_id"
                :isFromBank="fromBank"
                @hidePopup="hidePopup"></camera>
      </div>
      <div class="submit_form">
        <button class="submit" @click="submitBankInfos">提交</button>
      </div>
    </div>
  </div>
</template>
<script>
  import {XHeader, Group, Cell, XInput, PopupPicker} from 'vux'
  import camera from '@/base/camera/camera'
  import {uploadBankCard, perfectInfos} from '@/service/api/customers'
  import {getStore} from '@/config/mUtils'

  export default {
    name: 'Bankcard',
    components: {
      XHeader,
      Group,
      Cell,
      XInput,
      PopupPicker,
      camera
    },
    data () {
      return {
        bankList: [[
          {
            name: '中国银行',
            value: '中国银行',
            index: '1'
          },
          {
            name: '招商银行',
            value: '招商银行',
            index: '2'
          },
          {
            name: '建设银行',
            value: '建设银行',
            index: '3'
          },
          {
            name: '汇丰银行',
            value: '汇丰银行',
            index: '4'
          },
          {
            name: '渣打银行',
            value: '渣打银行',
            index: '5'
          },
          {
            name: '花旗银行',
            value: '花旗银行',
            index: '6'
          },
          {
            name: '农业银行',
            value: '农业银行',
            index: '7'
          }
        ]],
        popupVisible: false,
        personInfo: {
          cardOwner: '',
          bankName: [],
          branchBank: '',
          bankCardNumber: ''
        },
        client_certification_id: '',
        name: '',
        nationality: '',
        mobile: '',
        city: '',
        client_id: '',
        fromBank: 0
      }
    },
    mounted () {
      let obj = {}
      let info = JSON.parse(getStore('selfInfos'))
      obj.client_id = info.client_id
      obj.client_name = info.client_name
      perfectInfos(obj).then(res => {
        if (res.status === 200) {
          this.client_certification_id = res.data.client_certification_id
          console.log('bankCard：' + this.client_certification_id)
        }
      })
    },
    methods: {
      showPopup (data) {
        this.popupVisible = data
      },
      hidePopup (data) {
        this.popupVisible = data
      },
      submitBankInfos () {
        let bankId = ''
        switch (this.personInfo.bankName[0]) {
          case '中国银行':
            bankId = '1'
            break
          case '招商银行':
            bankId = '2'
            break
          case '建设银行':
            bankId = '3'
            break
          case '汇丰银行':
            bankId = '4'
            break
          case '渣打银行':
            bankId = '5'
            break
          case '花旗银行':
            bankId = '6'
            break
          case '农业银行':
            bankId = '7'
            break
        }
        let params = {
          card_no: this.personInfo.bankCardNumber,
          sub_branch_name: this.personInfo.branchBank,
          name: this.personInfo.cardOwner,
          bank_id: bankId
        }
        uploadBankCard(this.client_certification_id, params).then(res => {
          if (res.status === 200) {
            let info = JSON.parse(getStore('selfInfos'))
            let params = Object.assign({isSubmit: true}, info)
            this.$router.push({name: 'PerfectInfos', params: params})
          }
        })
      }
    }
  }
</script>
<style lang="less">
  .camera_pop {
    width: 100%;
    font-size: 30px;
    text-align: center;
    line-height: 90px;
    color: #333;
    .popup-item:not(:last-child) {
      border-bottom: 1px solid #ccc;
    }
  }

  .bankcard {
    .card {
      font-size: 30px;
      color: #333;
      margin-top: 10px;
    }
    .bankcard_cont {
      /*padding-top: 108px;*/
      .weui-cells .weui-cell {
        line-height: 82px;
        color: #333;
        height: 82px;
        padding: 0 20px;
      }
    }
    .upload {
      line-height: 82px;
      padding-left: 20px;
      font-size: 30px;
      color: #333;
      border-bottom: 1px solid #D9D9D9;
      background-color: #fff;
      span {
        color: #999;
      }
    }
    .space {
      height: 20px;
      background-color: #f5f5f5;
    }
    .submit_form {
      background-color: #f5f5f5;
      text-align: center;
      padding: 30px 0;
      .submit {
        height: 82px;
        line-height: 82px;
        display: inline-block;
        width: 710px;
        background-color: #2672BA;
        text-align: center;
        border-radius: 10px;
        color: #fff;
        font-size: 28px;
      }
    }
    .upload_box {
      background-color: #fff;
      /*height: 333px;*/
      padding: 51px 60px;
      /*padding-bottom: 0;*/
      position: relative;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
    }
  }
</style>
