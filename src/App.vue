<template>
  <div id="app">
    <!-- <tab-bottom v-show="$route.meta.navShow"></tab-bottom> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件 -->
      </router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件 -->
    </router-view>
  </div>
</template>

<script>
import TabBottom from '@/base/tabBottom/tabBottom'
export default {
  name: 'App',
  components: {
  	TabBottom
  },
  created () {
    // var onDeviceReady = function() {
    //   document.addEventListener("jpush.receiveRegistrationId", function (event) {
    //         alert("receiveRegistrationId" + JSON.stringify(event))
    //         // $("#registrationId").html(event.registrationId)
    //         console.log(event.registrationId)
    //     }, false)
        
    //   initiateUI()
    // }
    // var getRegistrationID = function() {
    //   window.JPush.getRegistrationID(onGetRegistrationID)
    // }
  
    // var onGetRegistrationID = function(data) {
    //   try {
    //     console.log("JPushPlugin:registrationID is " + data)
        
    //     if (data.length == 0) {
    //       var t1 = window.setTimeout(getRegistrationID, 1000)
    //     }
    //     // $("#registrationId").html(data)
    //   } catch (exception) {
    //     console.log(exception)
    //   }
    // }
    // var initiateUI = function() {
    //   if ('JPush' in window) {
    //     console.log('init jpush')
    //   } else {
    //     console.log('jpush is not exit')
    //   }
    //   try {
    //     window.JPush.init()
    //     window.JPush.setDebugMode(true)
    //     window.setTimeout(getRegistrationID, 1000)
    //     if (device.platform != "Android") {
    //       window.JPush.setApplicationIconBadgeNumber(0)
    //     }
    //   } catch (exception) {
    //     console.log(exception)
    //   }
    // }
    // document.addEventListener("deviceready", onDeviceReady, false);
    
    // document.addEventListener('jpush.receiveRegistrationId', function (event) {
    //   console.log('registrationId')
    //   console.log(event.registrationId)
    // }, false)
    // window.JPush.init()
    // window.JPush.getRegistrationID(function (rId) {
    //   console.log('JPushPlugin:registrationID is ' + rId)
    // })
    // window.JPush.setDebugMode(true)
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #666;
  height: 100%;
}
</style>
