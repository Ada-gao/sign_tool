<template>
	<div @click="hidePopup" class="thumbnails" v-if="hidePop">
		<mt-popup
			v-model="popupVisible"
			style="width:750px; height:750px">
			<mt-swipe :show-indicators="false" style="width:750px; height:750px" :auto="0" :defaultIndex="imgKey">
				<mt-swipe-item v-if="Array.isArray(imgTotal)" v-for="(item, index) in imgTotal" :key="index" v-show="item">
					<img :src="item" v-show="item">
				</mt-swipe-item>
				<mt-swipe-item v-else v-show="imgTotal">
					<img :src="imgTotal" v-show="imgTotal">
				</mt-swipe-item>
			</mt-swipe>
		</mt-popup>
	</div>
</template>
<script>
			// v-model="popupVisible"
  // import {Popup} from 'mint-ui'
	export default {
		components: {
			// 'mt-popup': Popup
		},
		props: ['showImg', 'imgTotal', 'imgKey'],
		// watch: {
		// 	'popupVisible': function (n, o) {
    //     this.setPopup()
    //   }
		// },
		data () {
			return {
				popupVisible: true,
				hidePop: false
			}
		},
		created () {
			// this.setPopup()
			this.hidePop = this.showImg
		},
		methods: {
			// setPopup () {
			// 	// this.popupVisible = this.showImg
			// 	this.hidePop = this.showImg
			// },
			hidePopup () {
				this.hidePop = false
        this.$emit('hideBigPop', this.hidePop)
			}
		}
	}
</script>
<style lang="less">
.thumbnails{
	.mint-popup{
		width: 750px;
		height: 750px;
		.mint-swipe{
			width: 750px;
			height: 750px;
			.mint-swipe-items-wrap{
				.mint-swipe-item{
					img{
						width: 100% !important;
						height: 100% !important;
					}
				}
			}
		}
	}
}
</style>
