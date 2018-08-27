<template>
  <div class="activity_list">
    <mt-header fixed title="报名客户" class="header">
      <router-link :to="{name: 'activityDetail'}" slot="left">
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
        class="def_mtcell"
        :to="{name: 'clientList'}"
        is-link>
      </mt-cell>
    </div>
  </div>
</template>
<script>
  import { Qrcode } from 'vux'
  export default {
    components: {
      Qrcode
    },
    data () {
      return {
        value: '',
        size: 500,
        result: {},
        title: ''
      }
    },
    methods: {},
    mounted () {
      this.result = this.$route.params
      this.title = this.result + '（' + this.mobile + '）'
      console.log(this.$route)
    }
  }
</script>
<style lang="less" scoped>
  @import '../../common/style/variable.less';
  .activity_list {
    font-family: PingFangSC-Regular;
    .mint-header.header {
      height: 98px;
      background-color: @new-header-color;
      font-size: 36px;
      color: #333;
      padding-top: 30px;
    }
    .detail {
      padding-top: 98px;
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
    }
  }
</style>
