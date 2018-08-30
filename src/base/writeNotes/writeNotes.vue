<template>
	<div class="writePage">
		<x-header :left-options="{backText: ''}">{{this.title}}</x-header>
		<div class="wrapper">
			<!--<input type="text" v-focus v-model="msg"/>-->
			<!-- <textarea class="inputing" v-focus v-model="msg" name="" rows="" cols=""></textarea> -->
			<div class="content">
				 {{remark}}
			</div>
		</div>
	</div>
</template>

<script>
import { XHeader } from 'vux'
import { infoDetail } from '@/service/api/aboutMe'
// import RemarkList from 'base/remarkList/remarkList'

export default {
  components: {
    XHeader
  },
  data () {
  	return {
			title: '我的备注-查看',
			remark: ''
  	}
	},
	mounted () {
		this.remark = this.$route.params.remark
		if (this.$route.params.id) {
			this.title = '我的消息-查看'
			infoDetail(this.$route.params.id).then(res => {
				this.remark = res.data.notification_content
			})
		}
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
			// border: 1px solid #ccc;
			position: relative;
			background: #fff;
			word-break: break-all;
		}
		.content::after {
			content: '';
			display: inline-block;
			width: 0;
			height: 0;
			border: 20px solid;
			border-color: transparent transparent #fff transparent;
			position: absolute;
			bottom: -39px;
			left: 130px;
			transform: rotateZ(180deg);
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
