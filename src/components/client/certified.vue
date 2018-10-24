<template>
  <div class="certified">
    <x-header :left-options="{backText: '', preventGoBack:true}"
              @on-click-back="toLink(id)">投资者身份认证
    </x-header>
    <div class="certified_cont wrapper">
      <div class="space"></div>
      <div class="radio_box">
        <!--<div class="type">投资者类型：</div>-->
        <div class="bl_box"><i class="border_left"></i>投资者类型：</div>
        <mt-radio
          class="radio_item"
          title=""
          v-model="radio"
          @change="changeRadio"
          :options="['普通投资者', '专业投资者']">
        </mt-radio>
      </div>
      <div class="space"></div>
      <div class="cell_box cell_box1"
           @click="showPopup">
        <span class="cell_left">附件发送到理财师邮箱：</span>
        <span class="cell_right">
              <span>发送</span>
              <i class="iconfont right_icon">&#xe8d5;</i>
            </span>
      </div>
      <div class="space"></div>
      <div class="upload_file">
        <div class="upload">
          <!--<div class="upload_tit">上传认证资料</div>-->
          <div class="bl_box"><i class="border_left"></i>{{this.showSelect ? "上传认证资料" : "上传风险测评问卷"}}</div>
          <div class="time_box"
               v-if="showSelect"
               @click="showCode">
              <span class="date_tit">认证原因</span>
            <div class="date_box">
              <div class="date_cont">
                <span class="date_time">{{reason}}</span>
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

      <mt-popup v-model="showEmailBox"
                class="mobile_popup"
                closeOnClickModal="false">
        <div class="transfer_tit">附件材料发送到您的邮箱</div>
        <div class="transfer_tip">邮箱：{{userInfos.emailAddress}}</div>
        <div class="btns">
          <span class="cancel" @click="showEmailBox = false">取消</span>
          <span class="ensure" @click="hidePopup">确定</span>
        </div>
      </mt-popup>
      <mt-popup v-model="showConvertBox"
                class="mobile_popup"
                closeOnClickModel="false">
        <div class="transfer_tit">确定要变成{{radio}}吗？</div>
        <div class="btns">
          <span class="cancel" @click="cancel">取消</span>
          <span class="ensure" @click="ensure">确定</span>
        </div>
      </mt-popup>
      <mt-popup v-model="showSubmit.isShow"
                closeOnclickModel="false">
        <div class="confirm_box text-center popup">
          <img src="static/img/certify_right.png" v-show="showSubmit.isSuccess !== 2" alt="">
          <!-- <i class="iconfont icon_success"
             v-show="showSubmit.isSuccess !== 2">&#xe60a;</i> -->
          <img src="static/img/certify_wrong.png" v-show="showSubmit.isSuccess === 2" alt="">
          <!-- <i class="iconfont icon_fail"
             v-show="showSubmit.isSuccess === 2">&#xe626;</i> -->
          <div class="confirm_cont" :class="{'fail': showSubmit.isSuccess === 2}">您的认证已提交！<br>
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
  import {sendEmail, sendFiles, perfectInfos, checkCusomersDetail, getProReasons} from '@/service/api/customers'
  import {getStore} from '@/config/mUtils'
  import {toast} from '@/common/js/filter'
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
        showSubmit: {
          isShow: false,
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
        showCerCode: false,
        showSelect: false, // 是否显示'认证原因select框'
        flag: false, // 是否已经请求过专业投资者认证原因列表
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
          this.showSelect = true
          getProReasons().then(res => {
            if (res.status === 200) {
              this.flag = true
              for (let value of res.data) {
                this.slots[0].values.push(value)
              }
            }
          })
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
            getProReasons().then(res => {
              if (res.status === 200) {
                this.flag = true
                for (let value of res.data) {
                  this.slots[0].values.push(value)
                }
              }
            })
          }
        })
      }
      perfectInfos({client_id: id}).then(res => {
        if (res.status === 200) {
          this.uploadData.clientCertificationId = res.data.client_certification_id
//          console.log('certified：' + this.uploadData.clientCertificationId)
        }
      })
      this.userInfos.emailAddress = JSON.parse(getStore('data')).email
    },
    beforeRouteEnter (to, from, next) {
      console.log('from', from)
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
      toLink (id) {
        console.log('before', this.beforeRouteName)
        if (this.beforeRouteName === 'CustomerManagement') {
          this.$router.push({name: 'CustomerManagement', params: {id: id}})
        } else {
          this.$router.push({name: 'PotentialCustomerList', params: {id: id}})
        }
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
        console.log(this.radio)
        if (this.radio === '专业投资者') {
          this.showSelect = true
        } else {
          this.showSelect = false
          this.reason = ''
        }
        if (this.radio === '专业投资者' && !this.flag) {
          getProReasons().then(res => {
            if (res.status === 200) {
              this.flag = true
              for (let value of res.data) {
                this.slots[0].values.push(value)
              }
            }
          })
        }
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
        if (params.certification_type === '1') {
          params.apply_reason = this.reason
          params.apply_reason_id = this.reason_id
          if (!params.apply_reason || !params.apply_reason_id) {
            toast('请选择认证原因')
            return false
          }
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
  .mobile_popup {
    top: 35%;
    border-radius: 8px;
    width: 74.67%;
    padding-top: 34px;
    font-family: @font-family-R;
    font-size: 26px;
    color: #4A4A4A;
    text-align: center;
    .transfer_tit {
      font-family: @font-family-M;
      font-size: 36px;
      color: #000000;
      margin-bottom: 15px;
    }
    .transfer_tip {
      font-family: @font-family-M;
      font-size: 30px;
      color: #888888;
    }
    .btns {
      height: 100px;
      line-height: 100px;
      width: 100%;
      font-size: 0;
      border-top: 1px solid #D2D3D5;
      margin-top: 30px;
      span {
        width: 50%;
        text-align: center;
        display: inline-block;
        font-size: 32px;
      }
      span:nth-of-type(1) {
        color: #9B9B9B;
        border-right: 1px solid #9b9b9b;/*no*/
        box-sizing: border-box;
      }
      span:nth-of-type(2) {
        color: @new-font-color;
      }
    }
  }

  .mint-popup .confirm_box.popup {
    border-radius: 8px;
    width: 560px;
    height: 593px;
    padding-top: 40px;
    font-family: @font-family-R;
    font-size: @font-size-thirtyT;/*px*/
    color: #4A4A4A;
    img{
      width: 283px;
    }
    .confirm_cont{
      margin: 30px 0;
      line-height: 45px;
    }
    .confirm_btn{
      border-top: 1px solid #D2D3D5;/*px*/
      display: inline-block;
      width: 100%;
      font-size: @font-size-thirtyS;/*px*/
      color: @text-font-color;
      line-height: 100px;
      background: #fff;
    }
  }
  .mint-popup {
    border-radius: 10px;
  }

  .certified {
    height: 100%;
    background-color: #f5f5f5;
    .cell_box1 {
      background: #fff;
      font-size: 30px;
      font-family: @font-family-R;
      .cell_left {
        color: #4a4a4a;
      }
      .cell_right {
        span {
          font-size: 30px;
          color: #3377FF;
        }
      }
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
        /*padding: 0 20px;*/
        background-color: #fff;
        height: 165px;
        .radio_item.mint-radiolist .mint-cell {
          display: inline-block;
          position: absolute;
          .mint-radio-label {
            font-size: 28px;
            color: #4a4a4a;
            font-family: @font-family-M;
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
            display: none;
          }
          .mint-radio-core {
            width: 28px;
            height: 28px;
            border-radius: 100%;
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
          line-height: 0;
          height: auto;
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
          font-size: 30px;
          color: #666;
          /*padding: 0 40px;*/
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
            min-height: 100px;
            line-height: 82px;
            padding: 0 40px;
            .date_box {
              width: 68.5%;
              position: absolute;
              right: 0;
              min-height: 40px;
              top: 18px;
              .date_cont {
                position: relative;
                min-height: 40px;
                /*border: 1px solid #CCCCCC;*/
                /*border-radius: 8px;*/
                /*background-color: #f3f3f3;*/
              }
              span.date_time {
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
                text-align: right;
                font-size: 30px;
                color: @font-color-4A;
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
