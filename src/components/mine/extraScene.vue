<template>
  <div id="v-page">
    <x-header class="header" :left-options="{backText: '',preventGoBack: true}" @on-click-back="back()">演员表</x-header>
    <div class="extraScene">
     <img src="static/img/extraScene.png" alt="">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { XHeader } from 'vux'

export default {
  data () {
    return {}
  },
  components: {
    XHeader
  },
  methods: {
    back () {
      this.$router.push({name: 'MyVersion'})
    }
  }
}
</script>

<style lang="less">
@import "../../common/style/variable.less";
#v-page{
  // height: 100%;
  // .vux-header.header{
  //   background: @header-bg;
  //   .vux-header-left{
  //     .left-arrow:before{
  //       border-color: @text-font-color;
  //     }
  //   }
  //   .vux-header-title{
  //     color: @back-color-white;
  //   }
  // }
  .extraScene {
    background: #1D1D1D;
    img {
      width: 100%;
    }
  }
}

</style>
