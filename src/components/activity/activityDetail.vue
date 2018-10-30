<template>
  <div id="activity_list">
    <x-header :left-options="{backText: '', preventGoBack:true}" @on-click-back="toLink" class='header'>活动详情
      <i slot="right"
         class="iconfont mes"
         v-if="shareObj.showBtn"
         @click="showShareBtn">&#xe606;</i>
    </x-header>
    <div class="detail">
      <img :src="this.detail.activityBannerUrl" alt="">
      <main class="cont">
        <p>{{detail.activityName}}</p>
        <section class="detail_item">
          <span class="tit">活动编号：</span>
          <span>{{detail.activityCode}}</span>
        </section>
        <section class="detail_item">
          <span class="tit">活动时间：</span>
          <span>{{detail.activityStart}}-{{detail.activityEnd}}</span>
        </section>
        <section class="detail_item">
          <span class="tit">报名时间：</span>
          <span>{{detail.registrationStart}}-{{detail.registrationEnd}}</span>
        </section>
        <section class="detail_item">
          <span class="tit">活动人数：</span>
          <span>{{detail.activityActivitiesNumber}}人</span>
        </section>
        <section class="detail_item">
          <span class="tit">活动负责人：</span>
          <span>{{detail.activityPrincipal}}</span>
        </section>
        <section class="detail_item">
          <span class="tit">活动所属部门：</span>
          <span>{{detail.activityDept}}</span>
        </section>
        <section class="detail_item">
          <span class="tit">活动地点：</span>
          <span>{{detail.activitySite}}</span>
        </section>
        <!-- <section class="detail_item def_item">
          <i class="iconfont">&#xe637;</i>
          <span>{{detail.activitySite}}</span>
        </section> -->
      </main>
      <div class="space"></div>
      <section class="brief_info">
        <div class="info">活动简介：</div>
        <div class="brief_cont">
          {{detail.activityIntroduction}}
        </div>
      </section>
      <div class="space"></div>
      <section class="activity_poster">
        <span class="left def_left">活动海报</span>
        <span class="right" @click="handleShare">查看<i class="iconfont vertical-align">&#xe8d5;</i></span>
      </section>
      <div class="button">
        <mt-button class="def_mtcell def_mtcell_left" @click.native="toSigned">代客户报名</mt-button>
        <mt-button class="def_mtcell" @click.native="toList">查看报名列表</mt-button>
      </div>
    </div>
    <div class="popup_banner" v-if="showShare">
      <img src=""
           v-if="showShare"
           alt=""
           id="avatar">
      <qrcode class="qrcode" :value="this.detail.qrcodeTargetUrl" :size="size" style="display: none"></qrcode>
    </div>
    <mt-popup class="bigImg"
      v-model="showShare1"
      @click.native="hideBigImg">
      <img src=""
           v-if="showShare1"
           alt=""
           id="avatar">
      <qrcode class="qrcode" :value="this.detail.qrcodeTargetUrl" :size="size" style="display: none"></qrcode>
    </mt-popup>
    <mt-popup v-model="showShare"
              position="bottom"
              class="activity_popup">
      <div class="content">
        <span v-if="shareObj.showWeChat"><img src="static/img/wechat.png" class="iconfont" @click="wachatShare"><p>微信好友</p></span>
        <span v-if="shareObj.showMoments"><img src="static/img/friend.png" class="iconfont" @click="friendShare"><p>朋友圈</p></span>
        <span v-if="shareObj.showQQ"><img src="static/img/qq.png" class="iconfont" @click="qqShare"><p>QQ好友</p></span>
      </div>
      <div class="hideBtn" @click="hideShareBtn">取消</div>
    </mt-popup>
  </div>
</template>
<script>
  import { XHeader, Qrcode } from 'vux'
  import { getShare } from '@/service/api/aboutMe'
  import { getActivityDet, getActivityLogo } from '@/service/api/activity'
  import { parseTime } from '@/common/js/filter'
//  import {getStore, setStore, removeStore} from '@/config/mUtils'
  import Vue from 'vue'
  export default {
    components: {
      XHeader,
      Qrcode
    },
    data () {
      return {
        src: 'static/img/测试banner.jpg',
        posterBanner: 'static/img/banner.jpg',
        showShare: false,
        showShare1: false,
        shareUrl: '',
        detail: {},
        activityId: null,
        size: 50,
        qrcodeUrl: '',
        shareObj: {
          showBtn: true,
          showWeChat: true,
          showMoments: true,
          showQQ: true
        },
        i: 1
      }
    },
    methods: {
      toLink () {
        this.$router.push({name: 'activityList'})
      },
      getData () {
        getActivityDet(this.activityId).then(res => {
          if (res.status === 200) {
            console.log(res.data)
            this.detail = Object.assign({}, res.data)
            this.detail.activityStart = parseTime(this.detail.activityStart, '{y}.{m}.{d} {h}:{i}')
            this.detail.activityEnd = parseTime(this.detail.activityEnd, '{y}.{m}.{d} {h}:{i}')
            this.detail.registrationStart = parseTime(this.detail.registrationStart, '{y}.{m}.{d} {h}:{i}')
            this.detail.registrationEnd = parseTime(this.detail.registrationEnd, '{y}.{m}.{d} {h}:{i}')
            // 分享按钮显示与否
            if (!this.detail.activityShare) {
              this.shareObj.showBtn = false
            } else {
              // wechat显示与否
              this.shareObj.showWeChat = this.detail.activityShare.indexOf('0') > -1
              // moments显示与否
              this.shareObj.showMoments = this.detail.activityShare.indexOf('1') > -1
              // QQ显示与否
              this.shareObj.showQQ = this.detail.activityShare.indexOf('2') > -1
            }
          }
        })
      },
      handleShare () {
        this.showShare1 = true
        this.i = 2
        this.drawAndShareImage(this.i)
      },
      hideBigImg () {
        this.showShare1 = false
      },
      showShareBtn () {
        this.showShare = true
        this.i = 1
        this.drawAndShareImage(this.i)
      },
      hideShareBtn () {
        this.showShare = false
      },
      toSigned () {
        this.$router.push({name: 'clientList', params: {id: this.activityId}})
      },
      toList () {
        this.$router.push({name: 'clientSignedList', params: {id: this.activityId}})
      },
      wachatShare () {
        let Wechat = Vue.cordova.Wechat
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
        let Wechat = Vue.cordova.Wechat
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
        let QQSDK = Vue.cordova.qqsdk
        let obj = {
          shareType: '1',
          shareChannel: '2'
        }
        getShare(obj).then(res => {
          this.shareUrl = res.data.share_url
        })
        var args = {}
        args.client = QQSDK.ClientType.QQ
        QQSDK.checkClientInstalled(() => {
          console.log('client is installed')
        }, () => {
          console.log('client is not installed')
        }, args)
        args.scene = QQSDK.Scene.QQ
        args.title = '注册理财师'
        args.description = '扫一扫注册理财师'
        args.image = this.shareUrl
        QQSDK.shareImage(() => {
          console.log('shareImage success')
        }, (failReason) => {
          console.log('失败')
          console.log(failReason)
        }, args)
      },
      drawAndShareImage (i) {
        let url = this.detail.activityPosterUrl
        let url1 = this.qrcodeUrl
        // let activityQrcodeUrl = this.detail.activityQrcodeUrl
        var canvas = document.createElement('canvas')
        canvas.width = 350 * i
        canvas.height = 667 * i
        var context = canvas.getContext('2d')
        context.rect(0, 0, canvas.width, canvas.height)
        context.fillStyle = '#fff'
        context.fill()
        var myImage = new Image()
        myImage.crossOrigin = 'anonymous'
        // myImage.setAttribute("crossOrigin",'Anonymous')
        myImage.src = url // 背景图片  你自己本地的图片或者在线图片
        myImage.onload = function () {
          context.drawImage(myImage, 0, 0, 350 * i, 667 * i)
          // context.font = '60px Courier New'
          // context.fillText('我是文字', 350, 450)
          var myImage2 = new Image()
          // var myImage2 = document.querySelector('.qrcode > img')
          myImage2.crossOrigin = 'anonymous'
          myImage2.src = url1 // 你自己本地的图片或者在线图片
          // myImage2.setAttribute("crossOrigin",'Anonymous')
          myImage2.onload = function () {
            context.drawImage(myImage2, 20 * i, 20 * i, 91 * i, 34 * i)
            var base64 = canvas.toDataURL('image/png') // "image/png" 这里注意一下
            // var img = document.getElementById('avatar')
            // img.setAttribute('src', base64)
             var canvas1 = document.createElement('canvas')
              canvas1.width = 350 * i
              canvas1.height = 667 * i
              var context1 = canvas.getContext('2d')
              context1.rect(0, 0, canvas1.width, canvas1.height)
              context1.fillStyle = '#fff'
              context1.fill()
              var myImage3 = new Image()
              myImage3.crossOrigin = 'anonymous'
              // myImage3.setAttribute("crossOrigin",'Anonymous')
              myImage3.src = base64 // 背景图片  你自己本地的图片或者在线图片
              myImage3.onload = function () {
                context.drawImage(myImage3, 0, 0, 350 * i, 667 * i)
                // context.font = '60px Courier New'
                // context.fillText('我是文字', 350, 450)
                var myImage4 = document.querySelector('.qrcode > img')
                myImage4.crossOrigin = 'anonymous'
                // myImage4.setAttribute("crossOrigin",'Anonymous')
                // myImage4.onload = function () {
                  context.drawImage(myImage4, 150 * i, 567 * i, 50 * i, 50 * i)
                  var base641 = canvas.toDataURL('image/png') // "image/png" 这里注意一下
                  var img = document.getElementById('avatar')
                  img.setAttribute('src', base641)
                // }
              }
          }
        }
      }
    },
    mounted () {
      this.activityId = this.$route.params.id
      getActivityLogo().then(res => {
        this.qrcodeUrl = res.data
      })
      this.getData(this.activityId)
    }
  }
</script>
<style lang="less">
  @import '../../common/style/variable.less';
  .popup_banner {
    // width: 86.67%;
    background-color: #fff;
    box-sizing: border-box;
    // padding: 34px 25px;
    position: fixed;
    height: 667px;
    top: 36%;
    left: 50%;
    z-index: 9999;
    transform: translateX(-50%) translateY(-50%);
    img {
      display: inline-block;
      // width: 100%;
    }
  }
  .activity_popup.mint-popup{
    width: 100%;
    height: 352px;
    padding: 30px 60px 0;
    background: #FBFBFB;
    box-sizing: border-box;
    font-family: @font-family-M;
    letter-spacing: 0;
    .content{
      display: flex;
      text-align: center;
      padding-bottom: 50px;
      font-size: @font-size-twentyF;/*px*/
      color: #000000;
      span{
        flex: 1;
        img{
          width: 100px;
          height: 100px;
        }
        p{
          margin-top: 20px;
        }
      }
    }
    .hideBtn{
      height: 100px;
      line-height: 100px;
      text-align: center;
      font-size: @font-size-twentyE;/*px*/
      color: #333333;
      border-top: 1px solid #C9C9C9;
    }
  }
  #activity_list {
    font-family: @font-family-R;
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
      .vux-header-right{
        .mes{
          font-size: 40px;/*px*/
          margin-right: 30px;
          color: @text-font-color;
        }
      }
    }
    .detail {
      padding-top: 88px;
      line-height: 0;
      img{
        width: 100%;
      }
      .cont {
        font-family: @font-family-M;
        font-size: @font-size-twentyS;/*px*/
        color: @font-color-4A;
        padding: 30px;
        background: @back-color-white;
        p{
          line-height: 45px;
          font-size: @font-size-thirtyT;/*px*/
          color: #2E2E2E;
        }
        .detail_item {
          // height: 42px;
          line-height: 42px;
          margin-bottom: 20px;
          // padding-left: 20px;
          span{
            width: 68%;
            display: inline-block;
          }
          .tit{
            font-family: @font-family-R;
            width: 30.5%;
            display: inline-block;
            vertical-align: top;
          }
        }
        .detail_item:nth-of-type(1) {
          margin-top: 30px;
        }
        .detail_item:last-child {
          margin-bottom: 0px;
        }
      }
      .brief_info {
        padding: 30px;
        line-height: 42px;
        font-size: @font-size-thirty;
        color: @font-color-4A;
        background: @back-color-white;
        .info{
          margin-bottom: 20px;
          font-family: @font-family-M;
        }
        .brief_cont {
        }
      }
      .activity_poster {
        position: relative;
        padding: 30px;
        line-height: 42px;
        font-size: @font-size-thirty;/*px*/
        color: @font-color-4A;
        background: @back-color-white;
        .right {
          color: @font-color-blue;
          float: right;
          margin-right: -18px;
          i{
            color: #DADADA;
            font-size: 50px;
          }
        }
      }
      .button{
        padding: 40px 30px;
        .def_mtcell{
          width: 320px;
          height: 88px;
          line-height: 88px;
          display: inline-block;
        }
        .def_mtcell_left{
          background: @back-color-white;
          border: 1px solid #BD9D62;
          color: @text-font-color;
          margin-right: 40px;
        }
      }
    }
    .mint-popup.bigImg{
      height: 1334px;
    }
  }
</style>
