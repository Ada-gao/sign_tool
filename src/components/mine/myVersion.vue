<template>
  <div id="v-page">
    <x-header :left-options="{backText: ''}">关于我们</x-header>
    <div class="wrapper">
      <div class="logo text-center absolute-center-x">
			  <img src="static/img/shitu-logo.png">
        <p class="tit">侍 徒</p>
        <p>客户端版本号： 1.0</p>
      </div>
      <div class="tips text-center absolute-center-x">
        <p>版权所有：上海数赟科技有限公司</p>
        <p class="copyRight">Copyright © 2018 shuyun.All Rights Reserved</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { XHeader } from 'vux'

export default {
  data () {
    return {

    }
  },
  components: {
    XHeader
  }
}
</script>

<style lang="less">
@import "../../common/style/variable.less";
#v-page{
  height: 100%;
  .vux-header{
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
