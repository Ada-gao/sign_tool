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
      <!--<button class="next" @click="submitCustomer">确定</button>-->
      <div class="upload_cont1" @click="selectcamera()">
        <!--<input type="file"-->
        <!--id="file"-->
        <!--accept="image/png, image/jpeg, image/gif, image/jpg"-->
        <!--class="inputfile">-->
        <div class='iconfont icon_bg'>&#xe600;</div>
        <img :src="imgSrc" id="show" v-show="imgSrc">
      </div>
      <div class="upload_cont2" @click="selectcamera()">
        <!--<input type="file"-->
        <!--id="file"-->
        <!--accept="image/png, image/jpeg, image/gif, image/jpg"-->
        <!--class="inputfile">-->
        <div class='iconfont icon_bg'>&#xe600;</div>
        <img :src="imgSrc1" id="show1" v-show="imgSrc1">
      </div>
      <span class="front_class">正面</span>

      <span class="back_class">反面</span>
    </div>
    <div class="space"></div>
    <div class="myBank" @click="toLink">
      <span>银行卡</span>
      <i class="iconfont">&#xe731;</i>
    </div>
    <div class="submit_form">
      <button class="submit" @click="submitInfos">提交</button>
    </div>
    <alert v-model="alertMsg" :content="alertCont"></alert>
    <mt-popup v-model="popupVisible"
              position="bottom"
              class="camera_pop">
      <div>
        <div class='popup-item' @click="camera()">相机</div>
        <div class='popup-item' @click="photo()">从相册中选取</div>
        <div class='popup-item' @click="cancel()">取消</div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import {XHeader, Group, Cell, XInput, Datetime, PopupPicker, Alert} from 'vux'
  import {uploadId, updateId} from '@/service/api/customers'
  //  import {getStore} from '@/config/mUtils'
  import {baseUrl} from '@/config/env'
  import {Popup} from 'mint-ui'

  export default {
    name: 'PerfectInfos',
    components: {
      XHeader,
      Group,
      Cell,
      XInput,
      Datetime,
      PopupPicker,
      Alert,
      'mt-popup': Popup
    },
    data () {
      return {
        num: 1,
        isMod: -1,
        address: '',
        clientId: '',
        clientClass: '',
        clientType: '',
        name: '',
        nationality: '',
        mobile: '',
        city: '',
        datetime: '',
        starttime: '',
        endtime: '',
        minYear: 1900,
        maxYear: 3000,
        clientCertificationId: 0,
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
        imgSrc: '',
        imgSrc1: '',
        popupVisible: false
      }
    },
    mounted () {
      this.isSubmit = this.$route.params.isSubmit
      this.name = this.$route.params.name
      this.nationality = this.$route.params.nationality === '0' ? '中国' : '其他'
      this.city = this.$route.params.city
      this.mobile = this.$route.params.mobile
      this.clientId = this.$route.params.id
      this.clientClass = this.$route.params.clientClass
      this.clientType = this.$route.params.clientType
      this.clientCertificationId = this.$route.params.clientCertificationId
      console.log(this.clientId)
    },
    methods: {
      toLink () {
        let params = {
          id: this.clientId,
          clientCertificationId: this.clientCertificationId,
          name: this.name,
          city: this.city,
          nationality: this.nationality,
          mobile: this.mobile
        }
        this.$router.replace({name: 'Bankcard', params: params})
      },
      getAction () {
        return baseUrl + 'v1/common/file_upload/'
      },
      selectcamera () {
        this.popupVisible = true
      },
      cancel () {
        this.popupVisible = false
      },
      camera () {
        let cameraOptions = {
          quality: 50,
          sourceType: 1,
          destinationType: navigator.camera.DestinationType.DATA_URL,
          saveToPhotoAlbum: true
        }
        navigator.camera.getPicture(this.cameraSuccess, this.cameraError, cameraOptions)
      },
      photo () {
        let cameraOptions = {
          quality: 50,
          sourceType: 0,
          destinationType: navigator.camera.DestinationType.DATA_URL,
          saveToPhotoAlbum: true
        }
        navigator.camera.getPicture(this.cameraSuccess, this.cameraError, cameraOptions)
      },
      cameraSuccess (imageData) {
        this.uploadFile(imageData)
      },
      cameraError (message) {
//        alert(message)
      },
      dataURLtoFile (imageData, filename) {
        let arr = imageData.split(',')
        let mime = arr[0].match(/:(.*?);/)[1]
        let bstr = window.atob(arr[1])
        let n = bstr.length
        let u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        let blob = new Blob([u8arr], {type: mime})
        blob.lastModifiedDate = new Date()
        blob.name = filename
        return blob
      },
      uploadFile (imageData) {
        let file = this.dataURLtoFile('data:image/jpeg;base64,' + imageData, 'test.jpeg')
        let formData = new FormData()
        formData.append('file', file)
        updateId(formData).then(res => {
          if (res.status === 200) {
            this.imgSrc = 'data:image/jpeg;base64,' + imageData
            this.popupVisible = false
          }
        })
      },
      submitInfos () {
          let idType = ''
        if (this.$route.params.isSubmit) {
          this.alertMsg = false
        } else {
          this.alertMsg = true
          return false
        }
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
          client_id: this.clientId,
//          client_name: this.name,
          client_class: this.clientClass,
          client_type: this.clientType,
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
        uploadId(this.clientCertificationId, params).then(res => {
          if (res.status === 200) {
            this.$router.replace({name: 'PotentialCustomerList'})
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
    .perfect_group {
      /*padding-top: 118px;*/
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
        form {
          height: 100%;
        }
        .icon_bg {
          font-size: 115px;
          color: #fff;
        }
        #show,
        #show1 {
          position: absolute;
          display: block;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
        }
        .inputfile {
          position: absolute;
          width: 100%;
          height: 100%;
          display: block;
          left: 0;
          top: 0;
          z-index: 11;
          opacity: 0;
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
    .vux-x-dialog .weui-dialog {
      width: 580px;
      left: 50%;
      padding: 0.4rem 0.186667rem;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      top: 50%;
      margin-top: -150px;
      height: 300px;
      margin-left: -290px;
      border-radius: 10px;
      .weui-dialog__hd {
        display: none;
      }
      .weui-dialog__bd {
        min-height: 140px;
        line-height: 140px;
        div {
          font-family: PingFangSC-Regular;
          font-size: 30px;
          color: #333333;
        }
      }
      .weui-dialog__ft {
        width: 280px;
        margin: 0 auto;
      }
      .weui-dialog__btn_primary {
        height: 80px;
        text-align: center;
        line-height: 80px;
        background: #2A7DC1;
        border-radius: 10px;
        color: #f0f0f0;
        font-size: 36px;
        margin-left: 0;
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
