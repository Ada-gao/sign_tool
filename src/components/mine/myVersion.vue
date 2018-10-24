<template>
  <div id="v-page">
    <x-header class="header" :left-options="{backText: '',preventGoBack: true}" @on-click-back="back()">关于我们</x-header>
    <div class="wrapper">
      <div class="logo text-center absolute-center-x">
			  <img src="static/img/app_logo.png">
			  <!-- <img src="static/img/shitu-logo.png"> -->
        <p class="tit">财智滙</p>
        <p class="sub-tit">客户端版本号：{{ version }}({{ build }})</p>
        <p class="sub-tit">Build时间：{{ buildDate|parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</p>
      </div>
      <div class="tips text-center absolute-center-x">
        <p>版权所有：上海数赟科技有限公司</p>
        <p class="copyRight">Copyright © 2018 Shuyun.All Rights Reserved</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { XHeader } from 'vux'
import Vue from 'vue'

export default {
  data () {
    return {
      version: Vue.cordova.appInfo.version,
      build: Vue.cordova.appInfo.build,
      buildDate: Vue.cordova.appInfo.compileDate
    }
  },
  components: {
    XHeader
  },
  mounted () {
    console.log('Vue.cordova.appInfo')
  },
  methods: {
    back () {
      this.$router.push({name: 'AboutMe'})
    }
  }
}
</script>

<style lang="less">
@import "../../common/style/variable.less";
#v-page{
  height: 100%;
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
  .wrapper {
    // padding-top: 128px;
    height: 100%;
    background: @back-color-white;
    color: @font-color-9B;
    font-size: @font-size-twentyE;/*px*/
    .logo{
      font-family: @font-family-R;
      margin-top: 294px;
      img{
        width: 128px;
      }
      .tit{
        font-size: 44px;/*px*/
        color: #393939;
        line-height: 97px;
      }
      .sub-tit {
        color: #9B9B9B;
        margin-bottom: 20px;
        font-size: 28px;
        white-space: nowrap;
      }
    }
    .tips {
      width: 505px;
      position: absolute;
      bottom: 40px;
      .copyRight{
        margin-top: 15px;
        font-size: @font-size-twentyF;/*px*/
      }
    }
  }
}

</style>
