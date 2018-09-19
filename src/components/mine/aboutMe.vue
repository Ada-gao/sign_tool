<template>
  <div id="mypage">
    <!-- <x-header :left-options="{showBack: false}">我的
      <span slot="overwrite-left" @click="infoList" class="warn">
        <i class="iconfont mes">&#xe641;</i>
        <i class="num" v-if="this.noCheckNum !== 0">{{this.noCheckNum}}</i>
      </span>
      <i slot="right" class="iconfont mes" @click="barcodescanner">&#xe661;</i>
    </x-header> -->
    <common-header title=""></common-header>
    <div class="wrapper">
      <div class="top">
        <div class="img"><img src="static/img/banner.png" alt=""></div>
        <div class="right">
          <p>{{this.name}}</p>
          <p class="phone">{{this.phone}}</p>
        </div>
        <img src="static/img/top-banner.png" alt="" style="position: absolute; left: 0; bottom: 0; width: 100%;">
      </div>
      <div class="space"></div>
      <group class="list">
        <cell title="我的消息" :link="{name: 'MyInfo'}"><div class="num text-center">{{this.noCheckNum === 0 ? '' : this.noCheckNum}}</div>
				  <i slot="icon" class="iconfont icon vertical-align">&#xe607;</i>
        </cell>
        <cell title="我的备注" :link="{name: 'Remark'}">
				  <i slot="icon" class="iconfont icon vertical-align">&#xe610;</i>
        </cell>
        <cell title="我的二维码" :is-link='isLink' @click.native="showQrcode">
				  <i slot="icon" class="iconfont icon vertical-align">&#xe66e;</i>
        </cell>
        <!-- <cell title="我的业绩" :link="{name: 'MyPerformance'}"></cell> -->
        <cell title="关于我们" :link="{name: 'MyVersion'}">
				  <i slot="icon" class="iconfont icon vertical-align">&#xe65b;</i>
        </cell>
        <!-- <cell title="退出" @click.native="logout">
				  <i slot="icon" class="iconfont icon">&#xe60c;</i>
        </cell> -->
      </group>
      <div class="space"></div>
      <button class="quitBtn text-center" @click="logout">退出</button>
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
          <x-button @click.native="cancle" class="secCancle" type="primary">取 消</x-button>
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
          <span><img src="static/img/friend.png" class="iconfont" @click="friendShare"><p>朋友圈</p></span>
          <span><img src="static/img/qq.png" class="iconfont" @click="qqShare"><p>QQ好友</p></span>
        </div>
        <div class="hideBtn" @click="hideShareBtn">取消</div>
      <!-- </div> -->
    </mt-popup>
  </div>
</template>

<script type="text/ecmascript-6">
import { XHeader, Group, Cell, CellBox, Actionsheet, XSwitch, XDialog, XButton, Qrcode } from 'vux'
import { removeStore } from '@/config/mUtils'
import Vue from 'vue'
import Notifier from '@/common/js/Notifier'
import { getShare, getInfoList } from '@/service/api/aboutMe'
import { qscan } from '@/service/api/activity'
import { activityUrl } from '@/config/env'
import { toast } from '@/common/js/filter'
import commonHeader from '@/base/infoHeader/header'

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
      showShare: false,
      shareUrl: '',
      noCheckNum: 0,
      name: '',
      phone: ''
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
    Qrcode,
    commonHeader
  },
  methods: {
    logoutEvent (key) {
      if (key === 'men1') {
        removeStore('token')
        this.$router.replace({name: 'Login'})
        // window.JPush.cleanTags({ sequence: 1 }, (result) => {
        //   var sequence = result.sequence
        //   console.log(sequence)
        //   alert('清空了')
        // }, (error) => {
        //   console.log(error)
        // })
      // window.JPush.stopPush()
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
    wachatShare () {
      let Wechat = Vue.cordova.wechat
      let obj = {
        shareType: '1',
        shareChannel: '0'
      }
      getShare(obj).then(res => {
        this.shareUrl = res.data.share_url
      })
      Wechat.isInstalled(function (installed) {
        console.log('Wechat installed: ' + (installed ? 'Yes' : 'No'))
      }, function (reason) {
        console.log('isInstalled: ' + reason)
      })
      Wechat.share({
        message: {
            title: 'Hi, there',
            description: 'This is description.',
            thumb: this.shareUrl,
            mediaTagName: 'TEST-TAG-001',
            messageExt: '这是第三方带的测试字段',
            messageAction: '<action>dotalist</action>',
            media: {
              type: Wechat.Type.IMAGE,
              image: this.shareUrl
            }
        },
        scene: Wechat.Scene.SESSION // share to Timeline
      }, function () {
          console.log('Success')
      }, function (reason) {
          console.log('share: ' + reason)
      })
    },
    friendShare () {
      let Wechat = Vue.cordova.wechat
      let obj = {
        shareType: '1',
        shareChannel: '1'
      }
      getShare(obj).then(res => {
        this.shareUrl = res.data.share_url
      })
      Wechat.isInstalled(function (installed) {
        console.log('Wechat installed: ' + (installed ? 'Yes' : 'No'))
      }, function (reason) {
        console.log('isInstalled: ' + reason)
      })
      Wechat.share({
        message: {
            title: 'Hi, there',
            description: 'This is description.',
            thumb: this.shareUrl,
            mediaTagName: 'TEST-TAG-001',
            messageExt: '这是第三方带的测试字段',
            messageAction: '<action>dotalist</action>',
            media: {
              type: Wechat.Type.IMAGE,
              image: this.shareUrl
            }
        },
        scene: Wechat.Scene.TIMELINE // share to Timeline
      }, function () {
          console.log('Success')
      }, function (reason) {
          console.log('share: ' + reason)
      })
    },
    qqShare () {
      let qqsdk = Vue.cordova.qqsdk
      let obj = {
        shareType: '1',
        shareChannel: '2'
      }
      getShare(obj).then(res => {
        this.shareUrl = res.data.share_url
      })
      var args = {}
      args.client = qqsdk.ClientType.QQ
      qqsdk.checkClientInstalled(function () {
        console.log('client is installed')
      }, function () {
        console.log('client is not installed')
      }, args)
      args.scene = qqsdk.Scene.QQ
      args.title = '注册理财师'
      args.description = '扫一扫注册理财师'
      args.image = this.shareUrl
      qqsdk.shareImage(function () {
        console.log('shareImage success')
      }, function (failReason) {
        console.log('失败')
        console.log(failReason)
      }, args)
    },
    barcodescanner () {
      if (Vue.cordova.device.platform !== 'iOS' && Vue.cordova.device.platform !== 'Android') {
        Notifier.alert('请在移动设备上扫描二维码')
        return
      }
      if (Vue.cordova.device.isVirtual) {
        Notifier.alert('不支持虚拟设备扫描二维码')
        return
      }
      Vue.cordova.scanner.scan(
        {// 全部参数
          'baseColor': '#4e8dec',
          // (边框、按钮、导航栏等背景颜色，优先级最低，单独设置可覆盖)

          // bar
          'title': '我是标题',
          // (标题文字)
          'barColor': '4e8dec',
          // (导航栏颜色)
          'statusBarColor': 'white',
          // (状态栏字体颜色 white为白，不填为默认)

          // describe string
          'describe': '我是提示语',
          // (提示用户文字，支持 \n 换行，多行文字需注意小屏幕设备适配问题)
          'describeFontSize': '15',
          // (字体大小)
          'describeLineSpacing': '8',
          // (行间距)
          'describeColor': 'ffffff',
          // (文字颜色)

          // scan border
          'borderColor': '4e8dec',
          // (扫描框颜色)
          'borderScale': '0.6',
          // (边框大小，0.1 ~ 1)

          // choose photo button
          'choosePhotoEnable': 'true',
          // (支持相册选取, 默认false)
          'choosePhotoBtnTitle': '相册',
          // (选取按钮文字)
          'choosePhotoBtnColor': '4e8dec',
          // (选取按钮颜色)

          // flashlight
          'flashlightEnable': 'true'
          // (支持手电筒, 默认false)
        }, result => {
          let url = window.decodeURI(JSON.parse(result).result).split(activityUrl)[1]
          qscan(url).then(res => {
            // console.log('req', res)
            if (res.data.code === 0) {
              toast('签到成功')
            }
          })
        }, error => {
          console.log(error)// 原因
        }
      )
    },
    infoList () {
      this.$router.push({name: 'MyInfo'})
    }
  },
  mounted () {
    this.qheight = 'height:' + window.innerHeight + 'px'
    let data = JSON.parse(window.localStorage.data)
    this.name = data.name
    this.phone = data.mobile
    this.value = `{'userId': ${data.userId}, 'mobile': ${data.mobile}, 'name': ${data.name}}`
    getInfoList().then(res => {
      let noCheckInfo = res.data.filter(item => item.is_read === '0')
      this.noCheckNum = noCheckInfo.length
      Vue.cordova.jPush.setBadge(this.noCheckNum)
      console.log('Jpush...........7777777')
    })
  }
}
</script>

<style lang="less">
@import "../../common/style/variable.less";
#mypage{
  .vux-header.header-top{
    background: @header-bg;
    .vux-header-left{
      left: 40px;
      .warn{
        .mes{
          font-size: 45px;
          color: @text-font-color;
        }
        .num{
          width: 36px;
          height: 36px;
          line-height: 36px;
          background: #EE5250;
          font-size: @font-size-twentyS;/*px*/
          top: -20px;
          right: -20px;
        }
      }
    }
    .vux-header-right{
      right: 40px;
      .mes{
        font-size: 45px;/*px*/
        color: @text-font-color;
      }
    }
  }
  .wrapper {
    padding-bottom: 0;
    padding-top: 127px;
    .top{
      height: 268px;
      background: @header-bg;
      position: relative;
      padding: 38px 0 0 40px;
      // background-image: url("data:image/png;base64,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");
      // background-repeat: no-repeat;
      // background-position: left bottom;
      .img{
        border-radius: 50%;
        width: 110px;
        height: 110px;
        overflow: hidden;
        display: inline-block;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .right{
        display: inline-block;
        margin-left: 20px;
        vertical-align: top;
        p{
          font-family: @font-family-R;
          font-size: @font-size-thirtyS;/*px*/
          color: @back-color-white;
          margin-bottom: 20px;
        }
        .phone{
          font-size: @font-size-twenty;/*px*/
          color: @text-font-color;
          border: 1px solid #BD9D62;/*no*/
          border-radius: 2px;/*no*/
          height: 28px;
          line-height: 28px;
        }
      }
    }
    .list{
      padding: 0 40px;
      background: @back-color-white;
      .weui-cell{
        height: 103px;
        line-height: 103px;
        border-bottom: 1px solid #E9E9E9;
        .weui-cell__hd{
          .icon{
            font-size: 33px;/*px*/
            color: #666;
            margin-right: 28px;
          }
        }
        .vux-cell-bd{
          p{
            .vux-label{
              font-family: @font-family-R;
              font-size: @font-size-thirty;/*px*/
              color: @font-color-4A;
            }
          }
        }
        .weui-cell__ft{
          padding-right: 10px !important;
          .num{
            width: 36px;
            height: 36px;
            line-height: 36px;
            background: #EE5250;
            font-size: @font-size-twentyS;/*px*/
            color: @back-color-white;
            border-radius: 50%;
            margin-right: 18px;
          }
        }
        .weui-cell__ft:after{
          border-color: #DADADA;
          border-width: 2px 2px 0 0;
          margin-top: -12px;
        }
      }
    }
    // .weui-cells{
    //   margin-top: 0px;
    // }
    // .weui-cells:before{
    //   border-top: none;
    // }
    // .weui-cell:after{
    //   border-top: 1px solid #CCCCCC;
    // }
    // .weui-cells:after{
    //   border-bottom: none;
    // }
    // .weui-cell {
    //   font-size: 30px; /*px*/
    //   padding-top: 44px;
    //   padding-bottom: 40px;
    //   height: 103px;
    //   box-sizing: border-box;
    //   height: 90px;
    //   padding-left: 20px;
    //   border-bottom: 1px solid #D0D0D0;
    //   .icon{
    //     // color: #2B7DC2;
    //     color: #B68458;
    //     font-size: 40px;
    //   }
    //   label{
    //     font-family: PingFangSC-Regular;
    //     font-size: 30px;
    //     color: #333333;
    //   }
    //   .weui-cell__ft{
    //     font-family: PingFangSC-Medium;
    //     font-size: 28px;
    //     color: #B68458;
    //   }
    // }
    // .weui-cell:last-child{
    //   border-bottom: none;
    // }
    // .weui-actionsheet {
    //   .weui-actionsheet__cell {
    //     font-size: 38px!important; /*px*/
    //   }
    // }
    .quitBtn{
      display: block;
      // margin: 113px auto;
      /*width: 710px;*/
      width: 100%;
      height: 103px;
      background: @back-color-white;
      // border-radius: 10px;
      font-family: @font-family-R;
      font-size: @font-size-thirty;/*px*/
      color: @font-color-red;
      line-height: 103px;
      // text-align: center;
      outline: none;
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
        // background: #2A7DC1;
        background: #B68458;
        border-radius: 10px;
        width: 190px;
        height: 80px;
        font-family: PingFangSC-Medium;
        font-size: 36px;
        color: #F0F0F0;
      }
      .weui-btn.weui-btn_primary.secCancle{
        background: #CBCBCB;
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
