<template>
	<div class="writePage">
		<x-header :left-options="{backText: ''}">我的备注-查看</x-header>
		<div class="wrapper">
			<!--<input type="text" v-focus v-model="msg"/>-->
			<!-- <textarea class="inputing" v-focus v-model="msg" name="" rows="" cols=""></textarea> -->
			<div class="content">
				 {{remark}}
				<i class="iconfont">&#xe60f;</i>
			</div>
		</div>
	</div>
</template>

<script>
import { XHeader } from 'vux'
// import RemarkList from 'base/remarkList/remarkList'

export default {
  components: {
    XHeader
  },
  data () {
  	return {
			remark: ''
  	}
	},
	mounted () {
		this.remark = this.$route.params.remark
	}
}
</script>

<style lang="less">
.writePage{
	.wrapper {
		// padding: 20px;
		height: 1000px;
		.content{
			// height: 250px;
			padding: 70px 35px;
			margin: 44px;
			box-shadow: -1px 1px 34px 3px rgba(0,0,0,0.20);
    	border-radius: 8px;
			border: 1px solid #ccc;
			position: relative;
			.iconfont{
				position: absolute;
				bottom: -72px;
				font-size: 90px;
				left: 100px;
				color: #fff;
			}
		}
		.inputing {
			border: none;
			width: 100%;
			font-size: 34px; /*px*/
			height: 100%;
			outline: none;
			color: #999;
			line-height: 1.5;
			padding: 20px;
			box-sizing: border-box;
		}
	}
}
.wrapper {
	// padding: 20px;
	// height: 1000px;

	.inputing {
		border: none;
		width: 100%;
		font-size: 34px; /*px*/
		height: 100%;
		outline: none;
		color: #999;
		line-height: 1.5;
		padding: 20px;
		box-sizing: border-box;
	}
}
</style>
