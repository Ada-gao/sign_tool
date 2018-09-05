<template>
  <div class="activity_list">
    <mt-header fixed title="报名客户" class="header">
      <router-link :to="{name: 'clientSignedList'}" slot="left">
        <mt-button icon="back" class="def_btn"></mt-button>
      </router-link>
    </mt-header>
    <div class="detail">
      <div class="space"></div>
      <div class="qrcodeBox">
        <qrcode :value="value" :size="size"></qrcode>
      </div>
      <mt-cell
        :title="title"
        :value="defineVal"
        class="def_mtcell"
        :to="{name: 'clientList'}"
        is-link>
      </mt-cell>
    </div>
  </div>
</template>
<script>
  import { activityUrl } from '@/config/env'
  import { Qrcode } from 'vux'
  import { signedData } from '@/service/api/activity'
  export default {
    components: {
      Qrcode
    },
    data () {
      return {
        value: '',
        defineVal: '',
        size: 500,
        id: null,
        result: null,
        title: ''
      }
    },
    methods: {
      getData () {
        signedData(this.id).then(res => {
          this.result = Object.assign({}, res.data)
          this.value = activityUrl + this.result.qrcodeTargetUrl
          this.title = this.result.mobile ? (this.result.clientName + '（' + this.mobile + '）') : this.result.clientName
          this.defineVal = this.result.registrationType === 0 ? '自报名' : '代报名'
          console.log(this.value)
        })
      }
    },
    mounted () {
      this.id = this.$route.params.id
      this.getData()
    }
  }
</script>
<style lang="less" scoped>
  @import '../../common/style/variable.less';
  .activity_list {
    font-family: PingFangSC-Regular;
    .mint-header.header {
      height: 88px;
      background-color: @new-header-color;
      font-size: 36px;
      color: #333;
      padding-top: 40px;
    }
    .detail {
      padding-top: 88px;
      background-color: @new-bg-color;
      .qrcodeBox{
        width: 500px;
        height: 500px;
        padding: 20px;
        background: #fff;
        margin: 0 auto;
        margin-top: 180px;
        margin-bottom: 110px;
        img{
          width: 500px !important;
          height: 500px !important;
          padding: 30px;
          border: 1px solid #666;
          border-radius: 5px;
          background: #fff;
          box-sizing: border-box;
        }
      }
      .def_mtcell {
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
      }
      .mint-cell .mint-cell-wrapper .mint-cell-value span {
        color: @new-font-color;
      }
    }
  }
</style>
