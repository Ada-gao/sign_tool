<template>
  <div id="activity_list">
    <!-- <mt-header fixed title="活动详情" class="header">
      <router-link :to="{name: 'activityList'}" slot="left">
        <mt-button icon="back" class="def_btn"></mt-button>
      </router-link>
      <mt-button slot="right">
        <div @click="showShareBtn">
          <mt-button class="right_btn"><span>分享</span><i class="iconfont">&#xea31;</i></mt-button>
        </div>
      </mt-button>
    </mt-header> -->
    <x-header class="header" :left-options="{backText: ''}">活动详情
      <i slot="right" class="iconfont mes" @click="showShareBtn">&#xe606;</i>
    </x-header>
    <div class="detail">
      <img :src="src" alt="">
      <!-- <div class="tit">
        <div class="left">{{detail.activityName}}</div>
        <div class="right">
          <span>编号：</span>
          <span>{{detail.activityCode}}</span>
        </div>
      </div> -->
      <main class="cont">
        <p>{{detail.activityName}}</p>
        <section class="detail_item">
          <span>活动编号：</span>
          <span>{{detail.activityCode}}</span>
        </section>
        <section class="detail_item">
          <span>活动开始：</span>
          <span>{{detail.activityStart}}</span>
        </section>
        <section class="detail_item">
          <span>活动结束：</span>
          <span>{{detail.activityEnd}}</span>
        </section>
        <section class="detail_item">
          <span>报名开始：</span>
          <span>{{detail.registrationStart}}</span>
        </section>
        <section class="detail_item">
          <span>报名结束：</span>
          <span>{{detail.registrationEnd}}</span>
        </section>
        <section class="detail_item">
          <span>活动人数：</span>
          <span>{{detail.activityActivitiesNumber}}人</span>
        </section>
        <section class="detail_item">
          <span>活动负责人：</span>
          <span>{{detail.activityPrincipal}}</span>
        </section>
        <section class="detail_item">
          <span>活动所属部门：</span>
          <span>{{detail.activityDept}}</span>
        </section>
        <section class="detail_item def_item">
          <i class="iconfont">&#xe637;</i>
          <span>{{detail.activitySite}}</span>
        </section>
        <div class="space"></div>
        <section class="brief_info">
          <div>活动简介：</div>
          <div class="brief_cont">
            {{detail.activityIntroduction}}
          </div>
        </section>
        <div class="space"></div>
        <section class="activity_poster">
          <span class="left def_left">活动海报</span>
          <span class="right" @click="handleShare">查看</span>
        </section>
        <mt-cell
          title="代客户报名"
          class="def_mtcell"
          :to="{name: 'clientList'}"
          is-link>
        </mt-cell>
        <mt-cell
          title="查看报名列表"
          class="def_mtcell"
          :to="{name: 'clientSignedList'}"
          is-link>
        </mt-cell>
      </main>
    </div>
    <div class="popup_banner" v-if="showShare">
      <img :src="posterBanner"
           v-if="showShare"
           alt="">
    </div>
    <mt-popup v-model="showShare"
              position="bottom"
              class="activity_popup">
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
<script>
  import { XHeader } from 'vux'
  import { getShare } from '@/service/api/aboutMe'
  import { getActivityDet } from '@/service/api/activity'
  import { parseTime } from '@/common/js/filter'
  import {getStore, setStore, removeStore} from '@/config/mUtils'
  import Vue from 'vue'
  export default {
    components: {
      XHeader
    },
    data () {
      return {
        src: 'static/img/测试banner.jpg',
        posterBanner: 'static/img/banner.jpg',
        showShare: false,
        shareUrl: '',
        detail: {},
        activityId: null
      }
    },
    beforeRouteLeave (to, from, next) {
      if (to.name === 'activityList') {
        removeStore('activityId')
        next()
      } else {
        next()
      }
    },
    methods: {
      getData () {
        getActivityDet(this.activityId).then(res => {
          if (res.status === 200) {
            // console.log(res.data)
            this.detail = Object.assign({}, res.data)
            this.detail.activityStart = parseTime(this.detail.activityStart, '{y}.{m}.{d} {h}:{i}')
            this.detail.activityEnd = parseTime(this.detail.activityEnd, '{y}.{m}.{d} {h}:{i}')
            this.detail.registrationStart = parseTime(this.detail.registrationStart, '{y}.{m}.{d} {h}:{i}')
            this.detail.registrationEnd = parseTime(this.detail.registrationEnd, '{y}.{m}.{d} {h}:{i}')
          }
        })
      },
      handleShare () {
        console.log(111)
      },
      showShareBtn () {
        this.showShare = true
      },
      hideShareBtn () {
        this.showShare = false
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
      }
    },
    mounted () {
      let activityId = getStore('activityId')
      this.activityId = this.$route.params.id || activityId
      if (!activityId) {
        setStore('activityId', this.activityId)
      }
      this.getData(this.activityId)
    }
  }
</script>
<style lang="less">
  @import '../../common/style/variable.less';
  .popup_banner {
    width: 86.67%;
    background-color: #fff;
    box-sizing: border-box;
    padding: 34px 25px;
    position: fixed;
    top: 36%;
    left: 50%;
    z-index: 9999;
    transform: translateX(-50%) translateY(-50%);
    img {
      display: inline-block;
      width: 100%;
    }
  }
  .activity_popup.mint-popup{
    width: 100%;
    height: 460px;
    padding: 40px 60px 0;
    background: #FBFBFB;
    box-sizing: border-box;
    font-family: PingFangSC-Regular;
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
  #activity_list {
    font-family: @font-family-R;
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
      .vux-header-right{
        .mes{
          font-size: 38px;/*px*/
          margin-right: 30px;
          color: @text-font-color;
        }
      }
    }
    .detail {
      padding-top: 126px;
      background-color: #fff;
      line-height: 0;
      img{
        width: 100%;
      }
      // .left, .right {
      //   position: absolute;
      //   top: 50%;
      //   transform: translateY(-50%);
      // }
      // .left {
      //   left: 20px;
      //   font-size: 30px;
      //   color: @new-font-color;
      // }
      // .right {
      //   right: 20px;
      //   font-size: 28px;
      //   color: #333;
      // }
      // .tit {
      //   position: relative;
      //   height: 75px;
      //   line-height: 75px;
      // }
      .cont {
        font-size: 26px;
        color: #626161;
        padding: 30px;
        img {
          display: block;
          width: 100%;
          height: 370px;
        }
        .detail_item {
          height: 37px;
          line-height: 37px;
          margin-bottom: 15px;
          padding-left: 20px;
        }
        .detail_item:nth-of-type(1) {
          margin-top: 15px;
        }
        .def_item {
          i, span {
            vertical-align: baseline;
          }
          i {
            font-size: 22px;
          }
        }
        .brief_info {
          padding: 12px 20px;
          .brief_cont {
            word-break: break-all;
          }
        }
        .activity_poster {
          height: 79px;
          line-height: 79px;
          position: relative;
          span {
            color: #626161;
          }
        }
        .def_mtcell:nth-of-type(1) {
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;
        }
      }
    }
  }
</style>
