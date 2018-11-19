<template>
	<div class="noInternet">
		<!-- <div class="content"> -->
			<i class="iconfont icon-no_network"></i>
			<!-- <div class="info"> -->
				<p class="noInte-text">网络连接异常，请刷新重试</p>
				<mt-button class="btn-refresh" @click.native="refresh">刷新</mt-button>
			<!-- </div> -->
		<!-- </div> -->
	</div>
</template>

<script>
	// import { XHeader } from 'vux'
	export default {
		data () {
			return {
				prePath: ''
			}
		},
		methods: {
			refresh () {
				this.$router.push({path: this.prePath})
			}
		},
		beforeRouteEnter (to, from, next) {
			next(vm => {
				vm.prePath = from.path
			})
		}
	}
</script>

<style lang="less">
	.noInternet{
		height: 100%;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		.iconfont {
			font-size: 250px;
			color: #E8E8E8;
			margin-top: -200px;
		}
		.noInte-text {
			font-family: PingFangSC-Regular;
			font-size: 26px;
			color: #ccc;
			// margin-top: -50px;
			margin-top: 25px;
		}
		.btn-refresh {
			width: 180px!important;
			height: 60px!important;
			font-size: 26px!important;
			margin-top: 42px!important;
		}
	}
</style>
