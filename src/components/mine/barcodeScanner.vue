<template>
  <div class="barcodeScanner">
    <x-header :left-options="{backText: ''}">扫一扫</x-header>
    <div class='wrapper'>
      <button @click="qrscanner" class="scanner_btn">scanner</button>
    </div>
  </div>
</template>
<script>
import { XHeader } from 'vux'
import Vue from 'vue'

export default {
  components: {
    XHeader
  },
  data () {
    return {
    }
  },
  methods: {
    qrscanner () {
      Vue.cordova.plugins.gizscanqrcode.scan(
        {
          'baseColor': '#4e8dec', // (边框、按钮、导航栏等背景颜色，优先级最低，单独设置可覆盖)

          // bar
          'title': '我是标题', // (标题文字)
          'barColor': '4e8dec', // (导航栏颜色)
          'statusBarColor': 'white', // (状态栏字体颜色 white为白，不填为默认)

          // describe string
          'describe': '我是提示语', // (提示用户文字，支持 \n 换行，多行文字需注意小屏幕设备适配问题)
          'describeFontSize': '15', // (字体大小)
          'describeLineSpacing': '8', // (行间距)
          'describeColor': 'ffffff', // (文字颜色)

          // scan border
          'borderColor': '4e8dec', // (扫描框颜色)
          'borderScale': '0.6', // (边框大小，0.1 ~ 1)
          // choose photo button
          'choosePhotoEnable': 'true', // (支持相册选取, 默认false)
          'choosePhotoBtnTitle': '相册', // (选取按钮文字)
          'choosePhotoBtnColor': '4e8dec', // (选取按钮颜色)

          // flashlight
          'flashlightEnable': 'true' // (支持手电筒, 默认false)
        },
        function (result) {
          console.log(result)// 二维码数据
        },
        function (error) {
          console.log(error)// 原因
        }
      )
    }
  },
  mounted () {}
}
</script>
<style lang="less">
  .barcodeScanner{
    height: 100%;
    .wrapper{
      height: 100%;
      background: #000;
      .scanner_btn {
        font-size: 40px;
      }
    }
  }
</style>
