<template>
  <div class="bankcard">
    <x-header :left-options="{backText: '',preventGoBack:true}"
              @on-click-back="toLink"
    >客户认证
    </x-header>
    <div class="wrapper">
      <group class="bankcard_cont">
        <x-input title="持卡人："
                 v-model="personInfo.cardOwner"
        ></x-input>
        <!--<x-input title="开户银行："-->
        <!--v-model="personInfo.bankAccount"-->
        <!--&gt;</x-input>-->
        <popup-picker title="开户银行："
                      :data="bankList"
                      v-model="personInfo.bankName"
        ></popup-picker>
        <x-input title="支行："
                 v-model="personInfo.branchBank"
        ></x-input>
        <x-input title="银行卡号："
                 v-model="personInfo.bankCardNumber"
        ></x-input>
      </group>
      <div class="space"></div>
      <div class="upload">银行卡信息：&nbsp;<span>（请上传清晰的原件或复印件）</span></div>
      <div class="upload_box">
        <div class="upload_cont" @click="selectcamera()">
          <input type="file"
                 id="file"
                 @click.native="prevent($event)"
                 accept="image/png, image/jpeg, image/gif, image/jpg"
                 class="inputfile">
          <div class='iconfont icon_bg'>&#xe600;</div>
          <img :src="imgSrc" id="show" v-show="imgSrc">
        </div>
      </div>
      <div class="submit_form">
        <button class="submit" @click="submitBankInfos">提交</button>
      </div>
      <mt-popup v-model="popupVisible"
                position="bottom"
                class="camera_pop"
                style="width: 100%;font-size: 30px; text-align: center;line-height: 90px; color: #333">
        <div>
          <div class='popup-item' @click="camera()" style="border: 1px solid #ccc;">相机</div>
          <div class='popup-item' @click="photo()" style="border: 1px solid #ccc;">从相册中选取</div>
          <div class='popup-item' @click="cancel()">取消</div>
        </div>
      </mt-popup>
    </div>
  </div>
</template>
<script>
  import {XHeader, Group, Cell, XInput, PopupPicker} from 'vux'
  import {Popup} from 'mint-ui'
  //  import {getStore} from '@/config/mUtils'
  import {uploadBankCard, updateFrontPic} from '@/service/api/customers'
//  import {uploadBankCard} from '@/service/api/customers'

  export default {
    name: 'Bankcard',
    components: {
      XHeader,
      Group,
      Cell,
      XInput,
      PopupPicker,
      'mt-popup': Popup
    },
    data () {
      return {
        bankList: [[
          {
            name: '中国银行',
            value: '中国银行',
            index: '1'
          },
          {
            name: '招商银行',
            value: '招商银行',
            index: '2'
          },
          {
            name: '建设银行',
            value: '建设银行',
            index: '3'
          },
          {
            name: '汇丰银行',
            value: '汇丰银行',
            index: '4'
          },
          {
            name: '渣打银行',
            value: '渣打银行',
            index: '5'
          },
          {
            name: '花旗银行',
            value: '花旗银行',
            index: '6'
          },
          {
            name: '农业银行',
            value: '农业银行',
            index: '7'
          }
        ]],
        popupVisible: false,
        personInfo: {
          cardOwner: '',
          bankName: [],
          branchBank: '',
          bankCardNumber: ''
        },
        clientCertificationId: '',
//        uploadData: {
//          dialogVisible: false,
//          dialogImageUrl: '',
//          fileList: [],
//          headers: {
//            'X-Token': getStore('token')
//          },
//          card_front_url: ''
//        },
        name: '',
        nationality: '',
        mobile: '',
        city: '',
        clientId: '',
        imgSrc: ''
      }
    },
    mounted () {
      this.name = this.$route.params.name
      this.nationality = this.$route.params.nationality === '0' ? '中国' : '其他'
      this.city = this.$route.params.city
      this.mobile = this.$route.params.mobile
      this.clientId = this.$route.params.id
      this.clientCertificationId = this.$route.params.clientCertificationId
    },
    methods: {
        prevent (e) {
            e.preventDefault()
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
          destinationType: 1
        }
        navigator.camera.getPicture(this.cameraSuccess, this.cameraError, cameraOptions)
      },
      photo () {
        let cameraOptions = {
          quality: 50,
          sourceType: 0,
          destinationType: 1
        }
        navigator.camera.getPicture(this.cameraSuccess, this.cameraError, cameraOptions)
      },
      cameraSuccess (imageData) {
        this.imgSrc = imageData
        this.uploadFile()
      },
      cameraError (message) {
//        alert(message)
      },
      uploadFile () {
        let reads = new FileReader()
        let file = document.getElementById('file').files[0]
        reads.readAsDataURL(file)
        reads.onload = (e) => {
          this.imgSrc = e.target.result
        }
        let formData = new FormData()
        formData.append('file', file)
        console.log(formData)
        updateFrontPic(this.clientCertificationId, formData).then(res => {
          if (res.status === 200) {
              this.popupVisible = false
              alert('success')
          }
        })
//        let success = r => {
//          console.log("上传成功! Code = " + r.responseCode)
//        }
//        let fail = error => {
//          alert("上传失败! Code = " + error.code)
//        }
//        let options = new FileUploadOptions()
//        options.fileKey = "file1"
//        options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1)
      },
      toLink () {
        let params = {
          id: this.clientId,
          clientCertificationId: this.clientCertificationId,
          name: this.name,
          city: this.city,
          nationality: this.nationality,
          mobile: this.mobile
        }
        this.$router.replace({name: 'PerfectInfos', params: params})
      },
      getAction (id) {
        return 'http://10.9.60.141:5000/api/v1/client/customers/' + id + '/bankcards/front/'
      },
      submitBankInfos () {
        let bankId = ''
        switch (this.personInfo.bankName[0]) {
          case '中国银行':
            bankId = '0'
            break
          case '招商银行':
            bankId = '1'
            break
          case '建设银行':
            bankId = '2'
            break
          case '汇丰银行':
            bankId = '3'
            break
          case '渣打银行':
            bankId = '4'
            break
          case '花旗银行':
            bankId = '5'
            break
          case '农业银行':
            bankId = '6'
            break
        }
        let params = {
          card_no: this.personInfo.bankCardNumber,
          sub_branch_name: this.personInfo.branchBank,
          name: this.personInfo.cardOwner,
          bank_id: bankId
        }
        uploadBankCard(this.clientCertificationId, params).then(res => {
          if (res.status === 200) {
            let params = {
              id: this.clientId,
              clientCertificationId: this.clientCertificationId,
              name: this.name,
              city: this.city,
              nationality: this.nationality,
              mobile: this.mobile,
              isSubmit: true
            }
            this.$router.replace({name: 'PerfectInfos', params: params})
          }
        })
      }
    }
  }
</script>
<style lang="less">
  .bankcard {
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
      height: 333px;
      padding: 51px 60px;
      padding-bottom: 0;
      position: relative;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      .upload_cont {
        text-align: center;
        width: 270px;
        height: 180px;
        line-height: 180px;
        background-color: #ddd;
        border-radius: 8px;
        position: relative;
        margin: 0 auto;
        .icon_bg {
          font-size: 115px;
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
        #show {
          position: absolute;
          display: block;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
        }
      }
    }
  }
</style>
