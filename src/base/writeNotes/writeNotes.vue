<template>
	<div id="write-page">
		<x-header class="header" :left-options="{backText: '',preventGoBack:true}" @on-click-back="back()">{{title}}</x-header>
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

export default {
  components: {
    XHeader
  },
  data () {
  	return {
		  	title: '消息详情',
			remark: '',
			item: {}
  	}
	},
	methods: {
		back () {
			if (this.$route.params.mark === 'announcement') {
				this.item = window.localStorage.getItem('productDetail')
				this.item = JSON.parse(this.item)
        		this.$router.push({name: 'ProductDetail', params: {id: this.item.product_id, item: this.item, important: Date.parse(new Date(this.item.important_start)) < new Date().getTime() && new Date().getTime() < Date.parse(new Date(this.item.important_end))}})
			} else {
      			this.$router.push({name: 'MyInfo'})
			}
		}
	},
	mounted () {
		if (this.$route.params.mark === 'announcement') {
			this.title = '产品公告'
			this.remark = this.$route.params.announcement
		} else {
			infoDetail(this.$route.params.id).then(res => {
				this.remark = res.data.notification_content
			})
			console.log('this.$route.params.isRead', this.$route.params.isRead)
			let badgeNum = window.localStorage.getItem('badgeNum')
			if (badgeNum - 0 === 0) return
			if (this.$route.params.isRead === '0') {
				window.JPush.setBadge(badgeNum - 1)
				window.JPush.setApplicationIconBadgeNumber(badgeNum - 1)
				window.localStorage.setItem('badgeNum', badgeNum - 1)
			}
		}
	}
}
</script>

<style lang="less">
@import "../../common/style/variable.less";
#write-page{
	.vux-header.header{
    background: @header-bg;
    .vux-header-left{
      .left-arrow:before{
        border-color: @text-font-color;
      }
    }
    .vux-header-title{
      color: @back-color-white;
		}
	}
	.wrapper {
		.content{
			// height: 322px;
			background: @back-color-white;
			padding: 40px;
			font-family: @font-family-R;
			font-size: @font-size-thirty;/*px*/
			color: @font-color-7E;
		}
		// // padding: 20px;
		// height: 1000px;
		// .content{
		// 	// height: 250px;
		// 	padding: 70px 35px;
		// 	margin: 44px;
		// 	box-shadow: -1px 1px 34px 3px rgba(0,0,0,0.20);
    // 		border-radius: 8px;
		// 	// border: 1px solid #ccc;
		// 	position: relative;
		// 	background: #fff;
		// 	word-break: break-all;
		// }
		// .content::after {
		// 	content: '';
		// 	display: inline-block;
		// 	width: 0;
		// 	height: 0;
		// 	border: 20px solid;
		// 	border-color: transparent transparent #fff transparent;
		// 	position: absolute;
		// 	bottom: -39px;
		// 	left: 130px;
		// 	transform: rotateZ(180deg);
		// }
		// .inputing {
		// 	border: none;
		// 	width: 100%;
		// 	font-size: 34px; /*px*/
		// 	height: 100%;
		// 	outline: none;
		// 	color: #999;
		// 	line-height: 1.5;
		// 	padding: 20px;
		// 	box-sizing: border-box;
		// }
	}
}
// .wrapper {
// 	// padding: 20px;
// 	// height: 1000px;
// 	.inputing {
// 		border: none;
// 		width: 100%;
// 		font-size: 34px; /*px*/
// 		height: 100%;
// 		outline: none;
// 		color: #999;
// 		line-height: 1.5;
// 		padding: 20px;
// 		box-sizing: border-box;
// 	}
// }
</style>
