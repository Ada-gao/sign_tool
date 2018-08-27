<template>
  <div class="barcodeScanner">
    <x-header :left-options="{backText: ''}">扫一扫</x-header>
    <div class="wrapper">

    </div>
  </div>
</template>
<script>
import { XHeader } from 'vux'

export default {
  components: {
    XHeader
  }
}
</script>
<style lang="less">
  .barcodeScanner{
    height: 100%;
    .wrapper{
      height: 100%;
      background: #000;
    }
  }
</style>

