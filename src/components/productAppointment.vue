<template>
    <div class="productAppointment">
    	<x-header :left-options="{backText: ''}">产品预约</x-header>
			<div class="wrapper">
				<div class="topBar">
					<div class="title">预约</div>
					<flow>
						<flow-state state="1" title="预约" is-done></flow-state>
						<flow-line is-done line-span=224></flow-line>
						<flow-state state="2" title="已发货" is-done></flow-state>
						<flow-line process-span=50 line-span=224></flow-line>
						<flow-state state="3" title="合同管理"></flow-state>
					</flow>
				</div>
				<div class="info">
					<mt-cell title="预约信息" class="tit">
						<i slot="icon" class="iconfont">&#xe697;</i>
					</mt-cell>
					<div class="cont">
						<mt-cell title="客户姓名：" is-link>小阿西</mt-cell>
						<mt-cell title="手机号码："></mt-cell>
						<mt-cell title="预约金额：" is-link></mt-cell>
						<mt-cell title="预约时间："></mt-cell>
					</div>
					<mt-cell title="产品信息" class="tit">
						<i slot="icon" class="iconfont">&#xe693;</i>
					</mt-cell>
					<div class="cont">
						<mt-cell title="产品名称："></mt-cell>
						<mt-cell title="产品信息：" is-link></mt-cell>
					</div>
					<div class="submitBtn">
          	<mt-button type="primary">提交预约</mt-button>
					</div>
					<div class="uploadCustomer">
						<mt-cell title="上传客户材料" class="tit">
							<i slot="icon" class="iconfont">&#xe632;</i>
						</mt-cell>
						<div class="cont">
							<mt-cell title="打款凭证"><span class="cardSelected">选择已绑定银行卡</span></mt-cell>
							<div class="warn">为保证正常到账和汇款，请确保银行信息完整准确，如果是新输入银行卡信息，需要上传银行卡照片进行审核</div>
							<div class="card">
								<mt-field label="银行卡号:" v-model="cardnum"></mt-field>
								<mt-field label="银行名称:" v-model="bankname"></mt-field>
								<mt-field label="支行名称:" v-model="bankname1"></mt-field>
							</div>
							<camera :popupVisible="popupVisible"
                @showPopup="showPopup"
                @hidePopup="hidePopup"
								></camera>
						</div>
					</div>
				</div>
			</div>
		</div>
</template>
<script type="text/ecmascript-6">
import { XHeader, Flow, FlowState, FlowLine } from 'vux'
import camera from '@/base/camera/camera'
export default {
	data () {
		return {
			step1: 1,
			popupVisible: false,
			cardnum: '',
			bankname: '',
			bankname1: ''
		}
	},
	components: {
		XHeader,
		Flow,
    FlowState,
		FlowLine,
    camera
	},
	methods: {
		showPopup (data) {
        this.popupVisible = data
      },
      hidePopup (data) {
        this.popupVisible = data
      }
	}
}
</script>
<style lang="less">
.productAppointment{
	font-family: PingFangSC-Regular;
	.wrapper{
		.topBar{
			height: 317px;
			background: #fff;
			margin: 20px 0;
			text-align: center;
			.title{
				font-size: 32px;
				color: #2672BA;
				padding: 75px 0;
				font-weight: bold;
			}
			.weui-wepay-flow{
				margin-left: 120px;
				padding: 0;
				.weui-wepay-flow__bd{
					justify-content: start;
					.weui-wepay-flow__li{
						.weui-wepay-flow__state{
							background: #9099A2;
							width: 18px;
							height: 18px;
							line-height: 18px;
							border-radius: 50%;
							font-size: 14px;
						}
						.weui-wepay-flow__state::after{
							content: '';
							position: absolute;
							top: -9px;
							left: -9px;
							display: block;
							width: 30px;
							height: 30px;
							background: #fff;
							border: 3px solid #9099A2;
							border-radius: 50%;
							z-index: -1;
						}
						.weui-wepay-flow__title-bottom{
							margin-top: 22px;
							padding: 0 18px;
							height: 33px;
							line-height: 33px;
							border: 2px solid #2672BA;
							border-radius: 8px;
							font-size: 24px;
							color: #2672BA;
						}
					}
					.weui-wepay-flow__li.weui-wepay-flow__li_done{
						.weui-wepay-flow__state{
							background: #2672BA;
							width: 18px;
							height: 18px;
							line-height: 18px;
							border-radius: 50%;
							font-size: 14px;
						}
						.weui-wepay-flow__state::after{
							content: '';
							position: absolute;
							top: -9px;
							left: -9px;
							display: block;
							width: 30px;
							height: 30px;
							background: #fff;
							border: 3px solid #2672BA;
							border-radius: 50%;
							z-index: -1;
						}
					}
					.weui-wepay-flow__line{
						width: 224px;
						height: 6px;
						background: #9099A2;
					}
					.weui-wepay-flow__line.weui-wepay-flow__line_done{
						background: #2672BA;
						.weui-wepay-flow__process{
							background: transparent;
						}
					}
				}
			}
		}
		.info{
			.mint-cell.tit{
				margin-bottom: 20px;
				height: 80px;
				i.iconfont{
					font-size: 38px;
					vertical-align: middle;
					margin-right: 10px;
				}
				.mint-cell-wrapper{
					line-height: 80px;
					font-size: 32px;
					color: #2672BA;
					font-weight: bold;
					padding: 0 20px;
				}
			}
			.cont{
				margin-bottom: 20px;
				.mint-cell{
					height: 80px;
					border-bottom: 1px solid #CCCCCC;
					.mint-cell-wrapper{
						line-height: 80px;
						font-size: 30px;
						padding: 0 20px;
						.mint-cell-title{
							.mint-cell-text{
								color: #333;
								font-weight: bold;
							}
						}
						.mint-cell-value{
							color: #666;
						}
						.mint-cell-allow-right::after{
							width: 18px;
							height: 18px;
							color: #999;
							border-width: 3px;
							border-bottom-width: 0;
							border-left-width: 0;
						}
					}
				}
			}
			.submitBtn{
				text-align: center;
				.mint-button.mint-button--primary.mint-button--normal{
					width: 710px;
					height: 72px;
					margin-top: 20px;
					margin-bottom: 40px;
					padding: 0;
					background: #2672BA;
					border-radius: 8px;
					label{
						font-family: PingFangSC-Regular;
						font-size: 28px;
						color: #FFFFFF;
					}
				}
			}
			.uploadCustomer{
				.cardSelected{
					background: #2672BA;
					border: 1px solid #2672BA;
					border-radius: 8px;
					font-size: 24px;
					color: #FFFFFF;
					height: 50px;
					line-height: 50px;
					padding: 0 15px;
				}
				.warn{
					padding: 20px;
					background: #fff;
					border-bottom: 1px solid #ccc;
					color: #2672BA;
					font-size: 24px;			
				}
				.card{
					background: #fff;
					padding: 30px 20px;
					.mint-field{
						height: 40px;
						line-height: 40px;
						border: none;
						margin-bottom: 20px;
						.mint-cell-wrapper{
							line-height: 100%;
							padding: 0;
							.mint-cell-title{
								width: 130px;
								.mint-cell-text{
									font-size: 26px;
									font-weight: normal;
								}
							}
							.mint-cell-value{
								.mint-field-core{
									width: 580px;
									height: 40px;
									border: 1px solid rgba(151,151,151,0.76);
									border-radius: 5px;
									box-sizing: border-box;
								}
							}
						}
					}
				}
			}
		}
	}
}
</style>
