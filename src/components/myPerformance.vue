<template>
  <div class="page">
    <x-header :left-options="{backText: ''}">我的业绩</x-header>
    <div class="wrapper">
      <div class="situation">
        <p class="label-text">我的业绩指标：<span class="red-text">300万</span></p>
        <p class="label-text">完成业绩量：<span class="red-text">150万</span></p>
        <p class="label-text">业绩完成比例：<span class="red-text">100%</span></p>
        <p class="label-text">业绩量排名：<span class="red-text">42名</span></p>
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
  .situation {
    padding: 50px 30px;
    font-size: 30px; /*px*/
    line-height: 60px;
    .label-text {
      .red-text {
        color: #FF4545;
      }
    }
  }
}
</style>
