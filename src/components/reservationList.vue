<template>
	<div class="reservation">
    <x-header :left-options="{showBack: false}">预约列表</x-header>
		<div class="wrapper">
			<mt-navbar v-model="selected">
				<mt-tab-item id="1">预约</mt-tab-item>
				<mt-tab-item id="2">打款</mt-tab-item>
				<mt-tab-item id="3">合同管理</mt-tab-item>
			</mt-navbar>
			<mt-tab-container v-model="selected">
				<mt-tab-container-item id="1">
					<div class="item1">
						<span class="tit">客户名称：<span class="cont">王二</span></span>
						<span class="tit">预约金额：<span class="cont">1000万</span></span>
						<span class="tit">产品名称：<span class="cont">正收益</span></span>
						<span class="tit">预约时间：<span class="cont">2018.02.23 12:45</span></span>
						<span class="tit">预约状态：<span class="cont">已预约（申请中)</span></span>
						<i class="iconfont right">&#xe731;</i>
					</div>
				</mt-tab-container-item>
				<mt-tab-container-item id="2">
					<div class="item1">
						<span class="tit">客户名称：<span class="cont">王二</span></span>
						<span class="tit">预约金额：<span class="cont">1000万</span></span>
						<span class="tit">产品名称：<span class="cont">正收益</span></span>
						<span class="tit">预约时间：<span class="cont">2018.02.23 12:45</span></span>
						<span class="tit">打款状态：<span class="cont">已预约（申请中)</span></span>
						<i class="iconfont right">&#xe731;</i>
					</div>
				</mt-tab-container-item>
				<mt-tab-container-item id="3">
					<div class="item1">
						<span class="tit">客户名称：<span class="cont">王二</span></span>
						<span class="tit">预约金额：<span class="cont">1000万</span></span>
						<span class="tit">产品名称：<span class="cont">正收益</span></span>
						<span class="tit">预约时间：<span class="cont">2018.02.23 12:45</span></span>
						<span class="tit">合同状态：<span class="cont">已预约（申请中)</span></span>
						<i class="iconfont right">&#xe731;</i>
					</div>
				</mt-tab-container-item>
			</mt-tab-container>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import { XHeader } from 'vux'
export default {
	data () {
		return {
			selected: '1'
		}
	},
  components: {
    XHeader
	}
}
</script>

<style lang="less">
.reservation{
	font-family: PingFangSC-Regular;
	.wrapper{
		.mint-navbar{
			height: 80px;
			.mint-tab-item{
				line-height: 80px;
				margin: 0 30px;
				padding: 0;
				.mint-tab-item-label{
					line-height: 80px;
					font-size: 28px;
					color: #999999;
				}
			}
			.mint-tab-item.is-selected{
				border-bottom: 8px solid #2672BA;
				.mint-tab-item-label{
					color: #2672BA;
				}
			}
			.mint-tab-item:nth-child(2){
				position: relative;
			}
			.mint-tab-item:nth-child(2)::before{
					content: '';
					height: 39px;
					width: 1px;
					background: #D5D5D5;
					position: absolute;
					left: -30px;
					top: 50%;
					transform: translate(0, -50%);
			}
			.mint-tab-item:nth-child(2)::after{
					content: '';
					height: 39px;
					width: 1px;
					background: #D5D5D5;
					position: absolute;
					right: -30px;
					top: 50%;
					transform: translate(0, -50%);
			}
		}
		.mint-tab-container{
			.mint-tab-container-wrap{
				.mint-tab-container-item{
					.item1{
						width: 697px;
						// height: 181px;
						padding: 25px;
						font-size: 24px;
						color: #303030;
						position: relative;
						background: #FFFFFF;
						border: 1px solid #DDDDDD;
						border-radius: 5px;
						margin: 23px auto;
						box-sizing: border-box;
						span.tit{
							display: inline-block;
							line-height: 51px;
							width: 300px;
							span.cont{
								color: #666;
							}
						}
						span.tit:nth-child(4){
							width: 320px;
						}
						.right{
							font-size: 70px;
							color: #999;
							position: absolute;
							right: -5px;
							top: 50%;
							transform: translate(0, -50%);
						}
					}
				}
			}
		}
	}
}
</style>
