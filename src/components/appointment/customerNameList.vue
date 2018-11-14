<template>
	<div id="customList">
		<x-header class="header" :left-options="{backText: '', preventGoBack:true}" @on-click-back="back()">
			<div class="search">
				<input type="text" class="text-search" v-model.trim="keyValue" placeholder="搜索 客户名 手机号码" @input="search"/>
				<i class="iconfont icon_search">&#xe609;</i>
			</div>
		</x-header>
		<div class="wrapper">
			<!-- <div class="search">
				<input type="text" class="text-search" v-model.trim="keyValue" placeholder="搜索 客户名 手机号码"/>
				<i class="iconfont icon_search" @click="search()">&#xe609;</i>
			</div> -->
			<div class="title">客户列表</div>
			<div class="space"></div>
			<div class="item" :data="list" v-for="item in list" :key="item.client_id" @click="chooseName(item)" v-if="show">
				<section class="left">
					<p class="name">{{item.name}}</p>
					<p class="mobile">{{item.mobile}}</p>
				</section>
				<section class="right">
					<span class="tip" v-if="item.client_type === '0'">普通投资者</span>
					<span class="tip" v-if="item.client_type === '1'">专业投资者</span>
				</section>
				<i class="iconfont">&#xe8d5;</i>
			</div>
			<div class="bottom-line text-center" v-if="this.list.length >= 5">
				<span class="bot">我是有底线的</span>
			</div>
			<div class="no-product text-center" v-if="!show">
				<div class="warn absolute-center-xy">
					<i class="iconfont">&#xe869;</i>
					<p>暂无可预约客户</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
import { XHeader } from 'vux'
import { appointmentList } from '@/service/api/appointment'
export default {
  components: {
    XHeader
	},
	data () {
		return {
			keyValue: '',
			list: '',
			selectFlag: 'selectFlag',
			show: true
		}
	},
	methods: {
		back () {
			this.$router.push({name: 'ProductAppointment', params: {flag: this.$route.params.flag, riskLevel: this.$route.params.riskLevel}})
		},
		search () {
			let obj = {q: this.keyValue}
			appointmentList(this.$route.params.riskLevel, obj).then(res => {
				this.list = res.data
			})
		},
		chooseName (item) {
			this.$router.push({name: 'ProductAppointment', params: {selectFlag: this.selectFlag, nameItem: item, flag: this.$route.params.flag}})
		},
		getList () {
			appointmentList(this.$route.params.riskLevel).then(res => {
				this.list = res.data
				if (res.data.length === 0) {
					this.show = false
				}
			})
		}
	},
	mounted () {
		this.getList()
	}
}
</script>
<style lang="less">
  @import '../../common/style/variable';
#customList{
	font-family: PingFangSC-Regular;
	height: 100%;
	.vux-header.header{
    background: @header-bg;
    .vux-header-left{
      .left-arrow:before{
        border-color: @text-font-color;
      }
    }
    .vux-header-title{
			width: 90%;
			margin: 0;
			margin-left: 20px;
			color: @back-color-white;
			.search{
				width: 100%;
				text-align: center;
				position: relative;
				.text-search{
					width: 100%;
					height: 60px;
					text-indent: 62px;
					font-size: 24px;
					color: #9B9B9B;
					background: rgba(255, 255, 255, 0.1);
					border-radius: 100px;
					border: none
				}
				.text-search::-webkit-input-placeholder {
					font-size: @font-size-twentyF;/*px*/
					font-family: @font-family-R;
					color: @font-color-9B;
				}
				.text-search:-moz-placeholder {
					/* FF 4-18 */
					font-size: @font-size-twentyF;/*px*/
					font-family: @font-family-R;
					color: @font-color-9B;
				}
				.text-search::-moz-placeholder {
					/* FF 19+ */
					font-size: @font-size-twentyF;/*px*/
					font-family: @font-family-R;
					color: @font-color-9B;
				}
				.text-search:-ms-input-placeholder {
					/* IE 10+ */
					font-size: @font-size-twentyF;/*px*/
					font-family: @font-family-R;
					color: @font-color-9B;
				}
				i{
					position: absolute;
					top: 55%;
					left: 0px;
					margin: 0 20px;
					transform: translateY(-50%);
					-webkit-transform: translateY(-50%);
					font-size: 26px; /*px*/
					color: @font-color-9B;
				}
			}
    }
  }
	.wrapper{
		.title{
			height: 88px;
			line-height: 88px;
			background: #fff;
			text-align: center;
			font-size: 30px;
			color: @text-font-color;
		}
		.item{
			width: 710px;
			height: 167px;
			background: #fff;
			box-shadow: 0 2px 10px 0 #E7E2DC;
			border-radius: 6px;
			font-size: 26px;/*px*/
			margin: 0 20px;
			margin-bottom: 20px;
			padding: 30px;
			position: relative;
			.left,.right{
				display: inline-block;
			}
			.left{
				color: #4A4A4A;
				.name{
					font-family: PingFangSC-Medium;
					font-size: 28px;
					margin-bottom: 30px;
				}
			}
			.right{
				float: right;
				margin-right: 55px;
				.tip{
					color: #9E9E9E;
					line-height: 107px;
				}
			}
			.iconfont{
				position: absolute;
				right: 15px;
				top: 50%;
				transform: translate(0, -50%);
				font-size: 50px;
				color: #E6E6E6;
			}
		}
		.bottom-line{
			height: 73px;
			line-height: 73px;
			font-family: @font-family-R;
			font-size: @font-size-twentyF;/*px*/
			color: #D6D6D6;
			.bot:before, .bot:after{
				display: inline-block;
				content: '';
				width: 106px;
				height: 3px;
				background:#D6D6D6;
				vertical-align: middle;
				position: relative;
			}
			.bot:before{
				right: 20px;
			}
			.bot:after{
				left: 20px;
			}
		}
		.no-product{
			position: relative;
			height: 900px;
			.warn{
				i{
					font-size: 150px;/*px*/
					color: @back-color-E8;
				}
				p{
					font-family: @font-family-R;
					font-size: @font-size-twentyS;/*px*/
					color: #ccc;
					margin-top: 25px;
				}
			}
		}
	}
}
</style>
