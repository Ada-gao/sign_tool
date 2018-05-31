<template>
  <div class="vpage">
    <x-header :left-options="{backText: ''}">关于我们</x-header>
    <div class="wrapper">
      <div class="logo">
			  <img src="static/img/logo.png">
      </div>
      <div class="tips">
        <p class="info">客户端版本号： 1.0</p>
        <p class="info">版权所有：上海数赟科技有限公司</p>
        <p class="copyRight">Copyright © 2018 suxiang.All Rights Reserved</p>
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
.vpage{
  height: 100%;
  // .vux-header{
  //   height: 128px;
  //   .vux-header-title{
  //     height: 100%;
  //     line-height: 128px;
  //     font-size: 36px;
  //   }
  // }
  .wrapper {
    // padding-top: 128px;
    background: #fff;
    .logo{
      margin: 352px auto 166px;
      width: 157px;
      height: 161px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .tips {
      font-family: PingFangSC-Regular;
      margin-top: 60px;
      text-align: center;
      line-height: 60px;
      font-size: 30px; /*px*/
      color: #333;
      p{
        height: 50px;
      }
      .info{
        font-size: 36px;
        color: #333333;
      }
      .copyRight{
        font-size: 28px;
        color: #999999;
      }
    }
  }
}

</style>
