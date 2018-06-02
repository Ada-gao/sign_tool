<template>
  <div class="certified">
    <x-header :left-options="{backText: ''}"
              left-options.preventGoBack="true"
              on-click-back="toLink(id)">客户认证
    </x-header>
    <div class="certified_cont">
      <div class="radio_box">
        <!--<div class="type">投资者类型：</div>-->
        <mt-radio
          class="radio_item"
          title="投资者类型："
          v-model="radio"
          @change="changeRadio"
          :options="['普通投资者', '专业投资者']">
        </mt-radio>
      </div>
      <div class="space"></div>
      <div class="email_box" @click="showPopup">附件发送给理财师邮箱<i class="iconfont">&#xe731;</i></div>
      <div class="space"></div>
      <div class="upload_file">
        <div class="upload">请您上传资料</div>
        <el-upload
          :action="getAction(uploadData.clientCertificationId)"
          list-type="picture-card"
          accept="image/*"
          :on-change="uploadChange"
          :on-success="uploadSuccess"
          :headers="uploadData.headers"
          :file-list="uploadData.fileList"
          :on-preview="handlePictureCardPreview">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="uploadData.dialogVisible">
          <img width="100%" :src="uploadData.dialogImageUrl" alt="">
        </el-dialog>
      </div>
      <div class="submit_form">
        <button class="submit" @click="submitInfos">提交</button>
      </div>
    </div>
    <mt-popup v-model="showEmailBox" closeOnClickModal="false">
      <div class="email_box1">
        <div class="title">请确认您的邮箱</div>
        <div class="email_address">{{userInfos.emailAddress}}</div>
        <button @click="hidePopup">确定</button>
      </div>
    </mt-popup>
    <mt-popup v-model="showConvertBox" closeOnClickModel="false">
      <div class="convert_box">
        <div class="title"> 您的确定要变更为{{radio}}吗？</div>
        <div class="btn_box">
          <button class="ensure" @click="ensure">确定</button>
          <button class="cancel" @click="cancel">取消</button>
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  import {XHeader} from 'vux'
  import {Popup, Radio} from 'mint-ui'
  import {sendEmail, sendFiles} from '@/service/api/customers'
  import {getStore} from '@/config/mUtils'
  export default {
    components: {
      XHeader,
      'mt-popup': Popup,
      'mt-radio': Radio
    },
    data () {
      return {
        radio: '',
        oldRadio: '',
        type: '',
        id: '',
        timer: null,
        uploadData: {
          dialogVisible: false,
          dialogImageUrl: '',
          clientCertificationId: '',
          fileList: [],
          headers: {
            'X-Token': getStore('token')
          },
          card_front_url: ''
        },
        showEmailBox: false,
        showConvertBox: false,
        userInfos: {
          name: '',
          id: '',
          emailAddress: '',
          type: ''
        }
      }
    },
    mounted () {
      this.uploadData.clientCertificationId = this.$route.params.clientCertificationId
      this.userInfos.emailAddress = JSON.parse(getStore('data')).email
      this.userInfos.name = this.$route.params.name
      this.userInfos.id = this.$route.params.id
      this.userInfos.type = this.$route.params.type
      if (this.userInfos.type === '0') {
          this.radio = '普通投资者'
      } else if (this.userInfos.type === '1') {
        this.radio = '专业投资者'
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.id = from.params.id
      })
    },
    methods: {
      getAction (id) {
        return 'http://10.9.60.141:5000/api/v1/client/customers/certfiles/' + id
      },
      toLink (id) {
        this.$router.push({name: 'PotentialCustomerList', params: {id: id}})
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
        let reader = new FileReader()
        reader.readAsDataURL(file.raw)
      },
      handlePictureCardPreview (file) {
        this.uploadData.dialogImageUrl = file.url
        this.uploadData.dialogVisible = true
      },
      uploadSuccess (file) {
        this.domHander()
        this.card_front_url = file.card_front_url
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
        sendFiles(this.uploadData.clientCertificationId, {certification_type: this.convert(this.radio)}).then(res => {
          if (res.status === 200) {
            this.$router.replace({name: 'PotentialCustomerList', params: {id: this.userInfos.id}})
          }
        })
      }
    }
  }
</script>
<style lang="less">
  @import url("//unpkg.com/element-ui@2.3.9/lib/theme-chalk/index.css");

  .mint-popup {
    border-radius: 10px;
  }

  .email_box1,
  .convert_box {
    width: 580px;
    height: 345px;
    text-align: center;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    .title {
      padding: 48px 0 31px;
      font-size: 30px;
      color: #666;
      text-align: center;
    }
    .email_address {
      width: 522px;
      height: 76px;
      box-sizing: border-box;
      border: 1px solid #999;
      margin: 0 auto;
      text-align: center;
      line-height: 76px;
      font-size: 30px;
      color: #666;
    }
    button {
      width: 280px;
      height: 80px;
      text-align: center;
      line-height: 80px;
      background-color: #2A7DC1;
      font-size: 36px;
      color: #f0f0f0;
      border-radius: 10px;
      margin-top: 33px;
    }
  }

  .convert_box {
    .title {
      padding: 91px 0 81px;
      line-height: 46px;
      color: #333;
    }
    button {
      width: 190px;
      margin: 0;
    }
    button.ensure {
      margin-right: 80px;
    }
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
      padding-top: 108px;
      .radio_box {
        padding: 0 20px;
        background-color: #fff;
        height: 130px;
        .radio_item.mint-radiolist .mint-cell {
          display: inline-block;
          position: absolute;
          .mint-radio-label {
            font-size: 28px;
            color: #666;
          }
        }
        .radio_item.mint-radiolist .mint-cell:nth-of-type(1) {
          left: 80px;
        }
        .radio_item.mint-radiolist .mint-cell:nth-of-type(2) {
          right: 135px;
        }
        .radio_item {
          .mint-radiolist-title {
            font-size: 30px;
            color: #333;
            line-height: 42px;
            padding: 18px 0 10px;
            margin: 0;
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
          }
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
          font-size: 24px;
          color: #666;
          text-align: center;
          padding-top: 39px;
          padding-bottom: 70px;
        }
      }
      .submit_form {
        background-color: #f5f5f5;
        text-align: center;
        /*padding: 30px 0;*/
        margin-top: 181px;
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

    .el-upload--picture-card {
      border: none;
      width: 132px;
      height: 120px;
      line-height: 120px;
      background-color: #ddd;
      margin-left: 0;
    }
    .el-upload-list {
      display: inline-block;
      padding-left: 39px;
      /*position: absolute;*/
      .el-upload-list__item {
        width: 132px;
        height: 120px;
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
      text-align: right;
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
</style>
