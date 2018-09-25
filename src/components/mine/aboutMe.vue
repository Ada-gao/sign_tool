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
        <cell title="我的消息" :link="{name: 'MyInfo'}">
          <div class="num text-center" v-if="this.noCheckNum !== 0">{{this.noCheckNum}}</div>
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
      <!-- <x-dialog v-model="dialogTableVisible" class="dialog-demo quitDialog" hide-on-blur>
          <div class="quit">您确定要退出吗？</div>
          <x-button @click.native="logoutEvent('men1')" type="primary">确 定</x-button>
          <x-button @click.native="cancle" class="secCancle" type="primary">取 消</x-button>
      </x-dialog> -->
    </div>
    <div class="myQrcode" :style="qheight" v-if="showMyQrcode">
      <!-- <div class="qTitle">
        <i class="iconfont back" @click="hideQrcode">&#xe731;</i>
        <span class="tip">我的二维码</span>
        <i class="iconfont share" @click="showShareBtn">&#xea31;</i>
      </div>
      <div class="qrcodeBox">
        <qrcode :value="value" :size="size"></qrcode>
      </div>
      <div class="sao">扫一扫二维码，关注理财师</div> -->
      <div class="info absolute-center-x">
        <i class="iconfont cancle" @click="hideQrcode">&#xe7dd;</i>
        <div class="top"></div>
        <div class="img absolute-center-x"><img class="absolute-center-xy" src="static/img/男.png" alt=""></div>
        <div class="cont text-center">
          <p class="name">{{this.name}}</p>
          <p class="phone">{{this.phone}}</p>
          <div class="qrcode">
            <qrcode :value="value"></qrcode>
          </div>
          <p class="sao">扫一扫二维码，关注理财师</p>
        </div>
        <div class="share text-center" @click="showShareBtn">
          <i class="iconfont">&#xe606;</i>&nbsp;&nbsp;分享
        </div>
      </div>
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
import { MessageBox } from 'mint-ui'

export default {
  data () {
    return {
      show3: false,
      menus3: {
        men1: '确认退出'
      },
      // dialogTableVisible: false,
      append: true,
      show: false,
      isLink: true,
      showMyQrcode: false,
      qheight: '',
      value: '',
      showShare: false,
      shareUrl: '',
      noCheckNum: 0,
      name: '',
      phone: '',
      key: 'men1'
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
    // logoutEvent (key) {
    //   if (key === 'men1') {
    //     removeStore('token')
    //     localStorage.clear()
    //     this.$router.replace({name: 'Login'})
    //     // window.JPush.cleanTags({ sequence: 1 }, (result) => {
    //     //   var sequence = result.sequence
    //     //   console.log(sequence)
    //     //   alert('清空了')
    //     // }, (error) => {
    //     //   console.log(error)
    //     // })
    //   // window.JPush.stopPush()
    //   }
    // },
    logout () {
      this.show3 = !this.show3
      // this.dialogTableVisible = true
      MessageBox.confirm('您确定要退出吗?').then(action => {
        if (this.key === 'men1') {
          removeStore('token')
          localStorage.clear()
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
      })
    },
    // cancle () {
    //   // this.dialogTableVisible = false
    // },
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
          padding: 0 5px;
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
      border: none;
    }
    // .quitDialog{
    //   .weui-dialog{
    //   width: 580px;
    //   height: 345px;
    //   background: #FFFFFF;
    //   border-radius: 10px;
    //   top: 50% !important;
    //   left: 50% !important;
    //   transform: translate(-50%,-50%);
    //   padding: 0;
    //   text-align: center;
    //   .quit{
    //     margin-top: 85px;
    //     margin-bottom: 75px;
    //     font-family: PingFangSC-Regular;
    //     font-size: 36px;
    //     color: #333333;
    //   }
    //   .weui-btn.weui-btn_primary{
    //     display: inline-block;
    //     // background: #2A7DC1;
    //     background: #B68458;
    //     border-radius: 10px;
    //     width: 190px;
    //     height: 80px;
    //     font-family: PingFangSC-Medium;
    //     font-size: 36px;
    //     color: #F0F0F0;
    //   }
    //   .weui-btn.weui-btn_primary.secCancle{
    //     background: #CBCBCB;
    //   }
    //   .weui-btn.weui-btn_primary:first-child{
    //     margin-left: 43px;
    //   }
    //   .weui-btn.weui-btn_primary:nth-child(2){
    //     margin-right: 43px;
    //   }
    //   }
    // }
  }
  .myQrcode{
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    background: rgba(0,0,0,0.6);
    font-family: @font-family-R;
    color: @back-color-white;
    .info{
      width: 560px;
      height: 731px;
      border-radius: 10px;/*no*/
      top: 255px;
      .cancle{
        display: inline-block;
        font-size: 70px;/*px*/
        color: @text-font-color;
        position: absolute;
        top: -120px;
        right: 0;
      }
      .top{
        height: 117px;
        background: @text-font-color;
        border-top-left-radius: 10px;/*px*/
        border-top-right-radius: 10px;/*px*/
      }
      .img{
        width: 130px;
        height: 130px;
        background: @back-color-white;
        border-radius: 50%;
        position: absolute;
        top: 51px;
        img{
          width: 60%;
        }
      }
      .cont{
        height: 614px;
        background: @back-color-white;
        color: @font-color-4A;
        padding-top: 93px;
        border-bottom-left-radius: 10px;/*px*/
        border-bottom-right-radius: 10px;/*px*/
        .name{
          font-family: @font-family-M;
          font-size: @font-size-thirtyT;/*px*/
          line-height: 45px;
          margin-bottom: 10px;
        }
        .phone{
          font-size: @font-size-twentyF;/*px*/
        }
        .qrcode{
          width: 260px;
          height: 260px;
          background: #fff;
          margin: 0 auto;
          margin-top: 47px;
          margin-bottom: 42px;
          border: 1px solid #ccc;
          padding: 9px;
          img{
            width: 240px !important;
            height: 240px !important;
          }
        }
        .sao{
          color: @font-color-9B;
        }
      }
      .share{
        position: absolute;
        bottom: -118px;
        width: 560px;
        height: 88px;
        line-height: 88px;
        border: 1px solid #BD9D62;
        border-radius: 100px;/*px*/
        font-family: @font-family-M;
        font-size: @font-size-thirtyT;/*px*/
        color: @text-font-color;
        i{
          font-size: 40px;/*px*/
        }
      }
    }
  //   .qTitle{
  //     padding: 60px 0 0 0;
  //     .back{
  //       position: absolute;
  //       // top: 42px;
  //       left: 10px;
  //       font-size: 60px;
  //       line-height: 60px;
  //       transform: rotate(180deg);
  //       display: inline-block;
  //       width: 60px;
  //       font-weight: bold;
  //     }
  //     .share{
  //       position: absolute;
  //       top: 60px;
  //       right: 10px;
  //       font-size: 45px;
  //       line-height: 60px;
  //       display: inline-block;
  //       width: 60px;
  //       font-weight: bold;
  //     }
  //     .tip{
  //       display: inline-block;
  //       width: 100%;
  //       font-size: 36px;
  //       text-align: center;
  //     }
  //   }
  //   .qrcodeBox{
  //     width: 500px;
  //     height: 500px;
  //     padding: 20px;
  //     background: #fff;
  //     margin: 0 auto;
  //     margin-top: 180px;
  //     margin-bottom: 110px;
  //     img{
  //       width: 500px !important;
  //       height: 500px !important;
  //       padding: 30px;
  //       border: 1px solid #666;
  //       border-radius: 5px;
  //       background: #fff;
  //       box-sizing: border-box;
  //     }
  //   }
  //   .sao{
  //     font-size: 36px;
  //     text-align: center;
  //     margin-bottom: 100px;
  //   }
  //   .weui-btn.weui-btn_primary{
  //     width: 500px;
  //     height: 70px;
  //     line-height: 70px;
  //     background: #2B7DC2;
  //     font-size: 30px;
  //     .iconfont{
  //       font-size: 36px;
  //       margin-right: 24px;
  //     }
  //   }
  }
  .mint-popup{
    width: 100%;
    // height: 460px;
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
