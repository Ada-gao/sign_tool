<template>
  <div class="page">
    <x-header :left-options="{backText: ''}">关于我们</x-header>
    <div class="wrapper">
      <div class="tips">
        <p>客户端版本号： 1.0</p>
        <p>本产品由上海数赟科技有限公司提供技术支持</p>
        <p>欢迎使用者对本产品提出改进建议</p>
        <p>版权所有： 上海数赟科技有限公司</p>
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

<style scoped lang="less">
.wrapper {
  .tips {
    margin-top: 60px;
    text-align: center;
    line-height: 60px;
    font-size: 30px; /*px*/
    color: #333;
  }
}
</style>
