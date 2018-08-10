<template>
	<mt-popup
		v-model="popupVisible">
		fnjkngjdkldsnmvkfdnvgjkf
	</mt-popup>
</template>
<script>
  import {Popup} from 'mint-ui'
	export default {
		components: {
			'mt-popup': Popup
		},
		props: ['showImg'],
		watch: {
			'popupVisible': function (n, o) {
        this.setPopup()
      }
		},
		data () {
			return {
				popupVisible: false
			}
		},
		methods: {
			setPopup () {
				this.popupVisible = this.showImg
				console.log(this.popupVisible)
			}
		}
	}
</script>
<style lang="less">

</style>
