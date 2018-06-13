<template>
  <div class="perfect_infos">
    <x-header :left-options="{backText: ''}">客户认证</x-header>
    <group class="perfect_group wrapper">
      <div class="add_tit">
        <i class="iconfont">&#xe62c;</i>
        <span style="color: #2672ba">客户信息</span>
      </div>
      <div class="space"></div>
      <cell title="客户姓名：" :value="name"></cell>
      <cell title="国籍：" :value="nationality"></cell>
      <cell title="常住中国城市：" :value="city" v-if="nationality === '中国'"></cell>
      <cell title="手机号码：" :value="mobile" class="cell_mobile"></cell>
      <x-input title="地址："
               v-model="address"
               ref="address"
               :show-clear="false"
               class="address"
      ></x-input>
      <div class="space"></div>
      <div class="time_box" @click="open('pickerDate')">
        <span class="date_tit">出生日期：</span>
        <span class="date_time">{{datetime}}</span>
        <i class="iconfont">&#xe731;</i>
      </div>
      <mt-datetime-picker ref="pickerDate"
                          type="date"
                          :endDate="endDate"
                          :startDate="startDate"
                          class="datetime_picker"
                          year-format="{value} 年"
                          month-format="{value} 月"
                          date-format="{value} 日"
                          @confirm="dateConfirm"
                          :value="datetime"></mt-datetime-picker>
      <div class="space"></div>
      <!--<popup-picker title="证件类型："-->
      <!--class="cell_certificate"-->
      <!--:data="certificationList"-->
      <!--v-model="certificationValue"></popup-picker>-->
      <div class="time_box" @click="showCode">
        <span class="date_tit">证件类型：</span>
        <span class="date_time">{{certificationValue}}</span>
        <i class="iconfont">&#xe731;</i>
      </div>
      <mt-popup v-model="showCerCode"
                position="bottom"
                class="cercode_box"
                popup-transition="popup-fade">
        <mt-picker :slots="slots"
                   :showToolbar="true"
                   @change="onValuesChange">
          <div class="toolbar">
            <span class="cancel" @click="cancelCerCode">取消</span>
            <span class="ensure" @click="ensureCerCode">确定</span>
          </div>
        </mt-picker>
      </mt-popup>
      <x-input title="证件号码："
               class="cell_id"
               v-model="certificateNumber"
               ref="certificateCode"
               :show-clear="false"
               :max="50"
      ></x-input>
      <div class="time_box" @click="open('pickerStart')">
        <span class="date_tit">证件有效期起始时间：</span>
        <span class="date_time">{{starttime}}</span>
        <i class="iconfont">&#xe731;</i>
      </div>
      <mt-datetime-picker ref="pickerStart"
                          type="date"
                          :endDate="endDate"
                          :startDate="startDate"
                          class="datetime_picker"
                          year-format="{value} 年"
                          month-format="{value} 月"
                          date-format="{value} 日"
                          @confirm="dateConfirm1"
                          :value="starttime"></mt-datetime-picker>
      <div class="time_box" @click="open('pickerEnd')">
        <span class="date_tit">证件有效期结束时间：</span>
        <span class="date_time">{{endtime}}</span>
        <i class="iconfont">&#xe731;</i>
      </div>
      <mt-datetime-picker ref="pickerEnd"
                          type="date"
                          :endDate="endDate"
                          :startDate="startDate"
                          class="datetime_picker"
                          year-format="{value} 年"
                          month-format="{value} 月"
                          date-format="{value} 日"
                          @confirm="dateConfirm2"
                          :value="endtime"></mt-datetime-picker>
      <div class="space"></div>
      <div class="upload">
        <div>证件信息：&nbsp;<span>（请上传清晰的原件或复印件）</span></div>
      </div>
    </group>
    <div class="upload_box">
      <camera class="upload_cont1"
              :popupVisible="popupVisible1"
              :isFromBank="fromBank"
              :cerId="cerId"
              @showPopup="showPopup1"
              @imgHandler="imageHandler1"
              @hidePopup="hidePopup1"></camera>
      <camera class="upload_cont2"
              :popupVisible="popupVisible2"
              :isFromBank="fromBank"
              :cerId="cerId"
              @imgHandler="imageHandler2"
              @showPopup="showPopup2"
              @hidePopup="hidePopup2"></camera>
      <span class="front_class">正面</span>

      <span class="back_class">反面</span>
    </div>
    <div class="space"></div>
    <div class="myBank" :class="{'grayMyBank': isSubmit}" @click="toLink">
      <span>银行卡（非必填项）</span>
      <i class="iconfont">&#xe731;</i>
    </div>
    <div class="submit_form">
      <button class="submit" @click="submitInfos">提交</button>
    </div>
    <!--<alert v-model="alertMsg" :content="alertCont"></alert>-->

    <x-dialog v-model="alertMsg" class="dialog-demo quitDialog" hide-on-blur>
      <div class="quit">{{alertCont}}</div>
      <x-button type="primary" @click.native="hideAlert">确 定</x-button>
    </x-dialog>
  </div>
</template>

<script>
  import {XHeader, Group, Cell, XInput, Datetime, PopupPicker, XDialog, XButton} from 'vux'
  import {uploadId, perfectInfos} from '@/service/api/customers'
  import camera from '@/base/camera/camera'
  import {formatDate} from '@/common/js/date'
  import {getStore, setStore} from '@/config/mUtils'

  export default {
    name: 'PerfectInfos',
    components: {
      XHeader,
      Group,
      Cell,
      XInput,
      Datetime,
      PopupPicker,
      XDialog,
      XButton,
      camera
    },
    data () {
      return {
        cerId: null,
        num: 1,
        isMod: -1,
        address: '',
        client_id: '',
        client_class: '',
        client_type: '',
        name: '',
        nationality: '',
        mobile: '',
        city: '',
        datetime: '',
        starttime: '',
        endtime: '',
        minYear: 1900,
        maxYear: 3000,
        timer: null,
        showCerCode: false,
        endDate: new Date(2100, 0, 1),
        startDate: new Date(1960, 0, 1),
        client_certification_id: 0,
        certificationValue: [],
        certificateNumber: '',
        idImages: {
          front: '',
          back: ''
        },
//        certificationList: [['身份证', '护照', '军官证', '台胞证', '港澳通行证', '其他']],
        alertMsg: false,
        alertCont: '还有信息没填哦～',
        isSubmit: null,
        popupVisible1: false,
        popupVisible2: false,
        fromBank: 1,
        slots: [
          {
            flex: 1,
            values: ['', '身份证', '护照', '军官证', '台胞证', '港澳通行证', '其他'],
            className: 'slot1',
            textAlign: 'center'
          }
        ]
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
//        console.log(vm.name)
        let info = JSON.parse(getStore('selfInfos'))
        vm.client_certification_id = info.client_certification_id
        if (!info.client_certification_id) {
          perfectInfos({client_id: info.client_id}).then(res => {
            info.client_certification_id = res.data.client_certification_id
            vm.client_certification_id = res.data.client_certification_id
            setStore('selfInfos', info)
          })
        }
      })
    },
    beforeRouteLeave (to, from, next) {
      let info = JSON.parse(getStore('selfInfos'))
      if (to.name === 'PotentialCustomerList') {
        info.client_certification_id = 0
        setStore('selfInfos', info)
      }
      next()
    },
//    activated () {
//        console.log('activated...')
//      let info = JSON.parse(getStore('selfInfos'))
//      this.isSubmit = this.$route.params.isSubmit
//      this.name = info.name
//      this.nationality = info.nationality === '0' ? '中国' : '其他'
//      this.city = info.city
//      this.mobile = info.mobile
//      this.client_id = info.client_id
//      this.client_class = info.client_class
//      this.client_type = info.client_type
//    },
    mounted () {
        console.log('mounted...')
      let info = JSON.parse(getStore('selfInfos'))
      this.isSubmit = this.$route.params.isSubmit
      this.name = info.name
      this.nationality = info.nationality === '0' ? '中国' : '其他'
      this.city = info.city
      this.mobile = info.mobile
      this.client_id = info.client_id
      this.client_class = info.client_class
      this.client_type = info.client_type
    },
    methods: {
      onValuesChange (picker, values) {
        this.certificationValue = values[0]
      },
      showCode () {
        this.$refs.address.blur()
        this.$refs.certificateCode.blur()
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
        clearTimeout(this.timer)
        this.showCerCode = false
      },
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date)
      },
      open (picker) {
        this.$refs.address.blur()
        this.$refs.certificateCode.blur()
        this.timer = null
        this.timer = setTimeout(() => {
          this.$refs[picker].open()
        }, 600)
      },
      dateConfirm (val) {
        clearTimeout(this.timer)
        this.datetime = this.formatDate(val)
      },
      dateConfirm1 (val) {
        clearTimeout(this.timer)
        this.starttime = this.formatDate(val)
      },
      dateConfirm2 (val) {
        clearTimeout(this.timer)
        this.endtime = this.formatDate(val)
      },
      hideAlert () {
        this.alertMsg = false
      },
      imageHandler1 (data) {
        this.idImages.front = data
      },
      imageHandler2 (data) {
        this.idImages.back = data
      },
      showPopup1 (data) {
        this.popupVisible1 = data
      },
      hidePopup1 (data) {
        this.popupVisible1 = data
      },
      showPopup2 (data) {
        this.popupVisible2 = data
      },
      hidePopup2 (data) {
        this.popupVisible2 = data
      },
      toLink () {
        this.$router.push({name: 'Bankcard'})
      },
      submitInfos () {
        let idType = ''
        switch (this.certificationValue) {
//          ['身份证', '护照', '军官证', '台胞证', '港澳通行证', '其他']
          case '身份证':
            idType = '0'
            break
          case '护照':
            idType = '1'
            break
          case '军官证':
            idType = '2'
            break
          case '台胞证':
            idType = '3'
            break
          case '港澳通行证':
            idType = '4'
            break
          case '其他':
            idType = '5'
            break
        }
        let params = {
          client_id: this.client_id,
          client_class: this.client_class,
          client_type: this.client_type,
          birthday: this.datetime,
          address: this.address,
          id_type: idType,
          id_no: this.certificateNumber,
          id_start_date: this.starttime,
          id_expiration: this.endtime,
          id_front_url: this.idImages.front,
          id_back_url: this.idImages.back
        }
//        console.log(params)
//        console.log('cerId' + this.client_certification_id)
        if (!params.birthday ||
          !params.address ||
          !params.id_no ||
          !params.id_start_date ||
          !params.id_expiration ||
          !params.id_front_url ||
          !params.id_back_url) {
          this.alertMsg = true
          return false
        }
        uploadId(this.client_certification_id, params).then(res => {
          if (res.status === 200) {
            this.$router.push({name: 'PotentialCustomerList', params: {id: this.client_id}})
          }
        })
      }
    }
  }
</script>

<style lang="less">
  a:hover {
    text-decoration: none;
  }

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

  .perfect_infos {
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
      border-bottom: 1px solid #ddd;
      span {
        font-size: 32px;
      }
      span.date_tit {
        color: #333;
      }
      span.date_time {
        color: #999;
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
    .datetime_picker {
      .picker-toolbar {
        padding: 0 30px;
        height: 66px;
        .mint-datetime-action {
          height: 66px;
          line-height: 66px;
          font-size: 34px;
        }
        .mint-datetime-cancel {
          text-align: left;
        }
        .mint-datetime-confirm {
          text-align: right;
        }
      }
    }
    .verificate {
      display: inline-block;
      height: 40px;
      line-height: 40px;
      background-color: #2672ba;
      color: #f0f0f0;
      width: 140px;
      font-size: 22px;
      text-align: center;
      border-radius: 10px;
      vertical-align: middle;
    }
    .quitDialog,
    .msg_dialog {
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
        .weui-btn.weui-btn_primary {
          display: inline-block;
          background: #2A7DC1;
          border-radius: 10px;
          width: 190px;
          height: 80px;
          font-family: PingFangSC-Medium;
          font-size: 36px;
          color: #F0F0F0;
        }
      }
    }
    .msg_dialog {
      .weui-dialog {
        height: 330px;
      }
      .msg_title {
        color: #333;
        font-size: 30px;
        margin: 30px auto;
      }
      .msg_ipt {
        font-size: 30px;
        color: #333;
        text-align: center;
        border-color: #999;
        display: block;
        margin: 0 auto;
        width: 300px;
        height: 60px;
        margin-bottom: 30px;
      }
    }

    .myBank {
      background-color: #fff;
      height: 82px;
      line-height: 82px;
      padding: 0 20px;
      font-size: 32px;
      color: #333;
      position: relative;
      i {
        position: absolute;
        right: 0;
        font-size: 66px;
        color: #C8C8CD;
      }
    }
    .grayMyBank {
      color: #b2b2b2;
      i {
        color: #b2b2b2;
      }
    }
    .space {
      height: 20px;
      background-color: #f5f5f5;
    }
    .add_tit {
      line-height: 80px;
      padding-left: 20px;
    }
    .weui-cells .weui-cell {
      padding: 0 20px;
      line-height: 82px;
      height: 82px;
      color: #333;
      border-bottom: 1px solid #ddd;
    }
    .weui-cells .weui-cell.address {
      height: 130px;
      align-items: flex-start;
      .weui-cell__ft {
        display: none;
      }
      .vux-label {
        color: #333;
      }
    }
    .weui-cells:after {
      border-bottom: none;
    }
    .upload div {
      line-height: 82px;
      padding-left: 20px;
      color: #333;
      border-bottom: 1px solid #D9D9D9;
      span {
        color: #999;
      }
    }
    .upload_box {
      background-color: #fff;
      height: 333px;
      padding: 51px 60px;
      padding-bottom: 0;
      position: relative;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      .upload_cont1,
      .upload_cont2 {
        display: inline-block;
        position: relative;
        width: 270px;
        height: 180px;
        background-color: #ddd;
        line-height: 180px;
        text-align: center;
        .icon_bg {
          font-size: 115px;
          color: #fff;
        }
      }
      .upload_cont1:first-child,
      .upload_cont2:first-child {
        margin-right: 80px;
      }
      .front_class {
        font-size: 30px;
        color: #333;
        position: absolute;
        left: 165px;
        top: 240px;
      }
      .back_class {
        top: 240px;
        font-size: 30px;
        color: #333;
        position: absolute;
        right: 165px;
      }
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

    .cell_mobile {
      a {
        color: #999;
      }
    }
    .address input.weui-input {
      color: #999;
      text-align: right;
    }
    .cell_certificate {
    }
    .cell_id {
      .weui-input {
        color: #999;
        text-align: right;
      }
    }
  }

  .dp-container {
    .dp-header {
      padding: 10px;
      height: 44px;
      line-height: 44px;
      .dp-item.dp-right {
        color: #2672BA;
        margin-right: 15px;
      }
      .dp-item {
        font-size: 32px;
      }
      &:after {
        content: " ";
        position: absolute;
        left: 0;
        right: 0;
        top: 54px;
        height: 1px;
        border-bottom: 1px solid #d9d9d9;
        color: #C7C7C7;
        -webkit-transform-origin: 0 100%;
        transform-origin: 0 100%;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
      }
    }
    .scroller-item {
      font-size: 34px;
    }
  }

  .vux-picker {
    .scroller-component {
      .scroller-content {
        .scroller-item {
          font-size: 34px;
        }
      }
    }
  }

  .vux-datetime p {
    color: #333;
  }
</style>
