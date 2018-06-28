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
					<div :data="appoinmentList" v-for="item in appoinmentList" :key="item.appointment_id">
						<div class="item1">
							<span class="tit">客户名称：<span class="cont">{{item.client_name}}</span></span>
							<span class="tit">预约金额：<span class="cont">{{item.appointment_amount}}万</span></span>
							<span class="tit">产品名称：<span class="cont">{{item.product_name}}</span></span>
							<span class="tit">预约时间：<span class="cont">{{item.appointment_date}}</span></span>
							<span class="tit bot">预约状态：
								<span class="cont" v-if='item.status === "1001"'>已预约（申请中)</span>
								<span class="cont" v-if='item.status === "1002"'>预约失败</span>
								<span class="cont" v-if='item.status === "1003"'>预约成功</span>
								<span class="cont" v-if='item.status === "1004"'>预约取消</span>
								<span class="cont" v-if='item.status === "1005"'>预约失效</span>
							</span>
							<i class="iconfont right" @click="toDetail(item.appointment_id)">&#xe731;</i>
						</div>
					</div>
				</mt-tab-container-item>
				<mt-tab-container-item id="2">
					<div :data="remittanceList" v-for="item in remittanceList" :key="item.appointment_id">
						<div class="item1">
							<span class="tit">客户名称：<span class="cont">{{item.client_name}}</span></span>
							<span class="tit">预约金额：<span class="cont">{{item.appointment_amount}}万</span></span>
							<span class="tit">产品名称：<span class="cont">{{item.product_name}}</span></span>
							<span class="tit">预约时间：<span class="cont">{{item.appointment_date}}</span></span>
							<span class="tit">预约状态：
								<span class="cont" v-if='item.status === "2001"'>打款审核中</span>
								<span class="cont" v-if='item.status === "2002"'>待补全材料</span>
								<span class="cont" v-if='item.status === "2003"'>订单关闭</span>
								<span class="cont" v-if='item.status === "2004"'>打款审核通过</span>
							</span>
							<span class="tit" v-if='item.status === "2003"'>退款状态：
								<span class="cont" v-if='item.refund_status === "0"'>无须退款</span>
								<span class="cont" v-if='item.refund_status === "1"'>未退款</span>
								<span class="cont" v-if='item.refund_status === "2"'>退款申请中</span>
								<span class="cont" v-if='item.refund_status === "3"'>退款驳回</span>
								<span class="cont" v-if='item.refund_status === "4"'>已退款</span>
							</span>
							<i class="iconfont right" @click="toDetail(item.appointment_id)">&#xe731;</i>
						</div>
					</div>
				</mt-tab-container-item>
				<mt-tab-container-item id="3">
					<div :data="contractList" v-for="item in contractList" :key="item.appointment_id">
						<div class="item1">
							<span class="tit">客户名称：<span class="cont">{{item.client_name}}</span></span>
							<span class="tit">预约金额：<span class="cont">{{item.appointment_amount}}万</span></span>
							<span class="tit">产品名称：<span class="cont">{{item.product_name}}</span></span>
							<span class="tit">预约时间：<span class="cont">{{item.appointment_date}}</span></span>
							<span class="tit">预约状态：
								<span class="cont" v-if='item.status === "3001"'>待收到合同</span>
								<span class="cont" v-if='item.status === "3002"'>合同审核中</span>
								<span class="cont" v-if='item.status === "3003"'>合同审核不通过</span>
								<span class="cont" v-if='item.status === "3004"'>合同审核通过</span>
							</span>
							<i class="iconfont right" @click="toDetail(item.appointment_id)">&#xe731;</i>
						</div>
					</div>
				</mt-tab-container-item>
			</mt-tab-container>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import { XHeader } from 'vux'
import { getList } from '@/service/api/appointment'
export default {
	data () {
		return {
			selectedTip: '',
			selected: '1',
			appoinmentList: [],
			remittanceList: [],
			contractList: []
		}
	},
  components: {
    XHeader
	},
	methods: {
		toDetail (id) {
			this.$router.push({name: 'ProductAppointment', params: {appointmentId: id, fromUrl: 'reservationList'}})
		}
	},
	// beforeRouteLeave (to, from, next) {
	// 		to.meta.keepAlive = true
	// 		console.log(to, to.meta)
	// 		next()
	// },
	created () {
		getList().then(res => {
			this.appoinmentList = res.data.filter(item => item.status.slice(0, 1) === '1')
			this.remittanceList = res.data.filter(item => item.status.slice(0, 1) === '2')
			this.contractList = res.data.filter(item => item.status.slice(0, 1) === '3')
		})
	}
}
</script>

<style lang="less">
.reservation{
	height: 100%;
	font-family: PingFangSC-Regular;
	.wrapper{
		margin-bottom: 96px;
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
							overflow: hidden;
							text-overflow:ellipsis;
							white-space: nowrap;
							span.cont{
								color: #666;
							}
						}
						span.tit:nth-child(4){
							width: 320px;
						}
						span.bot{
							min-width: 300px;
							overflow: inherit;
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
