<template>
	<div class="noInternet" @click="refresh">
		<div class="content">
			<img src="static/img/noInternet.png" alt="">
			<div class="info">
				<p>暂时没有网络哦</p>
				<p>请点击屏幕重新加载</p>
			</div>
		</div>
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
		.content{
			width: 100%;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			img{
				width: 100%;
			}
			.info{
				margin-top: 92px;
				font-family: PingFangSC-Regular;
				font-size: 32px;
				color: #888888;
			}
		}
	}
</style>
