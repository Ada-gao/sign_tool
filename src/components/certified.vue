<template>
  <div class="certified">
    <x-header :left-options="{backText: ''}"
              left-options.preventGoBack="true"
              on-click-back="toLink(id)">客户认证</x-header>
    <radio
      title="投资者类型："
      v-model="value"
      :options="options"
      @change="check"
    ></radio>

    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade"
      closeOnClickModal="false"
    >
      <div v-transfer-dom>
        <confirm v-model="popupVisible"
                 @on-cancel="onCancel"
                 @on-confirm="onConfirm"
                 position="top"
                 >
          <p style="text-align:center;font-size:36px;color:#333;">{{title}}</p>
        </confirm>
      </div>
    </mt-popup>
    <div class="blank"></div>
    <mt-cell title="附件发送给理财师邮箱"
             is-link
             to="/"
    ></mt-cell>
    <div class="blank1"></div>
    <div class="upload_box">
      <p v-if="this.value!='专业投资者'">请您上传资料</p>
      <p v-else>
        上传风险测评问卷
      </p>
      <!--<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">-->
        <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
        <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
      <!--</el-upload>-->

      <el-upload
        :action="'http://10.9.60.141:5000/api/v1/client/customers/complete_info/'+id"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
  </div>
</template>
<script>
  //  import { XHeader, TransferDom, Actionsheet, Group, XSwitch, Toast } from 'vux'
  import {XHeader, Confirm, TransferDomDirective as TransferDom} from 'vux'
  import {Radio, Popup, Cell} from 'mint-ui'
//  import {uploadFile} from '@/service/api/customers'
  export default {
    components: {
      XHeader,
      Radio,
      Confirm,
      'mt-popup': Popup,
      'mt-cell': Cell
//      Actionsheet,
//      Group,
//      XSwitch,
//      Toast,
//      'mt-button': Button,
//      'mt-cell': Cell
    },
    directives: {
      TransferDom
    },
    data () {
      return {
        value: '',
        newValue: '',
        popupVisible: false,
        id: '',
        title: '',
        imageUrl: '',
        options: [
          {
            label: '普通投资者',
            value: '普通投资者'
          },
          {
            label: '专业投资者',
            value: '专业投资者'
          }
        ],
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    mounted () {

    },
    beforeRouteEnter (to, from, next) {
        console.log(from)
      next(vm => {
          vm.id = from.params.id
      })
    },
    methods: {

      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
        toLink (id) {
            this.$router.push({name: 'PotentialCustomerList', params: {id: id}})
        },
      onCancel () {
        this.popupVisible = false
        console.log(this.newValue)
        if (!this.newValue) {
            this.value = ''
        } else if (this.newValue === '普通投资者') {
            this.value = '普通投资者'
        } else {
          this.value = '专业投资者'
        }
      },
      onConfirm () {
        this.popupVisible = false
      },
      check () {
        this.newValue = this.value
        this.popupVisible = true
        if (this.value === '普通投资者') {
          this.title = '确定要转为专业投资者？'
        } else {
          this.title = '确定要转为普通投资者？'
        }
      },
      handleAvatarSuccess (res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      }
    }
  }
</script>
<style lang="less">
  @import url("//unpkg.com/element-ui@2.3.9/lib/theme-chalk/index.css");
  .certified {
    .mint-header {
      height: 108px;
      padding-top: 20px;
      background-color: #2672BA;
      font-size: 36px;
      .mint-header-button {
        .mint-button {
          line-height: 33px;
          .mintui-back::before {
            font-size: 33px;
          }
        }
      }
    }
    .mint-radiolist {
      /*margin-top: 108px;*/
      padding: 125px 20px 0;
      .mint-radiolist-title {
        font-size: 30px;
        color: #333;
        margin: 0;
      }
      a.mint-cell {
        text-decoration: none;
        display: inline-block;
        .mint-radiolist-label {
          font-size: 28px;
          color: #666;
          margin: 36px 0 30px;
          .mint-radio-core {
            width: 28px;
            height: 28px;
            border-radius: 9px;
            background-color: #fff;
            border-color: #979797;
          }
          .mint-radio-core::after {
            width: 16px;
            height: 16px;
          }
          .mint-radio-input:checked + .mint-radio-core::after {
            background-color: #2672ba;

          }
        }

      }
      a.mint-cell:nth-of-type(1) {
        position: absolute;
        left: 60px;
      }
      a.mint-cell:nth-of-type(2) {
        position: absolute;
        right: 135px;
      }

    }
    .space {
      height: 20px;
      background-color: #f5f5f5;
      margin-top: 100px;
    }
    .space1 {
      height: 20px;
      background-color: #f5f5f5;
    }
    .mint-cell-wrapper {
      height: 82px;
      font-size: 30px;
      color: #333;
      padding-left: 20px;
    }
    .mint-cell-allow-right::after {
      width: 22px;
      height: 22px;
    }
  }
  .v-transfer-dom .vux-x-dialog .weui-dialog {
    width: 580px;
    right: 0;
    margin: 0 auto;
    height: 280px;
    top: 50%;
    margin-top: -140px;
  }
  .weui-dialog__btn {
    background-color: #2A7DC1;
    justify-content: space-around;
    border-radius: 10px;
    margin-top: 15px;
    height: 80px;
    line-height: 80px;
  }
  .weui-dialog__ft {
    padding: 0 58px;
    .weui-dialog__btn_default,
    .weui-dialog__btn_primary {
      color: #fff;
      font-size: 36px;
    }
    .weui-dialog__btn_primary {
      margin-left: 86px;
    }
  }
  .weui-dialog__ft:after {
    border-top: none;
  }
  .blank {
    height: 20px;
    background-color: #f5f5f5;
    margin-top: 100px;
  }
  .blank1 {
    height: 20px;
    background-color: #f5f5f5;
  }
  .el-upload {
    width: 132px;
    height: 132px;
    background-color: #ddd;
    line-height: 132px;
    margin-left: 39px;
  }
  .upload_box {
    height: 313px;
    padding: 25px 0 47px 0;
    box-sizing: border-box;
    p {
      text-align: center;
      font-size: 24px;
      color: #666;
    }

  }
</style>
