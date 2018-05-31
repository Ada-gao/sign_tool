<template>
  <div class="perfect_infos">
    <x-header :left-options="{backText: ''}">客户认证</x-header>
    <group class="wrapper">
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
        title="出生日期："></datetime>
      <div class="space"></div>
      <popup-picker title="证件类型："
                    :data="certificationList"
                    v-model="certificationValue"></popup-picker>
      <x-input title="证件号码："
               v-model="certificateNumber"
               ref="certificateCode"
               :show-clear="false"
               class="address"
      ></x-input>
      <datetime
        v-model="starttime"
        title="证件有效期起始时间："></datetime>
      <datetime
        v-model="endtime"
        title="证件有效期结束时间："></datetime>
      <div class="upload">
        <div>证件信息：&nbsp;（请上传清晰的y原件或复印件）</div>
      </div>
    </group>

    <div class="btn_wrap">
      <!--<button class="next" @click="submitCustomer">确定</button>-->
      <el-upload
        :action="'http://10.9.60.141:5000/api/v1/client/customers/' + clientCertificationId + '/bankcards/front/'"
        list-type="picture-card"
        accept="image/*"
        :on-change="uploadChange"
        :headers="headers"
        :on-success="uploadSuccess"
        :file-list="fileList"
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
  import { XHeader, Group, Cell, XInput, Datetime, PopupPicker } from 'vux'
  import { updateFrontPic } from '@/service/api/customers'
  import {getStore} from '@/config/mUtils'

  export default {
    name: 'PerfectInfos',
    components: {
      XHeader,
      Group,
      Cell,
      XInput,
      Datetime,
      PopupPicker
    },
    data () {
      return {
        num: 1,
        isMod: -1,
        address: '',
        name: '',
        nationality: '',
        mobile: '',
        city: '',
        datetime: '',
        starttime: '',
        endtime: '',
        dialogImageUrl: '',
        dialogVisible: false,
        clientCertificationId: 0,
        certificationValue: [],
        certificateNumber: '',
        fileList: [],
        fileObj: null,
        certificationList: [['身份证', '护照', '军官证', '台胞证', '港澳通行证', '其他']]
      }
    },
    computed: {
        headers () {
            return {
                'X-Token': getStore('token')
            }
        }
    },
    mounted () {
      this.name = this.$route.params.name
      this.nationality = this.$route.params.nationality === '0' ? '中国' : '其他'
      this.city = this.$route.params.city
      this.mobile = this.$route.params.mobile
      this.clientCertificationId = this.$route.params.clientCertificationId
    },
    methods: {
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
        this.fileObj = file
        let reader = new FileReader()
        reader.readAsDataURL(file.raw)
        reader.onload = () => {
//          console.log(this.result)
        }
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      uploadSuccess (file) {
        console.log(file)
      },
      submitCustomer () {
        updateFrontPic(this.clientCertificationId).then(res => {
            if (res.status === 200) {
//                this.$router.push({})
            }
        })
//        let params = {}
//        if (this.name &&
//          this.mobile &&
//          this.email) {
//          addCusomer(params).then(res => {
//            console.log(res)
//            if (res.status === 200) {
//              this.$router.push({name: 'CustomerList'})
//            }
//          })
//        }
      }
    }
  }
</script>

<style lang="less">
  a:hover {
    text-decoration: none;
  }
  .perfect_infos {
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
