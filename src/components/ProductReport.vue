<template>
  <div class="page">
    <x-header :left-options="{backText: ''}">交易所需材料</x-header>
  </div>
</template>

<script type="text/ecmascript-6">
import { XHeader } from 'vux'
import { getAnnoucement } from '@/service/api/products'

export default {
  data () {
    return {

    }
  },
  components: {
    XHeader
  },
  mounted () {
		getAnnoucement(1).then(res => {
      console.log(res)
		})
	}
}
</script>

<style scoped lang="less">
</style>
