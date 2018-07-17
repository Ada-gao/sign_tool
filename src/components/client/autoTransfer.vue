<template>
  <div class="autoTransfer certified">
    <x-header :left-options="{backText: ''}">客户认证</x-header>
    <div class="certified_cont wrapper">
      <div class="upload_file">
        <div class="upload">
          <div class="upload_tit">上传认证资料</div>
          <div class="time_box"
               @click="showCode">
            <span class="date_tit">认证原因：</span>
            <span class="date_time">{{reason}}</span>
            <i class="iconfont">&#xe731;</i>
          </div>
          <mt-popup v-model="showCerCode"
                    position="bottom"
                    class="cercode_box"
                    popup-transition="popup-fade">
            <mt-picker :slots="slots"
                       value-key="apply_reason"
                       :itemHeight="itemHeight"
                       :showToolbar="true"
                       @change="onValuesChange">
              <div class="toolbar">
                <span class="cancel" @click="cancelCerCode">取消</span>
                <span class="ensure" @click="ensureCerCode">确定</span>
              </div>
            </mt-picker>
          </mt-popup>
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
  import {sendFiles, perfectInfos, getProReasons} from '@/service/api/customers'
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
        type: '',
        uploadData: {
          clientCertificationId: '',
          card_front_url: '',
          fileId: ''
        },
        client_id: null,
        beforeRouteName: '',
        showCerCode: false,
        apply_reason: '',
        reason: '',
        apply_reason_id: null,
        reason_id: null,
        itemHeight: 60,
        slots: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'center'
          }
        ]
      }
    },
    mounted () {
      this.client_id = this.$route.params.id
      this.getClientCerId({client_id: this.client_id})
    },
    methods: {
      getClientCerId (params) {
        perfectInfos(params).then(res => {
          if (res.status === 200) {
            this.uploadData.clientCertificationId = res.data.client_certification_id
          }
        })
        getProReasons().then(res => {
          if (res.status === 200) {
            for (let value of res.data) {
              this.slots[0].values.push(value)
            }
          }
        })
      },
      showCode () {
        this.showCerCode = true
      },
      cancelCerCode () {
        this.showCerCode = false
      },
      ensureCerCode (val) {
        this.reason = this.apply_reason
        this.reason_id = this.apply_reason_id
        this.showCerCode = false
      },
      onValuesChange (picker, values) {
        if (values[0] !== undefined) {
          this.apply_reason = values[0].apply_reason
          this.apply_reason_id = values[0].apply_reason_id
        }
      },
      showCamera (data) {
        this.popupVisible = data
      },
      hideCamera (data) {
        this.popupVisible = data
      },
      ensure () {
      },
      popupConfirm (fn) {
        if (fn) {
          fn()
        }
      },
      toRoute (status) {
        this.showSubmit.isShow = false
        if (status === 1) {
          this.$router.replace({name: 'HomePage'})
        }
      },
      submitInfos () {
        let params = {
          certification_type: '1',
          apply_reason: this.apply_reason,
          apply_reason_id: this.apply_reason_id
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
              width: 400px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
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
        margin-top: 133px;
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
