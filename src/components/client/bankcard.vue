<template>
  <div class="bankcard">
    <x-header :left-options="{backText: '', preventGoBack: true}" @on-click-back="back">新增银行卡</x-header>
    <div class="wrapper">
      <!--<x-dialog v-model="alertMsg" class="dialog-demo quitDialog" hide-on-blur>-->
        <!--<div class="quit">{{alertCont}}</div>-->
        <!--<x-button type="primary" @click.native="hideAlert">确 定</x-button>-->
      <!--</x-dialog>-->
      <div class="space"></div>
      <group class="bankcard_cont">
        <div class="add_tit">
          <span class="border_left"></span>
          <span class="text">银行卡信息</span>
        </div>
        <div class="must_fill">
          <div class="radio_box new_field" style="border:0">
            <i class="iconfont necessary_icon">&#xe8d4;</i>
            <div class="time_box" @click="showCode">
              <span class="date_tit">开户银行：</span>
              <span class="date_edit" v-if="personInfo.bankName !== ''">{{personInfo.bankName}}</span>
              <span class="date_time" v-else>请选择开户银行</span>
              <i class="iconfont">&#xe8d5;</i>
            </div>
            <mt-popup v-model="showCerCode"
                      position="bottom"
                      class="cercode_box"
                      popup-transition="popup-fade">
              <mt-picker :slots="slots"
                        :showToolbar="true"
                        :itemHeight="itemHeight"
                        :visibleItemCount="3"
                        @change="onValuesChange">
                <div class="toolbar">
                  <span class="cancel" @click="cancelCerCode">取消</span>
                  <span class="ensure" @click="ensureCerCode">确定</span>
                </div>
              </mt-picker>
            </mt-popup>
          <div class="bb"></div>
          </div>
        </div>
        <div class="must_fill">
          <div class="radio_box new_field" style="border:0">
            <i class="iconfont necessary_icon">&#xe8d4;</i>
            <x-input title="支行名称："
                     class="x_branch ipt"
                     ref="bankBranch"
                     v-model="personInfo.branchBank"
                     placeholder="请输入支行名称"
                     :show-clear="false"
            ></x-input>
          <div class="bb"></div>
          </div>
        </div>
        <div class="must_fill">
          <div class="radio_box new_field" style="border:0">
            <i class="iconfont necessary_icon">&#xe8d4;</i>
             <x-input title="银行卡号："
                      ref="cardNum"
                      class="x_cardnumber ipt"
                      v-model="personInfo.bankCardNumber"
                      placeholder="请输入银行卡号"
                      :show-clear="false"
              ></x-input>
          <div class="bb"></div>
          </div>
        </div>
        <div class="must_fill">
          <div class="radio_box new_field" style="border:0">
            <i class="iconfont necessary_icon">&#xe8d4;</i>
            <x-input title="持卡人姓名："
                     ref="cardOwner"
                     v-model="personInfo.cardOwner"
                     placeholder="请输入持卡人姓名"
                     :show-clear="false"
                     class="x_iptname ipt"
            ></x-input>
          <div class="bb"></div>
          </div>
        </div>
        <div class="must_fill">
          <div class="radio_box new_field camera-box" style="border:0">
            <i class="iconfont necessary_icon">&#xe8d4;</i>
            <div class="upload">上传银行卡照片：&nbsp;<span>（请上传清晰照片）</span></div>
            <div class="upload_box">
              <camera :popupVisible="popupVisible"
                      @showPopup="showPopup"
                      :cerId="client_certification_id"
                      :isFromBank="fromBank"
                      @hidePopup="hidePopup"></camera>
              <span class="front_class">上传银行卡正面</span>
            </div>
          </div>
        </div>
      </group>
      <!-- <group class="bankcard_cont">
        <x-input title="持卡人："
                 ref="cardOwner"
                 v-model="personInfo.cardOwner"
                 :show-clear="false"
                 class="x_iptname ipt"
        ></x-input>
        <div class="time_box" @click="showCode">
          <span class="date_tit">开户银行：</span>
          <span class="date_time">{{personInfo.bankName}}</span>
          <i class="iconfont">&#xe731;</i>
        </div>
        <mt-popup v-model="showCerCode"
                  position="bottom"
                  class="cercode_box"
                  popup-transition="popup-fade">
          <mt-picker :slots="slots"
                     :showToolbar="true"
                     :itemHeight="itemHeight"
                     :visibleItemCount="3"
                     @change="onValuesChange">
            <div class="toolbar">
              <span class="cancel" @click="cancelCerCode">取消</span>
              <span class="ensure" @click="ensureCerCode">确定</span>
            </div>
          </mt-picker>
        </mt-popup>
        <x-input title="支行："
                 class="x_branch ipt"
                 ref="bankBranch"
                 v-model="personInfo.branchBank"
                 :show-clear="false"
        ></x-input>
        <x-input title="银行卡号："
                 ref="cardNum"
                 class="x_cardnumber ipt"
                 v-model="personInfo.bankCardNumber"
                 :show-clear="false"
        ></x-input>
      </group> -->
      <!-- <div class="space"></div>
      <div class="upload">上传银行卡照片：&nbsp;<span>（请上传清晰照片）</span></div>
      <div class="upload_box">
        <camera :popupVisible="popupVisible"
                @showPopup="showPopup"
                :cerId="client_certification_id"
                :isFromBank="fromBank"
                @hidePopup="hidePopup"></camera>
      </div> -->
      <!-- <div class="submit_form">
        <button class="submit" @click="submitBankInfos">提交</button>
      </div> -->
      <div class="space"></div>
      <div class="space"></div>
      <mt-button @click.native="submitBankInfos">提交</mt-button>
    </div>
  </div>
</template>
<script>
  import {XHeader, Group, Cell, XInput, PopupPicker, XDialog, XButton} from 'vux'
  import camera from '@/base/clientCamera'
  import {uploadBankCard, getBankInfos, perfectInfos} from '@/service/api/customers'
  import {getStore} from '@/config/mUtils'
  import {bankcrdValidate, toast} from '@/common/js/filter'

  export default {
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
//        alertMsg: false,
        alertCont: '还有必填项未填写',
        bankList: [],
        popupVisible: false,
        personInfo: {
          cardOwner: '',
          bankName: '',
          branchBank: '',
          bankCardNumber: ''
        },
        client_certification_id: '',
        name: '',
        nationality: '',
        mobile: '',
        city: '',
        client_id: '',
        fromBank: 0,
        itemHeight: getComputedStyle(window.document.documentElement)['font-size'].split('px')[0] - 0,
        slots: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'center'
          }
        ],
        showCerCode: false,
        timer: null,
        bankName: '',
        beforeRouteName: '',
        addCard: null
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if (from.name === 'BankList') {
          vm.beforeRouteName = 'BankList'
        }
      })
    },
    mounted () {
      this.addCard = this.$route.params.addCard || null
      let info = JSON.parse(getStore('selfInfos'))
      this.client_certification_id = info.client_certification_id
      if (this.client_certification_id === undefined) {
        perfectInfos({client_id: info.client_id}).then(res => {
          this.client_certification_id = res.data.client_certification_id
        })
      }
      getBankInfos().then(res => {
        if (res.status === 200) {
          res.data.forEach((value, index) => {
            this.slots[0].values.push(value.bank_name)
          })
        }
      })
    },
    methods: {
      back () {
        let info = JSON.parse(getStore('selfInfos'))
        if (this.beforeRouteName === 'BankList') {
          this.$router.replace({name: 'BankList', params: {id: info.client_id, addCard: this.addCard}})
        } else {
          this.$router.replace({name: 'PerfectInfos', params: info})
        }
      },
      onValuesChange (picker, values) {
        if (values[0] !== undefined) {
          this.bankName = values[0]
        }
      },
      showCode () {
        this.$refs.cardOwner.blur()
        this.$refs.bankBranch.blur()
        this.$refs.cardNum.blur()
        this.timer = null
        this.timer = setTimeout(() => {
          this.showCerCode = true
        }, 600)
      },
      cancelCerCode () {
        this.showCerCode = false
        clearTimeout(this.timer)
      },
      ensureCerCode (val) {
        this.personInfo.bankName = this.bankName
        clearTimeout(this.timer)
        this.showCerCode = false
      },
//      hideAlert () {
//        this.alertMsg = false
//      },
      showPopup (data) {
        this.popupVisible = data
//        console.log(this.client_certification_id)
      },
      hidePopup (data) {
        this.popupVisible = data
      },
      submitBankInfos () {
        let bankId = ''
        bankId = this.slots[0].values.indexOf(this.personInfo.bankName) + 1
        console.log(bankId)
        let params = {
          card_no: this.personInfo.bankCardNumber,
          sub_branch_name: this.personInfo.branchBank,
          name: this.personInfo.cardOwner,
          bank_id: bankId
        }
        if (params.card_no && !bankcrdValidate(params.card_no).stat) {
          this.alertCont = '请输入正确的银行卡号'
          toast(this.alertCont)
          return false
        }
        if (!params.card_no ||
            !params.sub_branch_name ||
            !params.name ||
            params.bank_id < 0) {
          toast(this.alertCont)
          return false
        }
        uploadBankCard(this.client_certification_id, params).then(res => {
          if (res.status === 200) {
            let info = JSON.parse(getStore('selfInfos'))
            let params = Object.assign({isSubmit: true}, info)
            if (this.beforeRouteName === 'BankList') {
              this.$router.replace({name: 'BankList', params: {id: info.client_id, addCard: this.addCard}})
            } else {
              this.$router.replace({name: 'PerfectInfos', params})
            }
          }
        })
      }
    }
  }
</script>
<style lang="less">
  @import '../../common/style/variable';
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
    .cercode_box {
      width: 100%;
      .picker-toolbar {
        height: 56px;
        line-height: 56px;
        .toolbar {
          width: 100%;
           -webkit-box-sizing: border-box;
           -moz-box-sizing: border-box;
          box-sizing: border-box;
          height: 56px;
          line-height: 56px;
          padding: 0 30px;
          color: @text-font-color;
          font-size: 34px;
          position: absolute;
          border-bottom: 1px solid #ddd;
          span {
            position: absolute;
            display: inline-block;
          }
          span.cancel {
            left: 30px;
          }
          span.ensure {
            right: 30px;
          }
        }
      }
    }
    .time_box {
      position: relative;
      height: 110px;
      line-height: 110px;
      border-bottom: 1px solid @line-color-light;/*no*/
      // padding: 0 20px;
      // border-bottom: 1px solid #ddd;
      span {
        font-size: @font-size-thirty;/*px*/
        font-family: @font-family-R;
      }
      span.date_tit {
        color: @font-color-4A;
      }
      span.date_edit {
        position: absolute;
        right: 56px;
        color: @font-color-4A;
        font-family: @font-family-M;
      }
      span.date_time {
        color: #DCDCDC;
        right: 56px;
        position: absolute;
      }
      i {
        position: absolute;
        right: 0;
        margin-right: 0;
        font-size: 55px !important;
        color: #DADADA;
      }
    }
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
        font-size: @font-size-thirty;/*px*/
        line-height: 110px;
        color: @font-color-4A;
        height: 110px;
        border-bottom: 1px solid @line-color-light;/*no*/
        // padding: 0 20px;
        // border-bottom: 1px solid #ddd;
      }
      .x_iptname,
      .x_branch,
      .x_cardnumber {
        // height: 110px;
        .weui-cell__ft {
          display: none;
        }
        .weui-cell__bd.weui-cell__primary{
          padding-right: 20px;
        }
        .weui-input {
          text-align: right;
          color: @font-color-4A;
          font-family: @font-family-M;
        }
        input::-webkit-input-placeholder {
          font-size: @font-size-thirty;/*px*/
          font-family: @font-family-R;
          color: @text-font-noEdit;
        }
        input:-moz-placeholder {
          /* FF 4-18 */
          font-size: @font-size-thirty;/*px*/
          font-family: @font-family-R;
          color: @text-font-noEdit;
        }
        input::-moz-placeholder {
          /* FF 19+ */
          font-size: @font-size-thirty;/*px*/
          font-family: @font-family-R;
          color: @text-font-noEdit;
        }
        input:-ms-input-placeholder {
          /* IE 10+ */
          font-size: @font-size-thirty;/*px*/
          font-family: @font-family-R;
          color: @text-font-noEdit;
        }
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
        /*width: 710px;*/
        width: 91.2%;
        background-color: #2672BA;
        text-align: center;
        border-radius: 10px;
        color: #fff;
        font-size: 28px;
      }
    }
    .camera-box.new_field{
      height: 320px;
      .necessary_icon{
        top: 16%;
      }
      .upload {
        line-height: 110px;
        // padding-left: 20px;
        font-size: 30px;
        color: @font-color-4A;
        // border-bottom: 1px solid #D9D9D9;
        background-color: #fff;
        span {
          color: #999;
        }
      }
      .upload_box {
        background-color: #fff;
        /*height: 333px;*/
        // padding: 51px 60px;
        /*padding-bottom: 0;*/
        position: relative;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        .icon_bg {
          font-size: 100px;
          color: #E1E1E1;
          line-height: 110px;
        }
        .upload_cont{
          background: #fff;
          border: 1px dashed #E1E1E1;/*no*/
          border-radius: 0;
          height: 180px;
        }
        .front_class {
          font-size: @font-size-twenty;/*px*/
          color: #B0B0B0;
          position: absolute;
          /*left: 165px;*/
          left: 50%;
          top: 120px;
          transform: translate(-50%, 0);
        }
      }
    }
    .mint-button.mint-button--default{
      width: 670px;
      height: 88px;
    }
  }
</style>
