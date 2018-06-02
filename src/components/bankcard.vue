<template>
  <div class="bankcard">
    <x-header :left-options="{backText: '',preventGoBack:true}"
              @on-click-back="toLink"
    >客户认证
    </x-header>
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
                    @on-change="changeValue"
      ></popup-picker>
      <x-input title="支行："
               v-model="personInfo.branchBank"
      ></x-input>
      <x-input title="银行卡号："
               v-model="personInfo.bankCardNumber"
      ></x-input>
    </group>
    <div class="space"></div>
    <div class="upload">证件信息：&nbsp;<span>（请上传清晰的原件或复印件）</span></div>
    <div class="upload_box">
      <!--<button class="next" @click="submitCustomer">确定</button>-->
      <div class="upload_cont">
        <!--<el-upload-->
          <!--:action="getAction(clientCertificationId)"-->
          <!--list-type="picture-card"-->
          <!--accept="image/*"-->
          <!--:on-change="uploadChange"-->
          <!--:on-success="uploadSuccess"-->
          <!--:headers="uploadData.headers"-->
          <!--:file-list="uploadData.fileList"-->
          <!--:on-preview="handlePictureCardPreview">-->
          <!--<i class="iconfont">&#xe600;</i>-->
        <!--</el-upload>-->
        <!--<div class="card">银行卡</div>-->
        <!--<el-dialog :visible.sync="uploadData.dialogVisible">-->
          <!--<img width="100%" :src="uploadData.dialogImageUrl" alt="">-->
        <!--</el-dialog>-->
        <!--<form :action="getAction(clientCertificationId)" enctype="multipart/form-data">-->
          <input
            type="file"
            name="file"
            id="file"
            class="inputfile"
            accept="image/png, image/jpeg, image/gif, image/jpg"
            @change="changepic"/>
          <label for="file" class='iconfont icon_bg'>&#xe600;</label> <br>
          <img :src="imgSrc" id="show" width="200">
        <!--</form>-->
      </div>
    </div>
    <div class="submit_form">
      <button class="submit" @click="submitBankInfos">提交</button>
    </div>
  </div>
</template>
<script>
  import {XHeader, Group, Cell, XInput, PopupPicker} from 'vux'
//  import {getStore} from '@/config/mUtils'
  import {uploadBankCard, updateFrontPic} from '@/service/api/customers'

  export default {
    name: 'Bankcard',
    components: {
      XHeader,
      Group,
      Cell,
      XInput,
      PopupPicker
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
      changepic (value) {
//          console.log(value)
        let reads = new FileReader()
        let f = document.getElementById('file').files[0]
        reads.readAsDataURL(f)
        reads.onload = (e) => {
          let params = {
              file: f
          }
          console.log(params)
          this.imgSrc = e.target.result
          let config = {
            headers: {'Content-Type': 'multipart/form-data'}
          }
          updateFrontPic(this.clientCertificationId, params, config).then(res => {
          })
        }
      },
      changeValue (value) {
        console.log(value)
      },
      change (value) {
        console.log('new Value', value)
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
//      uploadChange (file) {
//        const isIMAGE = (file.raw.type === 'image/jpeg' || file.raw.type === 'image/png' || file.raw.type === 'image/gif')
//        const isLt1M = file.size / 1024 / 1024 < 1
//
//        if (!isIMAGE) {
//          this.$message.error('上传文件只能是图片格式!')
//          return false
//        }
//        if (!isLt1M) {
//          this.$message.error('上传文件大小不能超过 1MB!')
//          return false
//        }
//        let reader = new FileReader()
//        reader.readAsDataURL(file.raw)
//      },
//      handlePictureCardPreview (file) {
//        this.dialogImageUrl = file.url
//        this.dialogVisible = true
//      },
//      uploadSuccess (file) {
//        this.domHander()
//        console.log(file)
//        this.card_front_url = file.card_front_url
//      },
//      domHander () {
//        document.querySelectorAll('.el-upload-list__item-delete').forEach((value, index) => {
//          value.classList.add('el-upload-list__item-close')
//          value.classList.remove('el-upload-list__item-delete')
//        })
//        Array.from(document.querySelectorAll('.el-icon-delete')).forEach((value, index) => {
//          value.classList.add('el-icon-close')
//          value.classList.remove('el-icon-delete')
//        })
//        Array.from(document.querySelectorAll('.el-icon-zoom-in')).forEach((value, index) => {
//          value.parentNode.removeChild(value)
//        })
//      },
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
  .inputfile {
    opacity: 0;
  }
  .bankcard {
    .card {
      font-size: 30px;
      color: #333;
      margin-top: 10px;
    }
    .bankcard_cont {
      padding-top: 108px;
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
        }
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
      .el-upload--picture-card {
        border: none;
        width: 270px;
        height: 180px;
        line-height: 180px;
        background-color: #ddd;
        margin-left: 0;
        i.iconfont {
          font-size: 110px;
        }
      }
      .el-upload-list {
        display: inline-block;
        position: absolute;
        .el-upload-list__item {
          width: 270px;
          height: 180px;
          display: inline-block;
          border: none;
          .el-upload-list__item-name {
            display: none;
          }
          .el-upload-list__item-status-label {
            display: none;
          }
        }
      }
      .el-upload-list--picture-card .el-upload-list__item-actions span,
      .el-upload-list--picture-card .el-upload-list__item .el-icon-close {
        display: block;
        right: 0;
        top: 0;
        width: 50px;
        height: 50px;
        text-align: center;
        /*position: absolute;*/
      }
      .el-upload-list--picture-card .el-upload-list__item-actions span.el-upload-list__item-preview {
        width: 100%;
        height: 100%;
      }
      .el-dialog {
        top: 25%;
        margin: auto;
        width: 500px;
        .el-dialog__header {
          padding: 0;
          padding-bottom: 40px;
          .el-dialog__headerbtn {
            top: 0;
            right: 0;
          }
        }
        .el-dialog__body {
          padding: 0 15px 10px;
          color: #606266;
          box-sizing: border-box;
        }
      }
      .el-icon-close:before {
        font-size: 36px;
      }
    }
  }
</style>
