<template>
  <div id="app">
    <!-- <tab-bottom v-show="$route.meta.navShow"></tab-bottom> -->
    <transition :enter-active-class="enterAnimate" :leave-active-class="leaveAnimate">
      <keep-alive :include="includeComponent">
        <router-view/>
      </keep-alive>
    </transition>
    <!-- <transition :enter-active-class="enterAnimate" :leave-active-class="leaveAnimate">
      <router-view v-if="!$route.meta.keepAlive">
      </router-view>
    </transition> -->
  </div>
</template>

<script>
import TabBottom from '@/base/tabBottom/tabBottom'
import Vue from 'vue'
export default {
  name: 'App',
  components: {
  	TabBottom
  },
  data () {
    return {
      enterAnimate: '', // 页面进入动效
      leaveAnimate: '', // 页面离开动效
      firstPage: ['/HomePage', '/reservationList', '/customerList', '/aboutMe'],
      secondPage: ['/productDetail', '/productAppointment', '/customerManagement', '/myInfo', '/remark', '/myVersion'],
      includeComponent: 'ProductAppointment'
    }
  },
  watch: {
    $route (to, from) {
      // keep-alive include
      // if (!from.path.includes('/reservationList') && to.path === '/productAppointment') {
      //   this.includeComponent = 'ProductAppointment'
      // } else {
      //   this.includeComponent = ''
      // }
      if (to.name === 'reservationList') {
        this.includeComponent = ''
      } else {
        this.includeComponent = 'ProductAppointment'
      }
      // statusBar
      if (to.path.includes('HomePage')) {
        Vue.cordova.statusBar && Vue.cordova.statusBar.styleDefault()
        // console.log(Vue.cordova.statusBar)
      } else {
        // console.log('不是首页')
        Vue.cordova.statusBar && Vue.cordova.statusBar.styleBlackTranslucent()
      }
      // 增加进入淡出动画效果
      // console.log('from ' + from.path + ' to ' + to.path)
      if (from.path === '/login' || to.path === '/login') {
        this.enterAnimate = ''
        this.leaveAnimate = ''
        return
      }
      // if (from.path === '/HomePage') {
      //   this.enterAnimate = 'animated fadeInRight'
      //   this.leaveAnimate = 'animated fadeOutLeft'
      //   return
      // } else if (to.path === '/HomePage') {
      //   this.enterAnimate = 'animated fadeInLeft'
      //   this.leaveAnimate = 'animated fadeOutRight'
      //   return
      // }
      // 同一级页面无需设置过渡效果
      const fromPath = '/' + from.path.split('/')[1]
      const toPath = '/' + to.path.split('/')[1]
      // console.log('from: ' + fromPath, 'to: ' + toPath)
      if (this.firstPage.includes(toPath) && this.firstPage.includes(fromPath)) {
        this.enterAnimate = ''
        this.leaveAnimate = ''
      } else if (this.firstPage.includes(fromPath) && this.secondPage.includes(toPath)) {
        // console.log('从一级页面到二级页面')
        this.enterAnimate = 'animated fadeInRight'
        this.leaveAnimate = 'animated fadeOutLeft'
      } else if (this.secondPage.includes(fromPath) && this.firstPage.includes(toPath)) {
        // console.log('从二级页面到一级页面')
        this.enterAnimate = 'animated fadeInLeft'
        this.leaveAnimate = 'animated fadeOutRight'
      } else {
        this.enterAnimate = ''
        this.leaveAnimate = ''
      }
      // this.enterAnimate = toDepth > fromDepth ? 'animated fadeInRight' : 'animated fadeInLeft'
      // this.leaveAnimate = toDepth > fromDepth ? 'animated fadeOutLeft' : 'animated fadeOutRight'
    }
  }
}
</script>

<style lang="less">
@import "common/css/lib/animate.css";
@import '~vux/src/styles/reset.less';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  // color: #666;
  height: 100%;
  // overflow-y: scroll;
}
</style>
