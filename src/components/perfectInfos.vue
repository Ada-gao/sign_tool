<template>
  <div class="perfect_infos">
    <x-header :left-options="{backText: ''}">客户认证</x-header>
    <group>
      <div class="add_tit">
        <i class="iconfont">&#xe62c;</i>
        <span style="color: #2672ba">客户信息</span>
      </div>
      <div class="space"></div>
      <cell title="客户姓名：" :value="name"></cell>
      <cell title="国籍：" :value="nationality"></cell>
      <cell title="常驻中国城市：" :value="city" v-if="nationality === '中国'"></cell>
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
      <div class="upload_cont1">
        <el-upload
          :action="getAction()"
          list-type="picture-card"
          accept="image/*"
          :on-change="uploadChange"
          :on-success="uploadSuccess"
          :headers="headers"
          :file-list="fileList"
          :on-preview="handlePictureCardPreview">
          <i class="iconfont">&#xe600;</i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
      <div class="upload_cont2">
        <el-upload
          :action="getAction()"
          list-type="picture-card"
          accept="image/*"
          :on-change="uploadChange1"
          :headers="headers"
          :file-list="fileList1"
          :on-success="uploadSuccess1"
          :on-preview="handlePictureCardPreview1">
          <i class="iconfont">&#xe600;</i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible1">
          <img width="100%" :src="dialogImageUrl1" alt="">
        </el-dialog>
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
  </div>
</template>

<script>
  import {XHeader, Group, Cell, XInput, Datetime, PopupPicker, Alert} from 'vux'
  import {uploadId} from '@/service/api/customers'
  import {getStore} from '@/config/mUtils'

  export default {
    name: 'PerfectInfos',
    components: {
      XHeader,
      Group,
      Cell,
      XInput,
      Datetime,
      PopupPicker,
      Alert
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
        dialogImageUrl: '',
        dialogImageUrl1: '',
        dialogVisible: false,
        dialogVisible1: false,
        clientCertificationId: 0,
        certificationValue: [],
        certificateNumber: '',
        fileList: [],
        fileList1: [],
        idImages: {
          front: '',
          back: ''
        },
        certificationList: [['身份证', '护照', '军官证', '台胞证', '港澳通行证', '其他']],
        headers: {
          'X-Token': getStore('token')
        },
        alertMsg: false,
        alertCont: '未绑定银行卡～',
        isSubmit: null
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
        return 'http://10.9.60.141:5000/api/v1/common/file_upload/'
      },
      uploadChange (file) {
        const isIMAGE = (file.raw.type === 'image/jpeg' || file.raw.type === 'image/png' || file.raw.type === 'image/gif')
        const isLt1M = file.size / 1024 / 1024 < 1

        if (!isIMAGE) {
          this.$message.error('上传文件只能是图片格式!')
          return false
        }
        if (!isLt1M) {
          this.$message.error('上传文件大小不能超过 1MB!')
          return false
        }
//        this.idImages.front = file.response.file_url
        let reader = new FileReader()
        reader.readAsDataURL(file.raw)
      },
      uploadChange1 (file) {
        const isIMAGE = (file.raw.type === 'image/jpeg' || file.raw.type === 'image/png' || file.raw.type === 'image/gif')
        const isLt1M = file.size / 1024 / 1024 < 1

        if (!isIMAGE) {
          this.$message.error('上传文件只能是图片格式!')
          return false
        }
        if (!isLt1M) {
          this.$message.error('上传文件大小不能超过 1MB!')
          return false
        }
//        this.idImages.back = file.response.file_url
        let reader = new FileReader()
        reader.readAsDataURL(file.raw)
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      handlePictureCardPreview1 (file) {
        this.dialogImageUrl1 = file.url
        this.dialogVisible1 = true
      },
      uploadSuccess (response, file, fileList) {
        this.domHander()
        this.idImages.front = response.file_url
      },
      uploadSuccess1 (response, file, fileList) {
        this.domHander()
        this.idImages.back = response.file_url
      },
      domHander () {
        document.querySelectorAll('.el-upload-list__item-delete').forEach((value, index) => {
          value.classList.add('el-upload-list__item-close')
          value.classList.remove('el-upload-list__item-delete')
        })
        Array.from(document.querySelectorAll('.el-icon-delete')).forEach((value, index) => {
          value.classList.add('el-icon-close')
          value.classList.remove('el-icon-delete')
        })
        Array.from(document.querySelectorAll('.el-icon-zoom-in')).forEach((value, index) => {
          value.parentNode.removeChild(value)
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

  .perfect_infos {
    .myBank {
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
      }
      .upload_cont1:first-child,
      .upload_cont2:first-child {
        margin-right: 60px;
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
