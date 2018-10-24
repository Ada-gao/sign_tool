<template>
  <div id="signed_list_detail">
    <!-- <mt-header fixed title="报名客户" class="header">
      <router-link :to="{name: 'clientSignedList'}" slot="left">
        <mt-button icon="back" class="def_btn"></mt-button>
      </router-link>
    </mt-header> -->
    <x-header :left-options="{backText: '', preventGoBack:true}" @on-click-back="toLink" class='header'>
      报名客户
    </x-header>
    <div class="detail">
      <div class="bottom-line text-center">
				<span class="bot">客户专属二维码</span>
			</div>
      <div class="qrcodeBox">
        <qrcode :value="value" :size="size"></qrcode>
      </div>
      <p>扫一扫二维码，进行签到</p>
    </div>
    <div class="space"></div>
    <mt-cell
      :title="title"
      :value="defineVal"
      class="def_mtcell"
      :to="{name: 'clientList', params: {id}}"
      is-link>
    </mt-cell>
  </div>
</template>
<script>
//  import { activityUrl } from '@/config/env'
  import { Qrcode, XHeader } from 'vux'
  import { signedData } from '@/service/api/activity'
  export default {
    components: {
      Qrcode,
      XHeader
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
      toLink () {
        this.$router.push({name: 'clientSignedList', params: {id: this.id}})
      },
      getData () {
        signedData(this.id).then(res => {
          this.result = Object.assign({}, res.data)
          this.value = this.result.qrcodeTargetUrl
          this.title = this.result.mobile ? (this.result.clientName + '（' + this.result.mobile + '）') : this.result.clientName
          this.defineVal = this.result.registrationType === 0 ? '自报名' : '代报名'
          console.log(this.value, this.title)
        })
      }
    },
    mounted () {
      console.log('route', this.$route.params)
      this.id = this.$route.params.clientId
      this.getData()
    }
  }
</script>
<style lang="less">
  @import '../../common/style/variable.less';
  #signed_list_detail {
    font-family: PingFangSC-Regular;
    // .mint-header.header {
    //   height: 88px;
    //   background-color: @new-header-color;
    //   font-size: 36px;
    //   color: #333;
    //   padding-top: 40px;
    // }
    .vux-header.header{
      background: @header-bg;
      .vux-header-left{
        .left-arrow:before{
          border-color: @text-font-color;
        }
      }
      .vux-header-title{
        color: @back-color-white;
      }
    }
    .detail {
      padding-top: 126px;
      padding-bottom: 30px;
      background-color: @back-color-white;
      .bottom-line{
        margin-top: 55px;
        font-size: @font-size-thirtyT;/*px*/
        color: #333;
        .bot:before, .bot:after{
          display: inline-block;
          content: '';
          width: 76px;
          height: 3px;
          background:#979797;
          vertical-align: middle;
          position: relative;
        }
        .bot:before{
          right: 12px;
        }
        .bot:after{
          left: 12px;
        }
      }
      .qrcodeBox{
        width: 400px;
        height: 400px;
        // padding: 20px;
        background: #fff;
        margin: 0 auto;
        // margin-top: 180px;
        // margin-bottom: 110px;
        div{
          width: 100%;
          height: 100%;
          img{
            width: 400px !important;
            height: 400px !important;
            padding: 30px;
            border: 1px solid #666;
            border-radius: 5px;
            background: #fff;
            box-sizing: border-box;
          }
        }
      }
      p{
        font-size: @font-size-twentyS;/*px*/
        color: @font-color-9B;
        text-align: center;
        margin-top: 15px;
        // margin-bottom: 30px;
      }
    }
    .def_mtcell {
      box-shadow: 0 2px 10px 0 #E7E2DC;
      margin: 0 20px;
      padding: 0 30px;
      height: 100px;
      .mint-cell-wrapper{
        height: 100%;
        line-height: 100px;
        .mint-cell-title{
          .mint-cell-text{
            font-size: @font-size-twentyE;/*px*/
            color: @font-color-4A;
          }
        }
        .mint-cell-value{
          margin-right: 54px;
          span{
            font-size: @font-size-twentyS;/*px*/
            color: @font-color-orange2;
          }
        }
        .mint-cell-allow-right{
        }
        .mint-cell-allow-right:after{
          border-color: #DADADA;
          margin-right: 20px;
        }
      }
    }
  }
</style>
