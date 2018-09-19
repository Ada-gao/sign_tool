<template>
	<div class="reservation">
		<x-header class="balck-header" :left-options="{showBack: false}">
			<mt-navbar v-model="selected">
				<mt-tab-item id="1">预约</mt-tab-item>
				<mt-tab-item id="2">打款</mt-tab-item>
				<mt-tab-item id="3">合同</mt-tab-item>
			</mt-navbar>
		</x-header>
    <!-- <x-header :left-options="{showBack: false}">交易列表</x-header> -->
		<div class="wrapper">
			<!-- <mt-navbar v-model="selected">
				<mt-tab-item id="1">预约</mt-tab-item>
				<mt-tab-item id="2">打款</mt-tab-item>
				<mt-tab-item id="3">合同管理</mt-tab-item>
			</mt-navbar> -->
			<mt-tab-container v-model="selected">
				<mt-tab-container-item id="1">
					<div :data="appoinmentList" v-for="item in appoinmentList" :key="item.appointment_id" @click="toDetail(item.appointment_id)">
						<div class="item1">
							<!-- <span class="tit">客户名称：<span class="cont">{{item.client_name}}</span></span>
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
							<span class="tit bot red" v-if="item.flag">
								倒计时：<counter :timeCount='item.timeout'></counter>
							</span>
							<i class="iconfont right">&#xe731;</i> -->
							<div class="flex-top">
								<div class="flex-item">
									<p class="content">{{item.client_name}}</p>
									<span class="title">客户姓名</span>
								</div>
								<div class="flex-item">
									<p class="content">{{item.appointment_amount}}万</p>
									<span class="title">预约金额</span>
								</div>
								<div class="flex-item">
									<p class="content"
										:class="{
											'statusYellow':item.status==='1001',
											'statusRed':item.status==='1002'||item.status==='1004',
											'statusGreen':item.status==='1003'
										}">
										{{item.status|turnText(appointmentStaus)}}
									</p>
									<span class="title">预约状态</span>
								</div>
							</div>
							<div class="mt-10">产品名称：{{item.product_name}}</div>
							<div class="mt-10">预约时间：{{item.appointment_date}}</div>
							<div class="timeline" v-show="item.flag">
								倒计时：<counter :timeCount='item.timeout'></counter>（请在规定时间内完成打款）
							</div>
						</div>
					</div>
				</mt-tab-container-item>
				<mt-tab-container-item id="2">
					<div :data="remittanceList" v-for="item in remittanceList" :key="item.appointment_id" @click="toDetail(item.appointment_id)">
						<div class="item1">
							<!-- <span class="tit">客户名称：<span class="cont">{{item.client_name}}</span></span>
							<span class="tit">预约金额：<span class="cont">{{item.appointment_amount}}万</span></span>
							<span class="tit">产品名称：<span class="cont">{{item.product_name}}</span></span>
							<span class="tit">预约时间：<span class="cont">{{item.appointment_date}}</span></span>
							<span class="tit bot">打款状态：
								<span class="cont" v-if='item.status === "2001"'>打款审核中</span>
								<span class="cont" v-if='item.status === "2002"'>已到账待补全材料</span>
								<span class="cont" v-if='item.status === "2003"'>订单关闭</span>
								<span class="cont" v-if='item.status === "2004"'>打款审核通过</span>
							</span>
							<span class="tit bot" v-if='item.status === "2003"'>退款状态：
								<span class="cont" v-if='item.refund_status === "0"'>无须退款</span>
								<span class="cont" v-if='item.refund_status === "1"'>未退款</span>
								<span class="cont" v-if='item.refund_status === "2"'>退款申请中</span>
								<span class="cont" v-if='item.refund_status === "3"'>退款驳回</span>
								<span class="cont" v-if='item.refund_status === "4"'>已退款</span>
							</span>
							<i class="iconfont right">&#xe731;</i> -->
							<div class="flex-top">
								<div class="flex-item">
									<p class="content">{{item.client_name}}</p>
									<span class="title">客户姓名</span>
								</div>
								<div class="flex-item">
									<p class="content">{{item.appointment_amount}}万</p>
									<span class="title">预约金额</span>
								</div>
								<div class="flex-item">
									<p class="content"
										:class="{
											'statusYellow':item.status==='2001'||item.status==='2002',
											'statusRed':item.status==='2003',
											'statusGreen':item.status==='2004'
										}">
										{{item.status|turnText(appointmentStaus)}}
									</p>
									<span class="title">打款状态</span>
								</div>
							</div>
							<div class="mt-10">产品名称：{{item.product_name}}</div>
							<div class="mt-10">预约时间：{{item.appointment_date}}</div>
							<div class="mt-10" v-show="item.status==='2003'">
								退款状态：
								<span :class="{
											'statusYellow':item.refund_status==='0'||item.refund_status==='1'||item.refund_status==='2',
											'statusRed':item.refund_status==='3',
											'statusGreen':item.refund_status==='4'
										}">
										{{item.refund_status|turnText(refundStatus)}}</span>
							</div>
						</div>
					</div>
				</mt-tab-container-item>
				<mt-tab-container-item id="3">
					<div :data="contractList" v-for="item in contractList" :key="item.appointment_id" @click="toDetail(item.appointment_id)">
						<div class="item1">
							<!-- <span class="tit">客户名称：<span class="cont">{{item.client_name}}</span></span>
							<span class="tit">预约金额：<span class="cont">{{item.appointment_amount}}万</span></span>
							<span class="tit">产品名称：<span class="cont">{{item.product_name}}</span></span>
							<span class="tit">预约时间：<span class="cont">{{item.appointment_date}}</span></span>
							<span class="tit bot">合同状态：
								<span class="cont" v-if='item.status === "3001"'>待收到合同</span>
								<span class="cont" v-if='item.status === "3002"'>合同审核中</span>
								<span class="cont" v-if='item.status === "3003"'>合同审核不通过</span>
								<span class="cont" v-if='item.status === "3004"'>合同审核通过</span>
							</span>
							<i class="iconfont right">&#xe731;</i> -->
							<div class="flex-top">
								<div class="flex-item">
									<p class="content">{{item.client_name}}</p>
									<span class="title">客户姓名</span>
								</div>
								<div class="flex-item">
									<p class="content">{{item.appointment_amount}}万</p>
									<span class="title">预约金额</span>
								</div>
								<div class="flex-item">
									<p class="content"
										:class="{
											'statusYellow':item.status==='3001'||item.status==='3002',
											'statusRed':item.status==='3003',
											'statusGreen':item.status==='3004',
										}">
										{{item.status|turnText(appointmentStaus)}}
									</p>
									<span class="title">合同状态</span>
								</div>
							</div>
							<div class="mt-10">产品名称：{{item.product_name}}</div>
							<div class="mt-10">预约时间：{{item.appointment_date}}</div>
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
import counter from '@/base/countDown/countDown'
// import { setInterval, clearInterval } from 'timers';
export default {
	data () {
		return {
			selectedTip: '',
			timer: null,
			selected: '1',
			appoinmentList: [],
			remittanceList: [],
			contractList: [],
			timeCount: 3,
			appointmentStaus: JSON.parse(localStorage.getItem('appointmentStatus')),
			refundStatus: JSON.parse(localStorage.getItem('refundStatus'))
		}
	},
	components: {
		XHeader,
		counter
	},
	methods: {
		toDetail (id) {
			this.$router.push({name: 'ProductAppointment', params: {appointmentId: id, fromUrl: 'reservationList'}})
		},
		getList () {
			getList().then(res => {
				this.appoinmentList = res.data.filter(item => item.status.slice(0, 1) === '1')
				let date = new Date()
				this.appoinmentList.map((ele, index) => {
					if (ele.status === '1003' && ((ele.timeliness * 60 * 60) > (parseInt((date - new Date(ele.update_time.replace(/-/g, '/'))) / 1000)))) {
						ele.flag = true
						let ms = ele.timeliness * 60 * 60 - parseInt((date - new Date(ele.update_time.replace(/-/g, '/'))) / 1000)
						ele.timeout = ms
						if (ele.timeout === 0) {
							ele.appointmentStaus = '1005'
							ele.flag = false
						}
					} else {
						ele.flag = false
					}
				})
				this.remittanceList = res.data.filter(item => item.status.slice(0, 1) === '2')
				this.contractList = res.data.filter(item => item.status.slice(0, 1) === '3')
			})
		}
	},
	created () {
		this.selected = this.$route.params.mark || '1'
		this.getList()
	}
}
</script>

<style lang="less">
@import '../../common/style/variable.less';
.statusYellow {
	color: @font-color-orange2!important;
}
.statusRed {
	color: @font-color-red!important;
}
.statusGreen {
	color: @font-color-green!important;
}
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
		.mint-tab-container .mint-tab-container-item{
			.item1 {
				.flex-top {
					display: flex;
					justify-content: space-around;
					position: relative;
					padding-bottom: 20px;
					margin-bottom: 20px;
					&::after {
						border-bottom: 1px solid #E9E9E9;
						content: '';
						position: absolute;
						bottom: 0;
						height: 1px;
						width: 100%;
					}
					.flex-item {
						text-align: center;
						flex: 1;
						.content {
							color: #4A4A4A;
							font-size: 32px;
						}
						.title {
							color: #9B9B9B;
							font-size: 24px;
						}
						&:first-child {
							text-align: left;
						}
						&:last-child {
							text-align: right;
						}
					}
				}
				.mt-10 {
					margin-top: 10px;
					font-size: 26px;
				}
				.timeline {
					span {
						color: @font-color-orange2;
					}
				}
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
							color: #2672BA;
							span.cont{
								color: #2672BA;
							}
						}
						span.red{
							color: #FF0200;
							span.red{
								color: #FF0200;
							}
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
