<template>
  <div class="certified">
    <x-header :left-options="{backText: ''}"
              left-options.preventGoBack="true"
              on-click-back="toLink(id)">客户认证
    </x-header>
    <div class="certified_cont wrapper">
      <div class="radio_box">
        <!--<div class="type">投资者类型：</div>-->
        <mt-radio
          class="radio_item"
          title="投资者类型："
          v-model="radio"
          @change="changeRadio"
          :options="['普通投资者', '专业投资者']">
        </mt-radio>
      </div>
      <div class="space"></div>
      <div class="email_box" @click="showPopup">附件发送给理财师邮箱<i class="iconfont">&#xe731;</i></div>
      <div class="space"></div>
      <div class="upload_file">
        <div class="upload">
          <div class="upload_tit">上传认证资料</div>
        </div>
        <camera :popupVisible="popupVisible"
                @showPopup="showCamera"
                :isFromBank="fromBank"
                :cerId="uploadData.clientCertificationId"
                @hidePopup="hideCamera"></camera>
      </div>
      <div class="submit_form">
        <button class="submit" @click="submitInfos">提交</button>
      </div>
    </div>
    <div class="popup_box">

      <mt-popup v-model="showEmailBox" closeOnClickModal="false">
        <div class="email_box1">
          <div class="title">请确认您的邮箱</div>
          <div class="email_address">{{userInfos.emailAddress}}</div>
          <button @click="hidePopup">确定</button>
        </div>
      </mt-popup>
      <mt-popup v-model="showConvertBox" closeOnClickModel="false">
        <div class="convert_box">
          <div class="title"> 您的确定要变更为{{radio}}吗？</div>
          <div class="btn_box">
            <button class="ensure" @click="ensure">确定</button>
            <button class="cancel" @click="cancel">取消</button>
          </div>
        </div>
      </mt-popup>
      <mt-popup v-model="showSubmit.isShow" closeOnclickModel="false">
        <div class="confirm_box">
          <i class="iconfont icon_success"
             v-show="showSubmit.isSuccess != 2">&#xe60a;</i>
          <i class="iconfont icon_fail"
             v-show="showSubmit.isSuccess === 2">&#xe626;</i>
          <div class="confirm_cont" :class="{'fail': showSubmit.isSuccess === 2}">{{showSubmit.cont}}</div>
          <span class="confirm_btn" @click="popupConfirm(toRoute(showSubmit.isSuccess))">确 定</span>
        </div>
      </mt-popup>
    </div>
  </div>
</template>
<script>
  import {XHeader} from 'vux'
  import {Popup, Radio} from 'mint-ui'
  import {sendEmail, sendFiles, perfectInfos, checkCusomersDetail} from '@/service/api/customers'
  import {getStore} from '@/config/mUtils'
  import camera from '@/base/camera/camera'
  export default {
    components: {
      XHeader,
      camera,
      'mt-popup': Popup,
      'mt-radio': Radio
    },
    data () {
      return {
        showSubmit: {
          isShow: false,
          cont: '您的资料已上传成功！',
          isSuccess: 0
        },
        popupVisible: false,
        fromBank: 2,
        radio: '',
        oldRadio: '',
        type: '',
        id: '',
        timer: null,
        uploadData: {
          clientCertificationId: '',
          card_front_url: '',
          fileId: ''
        },
        showEmailBox: false,
        showConvertBox: false,
        userInfos: {
          name: '',
          id: '',
          emailAddress: '',
          type: ''
        },
        beforeRouteName: '',
        itemHeight: 60
      }
    },
    mounted () {
      let info = JSON.parse(getStore('selfInfos'))
      let id = null
      if (info && info.client_id) {
        id = info.client_id
        this.userInfos.name = info.client_name
        this.userInfos.id = info.client_id
        this.userInfos.type = info.client_type
        if (this.userInfos.type === '0') {
          this.radio = '普通投资者'
        } else if (this.userInfos.type === '1') {
          this.radio = '专业投资者'
        }
      } else {
        id = this.$route.params.id
        checkCusomersDetail(id).then(res => {
          this.userInfos.name = res.data.client_name
          this.userInfos.id = res.data.client_id
          this.userInfos.type = res.data.client_type
          if (this.userInfos.type === '0') {
            this.radio = '普通投资者'
          } else if (this.userInfos.type === '1') {
            this.radio = '专业投资者'
          }
        })
      }
      perfectInfos({client_id: id}).then(res => {
        if (res.status === 200) {
          this.uploadData.clientCertificationId = res.data.client_certification_id
        }
      })
      this.userInfos.emailAddress = JSON.parse(getStore('data')).email
    },
    beforeRouteEnter (to, from, next) {
      if (from.name === 'CustomerManagement') {
        next(vm => {
          vm.id = from.params.id
          vm.beforeRouteName = 'CustomerManagement'
        })
      } else {
        next(vm => {
          vm.id = from.params.id
        })
      }
    },
    methods: {
      showCamera (data) {
        this.popupVisible = data
      },
      hideCamera (data) {
        this.popupVisible = data
      },
      toLink (id) {
        this.$router.push({name: 'PotentialCustomerList', params: {id: id}})
      },
      convert (radio) {
        switch (radio) {
          case '普通投资者':
            this.type = '0'
            break
          case '专业投资者':
            this.type = '1'
            break
        }
        return this.type
      },
      changeRadio () {
        this.oldRadio = this.radio
        this.showConvertBox = true
        clearTimeout(this.timer)
        this.timer = null
      },
      ensure () {
        this.showConvertBox = false
      },
      cancel () {
        this.showConvertBox = false
        this.timer = setTimeout(() => {
          this.radio = this.oldRadio
        }, 500)
      },
      showPopup () {
        this.showEmailBox = true
      },
      hidePopup () {
        this.showEmailBox = true
        let data = JSON.parse(getStore('data'))
        let params = {
          email_of_receiver: data.email,
          client_id: this.userInfos.id,
          user_id: data.userId
        }
        sendEmail(this.convert(this.radio), params).then(res => {
          if (res.status === 200) {
            this.showEmailBox = false
          }
        })
      },
      popupConfirm (fn) {
        if (fn) {
          fn()
        }
      },
      toRoute (status) {
        if (status === 1) {
            if (this.beforeRouteName === 'CustomerManagement') {
              this.$router.replace({name: 'CustomerManagement', params: {id: this.userInfos.id}})
            } else {
              this.$router.replace({name: 'PotentialCustomerList', params: {id: this.userInfos.id}})
            }
        }
        this.showSubmit.isShow = false
      },
      submitInfos () {
        let params = {
          certification_type: this.convert(this.radio)
        }
        sendFiles(this.uploadData.clientCertificationId, params).then(res => {
          if (res.status === 200) {
            this.showSubmit.isShow = true
            this.showSubmit.isSuccess = 1
          }
        }).catch(err => {
          console.log('error: ' + err)
          this.showSubmit.isShow = true
          this.showSubmit.isSuccess = 2
          this.showSubmit.cont = '对不起！上传失败 请您重新上传资料'
        })
      }
    }
  }
</script>
<style lang="less">
  @import url("//unpkg.com/element-ui@2.3.9/lib/theme-chalk/index.css");

  .popup_box {
    .confirm_box {
      font-size: 0;
      width: 580px;
      height: 345px;
      box-sizing: border-box;
      text-align: center;
      padding-top: 20px;
      .icon_success {
        font-size: 70px;
        color: #74BA3B;
      }
      .icon_fail {
        font-size: 70px;
        color: #C61D1A;
      }
      .confirm_cont {
        font-family: PingFangSC-Regular;
        font-size: 30px;
        color: #333333;
        margin: 0 auto;
        margin-bottom: 50px;
        margin-top: 26px;
      }
      .fail {
        width: 270px;
        margin-bottom: 40px;
      }
      .confirm_btn {
        background: #2A7DC1;
        border-radius: 10px;
        display: inline-block;
        width: 280px;
        height: 80px;
        line-height: 80px;
        color: #f0f0f0;
        font-size: 36px;
        font-family: PingFangSC-Regular;
      }
    }
  }

  .mint-popup {
    border-radius: 10px;
  }

  .email_box1,
  .convert_box {
    width: 580px;
    height: 345px;
    text-align: center;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    .title {
      padding: 48px 0 31px;
      font-size: 30px;
      color: #666;
      text-align: center;
    }
    .email_address {
      width: 522px;
      height: 76px;
      box-sizing: border-box;
      border: 1px solid #999;
      margin: 0 auto;
      text-align: center;
      line-height: 76px;
      font-size: 30px;
      color: #666;
    }
    button {
      width: 280px;
      height: 80px;
      text-align: center;
      line-height: 80px;
      background-color: #2A7DC1;
      font-size: 36px;
      color: #f0f0f0;
      border-radius: 10px;
      margin-top: 33px;
    }
  }

  .convert_box {
    .title {
      padding: 91px 0 81px;
      line-height: 46px;
      color: #333;
    }
    button {
      width: 190px;
      margin: 0;
    }
    button.ensure {
      margin-right: 80px;
    }
  }

  .certified {
    height: 100%;
    background-color: #f5f5f5;
    .vux-header .vux-header-left .left-arrow {
      width: 24px;
      height: 37px;
    }
    .vux-header .vux-header-left .left-arrow:before {
      width: 22px;
      height: 22px;
    }
    .certified_cont {
      /*padding-top: 108px;*/
      .radio_box {
        padding: 0 20px;
        background-color: #fff;
        height: 165px;
        .radio_item.mint-radiolist .mint-cell {
          display: inline-block;
          position: absolute;
          .mint-radio-label {
            font-size: 28px;
            color: #666;
          }
        }
        .radio_item.mint-radiolist .mint-cell:nth-of-type(1) {
          left: 80px;
        }
        .radio_item.mint-radiolist .mint-cell:nth-of-type(2) {
          right: 135px;
        }
        .radio_item.mint-radiolist .mint-cell:last-child {
          background-image: none;
        }
        .radio_item {
          .mint-radiolist-title {
            display: block;
            font-size: 30px;
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
          background-image: none;
          -webkit-background-image: none;
        }
      }
      .email_box {
        background-color: #fff;
        padding: 0 20px;
        height: 82px;
        line-height: 82px;
        font-size: 30px;
        color: #333;
        i {
          vertical-align: bottom;
          font-size: 52px;
          position: absolute;
          right: 20px;
        }
      }
      .upload_file {
        background-color: #fff;
        padding-bottom: 47px;
        .upload {
          font-size: 24px;
          color: #666;
          padding: 0 20px;
          margin-bottom: 30px;
          /*text-align: center;*/
          /*padding-top: 39px;*/
          /*padding-bottom: 70px;*/
          .upload_tit {
            height: 70px;
            line-height: 70px;
            border-bottom: 1px solid #e1e1e1;
          }
          .cercode_box {
            width: 100%;
            height: 400px;
            .picker-items {
              /*height: 244px;*/
            }
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
                color: #2672ba;
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
            height: 82px;
            line-height: 82px;
            padding: 0 20px;
            padding-left: 0;
            /*border-bottom: 1px solid #ddd;*/
            span {
              /*font-size: 32px;*/
            }
            span.date_tit {
              /*color: #333;*/
            }
            span.date_time {
              /*color: #999;*/
              right: 56px;
              position: absolute;
            }
            i {
              position: absolute;
              right: 0;
              margin-right: 0;
              font-size: 55px !important;
              color: #C8C8CD;
            }
          }
        }
      }
      .submit_form {
        background-color: #f5f5f5;
        text-align: center;
        /*padding: 30px 0;*/
        margin-top: 181px;
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
    }
  }
</style>
