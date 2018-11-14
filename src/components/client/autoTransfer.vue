<template>
  <div class="autoTransfer certified">
    <x-header :left-options="{backText: ''}">投资者身份认证</x-header>
    <div class="certified_cont wrapper">
      <div class="space"></div>
      <div class="upload_file">
        <div class="upload">
          <div class="bl_box"><i class="border_left"></i>上传认证资料</div>
          <div class="time_box"
               @click="showCode">
            <span class="date_tit">认证原因</span>
            <div class="date_box">
              <div class="date_cont">
                <span :class="{'date_time': true, 'date_time1': changeClass}">{{reason}}</span>
                <i class="iconfont right_icon">&#xe8d5;</i>
              </div>
            </div>
          </div>
          <div class="bb"></div>
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
      <!--<div class="submit_form">-->
        <!--<button class="submit" @click="submitInfos">提交</button>-->
      <!--</div>-->
      <button class="next" @click="submitInfos">提 交</button>
    </div>
    <div class="popup_box">
      <!--<mt-popup v-model="showSubmit.isShow" closeOnclickModel="false">-->
        <!--<div class="confirm_box">-->
          <!--<i class="iconfont icon_success"-->
             <!--v-show="showSubmit.isSuccess != 2">&#xe60a;</i>-->
          <!--<i class="iconfont icon_fail"-->
             <!--v-show="showSubmit.isSuccess === 2">&#xe626;</i>-->
          <!--<div class="confirm_cont" :class="{'fail': showSubmit.isSuccess === 2}">{{showSubmit.cont}}</div>-->
          <!--<span class="confirm_btn" @click="popupConfirm(toRoute(showSubmit.isSuccess))">确 定</span>-->
        <!--</div>-->
      <!--</mt-popup>-->

      <mt-popup v-model="showSubmit.isShow"
                closeOnclickModel="false">
        <div class="confirm_box text-center popup">
          <img src="static/img/certify_right.png" v-show="showSubmit.isSuccess !== 2" alt="">
          <!-- <i class="iconfont icon_success"
             v-show="showSubmit.isSuccess !== 2">&#xe60a;</i> -->
          <img src="static/img/certify_wrong.png" v-show="showSubmit.isSuccess === 2" alt="">
          <!-- <i class="iconfont icon_fail"
             v-show="showSubmit.isSuccess === 2">&#xe626;</i> -->
          <div class="confirm_cont" :class="{'fail': showSubmit.isSuccess === 2}">{{showSubmit.cont}}<br>
            请您耐心等待审核结果！</div>
          <span class="confirm_btn" @click="popupConfirm(toRoute(showSubmit.isSuccess))">确 定</span>
        </div>
      </mt-popup>
    </div>
  </div>
</template>
<script>
  import {XHeader} from 'vux'
  import {Popup, Radio} from 'mint-ui'
  import {toast} from '@/common/js/filter'
  import {sendFiles, perfectInfos, getProReasons} from '@/service/api/customers'
  import camera from '@/base/clientCamera'
  export default {
    components: {
      XHeader,
      camera,
      'mt-popup': Popup,
      'mt-radio': Radio
    },
    data () {
      return {
        changeClass: false,
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
        reason: '请选择认证原因',
        apply_reason_id: null,
        reason_id: null,
        itemHeight: getComputedStyle(window.document.documentElement)['font-size'].split('px')[0] - 0,
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
        this.changeClass = true
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
          apply_reason: this.reason,
          apply_reason_id: this.reason_id
        }
        console.log(params)
        if (!params.apply_reason || !params.apply_reason_id) {
          toast('请选择认证原因')
          return false
        }
        sendFiles(this.uploadData.clientCertificationId, params).then(res => {
          if (res.status === 200) {
            this.showSubmit.isShow = true
            this.showSubmit.isSuccess = 1
          }
        })
      }
    }
  }
</script>
<style lang="less">
  @import url("//unpkg.com/element-ui@2.3.9/lib/theme-chalk/index.css");
  @import '../../common/style/variable';

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
        font-family: @font-family-R;
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
        font-family: @font-family-R;
      }
    }
  }

  .mint-popup {
    border-radius: 10px;
  }

  .certified {
    background-color: #f5f5f5;
    .vux-header .vux-header-left .left-arrow {
      width: 24px;
      height: 37px;
    }
    .vux-header .vux-header-left .left-arrow:before {
      width: 22px;
      height: 22px;
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
    .certified_cont {
      /*padding-top: 108px;*/
      .upload_file {
        background-color: #fff;
        padding-bottom: 47px;
        .upload {
          font-size: 24px;
          color: #666;
          /*padding: 0 20px;*/
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
                box-sizing: border-box;
                height: 56px;
                line-height: 56px;
                padding: 0 30px;
                color: #bd9d62;
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
            padding: 0 40px;
            .date_tit {
              font-family: @font-family-R;
              font-size: 30px;
              color: #4A4A4A;
            }
            .date_box {
              width: 68.5%;
              position: absolute;
              right: 0;
              height: 40px;
              top: 18px;
              .date_cont {
                position: relative;
                height: 40px;
                /*border: 1px solid #CCCCCC;*/
                /*border-radius: 8px;*/
                /*background-color: #f3f3f3;*/
              }
              span.date_time,
              span.date_time1 {
                font-family: @font-family-M;
                min-height: 40px;
                line-height: 40px;
                position: absolute;
                width: calc(100% - 70px);
                /*overflow-y: hidden;*/
                /*overflow-x: scroll;*/
                /*text-overflow: ellipsis;*/
                display: inline-block;
                /*white-space: nowrap;*/
                font-size: 30px;
                color: @font-color-4A;
              }
              span.date_time {
                text-align: right;
              }
              span.date_time1 {
                text-align: left;
              }
              i {
                position: absolute;
                right: 40px;
                top: -20px;
              }
            }
          }
        }
      }
    }
  }
</style>
