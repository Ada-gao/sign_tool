<template>
  <div class="perfect_infos" @touchmove="touchScreen">
    <x-header :left-options="{backText: ''}">实名认证</x-header>
    <group class="perfect_group wrapper">
      <div class="add_tit">
        <i class="iconfont">&#xe62c;</i>
        <span style="color: #2672ba">客户信息</span>
      </div>
      <div class="space"></div>
      <cell title="客户姓名：" :value="form.name"></cell>
      <div class="radio_box">
        <mt-radio
          class="radio_item"
          title="客户性别："
          v-model="form.gender"
          @change="radioChange"
          :options="['女', '男']">
        </mt-radio>
      </div>
      <cell title="客户编号：" :value="form.client_no"></cell>
      <cell title="手机号码：" :value="form.mobile + '(已认证)'" class="cell_mobile"></cell>
      <div class="space"></div>
      <div class="time_box" @click="showCode">
        <span class="date_tit">证件类型：</span>
        <span class="date_time">{{form.id_type}}</span>
        <i class="iconfont">&#xe731;</i>
      </div>
      <mt-popup v-model="showCerCode"
                position="bottom"
                class="cercode_box"
                popup-transition="popup-fade">
        <mt-picker :slots="slots"
                   :showToolbar="true"
                   :itemHeight="70"
                   :visibleItemCount="3"
                   @change="onValuesChange">
          <div class="toolbar">
            <span class="cancel" @click="cancelCerCode">取消</span>
            <span class="ensure" @click="ensureCerCode">确定</span>
          </div>
        </mt-picker>
      </mt-popup>
      <x-input title="证件号码："
               class="cell_id"
               v-model="form.id_no"
               ref="certificateCode"
               :show-clear="false"
               :max="50"
      ></x-input>
      <div class="time_box" @click="open('pickerStart')">
        <span class="date_tit">证件有效期起始时间：</span>
        <span class="date_time">{{id_start_date}}</span>
        <i class="iconfont">&#xe731;</i>
      </div>
      <mt-datetime-picker ref="pickerStart"
                          type="date"
                          :endDate="endDate"
                          :startDate="startDate"
                          :itemHeight="itemHeight"
                          class="datetime_picker"
                          year-format="{value} 年"
                          month-format="{value} 月"
                          date-format="{value} 日"
                          @confirm="dateConfirm1"
                          :value="id_start_date"></mt-datetime-picker>
      <div class="time_box" @click="open('pickerEnd')">
        <span class="date_tit">证件有效期结束时间：</span>
        <span class="date_time">{{id_expiration}}</span>
        <i class="iconfont">&#xe731;</i>
      </div>
      <mt-datetime-picker ref="pickerEnd"
                          type="date"
                          :endDate="endDate"
                          :startDate="startDate"
                          :itemHeight="itemHeight"
                          class="datetime_picker"
                          year-format="{value} 年"
                          month-format="{value} 月"
                          date-format="{value} 日"
                          @confirm="dateConfirm2"
                          :value="id_expiration"></mt-datetime-picker>
      <div class="time_box" @click="open('pickerDate')">
        <span class="date_tit">出生日期：</span>
        <span class="date_time">{{birthday}}</span>
        <i class="iconfont">&#xe731;</i>
      </div>
      <mt-datetime-picker ref="pickerDate"
                          type="date"
                          :endDate="endDate"
                          :startDate="startDate"
                          :itemHeight="itemHeight"
                          class="datetime_picker"
                          year-format="{value} 年"
                          month-format="{value} 月"
                          date-format="{value} 日"
                          @confirm="dateConfirm"
                          :value="birthday"></mt-datetime-picker>
      <x-input title="地址："
               v-model="form.address"
               ref="address"
               :show-clear="false"
               class="address"
               id="ipt"
      ></x-input>
      <div class="space"></div>
      <div class="upload">
        <div>证件信息</div>
      </div>
      <div class="upload_box">
        <camera class="upload_cont1"
                :popupVisible="popupVisible1"
                :imageSrc="form.id_front_url"
                :isFromBank="fromBank"
                :cerId="cerId"
                @showPopup="showPopup1"
                @imgHandler="imageHandler1"
                @hidePopup="hidePopup1"></camera>
        <camera class="upload_cont2"
                :popupVisible="popupVisible2"
                :imageSrc="form.id_back_url"
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
      <x-dialog v-model="submitDialog" class="dialog-demo quitDialog" hide-on-blur>
        <i class="iconfont submit_i">&#xe617;</i>
        <div class="submit_cont">{{submitCont}}</div>
        <x-button class="submit_btn" type="primary" @click.native="routerPush">返回潜客详情</x-button>
      </x-dialog>
    </group>
  </div>
</template>

<script>
  import {XHeader, Group, Cell, XInput, Datetime, PopupPicker, XDialog, XButton} from 'vux'
  import {uploadId, perfectInfos} from '@/service/api/customers'
  import camera from '@/base/camera/camera'
  import {formatDate} from '@/common/js/date'
  import {getStore, setStore, removeStore} from '@/config/mUtils'
//  import {idcardValidate, toast} from '@/common/js/filter'
  import {toast} from '@/common/js/filter'

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
        submitDialog: false,
        submitCont: '认证提交待审核中…',
        form: {},
        id_start_date: '',
        id_expiration: '',
        birthday: '',
        cerId: null,
        num: 1,
        isMod: -1,
        minYear: 1900,
        maxYear: 3000,
        timer: null,
        gender: null,
        showCerCode: false,
        endDate: new Date(2100, 0, 1),
        startDate: new Date(1960, 0, 1),
        client_certification_id: 0,
        alertCont: '还有信息没填哦～',
        isSubmit: null,
        popupVisible1: false,
        popupVisible2: false,
        fromBank: 1,
        itemHeight: 70,
        visibleItemCount: 3,
        slots: [
          {
            flex: 1,
            values: ['请选择', '身份证', '护照', '军官证', '台胞证', '港澳通行证', '其他'],
            className: 'slot1',
            textAlign: 'center'
          }
        ],
        idType: ''
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        removeStore('perInfos')
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
        removeStore('perInfos')
      } else if (to.name === 'Bankcard') {
        let idType = ''
        idType = this.slots[0].values.indexOf(this.form.id_type) - 1
        let perInfos = {
          birthday: this.birthday,
          address: this.form.address,
          gender: this.form.gender,
          id_no: this.form.id_no,
          id_start_date: this.id_start_date,
          id_expiration: this.id_expiration,
          id_front_url: this.form.id_front_url,
          id_back_url: this.form.id_back_url,
          id_type: idType
        }
        setStore('perInfos', perInfos)
      }
      next()
    },
    mounted () {
      this.form = JSON.parse(getStore('selfInfos'))
      this.isSubmit = this.$route.params.isSubmit
      let perInfos = JSON.parse(getStore('perInfos'))
      if (perInfos) {
        this.form.gender = perInfos.gender
        this.birthday = perInfos.birthday
        this.id_start_date = perInfos.id_start_date
        this.id_expiration = perInfos.id_expiration
        this.form.id_no = perInfos.id_no
        this.form.address = perInfos.address
        this.form.id_front_url = perInfos.id_front_url
        this.form.id_back_url = perInfos.id_back_url
        this.form.id_type = this.slots[0].values[perInfos.id_type + 1]
      }
    },
    methods: {
      touchScreen () {
        document.getElementById('ipt').blur()
      },
      radioChange (value) {
        this.gender = value
      },
      onValuesChange (picker, values) {
        this.idType = values[0]
        console.log(this.idType)
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
        this.form.id_type = this.idType
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
        this.birthday = this.formatDate(val)
      },
      dateConfirm1 (val) {
        clearTimeout(this.timer)
        this.id_start_date = this.formatDate(val)
      },
      dateConfirm2 (val) {
        clearTimeout(this.timer)
        this.id_expiration = this.formatDate(val)
      },
      imageHandler1 (data) {
        this.form.id_front_url = data
      },
      imageHandler2 (data) {
        this.form.id_back_url = data
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
      routerPush () {
        this.$router.push({name: 'PotentialCustomerList', params: {id: this.form.client_id}})
      },
      submitInfos () {
        let idType = ''
        idType = this.slots[0].values.indexOf(this.form.id_type) - 1 + ''
        let gender = ''
        if (this.form.gender || this.gender) {
          gender = (this.form.gender || this.gender) === '男' ? '0' : '1'
        }
        let params = {
          gender: gender,
          client_id: this.form.client_id,
          client_class: this.form.client_class,
          client_type: this.form.client_type,
          birthday: this.birthday,
          address: this.form.address,
          id_type: idType,
          id_no: this.form.id_no,
          id_start_date: this.id_start_date,
          id_expiration: this.id_expiration,
          id_front_url: this.form.id_front_url,
          id_back_url: this.form.id_back_url
        }
//        if (params.id_no) {
//          if (params.id_type === '0' && !idcardValidate(params.id_no).stat) {
//            this.alertCont = '请输入有效的证件号码'
//            toast(this.alertCont)
//            return false
//          }
//        } else
        if (!params.gender) {
          this.alertCont = '请选择性别'
          toast(this.alertCont)
          return false
        }
        if (!params.birthday ||
            !params.gender ||
            !params.address ||
            !params.id_no ||
            !params.id_start_date ||
            !params.id_expiration ||
            !params.id_front_url ||
            !params.id_back_url) {
          toast(this.alertCont)
          return false
        }
        uploadId(this.client_certification_id, params).then(res => {
          if (res.status === 200) {
            this.submitDialog = true
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
  .radio_box {
    padding: 0 20px;
    background-color: #fff;
    height: 82px;
    line-height: 82px;
    border-bottom: 1px solid #ccc;
    .radio_item.mint-radiolist .mint-cell {
      display: inline-block;
      position: absolute;
      height: 82px;
      // padding: 20px 0;
      .mint-cell-wrapper{
        height: 100%;
        line-height: 100%;
      }
      .mint-radio-label {
        font-size: 28px;
        color: #666;
      }
    }
    // .radio_item.mint-radiolist .mint-cell:nth-of-type(1) {
    //   left: 80px;
    // }
    .radio_item.mint-radiolist .mint-cell:nth-of-type(2) {
      // right: 135px;
      margin-left: 200px;
    }
    .radio_item.mint-radiolist .mint-cell:last-child {
      background-image: none;
    }
    .radio_item {
      .mint-radiolist-title {
        font-size: 30px;
        color: #333;
        line-height: 42px;
        // padding: 20px 0 20px;
        margin: 0;
        display: inline-block;
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
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
      }
    }
    .mint-cell-wrapper {
      background-image: none;
      -webkit-background-image: none;
    }
  }
  .perfect_infos {
    .cercode_box {
      width: 100%;
      height: 300px;
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
        font-family: PingFangSC-Regular;
        .quit {
          margin-top: 85px;
          margin-bottom: 75px;
          font-size: 36px;
          color: #333333;
        }
        .weui-btn.weui-btn_primary {
          display: inline-block;
          background: #2A7DC1;
          border-radius: 10px;
          width: 190px;
          height: 80px;
          line-height: 80px;
          font-size: 36px;
          color: #F0F0F0;
        }
        .submit_i,
        .submit_cont,
        .weui-btn.weui-btn_primary.submit_btn {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }
        .submit_i {
          font-size: 63px;
          top: 40px;

        }
        .submit_cont {
          font-size: 30px;
          color: #333333;
          top: 50%;
          transform: translateY(-50%);
          width: 100%;
          left: 0;
        }
        .weui-btn.weui-btn_primary.submit_btn {
          width: 280px;
          bottom: 32px;
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
      font-size: 0;
      .upload_cont1,
      .upload_cont2 {
        display: inline-block;
        position: relative;
        /*width: 270px;*/
        width: 42%;
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
        /*right: 165px;*/
        right: 180px;
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
