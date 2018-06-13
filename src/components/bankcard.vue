<template>
  <div class="bankcard">
    <x-header :left-options="{backText: ''}">客户认证</x-header>
    <div class="wrapper">
      <x-dialog v-model="alertMsg" class="dialog-demo quitDialog" hide-on-blur>
        <div class="quit">{{alertCont}}</div>
        <x-button type="primary" @click.native="hideAlert">确 定</x-button>
      </x-dialog>

      <group class="bankcard_cont">
        <x-input title="持卡人："
                 v-model="personInfo.cardOwner"
                 :show-clear="false"
                 class="x_iptname"
        ></x-input>
        <popup-picker title="开户银行："
                      :data="bankList"
                      class="x_bank"
                      v-model="personInfo.bankName"
        ></popup-picker>
        <x-input title="支行："
                 class="x_branch"
                 v-model="personInfo.branchBank"
                 :show-clear="false"
        ></x-input>
        <x-input title="银行卡号："
                 class="x_cardnumber"
                 v-model="personInfo.bankCardNumber"
                 :show-clear="false"
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
  import {XHeader, Group, Cell, XInput, PopupPicker, XDialog, XButton} from 'vux'
  import camera from '@/base/camera/camera'
  import {uploadBankCard, getBankInfos} from '@/service/api/customers'
  import {getStore} from '@/config/mUtils'

  export default {
    name: 'Bankcard',
    components: {
      XHeader,
      Group,
      Cell,
      XInput,
      PopupPicker,
      camera,
      XDialog,
      XButton
    },
    data () {
      return {
        alertMsg: false,
        alertCont: '还有信息没填哦～',
        bankList: [],
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
      let info = JSON.parse(getStore('selfInfos'))
      this.client_certification_id = info.client_certification_id
      getBankInfos().then(res => {
        if (res.status === 200) {
          let resFilter = []
          res.data.forEach((value, index) => {
              resFilter.push(
                  {
                    name: value.bank_name,
                    value: value.bank_name,
                    index: value.bank_id
                  }
              )
          })
          this.bankList.push(resFilter)
        }
      })
//      console.log('bankcard:' + this.client_certification_id)
    },
    methods: {
      hideAlert () {
        this.alertMsg = false
      },
      showPopup (data) {
        this.popupVisible = data
        console.log(this.client_certification_id)
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
        if (!params.card_no ||
            !params.sub_branch_name ||
            !params.name ||
            !params.bank_id) {
            this.alertMsg = true
          return false
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
    .quitDialog {
      .weui-dialog {
        width: 580px;
        height: 345px;
        background: #FFFFFF;
        border-radius: 10px;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%);
        padding: 0;
        text-align: center;
        .quit {
          margin-top: 85px;
          margin-bottom: 75px;
          font-family: PingFangSC-Regular;
          font-size: 36px;
          color: #333333;
        }
      }
    }
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
      .x_iptname,
      .x_branch,
      .x_cardnumber {
        .weui-cell__ft {
          display: none;
        }
        .weui-input {
          text-align: right;
          color: #999;
        }
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
