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
      <cell title="手机号码：" :value="mobile"></cell>
      <x-input title="地址："
               v-model="address"
               ref="address"
               :show-clear="false"
               is-type="china-name"
               class="address"
      ></x-input>
      <div class="space"></div>
      <datetime
        v-model="datetime"
        :min-year="minYear"
        :max-year="maxYear"
        title="出生日期："></datetime>
      <div class="space"></div>
      <popup-picker title="证件类型："
                    :data="certificationList"
                    v-model="certificationValue"></popup-picker>
      <x-input title="证件号码："
               v-model="certificateNumber"
               ref="certificateCode"
               :show-clear="false"
      ></x-input>
      <datetime
        v-model="starttime"
        title="证件有效期起始时间："></datetime>
      <datetime
        v-model="endtime"
        :min-year="minYear"
        :max-year="maxYear"
        title="证件有效期结束时间："></datetime>
      <div class="space"></div>
      <div class="upload">
        <div>证件信息：&nbsp;<span>（请上传清晰的原件或复印件）</span></div>
      </div>
    </group>

    <div class="upload_box">
      <camera class="upload_cont1"
              :popupVisible="popupVisible1"
              :isFromBank="fromBank"
              @showPopup="showPopup1"
              @imgHandler="imageHandler1"
              @hidePopup="hidePopup1"></camera>
      <camera class="upload_cont2"
              :popupVisible="popupVisible2"
              :isFromBank="fromBank"
              @imgHandler="imageHandler2"
              @showPopup="showPopup2"
              @hidePopup="hidePopup2"></camera>
      <span class="front_class">正面</span>

      <span class="back_class">反面</span>
    </div>
    <div class="space"></div>
    <div class="myBank" :class="{'grayMyBank': isSubmit}" @click="toLink">
      <span>银行卡</span>
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
        client_certification_id: 0,
        certificationValue: [],
        certificateNumber: '',
        idImages: {
          front: '',
          back: ''
        },
        certificationList: [['身份证', '护照', '军官证', '台胞证', '港澳通行证', '其他']],
        alertMsg: false,
        alertCont: '还有信息没填哦～',
        isSubmit: null,
        popupVisible1: false,
        popupVisible2: false,
        fromBank: 1
      }
    },
    mounted () {
      let obj = {}
      let info = JSON.parse(getStore('selfInfos'))
      obj.client_id = info.client_id
      obj.client_name = info.client_name
      perfectInfos(obj).then(res => {
        if (res.status === 200) {
          this.client_certification_id = info.client_certification_id = res.data.client_certification_id
          setStore('selfInfos', info)
        }
      })
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
        switch (this.certificationValue[0]) {
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
        console.log(params)
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
    .quitDialog{
      .weui-dialog{
        width: 580px;
        height: 345px;
        background: #FFFFFF;
        border-radius: 10px;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%,-50%);
        padding: 0;
        text-align: center;
        .quit{
          margin-top: 85px;
          margin-bottom: 75px;
          font-family: PingFangSC-Regular;
          font-size: 36px;
          color: #333333;
        }
        .weui-btn.weui-btn_primary{
          display: inline-block;
          background: #2A7DC1;
          border-radius: 10px;
          width: 190px;
          height: 80px;
          font-family: PingFangSC-Medium;
          font-size: 36px;
          color: #F0F0F0;
        }
        .weui-btn.weui-btn_primary:first-child{
          margin-left: 43px;
        }
        .weui-btn.weui-btn_primary:nth-child(2){
          margin-right: 43px;
        }
      }
    }

    .myBank {
      background-color: #fff;
      height: 82px;
      line-height: 82px;
      padding-left: 20px;
      font-size: 32px;
      color: #333;
      position: relative;
      i {
        position: absolute;
        right: 20px;
        font-size: 66px;
        color: #c8c8cd;
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
    }
    .weui-cells .weui-cell.address {
      height: 130px;
      align-items: flex-start;
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
