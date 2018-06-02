<template>
  <div class="certified">
    <x-header :left-options="{backText: ''}"
              left-options.preventGoBack="true"
              on-click-back="toLink(id)">客户认证
    </x-header>
    <div class="certified_cont">
      <div class="radio_box">
        <div class="type">投资者类型：</div>
        <el-radio v-model="radio" label="1">普通投资者</el-radio>
        <el-radio v-model="radio" label="2">专业投资者</el-radio>
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
    <div v-transfer-dom>
      <alert v-model="showAlert" title="aaa" content="bbb"></alert>
    </div>
  </div>
</template>
<script>
  import {XHeader, Alert, TransferDomDirective as TransferDom} from 'vux'
  //  import {uploadFile} from '@/service/api/customers'
  import {getStore} from '@/config/mUtils'
  export default {
    components: {
      XHeader,
      Alert
    },
    directives: {
      TransferDom
    },
    data () {
      return {
        radio: '',
        id: '',
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
        showAlert: false
      }
    },
    mounted () {
        this.uploadData.clientCertificationId = this.$route.params.clientCertificationId
    },
    beforeRouteEnter (to, from, next) {
      console.log(from)
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
      showPopup () {},
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
        console.log(file)
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
        let params = {}
        console.log(params)
      }
    }
  }
</script>
<style lang="less">
  @import url("//unpkg.com/element-ui@2.3.9/lib/theme-chalk/index.css");
  .vux-x-dialog .weui-dialog {
    width: 580px;
    height: 345px;
    box-sizing: border-box;
    top: 50%;
    margin-top: -172px;
    left: 50%;
    margin-left: -290px;
    padding: 0;
    padding-top: 40px;
    border-radius: 10px;
    .weui-dialog__hd {
      padding: 0;
    }
    .weui-dialog__title {
      font-size: 30px;
      color: #666;
    }
    .weui-dialog__bd {
      width: 522px;
      height: 76px;
      line-height: 76px;
      box-sizing: border-box;
      border: 1px solid #999;
      border-radius: 10px;
      margin: 0 auto;
      margin-top: 35px;
      div {
        font-size: 30px;
        color: #666;
      }
    }
    .weui-dialog__ft {
      width: 280px;
      height: 80px;
      line-height: 80px;
      margin: 0 auto;
      margin-top: 33px;
      background: #2A7DC1;
      border-radius: 10px;
    }
    .weui-dialog__btn_primary {
      font-size: 36px;
      color: #f0f0f0;
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
        .type {
          height: 42px;
          line-height: 42px;
          color: #333;
          font-size: 30px;
          padding-top: 12px;
        }
        .el-radio {
          height: 106px;
          line-height: 106px;
        }
        .el-radio:nth-of-type(1) {
          margin-left: 70px;
        }
        .el-radio__inner {
          width: 28px;
          height: 28px;
          border-color: #979797;
          border-radius: 6px;
          background-color: #fff;
        }
        .el-radio__label {
          font-size: 28px;
          color: #666;
          vertical-align: sub;
        }
        .el-radio__input.is-checked .el-radio__inner {
          border-color: #409EFF;
          background: #fff;
        }
        .el-radio__input.is-checked .el-radio__inner::after {
          background-color: #409EFF;
          width: 15px;
          height: 15px;
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
