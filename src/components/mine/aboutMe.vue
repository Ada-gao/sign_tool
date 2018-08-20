<template>
  <div class="mypage">
    <x-header :left-options="{showBack: false}">我的</x-header>
    <div class="wrapper">
      <!-- <div class="top">
        <div class="img"><img src="static/img/banner.png" alt=""></div>
        <div class="right">
          <p>用户名：</p>
          <p>手机号码：</p>
        </div>
      </div> -->
      <group>
        <cell title="我的消息" :link="{name: 'MyInfo'}">
				  <i slot="icon" class="iconfont icon">&#xe62d;</i>
        </cell>
        <cell title="我的备注" :link="{name: 'Remark'}">
				  <i slot="icon" class="iconfont icon">&#xe622;</i>
        </cell>
        <cell title="我的二维码" :is-link='isLink' @click.native="showQrcode">
				  <i slot="icon" class="iconfont icon">&#xe614;</i>
        </cell>
        <!-- <cell title="我的业绩" :link="{name: 'MyPerformance'}"></cell> -->
        <cell title="关于我们" :link="{name: 'MyVersion'}">
				  <i slot="icon" class="iconfont icon">&#xe625;</i>
        </cell>
        <cell title="退出" @click.native="logout">
				  <i slot="icon" class="iconfont icon">&#xe60c;</i>
        </cell>
      </group>
      <!-- <actionsheet v-model="show3" :menus="menus3" @on-click-menu="logoutEvent" show-cancel></actionsheet> -->
      <!-- <el-dialog title="您确定要退出吗？" :visible.sync="dialogTableVisible" :append-to-body="append" center :show-close="show" class="closeDialog">
        <div class="button">
          <el-button type="primary" @click="logoutEvent('men1')">确 定</el-button>
          <el-button type="primary" @click="cancle">取 消</el-button>
        </div>
      </el-dialog> -->
      <x-dialog v-model="dialogTableVisible" class="dialog-demo quitDialog" hide-on-blur>
          <div class="quit">您确定要退出吗？</div>
          <x-button @click.native="logoutEvent('men1')" type="primary">确 定</x-button>
          <x-button @click.native="cancle" type="primary">取 消</x-button>
      </x-dialog>
    </div>
    <div class="myQrcode" :style="qheight" v-if="showMyQrcode">
      <div class="qTitle">
        <i class="iconfont back" @click="hideQrcode">&#xe731;</i>
        <span class="tip">我的二维码</span>
        <i class="iconfont share" @click="showShareBtn">&#xea31;</i>
      </div>
      <div class="qrcodeBox">
        <qrcode :value="value" :size="size"></qrcode>
      </div>
      <div class="sao">扫一扫二维码，关注理财师</div>
      <!-- <x-button @click.native="save" type="primary"><i class="iconfont">&#xe688;</i>保存到相册中</x-button> -->
    </div>
    <mt-popup v-model="showShare"
              position="bottom"
              :modal="false">
      <!-- <div> -->
        <div class="topBorder">
          <span class="line1"></span>
          <span class="topTitle">分享到</span>
          <span class="line2"></span>
        </div>
        <div class="content">
          <span><img src="static/img/wechat.png" class="iconfont" @click="wachatShare"><p>微信好友</p></span>
          <span><img src="static/img/friend.png" class="iconfont" @click="friendShare"><p>微信好友</p></span>
          <span><img src="static/img/qq.png" class="iconfont" @click="qqShare"><p>微信好友</p></span>
        </div>
        <div class="hideBtn" @click="hideShareBtn">取消</div>
      <!-- </div> -->
    </mt-popup>
  </div>
</template>

<script type="text/ecmascript-6">
import { XHeader, Group, Cell, CellBox, Actionsheet, XSwitch, XDialog, XButton, Qrcode } from 'vux'
import { removeStore } from '@/config/mUtils'

export default {
  data () {
    return {
      show3: false,
      menus3: {
        men1: '确认退出'
      },
      dialogTableVisible: false,
      append: true,
      show: false,
      isLink: true,
      showMyQrcode: false,
      qheight: '',
      value: '',
      size: 500,
      showShare: false
    }
  },
  components: {
    XHeader,
    Group,
    Cell,
    CellBox,
    Actionsheet,
    XSwitch,
    XDialog,
    XButton,
    Qrcode
  },
  methods: {
    logoutEvent (key) {
      if (key === 'men1') {
        removeStore('token')
        this.$router.push({name: 'Login'})
      }
    },
    logout () {
      this.show3 = !this.show3
      this.dialogTableVisible = true
    },
    cancle () {
      this.dialogTableVisible = false
    },
    showQrcode () {
      this.showMyQrcode = true
    },
    hideQrcode () {
      this.showMyQrcode = false
      this.showShare = false
    },
    showShareBtn () {
      this.showShare = true
    },
    hideShareBtn () {
      this.showShare = false
    },
    wachatShare () {},
    friendShare () {},
    qqShare () {}
  },
  mounted () {
    this.qheight = 'height:' + window.innerHeight + 'px'
    let data = JSON.parse(window.localStorage.data)
    this.value = `{'userId': ${data.userId}, 'mobile': ${data.mobile}, 'name': ${data.name}}`
  }
}
</script>

<style lang="less">
.mypage{
  .vux-header{
    // background: #fff !important;
    .vux-header-title{
      // color: #000;
    }
  }
  .wrapper {
    padding-bottom: 0;
    .top{
      height: 266px;
      background: #fff;
      margin-bottom: 27px;
      padding-top: 70px;
      padding-left: 80px;
      .img{
        border-radius: 50%;
        width: 130px;
        height: 130px;
        overflow: hidden;
        display: inline-block;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .right{
        display: inline-block;
      }
    }
    .weui-cells{
      margin-top: 0px;
    }
    .weui-cell:after{
      border-top: 1px solid #CCCCCC;
    }
    .weui-cells:after{
      border-bottom: 1px solid #CCCCCC;
    }
    .weui-cell {
      font-size: 30px; /*px*/
      padding-top: 44px;
      padding-bottom: 40px;
      height: 103px;
      box-sizing: border-box;
      height: 82px;
      padding-left: 20px;
      .icon{
        color: #2B7DC2;
        font-size: 40px;
      }
      label{
        font-family: PingFangSC-Medium;
        font-size: 30px;
        color: #333333;
      }
    }
    .weui-actionsheet {
      .weui-actionsheet__cell {
        font-size: 38px!important; /*px*/
      }
    }
    .quitDialog{
      .weui-dialog{
      width: 580px;
      height: 345px;
      background: #FFFFFF;
      border-radius: 10px;
      top: 50% !important;
      left: 50% !important;
      transform: translate(-50%,-50%);
      padding: 0;
      text-align: center;
      .quit{
        margin-top: 85px;
        margin-bottom: 75px;
        font-family: PingFangSC-Regular;
        font-size: 36px;
        color: #333333;
      }
      .weui-btn.weui-btn_primary{
        display: inline-block;
        background: #2A7DC1;
        border-radius: 10px;
        width: 190px;
        height: 80px;
        font-family: PingFangSC-Medium;
        font-size: 36px;
        color: #F0F0F0;
      }
      .weui-btn.weui-btn_primary:first-child{
        margin-left: 43px;
      }
      .weui-btn.weui-btn_primary:nth-child(2){
        margin-right: 43px;
      }
      }
    }
  }
  .myQrcode{
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    background: rgba(0,0,0,0.85);
    font-family: PingFangSC-Regular;
    color: #fff;
    .qTitle{
      padding: 60px 0 0 0;
      .back{
        position: absolute;
        // top: 42px;
        left: 10px;
        font-size: 60px;
        line-height: 60px;
        transform: rotate(180deg);
        display: inline-block;
        width: 60px;
        font-weight: bold;
      }
      .share{
        position: absolute;
        top: 60px;
        right: 10px;
        font-size: 45px;
        line-height: 60px;
        display: inline-block;
        width: 60px;
        font-weight: bold;
      }
      .tip{
        display: inline-block;
        width: 100%;
        font-size: 36px;
        text-align: center;
      }
    }
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
    .sao{
      font-size: 36px;
      text-align: center;
      margin-bottom: 100px;
    }
    .weui-btn.weui-btn_primary{
      width: 500px;
      height: 70px;
      line-height: 70px;
      background: #2B7DC2;
      font-size: 30px;
      .iconfont{
        font-size: 36px;
        margin-right: 24px;
      }
    }
  }
  .mint-popup{
    width: 100%;
    height: 460px;
    padding: 40px 60px 0;
    background: #FBFBFB;
    box-sizing: border-box;
    font-family: PingFangSC-Medium;
    letter-spacing: 0;
    .topBorder{
      font-size: 28px;
      color: #000000;
      .line1{
        display: inline-block;
        height: 1px;
        width: 205px;
        background: #666;
        margin-right: 40px;
        vertical-align: middle;
      }
      .line2{
        display: inline-block;
        height: 1px;
        width: 205px;
        background: #666;
        margin-left: 40px;
        vertical-align: middle;
      }
      .topTitle:before{
        display: inline-block;
        content: '';
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #666;
        right: 60px;
        position: relative;
      }
      .topTitle:after{
        display: inline-block;
        content: '';
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #666;
        left: 60px;
        position: relative;
      }
    }
    .content{
      text-align: center;
      padding-top: 50px;
      padding-bottom: 50px;
      font-size: 24px;
      color: #000000;
      span{
        display: inline-block;
        img{
          width: 112px;
          height: 112px;
        }
      }
      span:nth-child(2){
        margin: 0 100px;
      }
    }
    .hideBtn{
      height: 100px;
      line-height: 100px;
      text-align: center;
      font-size: 28px;
      color: #333333;
      border-top: 1px solid #C9C9C9;
    }
  }
}
</style>
