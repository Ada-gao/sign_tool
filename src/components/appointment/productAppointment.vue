<template>
    <div class="productAppointment" @touchmove="touchScreen">
    	<x-header :left-options="{backText: '', preventGoBack:true}" @on-click-back="back()">{{topBar}}</x-header>
			<!-- <div class="spaceBack" v-if="showSpace" @click="spaceClick"></div> -->
			<div class="wrapper">
				<div class="topBar">
					<div class="title">{{topTitle}}</div>
					<flow>
						<flow-state state="1" title="预约" is-done></flow-state>
						<flow-line line-span=224 tip="ing" :is-done="appointmentDone"></flow-line>
						<flow-state state="2" title="打款" :is-done="giveMoneyDone"></flow-state>
						<flow-line line-span=224 :is-done="giveMoneyIng"></flow-line>
						<flow-state state="3" title="合同管理" :is-done="contractManage"></flow-state>
					</flow>
				</div>
				<div class="emailReason"  v-if="uploadContract">
					<mt-cell title="审核不通过原因：">{{emailClose}}</mt-cell>
					<mt-cell title="寄出合同方式：">{{emailType}}</mt-cell>
				</div>
				<div class="closeReason" v-if="closeOrderReason">
					<mt-cell :title= failTitle>{{closeReason}}</mt-cell>
				</div>
				<div class="info">
					<mt-cell title="预约信息" class="tit">
						<i slot="icon" class="iconfont">&#xe650;</i>
					</mt-cell>
					<div class="cont">
						<mt-cell title="预约编号：" v-if="appointmentCode">{{codeA}}</mt-cell>
						<mt-cell title="客户姓名：" is-link @click.native="chooseName" v-if="showNameClick">{{name}}</mt-cell>
						<mt-cell title="客户姓名：" v-if="!showNameClick" :value="name"></mt-cell>
						<mt-cell title="手机号码：" :value="cMob"></mt-cell>
						<mt-field label="预约金额：" class="inputMoney" placeholder="" v-model="money" v-if="showMoneyClick">万</mt-field>
						<!-- <mt-cell title="预约金额：" is-link @click.native="chooseMoney" v-if="showMoneyClick">{{money}}</mt-cell> -->
						<mt-cell title="预约金额：" v-if="!showMoneyClick">{{money}}万</mt-cell>
						<!-- <mt-popup v-model="showMoney"
                position="bottom"
                class="cercode_box"
                popup-transition="popup-fade">
							<mt-picker :slots="slotsM"
												:showToolbar="true"
												:itemHeight=70
												:visibleItemCount=3
												value-key="name"
												@change="onValuesChangeMoney">
								<div class="toolbar">
									<span class="cancel" @click="cancelMoney">取消</span>
									<span class="ensure" @click="ensureMoney">确定</span>
								</div>
							</mt-picker>
						</mt-popup> -->
						<mt-cell title="预约时间：">{{nowTime}}</mt-cell>
						<mt-cell title="已打款审核通过时间：" v-if="alreadyPass">{{alreadyPassTime}}</mt-cell>
					</div>
					<mt-cell title="产品信息" class="tit">
						<i slot="icon" class="iconfont">&#xe693;</i>
					</mt-cell>
					<div class="cont">
						<mt-cell title="产品名称：">{{product_name}}</mt-cell>
						<mt-cell title="产品信息：" is-link @click.native="returnProductInfo"></mt-cell>
					</div>
					<div class="uploadCustomer" v-if="uploadShow">
						<mt-cell title="相关材料" class="tit">
							<i slot="icon" class="iconfont">&#xe632;</i>
						</mt-cell>
						<div class="cont">
							<div class="fightMoney">
								<mt-cell title="银行卡信息"><span class="cardSelected" @click="chooseBankCard" v-if="chooseSelectedBank">选择已绑定银行卡</span></mt-cell>
									<div class="warn" v-if="chooseSelectedBank">为保证正常到账和汇款，请确保银行信息完整准确，如果是新输入银行卡信息，需要上传银行卡照片进行审核</div>
									<div class="card" v-if="uploadCard">
										<mt-field label="银行卡号:" v-model="cardnum" ref="cardInput" @change="cardNumChange"></mt-field>
										<mt-field label="银行名称:" disabled v-model="bankname">
                      <div class="define_box"
                           @click="chooseBankName">
                        <i class="iconfont">&#xe731;</i>
                      </div>
										</mt-field>
										<mt-popup v-model="showBankCardName"
												position="bottom"
												class="cercode_box"
												popup-transition="popup-fade">
											<div @touchmove.prevent>
                        <mt-picker :slots="slotsN"
                                   :showToolbar="true"
                                   value-key="bankName"
                                   :itemHeight="itemHeight"
                                   :visibleItemCount=3
                                   @change="onValuesChange">
                          <div class="toolbar">
                            <span class="cancel" @click="cancelCerName">取消</span>
                            <span class="ensure" @click="ensureCerName">确定</span>
                          </div>
                        </mt-picker>
                      </div>
										</mt-popup>
										<mt-field label="支行名称:" v-model="bankname1"></mt-field>
										<camera :popupVisible="popupVisible"
											@imgHandler="imageHandler1"
											:imageSrc="cardUrl"
											:isFromAppointment="fromAppointment"
              								:isFromBank="fromBankCard"
											@showPopup="showPopup"
											@hidePopup="hidePopup"
											v-if="cameraShow">
										</camera>
									</div>
									<div class="card1" v-if="uploadCardS">
										<mt-cell title="银行卡号:" :value="cardNum"></mt-cell>
										<mt-cell title="银行名称:" :value="cardName"></mt-cell>
										<mt-cell title="支行名称:" :value="cardName1"></mt-cell>
										<img class="camera" :src="cardUrl" @click="showBigImg('bank')">
        								<!-- <thumbnails v-if="showImg" :imgTotal="cardUrl" :showImg="showImg" v-on:hideBigPop="hideBigImg"></thumbnails> -->
									</div>
							</div>
							<div class="evidence" v-if="evidenceShow">
								<mt-cell title="打款凭证">
									<mt-field class="remitAmount" label="打款金额:" v-model="remitAmount" ref="remitAmountInput"></mt-field>万
								</mt-cell>
								<div class="camera">
									<camera :popupVisible="popupVisible"
										@imgHandler="imageHandler4"
										:imageArr='evidenceUrls'
										:isFromAppointment="fromAppointment"
										:isFromBank="fromBank"
										@showPopup="showPopup"
										@hidePopup="hidePopup">
									</camera>
								</div>
							</div>
							<div class="evidence" v-if="!evidenceShow">
								<mt-cell class="remitAmount" title="打款凭证"><mt-cell title="打款金额:" :value="  remitAmount + '万'"></mt-cell></mt-cell>
								<div class="camera" v-for="(item, index) in evidenceUrl" :key="index" @click="showBigImg('remit', index)">
									<img :src="item">
        							<!-- <thumbnails v-if="showImg" :imgTotal="evidenceUrl" :imgKey="index" :showImg="showImg" v-on:hideBigPop="hideBigImg"></thumbnails> -->
								</div>
							</div>
							<div class="materialsNeeded" v-if="uploadCardMaterials">
								<mt-cell title="交易所需材料"></mt-cell>
								<div class="camera">
									<camera :popupVisible="popupVisible"
										@imgHandler="imageHandler2"
              							:imageArr="materialsUrls"
										:isFromAppointment="fromAppointment"
              							:isFromBank="fromBank"
										@showPopup="showPopup"
										@hidePopup="hidePopup">
									</camera>
								</div>
							</div>
							<div class="materialsNeeded" v-if="!uploadCardMaterials">
								<mt-cell title="交易所需材料"></mt-cell>
								<div class="camera" v-for="(item, index) in tradeUrl" :key="index" @click="showBigImg('material', index)">
									<img :src="item">
								</div>
							</div>
						</div>
					</div>
					<div class="refund" v-if="uploadRefund">
						<div class="cont">
							<mt-cell title="提交退款申请书"></mt-cell>
							<div class="camera">
								<camera :popupVisible="popupVisible"
									@imgHandler="imageHandler3"
									:imageArr="refundUrls"
									:isFromAppointment="fromAppointment"
									:isFromBank="fromBank"
									@showPopup="showPopup"
									@hidePopup="hidePopup">
								</camera>
							</div>
						</div>
					</div>
					<div class="refund" v-if="repeatUploadRefund">
						<div class="cont">
							<mt-cell title="提交退款申请书"></mt-cell>
							<div class="camera" v-for="(item, index) in refundUrl" :key="index" @click="showBigImg('refund', index)">
								<img :src="item">
							</div>
						</div>
					</div>
					<div class="mailingContract" v-if="sendEmail">
						<mt-cell title="邮寄合同" class="tit">
							<i slot="icon" class="iconfont">&#xe6ac;</i>
						</mt-cell>
						<div class="cont last_cont">
							<mt-cell title="合同编号：" :value="contractNumW"></mt-cell>
							<mt-cell title="快递公司：" :value="expresszCom"></mt-cell>
							<mt-cell title="快递编号：" :value="expressNums"></mt-cell>
              <div class="space"></div>
						</div>
					</div>
					<div class="mailingContract" v-if="sendEmailW">
						<mt-cell title="邮寄合同" class="tit">
							<i slot="icon" class="iconfont">&#xe6ac;</i>
						</mt-cell>
						<div class="cont">
							<mt-field label="合同编号：" v-model="cantractNum"></mt-field>
							<mt-field label="快递公司：" v-model="expressCompany"></mt-field>
							<mt-field label="快递编号：" v-model="expressNum"></mt-field>
						</div>
					</div>
					<div class="submitBtn" v-if="submitAppointmentBtnShow">
          	<mt-button type="primary" @click.native="submitAppointmentBtn">提交预约</mt-button>
					</div>
					<div class="submitBtn" v-if="repeatAppointmentBtnShow">
          	<mt-button type="primary" @click.native="repeatAppointmentBtn">重新预约</mt-button>
					</div>
					<div class="submitBtn" v-if="initiateRefund">
          	<mt-button type="primary" @click.native="refund">{{refundLan}}</mt-button>
					</div>
					<div class="successBtn" v-if="sucBtn">
          	<mt-button type="primary" @click.native="submitPayMaterials">提交打款材料</mt-button>
          	<mt-button type="primary" @click.native="cancleAppointment">预约取消</mt-button>
					</div>
					<div class="submitBtn" v-if="repeatPayMaterials">
          	<mt-button type="primary" @click.native="repeatSubmitPayMaterials">重新提交打款材料</mt-button>
					</div>
					<div class="submitBtn" v-if="uploadContract">
          	<mt-button type="primary" @click.native="emailContract">重新提交</mt-button>
					</div>
					<div class="mailBtn" v-if="giveMoneySuc">
          	<mt-button type="primary" @click.native="emailContract">去邮寄合同</mt-button>
          	<mt-button type="primary" @click.native="closeOrderform">订单关闭</mt-button>
					</div>
					<x-dialog v-model="submitDialog" class="dialog-demo submitDialog">
						<i class="iconfont noS returnIcon">&#xe617;</i>
						<div class="returnDetailCss">{{submitAppointDetail}}</div>
						<div class="returnDetailCss">{{count}}秒后将自动返回产品详情</div>
						<x-button @click.native="returnDetail" type="primary">返回产品详情</x-button>
					</x-dialog>
					<x-dialog v-model="orderCloseSuc" class="dialog-demo submitDialog">
						<i class="iconfont suc">&#xe60a;</i>
						<div class="success">订单关闭成功</div>
						<x-button @click.native="closeOrderSuc" type="primary">返回列表</x-button>
					</x-dialog>
					<x-dialog v-model="alertMsg" class="dialog-demo submitDialog" hide-on-blur>
						<div class="quit">{{msgDetail}}</div>
						<x-button type="primary" @click.native="hideAlert">确 定</x-button>
					</x-dialog>
					<!-- <x-dialog v-model="closeOrderR" class="dialog-demo submitDialog" hide-on-blur>
						<div class="tit">请填写订单关闭原因</div>
						<x-input
							v-model="reason"
							:show-clear="clear">
						</x-input>
						<div class="inputReason">{{noReasonShow}}</div>
						<x-button @click.native="sendMessage" type="primary">发 送</x-button>
					</x-dialog> -->
					<x-dialog v-model="closeOrderR" class="dialog-demo submitDialog" hide-on-blur>
						<div class="quit">确定关闭订单吗</div>
						<x-button @click.native="sendMessage" type="primary">确 定</x-button>
					</x-dialog>
					<x-dialog v-model="sureCancleA" class="dialog-demo submitDialog" hide-on-blur>
						<div class="quit">确定取消预约吗</div>
						<x-button @click.native="sureCancle" type="primary">确 定</x-button>
					</x-dialog>
					<!-- <x-dialog v-model="submitSucDialog" class="dialog-demo submitDialog" hide-on-blur>
						<i class="iconfont suc">&#xe60a;</i>
						<div class="success">您的提交已成功</div>
						<x-button @click.native="sucMakeSure" type="primary">返回产品详情</x-button>
					</x-dialog> -->
					<x-dialog v-model="failSubmit" class="dialog-demo submitDialog" hide-on-blur>
						<i class="iconfont noS fail">&#xe626;</i>
						<div class="success sorry">对不起！申请提交未成功</div>
						<div class="success">请您重新申请提交</div>
						<x-button @click.native="failMakeSure" type="primary">确 定</x-button>
					</x-dialog>
        			<thumbnails v-if="showImg" :imgTotal="imgTotal" :imgKey="imgIndex" :showImg="showImg" v-on:hideBigPop="hideBigImg"></thumbnails>
				</div>
			</div>
		</div>
</template>
<script type="text/ecmascript-6">
import { XHeader, Flow, FlowState, FlowLine, XDialog, XButton, XInput } from 'vux'
import camera from '@/base/camera/camera'
import { appointmentList, submitAppointment, cancelAppointment, submitMaterials, statusDetail, sendEmail, orderClose, requestRefund } from '@/service/api/appointment'
import { getProducts } from '@/service/api/products'
import { checkBankDetail } from '@/service/api/customers'
import { formatDate } from '@/common/js/date'
import thumbnails from '@/base/camera/thumbnails'

export default {
	data () {
		return {
		  itemHeight: getComputedStyle(window.document.documentElement)['font-size'].split('px')[0] - 0,
			topBar: '预约',
			count: '',
			topTitle: '',
			step1: 1,
			popupVisible: false,
			cardnum: '',
			bankname: '',
			bankname1: '',
			submitDialog: false,
			failSubmit: false,
			submitSucDialog: false,
			uploadShow: false,
			alertMsg: false,
			sucBtn: false,
			product_name: '',
			product_id: '',
			prePath: '',
			appointmentList: [],
			showBankCardName: false,
			showMoney: false,
			nowTime: '',
			money: '',
			selectMoney: '',
			name: '',
			// selectName: '',
			ableBank: '',
			cMob: '',
			// selectMobile: '',
			nameValues: [],
			appointmentId: '',
			showMoneyClick: true,
			showNameClick: true,
			submitAppointmentBtnShow: true,
			repeatAppointmentBtnShow: false,
			codeA: '',
			appointmentCode: false,
			appointmentDone: false,
			giveMoneyDone: false,
			giveMoneyIng: false,
			contractManage: false,
			chooseSelectedBank: true,
			giveMoneySuc: false,
			sendEmail: false,
			sendEmailW: false,
			uploadCard: true,
			uploadCardS: false,
			uploadCardMaterials: true,
			evidenceShow: true,
			// bankSrc: [],
			materialSrc: [],
			refundSrc: [],
			fromBank: 2,
			fromBankCard: 0,
			fromAppointment: 1,
			cardNum: '',
			cardName: '',
			cardName1: '',
			cardUrl: '',
			tradeUrl: [],
			evidenceUrl: [],
			cantractNum: '',
			expressCompany: '',
			expressNum: '',
			orderCloseSuc: false,
			uploadRefund: false,
			repeatUploadRefund: false,
			initiateRefund: false,
			alreadyPass: false,
			uploadContract: false,
			closeOrderReason: false,
			refundLan: '发起退款',
			alreadyPassTime: '',
			closeOrderR: false,
			clear: false,
			reason: '',
			emailType: '',
			contractNumW: '',
			expresszCom: '',
			expressNums: '',
			cameraShow: true,
			bankId: '',
			closeReason: '',
			emailClose: '',
			selected: '',
			firstFromUrl: '',
			repeatPayMaterials: false,
			msgDetail: '',
			minimalAmount: '',
			collectionAmount: '',
			refundUrls: '',
			materialsUrls: '',
			evidenceUrls: [],
			showSpace: false,
			noReasonShow: '',
			sureCancleA: false,
			submitAppointDetail: '已提交待审核中…',
			failTitle: '',
			remitAmount: '',
			showImg: false,
			imgTotal: null,
			imgIndex: '',
			slotsM: [
				{
          flex: 1,
          values: ['0', '1000', '2000', '3000', '4000', '5000', '6000', '7000', '8000', '9000'],
          className: 'slot2',
					textAlign: 'center'
        }, {
          divider: true,
          content: '+',
          className: 'slot3'
        }, {
          flex: 1,
          values: ['0', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
          className: 'slot4',
					textAlign: 'center'
        }, {
          divider: true,
          content: '+',
          className: 'slot5'
        }, {
          flex: 1,
          values: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90'],
          className: 'slot6',
					textAlign: 'center'
        }, {
          divider: true,
          content: '+',
          className: 'slot7'
        }, {
          flex: 1,
          values: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
          className: 'slot8',
					textAlign: 'center'
        }
			]
		}
	},
	computed: {
			slotsN: function () {
				return [{flex: 1, values: this.nameValues, className: 'slot1', textAlign: 'center'}]
			}
	},
	components: {
		XHeader,
		Flow,
    	FlowState,
		FlowLine,
		XDialog,
		XButton,
		XInput,
		camera,
		thumbnails
	},
	methods: {
			back () {
				if (this.$route.params.flag === 'productDetail') {
					this.returnDetail()
				} else if (this.$route.params.flag === 'reservationList') {
					this.$router.push({name: 'ReservationList', params: {mark: this.selected}})
				} else if (this.prePath === '/reservationList') {
					this.$router.push({name: 'ReservationList', params: {mark: this.selected}})
				} else {
					this.returnDetail()
				}
			},
			spaceClick () {
				this.showSpace = false
			},
			touchScreen () {
				if (this.$route.params.fromUrl === 'productDetail') {
					document.getElementsByTagName('input')[0].blur()
				}
				if (this.appointmentList.status === '1003' || this.appointmentList.status === '2002' || this.appointmentList.status === '2004' || this.appointmentList.status === '3003') {
					document.getElementsByTagName('input')[0].blur()
					document.getElementsByTagName('input')[1].blur()
					document.getElementsByTagName('input')[2].blur()
					document.getElementsByTagName('input')[3].blur()
					document.getElementsByTagName('input')[4].blur()
				}
			},
			chooseName () {
				if (this.$route.params.riskLevel) {
					this.$router.push({name: 'CustomerNameList', params: {flag: this.$route.params.fromUrl || this.$route.params.flag, riskLevel: this.$route.params.riskLevel}})
				} else {
					let arr = []
					getProducts().then(res => {
						res.data.map((item, index) => {
							item.products.map((info, index) => {
								arr.push(info)
							})
						})
						let item = arr.find(item => item.product_id === this.product_id)
						this.$router.push({name: 'CustomerNameList', params: {flag: this.$route.params.fromUrl || this.$route.params.flag, riskLevel: item.product_risk_level}})
					})
				}
			},
			// chooseMoney () {
      //   this.showMoney = true
			// },
			// onValuesChangeMoney (picker, values) {
			// 	this.selectMoney = parseInt(values[0]) + parseInt(values[1]) + parseInt(values[2]) + parseInt(values[3])
			// },
			// cancelMoney () {
      //   this.showMoney = false
			// },
			// ensureMoney () {
			// 	this.money = this.selectMoney + '万'
      //   this.showMoney = false
			// },
			showPopup (data) {
        this.popupVisible = data
      },
      hidePopup (data) {
        this.popupVisible = data
			},
			chooseBankName () {
				if (this.alertMsg === true) {
					// return
				} else {
					this.showBankCardName = true
				}
			},
			onValuesChange (picker, values) {
				if (values[0] !== undefined) {
					this.ableBank = values[0]
				}
			},
			cancelCerName () {
        this.showBankCardName = false
      },
      ensureCerName (val) {
				this.bankname = this.ableBank.bankName
				this.bankId = this.ableBank.bankId
        this.showBankCardName = false
			},
			autoReturnDetail () {
				const TIME_COUNT = 10
				if (!this.timer) {
					this.count = TIME_COUNT
					this.tiemr = setInterval(() => {
						if (this.count > 0) {
							this.count--
						} else {
							this.returnDetail()
							clearInterval(this.tiemr)
							this.timer = null
						}
					}, 1000)
				}
			},
			submitAppointmentBtn () {
				if (this.name === '' || this.money === '') {
					this.alertMsg = true
					this.msgDetail = '还有信息没填写哦～'
					return
				}
				if (this.money < this.minimalAmount) {
					this.msgDetail = '预约金额小于起投金额，不可预约'
					this.alertMsg = true
					return
				}
				if (this.money > this.collectionAmount) {
					this.msgDetail = '预约金额大于募集金额，不可预约'
					this.alertMsg = true
					return
				}
				let selectObj = this.appointmentList.find(item => item.mobile === this.cMob)
				let obj = {
					'client_id': selectObj.client_id,
					'client_mobile': this.cMob,
					'client_no': selectObj.client_no,
					'client_name': this.name,
					'client_type': selectObj.client_type,
					'risk_level': selectObj.risk_level,
					'product_id': this.product_id,
					'product_name': this.product_name,
					'appointment_amount': parseInt(this.money),
					'appointment_date': this.nowTime
				}
				submitAppointment(obj).then(res => {
					if (res.status === 200) {
						this.submitDialog = true
						this.autoReturnDetail()
						if (res.data.message === '预约成功') {
							this.submitAppointDetail = '您的预约已提交成功'
						} else {
							this.submitAppointDetail = '已提交待审核中…'
						}
					}
				})
			},
			repeatAppointmentBtn () {
				if (this.name === '' || this.money === '') {
					this.alertMsg = true
					this.msgDetail = '还有信息没填写哦～'
					return
				}
				if (this.money < this.minimalAmount) {
					this.msgDetail = '预约金额小于起投金额，不可预约'
					this.alertMsg = true
					return
				}
				if (this.money > this.collectionAmount) {
					this.msgDetail = '预约金额大于募集金额，不可预约'
					this.alertMsg = true
					return
				}
				let obj = {
					'client_id': this.appointmentList.client_id,
					'client_mobile': this.cMob,
					'client_no': this.appointmentList.client_no,
					'client_name': this.name,
					'client_type': this.appointmentList.client_type,
					'risk_level': this.appointmentList.risk_level,
					'product_id': this.product_id,
					'product_name': this.appointmentList.product_name,
					'appointment_amount': parseInt(this.money),
					'appointment_date': this.nowTime
				}
				submitAppointment(obj).then(res => {
					if (res.status === 200) {
						this.submitDialog = true
						this.autoReturnDetail()
						if (res.message === '预约成功') {
							this.submitAppointDetail = '您的预约已提交成功'
						} else {
							this.submitAppointDetail = '已提交待审核中…'
						}
					}
				})
			},
			hideAlert () {
				this.alertMsg = false
			},
			returnDetail () {
				clearInterval(this.tiemr)
				this.timer = null
				let arr = []
				getProducts().then(res => {
					res.data.map((item, index) => {
						item.products.map((info, index) => {
							arr.push(info)
						})
					})
					let item = arr.find(item => item.product_id === this.product_id)
					this.$router.push({name: 'ProductDetail', params: {id: this.product_id, item: item, return: 'none', flag: this.$route.params.fromUrl || this.$route.params.flag, showBtn: 'show'}})
				})
				this.submitDialog = false
			},
			chooseBankCard () {
				this.$router.push({name: 'BankList', params: {id: this.appointmentList.client_id, flag: this.$route.params.fromUrl || this.$route.params.flag}})
			},
			cardNumChange () {
			},
			submitPayMaterials () {
				if (!/(^\d{15}$)|(^\d{16}$)|(^\d{19}$)/.test(this.cardnum)) {
					this.alertMsg = true
					this.msgDetail = '银行卡输入有误'
					return
				}
				console.log(this.materialSrc)
				if (this.evidenceUrl === undefined || this.materialSrc === undefined || this.cardUrl === undefined || this.bankname === '' || this.bankname1 === '' || this.cardnum === '') {
					this.alertMsg = true
					this.msgDetail = '还有信息没填写哦～'
					return
				}
				let obj = {
					'file_urls_payments': this.evidenceUrl,
					'file_urls_trades': this.materialSrc,
					'bank_card_front_url': this.cardUrl,
					'bank_name': this.bankname || this.cardName,
					'bank_subname': this.bankname1 || this.cardName1,
					'bank_id': this.bankId,
					'card_no': this.cardnum || this.cardNum,
					'remit_amount': parseInt(this.remitAmount)
				}
				submitMaterials(this.appointmentId, obj).then(res => {
					if (res.status === 200) {
						this.submitDialog = true
						this.autoReturnDetail()
						this.submitAppointDetail = '已提交待审核中…'
					}
				})
			},
			repeatSubmitPayMaterials () {
				if (!/(^\d{15}$)|(^\d{16}$)|(^\d{19}$)/.test(this.cardnum)) {
					this.alertMsg = true
					this.msgDetail = '银行卡输入有误'
					return
				}
				if (this.evidenceUrl === undefined || this.materialSrc === undefined || this.cardUrl === undefined || this.bankname === '' || this.bankname1 === '' || this.cardnum === '') {
					this.alertMsg = true
					this.msgDetail = '还有信息没填写哦～'
					return
				}
				let obj = {
					'file_urls_payments': this.evidenceUrl,
					'file_urls_trades': this.materialSrc,
					'bank_card_front_url': this.cardUrl,
					'bank_name': this.bankname || this.cardName,
					'bank_subname': this.bankname1 || this.cardName1,
					'bank_id': this.bankId,
					'card_no': this.cardnum || this.cardNum,
					'remit_amount': parseInt(this.remitAmount),
					'flag': '1'
				}
				submitMaterials(this.appointmentId, obj).then(res => {
					if (res.status === 200) {
						this.submitDialog = true
						this.autoReturnDetail()
						this.submitAppointDetail = '已提交待审核中…'
					}
				})
			},
			imageHandler1 (data) {
				this.cardUrl = data
			},
			imageHandler2 (data) {
				this.materialSrc = data
			},
			imageHandler3 (data) {
				this.refundSrc = data
			},
			imageHandler4 (data) {
				console.log(data)
				this.evidenceUrl = data
			},
			refund () {
				if (this.refundSrc.length === 0) {
					this.alertMsg = true
					this.msgDetail = '还有信息没填写哦～'
					return
				}
				let obj = {}
				if (this.appointmentList.refund_status === '3') {
					obj = {
						'file_refund_urls': this.refundSrc,
						'flag': '0'
					}
				} else {
					obj = {
						'file_refund_urls': this.refundSrc
					}
				}
				requestRefund(this.appointmentId, obj).then(res => {
					if (res.status === 200) {
						this.autoReturnDetail()
						this.submitDialog = true
					}
				})
			},
			cancleAppointment () {
				this.sureCancleA = true
			},
			sureCancle () {
				cancelAppointment(this.appointmentId).then(res => {
					if (res.status === 200) {
						this.topTitle = '预约取消'
						this.sucBtn = false
						this.uploadShow = false
						this.sureCancleA = false
					}
				})
			},
			emailContract () {
				if (this.cantractNum === '' || this.expressCompany === '' || this.expressNum === '') {
					this.alertMsg = true
					this.msgDetail = '还有信息没填写哦～'
					return
				}
				let obj = {
					'contract_no': this.cantractNum,
					'express_company': this.expressCompany,
					'express_no': this.expressNum
				}
				sendEmail(this.appointmentId, obj).then(res => {
					if (res.status === 200) {
						this.autoReturnDetail()
						this.submitDialog = true
					}
				})
			},
			closeOrderform () {
				this.closeOrderR = true
			},
			sendMessage () {
				orderClose(this.appointmentId).then(res => {
					if (res.status === 200) {
						this.closeOrderR = false
						// this.orderCloseSuc = true
						this.$router.push({name: 'ReservationList', params: {mark: '2'}})
					}
				})
			},
			returnProductInfo () {
				let arr = []
				getProducts().then(res => {
					res.data.map((item, index) => {
						item.products.map((info, index) => {
							arr.push(info)
						})
					})
					let item = arr.find(item => item.product_id === this.product_id)
					this.$router.push({name: 'ProductDetail', params: {id: this.product_id, item: item, flag: this.$route.params.fromUrl || this.$route.params.flag, showBtn: 'hide'}})
				})
			},
			writeAppointment () {
					this.minimalAmount = this.$route.params.minimalAmount
					this.collectionAmount = this.$route.params.collectionAmount
					this.nowTime = formatDate(new Date(), 'yyyy-MM-dd hh:mm')
					this.product_name = this.$route.params.productInfo
					this.product_id = this.$route.params.productId
					this.topBar = '预约'
					this.topTitle = '预约'
					this.name = ''
					this.cMob = ''
					this.money = ''
					this.closeOrderReason = false
					this.showNameClick = true
					this.showMoneyClick = true
					this.uploadShow = false
					this.uploadRefund = false
					this.repeatUploadRefund = false
					this.sendEmail = false
					this.sendEmailW = false
					this.submitAppointmentBtnShow = true
					this.repeatAppointmentBtnShow = false
					this.initiateRefund = false
					this.sucBtn = false
					this.uploadContract = false
					this.giveMoneySuc = false
					this.alreadyPass = false
					this.appointmentCode = false
					this.repeatPayMaterials = false
					this.orderCloseSuc = false
					this.popupVisible = false
					this.sureCancleA = false
					this.appointmentDone = false
					this.giveMoneyDone = false
					this.giveMoneyIng = false
					this.contractManage = false
					appointmentList(this.$route.params.riskLevel).then(res => {
						this.appointmentList = res.data
					})
			},
			getList () {
				this.appointmentId = this.$route.params.appointmentId
				this.orderCloseSuc = false
				statusDetail(this.appointmentId).then(res => {
					this.appointmentList = res.data
					this.product_id = this.appointmentList.product_id
					this.showMoneyClick = false
					this.showNameClick = false
					this.appointmentCode = true
					this.codeA = this.appointmentList.appointment_code
					this.name = this.appointmentList.client_name
					this.cMob = this.appointmentList.client_mobile
					this.money = this.appointmentList.appointment_amount
					this.nowTime = this.appointmentList.appointment_date
					this.product_name = this.appointmentList.product_name
					this.cardNum = this.appointmentList.cardno
					this.cardName = this.appointmentList.bank_name
					this.cardName1 = this.appointmentList.bank_subname
					this.cardUrl = this.appointmentList.bankcard_front_url
					this.evidenceUrl = this.appointmentList.file_urls_payments
					this.materialSrc = this.appointmentList.file_urls_trades
					this.tradeUrl = this.appointmentList.file_urls_trades
					this.refundUrl = this.appointmentList.file_urls_refunds
					this.alreadyPassTime = this.appointmentList.remit_audit_date
					this.contractNumW = this.appointmentList.contract_no
					this.expresszCom = this.appointmentList.express_company
					this.expressNums = this.appointmentList.express_no
					this.closeReason = this.appointmentList.order_closure_remark
					this.emailClose = this.appointmentList.contract_no_pass_remark
					this.remitAmount = this.appointmentList.remit_amount
					if (this.appointmentList.audit_contract_express === '0') {
						this.emailType = '自取'
					} else if (this.appointmentList.audit_contract_express === '1') {
						this.emailType = '快递寄出'
					}
					if (this.appointmentList.status === '1001') {
						this.topBar = '预约'
						this.topTitle = '预约(申请中)'
						this.repeatAppointmentBtnShow = false
						this.sucBtn = false
						this.uploadShow = false
						this.appointmentDone = false
						this.uploadCard = false
						this.uploadCardMaterials = false
						this.chooseSelectedBank = false
						this.cameraShow = false
						this.uploadCardS = false
						this.submitAppointmentBtnShow = false
						this.uploadContract = false
						this.closeOrderReason = false
						this.showNameClick = false
						this.showMoneyClick = false
						this.alreadyPass = false
						this.uploadRefund = false
						this.repeatUploadRefund = false
						this.sendEmail = false
						this.sendEmailW = false
						this.repeatAppointmentBtnShow = false
						this.initiateRefund = false
						this.giveMoneySuc = false
						this.giveMoneyDone = false
						this.giveMoneyIng = false
						this.contractManage = false
						this.repeatPayMaterials = false
						this.orderCloseSuc = false
						this.popupVisible = false
						this.sureCancleA = false
						this.selected = '1'
					} else if (this.appointmentList.status === '1002') {
						this.topBar = '预约'
						this.topTitle = '预约失败'
						this.failTitle = '预约失败原因：'
						this.nowTime = formatDate(new Date(), 'yyyy-MM-dd hh:mm')
						let arr = []
						getProducts().then(res => {
							res.data.map((item, index) => {
								item.products.map((info, index) => {
									arr.push(info)
								})
							})
							let item = arr.find(item => item.product_id === this.product_id)
							this.minimalAmount = item.minimal_amount
							this.collectionAmount = item.collection_amount
						})
						this.name = this.appointmentList.client_name
						this.cMob = this.appointmentList.client_mobile
						this.money = this.appointmentList.appointment_amount
						this.closeReason = this.appointmentList.appoint_failure
						this.submitAppointmentBtnShow = false
						this.repeatAppointmentBtnShow = true
						this.showNameClick = true
						this.showMoneyClick = true
						this.closeOrderReason = true
						this.sucBtn = false
						this.uploadShow = false
						this.appointmentDone = false
						this.uploadCard = false
						this.uploadCardMaterials = false
						this.chooseSelectedBank = false
						this.cameraShow = false
						this.uploadCardS = false
						this.uploadContract = false
						this.alreadyPass = false
						this.uploadRefund = false
						this.repeatUploadRefund = false
						this.sendEmail = false
						this.sendEmailW = false
						this.initiateRefund = false
						this.giveMoneySuc = false
						this.giveMoneyDone = false
						this.giveMoneyIng = false
						this.contractManage = false
						this.repeatPayMaterials = false
						this.orderCloseSuc = false
						this.popupVisible = false
						this.sureCancleA = false
						this.selected = '1'
					} else if (this.appointmentList.status === '1003') {
						this.topBar = '预约'
						this.topTitle = '预约成功'
						this.sucBtn = true
						this.uploadShow = true
						this.appointmentDone = true
						this.uploadCard = true
						this.uploadCardMaterials = true
						this.evidenceShow = true
						this.chooseSelectedBank = true
						this.cameraShow = true
						this.uploadCardS = false
						this.submitAppointmentBtnShow = false
						this.uploadContract = false
						this.closeOrderReason = false
						this.showNameClick = false
						this.showMoneyClick = false
						this.alreadyPass = false
						this.uploadRefund = false
						this.repeatUploadRefund = false
						this.sendEmail = false
						this.sendEmailW = false
						this.repeatAppointmentBtnShow = false
						this.initiateRefund = false
						this.giveMoneySuc = false
						this.giveMoneyDone = false
						this.giveMoneyIng = false
						this.contractManage = false
						this.repeatPayMaterials = false
						this.orderCloseSuc = false
						this.popupVisible = false
						this.sureCancleA = false
						this.cardnum = ''
						this.bankname = ''
						this.bankname1 = ''
						this.selected = '1'
					} else if (this.appointmentList.status === '1004') {
						this.topBar = '预约'
						this.topTitle = '预约取消'
						this.submitAppointmentBtnShow = false
						this.repeatAppointmentBtnShow = false
						this.sucBtn = false
						this.uploadShow = false
						this.appointmentDone = false
						this.uploadCard = false
						this.uploadCardMaterials = false
						this.chooseSelectedBank = false
						this.cameraShow = false
						this.uploadCardS = false
						this.uploadContract = false
						this.closeOrderReason = false
						this.showNameClick = false
						this.showMoneyClick = false
						this.alreadyPass = false
						this.uploadRefund = false
						this.repeatUploadRefund = false
						this.sendEmail = false
						this.sendEmailW = false
						this.initiateRefund = false
						this.giveMoneySuc = false
						this.giveMoneyDone = false
						this.giveMoneyIng = false
						this.contractManage = false
						this.repeatPayMaterials = false
						this.orderCloseSuc = false
						this.sureCancleA = false
						this.selected = '1'
					} else if (this.appointmentList.status === '1005') {
						this.topBar = '预约'
						this.topTitle = '预约失效'
						this.showNameClick = false
						this.showMoneyClick = false
						this.repeatAppointmentBtnShow = false
						this.submitAppointmentBtnShow = false
						this.sucBtn = false
						this.uploadShow = false
						this.appointmentDone = false
						this.uploadCard = false
						this.uploadCardMaterials = false
						this.chooseSelectedBank = false
						this.cameraShow = false
						this.uploadCardS = false
						this.uploadContract = false
						this.closeOrderReason = false
						this.alreadyPass = false
						this.uploadRefund = false
						this.repeatUploadRefund = false
						this.sendEmail = false
						this.sendEmailW = false
						this.initiateRefund = false
						this.giveMoneySuc = false
						this.giveMoneyDone = false
						this.giveMoneyIng = false
						this.contractManage = false
						this.repeatPayMaterials = false
						this.orderCloseSuc = false
						this.popupVisible = false
						this.sureCancleA = false
						this.selected = '1'
					} else if (this.appointmentList.status === '2001') {
						this.topBar = '打款'
						this.topTitle = '打款审核中'
						this.uploadShow = true
						this.giveMoneyDone = true
						this.giveMoneyDone = true
						this.appointmentDone = true
						this.uploadCardS = true
						this.repeatAppointmentBtnShow = false
						this.submitAppointmentBtnShow = false
						this.sucBtn = false
						this.uploadCard = false
						this.uploadCardMaterials = false
						this.evidenceShow = false
						this.chooseSelectedBank = false
						this.cameraShow = false
						this.uploadContract = false
						this.closeOrderReason = false
						this.showNameClick = false
						this.showMoneyClick = false
						this.alreadyPass = false
						this.uploadRefund = false
						this.repeatUploadRefund = false
						this.sendEmail = false
						this.sendEmailW = false
						this.initiateRefund = false
						this.giveMoneySuc = false
						this.contractManage = false
						this.giveMoneyIng = false
						this.repeatPayMaterials = false
						this.orderCloseSuc = false
						this.popupVisible = false
						this.sureCancleA = false
						this.selected = '2'
					} else if (this.appointmentList.status === '2002') {
						this.topBar = '打款'
						this.topTitle = '已到账待补全材料'
						this.failTitle = '待补全材料原因：'
						this.closeReason = this.appointmentList.pending_material_remark
						this.uploadShow = true
						this.appointmentDone = true
						this.uploadCard = true
						this.uploadCardMaterials = true
						this.evidenceShow = true
						this.chooseSelectedBank = true
						this.cameraShow = true
						this.giveMoneyDone = true
						this.repeatPayMaterials = true
						this.closeOrderReason = true
						this.sucBtn = false
						this.uploadCardS = false
						this.submitAppointmentBtnShow = false
						this.uploadContract = false
						this.showNameClick = false
						this.showMoneyClick = false
						this.alreadyPass = false
						this.uploadRefund = false
						this.repeatUploadRefund = false
						this.sendEmail = false
						this.sendEmailW = false
						this.repeatAppointmentBtnShow = false
						this.initiateRefund = false
						this.giveMoneySuc = false
						this.giveMoneyIng = false
						this.contractManage = false
						this.orderCloseSuc = false
						this.popupVisible = false
						this.sureCancleA = false
						this.bankId = this.appointmentList.bank_card_id
						this.cardnum = this.appointmentList.cardno
						this.bankname = this.appointmentList.bank_name
						this.bankname1 = this.appointmentList.bank_subname
						this.cardUrl = this.appointmentList.bankcard_front_url
						this.materialsUrls = this.appointmentList.file_urls_trades
						this.evidenceUrls = this.appointmentList.file_urls_payments
						this.refundUrls = []
						// this.materialSrc = []
						this.refundSrc = []
						this.selected = '2'
					} else if (this.appointmentList.status === '2003') {
						this.topBar = '打款'
						this.topTitle = '订单关闭'
						this.failTitle = '订单关闭原因'
						this.appointmentDone = true
						this.giveMoneyDone = true
						this.closeOrderReason = true
						this.uploadShow = true
						this.uploadCardS = true
						this.emailReason = false
						this.repeatAppointmentBtnShow = false
						this.submitAppointmentBtnShow = false
						this.sucBtn = false
						this.uploadCard = false
						this.uploadCardMaterials = false
						this.evidenceShow = false
						this.chooseSelectedBank = false
						this.cameraShow = false
						this.uploadContract = false
						this.showNameClick = false
						this.showMoneyClick = false
						this.alreadyPass = false
						this.uploadRefund = false
						this.repeatUploadRefund = false
						this.sendEmail = false
						this.sendEmailW = false
						this.initiateRefund = false
						this.giveMoneySuc = false
						this.contractManage = false
						this.giveMoneyIng = false
						this.repeatPayMaterials = false
						this.orderCloseSuc = false
						this.popupVisible = false
						this.sureCancleA = false
						this.selected = '2'
						if (this.appointmentList.refund_status === '0') {
							this.topTitle = '订单关闭 无需退款'
						} else if (this.appointmentList.refund_status === '1') {
							this.topTitle = '需要退款'
							this.uploadRefund = true
							this.initiateRefund = true
						} else if (this.appointmentList.refund_status === '2') {
							this.topTitle = '退款申请中'
							this.repeatUploadRefund = true
						} else if (this.appointmentList.refund_status === '3') {
							this.topTitle = '退款驳回'
							this.failTitle = '退款驳回原因：'
							this.closeReason = this.appointmentList.refund_failure
							this.uploadRefund = true
							this.initiateRefund = true
							this.refundLan = '重新发起退款'
						} else if (this.appointmentList.refund_status === '4') {
							this.topTitle = '已退款'
							this.repeatUploadRefund = true
						}
					} else if (this.appointmentList.status === '2004') {
						this.topBar = '打款'
						this.topTitle = '打款审核通过'
						this.cantractNum = ''
						this.expressCompany = ''
						this.expressNum = ''
						this.uploadShow = true
						this.uploadCardS = true
						this.giveMoneySuc = true
						this.sendEmailW = true
						this.giveMoneyDone = true
						this.appointmentDone = true
						this.alreadyPass = true
						this.repeatAppointmentBtnShow = false
						this.submitAppointmentBtnShow = false
						this.sucBtn = false
						this.uploadCard = false
						this.uploadCardMaterials = false
						this.evidenceShow = false
						this.chooseSelectedBank = false
						this.cameraShow = false
						this.uploadContract = false
						this.showNameClick = false
						this.showMoneyClick = false
						this.uploadRefund = false
						this.repeatUploadRefund = false
						this.sendEmail = false
						this.initiateRefund = false
						this.contractManage = false
						this.giveMoneyIng = false
						this.repeatPayMaterials = false
						this.orderCloseSuc = false
						this.popupVisible = false
						this.sureCancleA = false
						this.selected = '2'
					} else if (this.appointmentList.status === '3001') {
						this.topBar = '合同管理'
						this.topTitle = '待收到合同'
						this.uploadShow = true
						this.uploadCardS = true
						this.sendEmail = true
						this.giveMoneyDone = true
						this.appointmentDone = true
						this.giveMoneyIng = true
						this.alreadyPass = true
						this.repeatAppointmentBtnShow = false
						this.submitAppointmentBtnShow = false
						this.sucBtn = false
						this.uploadCard = false
						this.uploadCardMaterials = false
						this.evidenceShow = false
						this.chooseSelectedBank = false
						this.cameraShow = false
						this.uploadContract = false
						this.showNameClick = false
						this.showMoneyClick = false
						this.uploadRefund = false
						this.repeatUploadRefund = false
						this.initiateRefund = false
						this.giveMoneySuc = false
						this.contractManage = false
						this.closeOrderReason	= false
						this.repeatPayMaterials = false
						this.sendEmailW = false
						this.orderCloseSuc = false
						this.popupVisible = false
						this.sureCancleA = false
						this.selected = '3'
					} else if (this.appointmentList.status === '3002') {
						this.topBar = '合同管理'
						this.topTitle = '合同审核中'
						this.uploadShow = true
						this.uploadCardS = true
						this.sendEmail = true
						this.giveMoneyDone = true
						this.appointmentDone = true
						this.giveMoneyIng = true
						this.alreadyPass = true
						this.contractManage = false
						this.repeatAppointmentBtnShow = false
						this.submitAppointmentBtnShow = false
						this.sucBtn = false
						this.uploadCard = false
						this.uploadCardMaterials = false
						this.evidenceShow = false
						this.chooseSelectedBank = false
						this.cameraShow = false
						this.uploadContract = false
						this.showNameClick = false
						this.showMoneyClick = false
						this.uploadRefund = false
						this.repeatUploadRefund = false
						this.initiateRefund = false
						this.giveMoneySuc = false
						this.closeOrderReason	= false
						this.repeatPayMaterials = false
						this.sendEmailW = false
						this.orderCloseSuc = false
						this.popupVisible = false
						this.sureCancleA = false
						this.selected = '3'
					} else if (this.appointmentList.status === '3003') {
						this.topBar = '合同管理'
						this.topTitle = '合同审核不通过'
						this.uploadContract = true
						this.uploadShow = true
						this.uploadCardS = true
						this.sendEmailW = true
						this.giveMoneyDone = true
						this.appointmentDone = true
						this.giveMoneyIng = true
						this.alreadyPass = true
						this.contractManage = false
						this.repeatAppointmentBtnShow = false
						this.submitAppointmentBtnShow = false
						this.sucBtn = false
						this.uploadCard = false
						this.uploadCardMaterials = false
						this.evidenceShow = false
						this.chooseSelectedBank = false
						this.cameraShow = false
						this.showNameClick = false
						this.showMoneyClick = false
						this.uploadRefund = false
						this.repeatUploadRefund = false
						this.initiateRefund = false
						this.giveMoneySuc = false
						this.closeOrderReason	= false
						this.sendEmail = false
						this.repeatPayMaterials = false
						this.orderCloseSuc = false
						this.popupVisible = false
						this.sureCancleA = false
						this.selected = '3'
					} else if (this.appointmentList.status === '3004') {
						this.topBar = '合同管理'
						this.topTitle = '合同审核通过'
						this.contractManage = true
						this.uploadShow = true
						this.uploadCardS = true
						this.sendEmail = true
						this.giveMoneyDone = true
						this.appointmentDone = true
						this.giveMoneyIng = true
						this.alreadyPass = true
						this.repeatAppointmentBtnShow = false
						this.submitAppointmentBtnShow = false
						this.sucBtn = false
						this.uploadCard = false
						this.uploadCardMaterials = false
						this.evidenceShow = false
						this.chooseSelectedBank = false
						this.cameraShow = false
						this.uploadContract = false
						this.showNameClick = false
						this.showMoneyClick = false
						this.uploadRefund = false
						this.repeatUploadRefund = false
						this.initiateRefund = false
						this.giveMoneySuc = false
						this.closeOrderReason	= false
						this.repeatPayMaterials = false
						this.sendEmailW = false
						this.orderCloseSuc = false
						this.popupVisible = false
						this.sureCancleA = false
						this.selected = '3'
					}
				})
			},
			getBankList () {
				checkBankDetail().then(res => {
					this.nameValues = []
					res.data.map((item, index) => {
						this.nameValues.push({'bankName': item.bank_name, 'bankId': item.bank_id})
					})
				})
			},
			showBigImg (data, index) {
				if (data === 'bank') {
					this.imgTotal = this.cardUrl
				} else if (data === 'remit') {
					this.imgTotal = this.evidenceUrl
				} else if (data === 'material') {
					this.imgTotal = this.tradeUrl
				} else if (data === 'refund') {
					this.imgTotal = this.refundUrl
				}
				this.imgIndex = index
				this.showImg = true
			},
			hideBigImg (data) {
				this.showImg = data
			}
	},
	beforeRouteEnter (to, from, next) {
		next(vm => {
			vm.prePath = from.path
			// vm.getList()
		})
	},
	// beforeRouteLeave (to, from, next) {
	// 	console.log(from)
	// 	console.log('--------')
	// 	console.log(to)
	// 		if (to.name === 'ReservationList') {
	// 			console.log('list111111')
	// 			from.meta.keepAlive = false
	// 			console.log(from.meta)
	// 		} else if (to.name === 'ProductDetail') {
	// 			console.log('detail222222')
	// 			from.meta.keepAlive = true
	// 			console.log(from.meta)
	// 		}
	// 		next()
	// },
	activated () {
		if (this.$route.params.fromUrl === 'productDetail') {
			this.writeAppointment()
		} else if (this.$route.params.fromUrl === 'reservationList') {
			this.refundUrls = []
			this.materialsUrls = []
			this.evidenceUrls = []
			this.cardUrl = ''
			this.evidenceUrl = []
			this.materialSrc = []
			this.refundSrc = []
			this.getList()
			this.getBankList()
		} else if (this.$route.params.mark === 'selected') {
			this.cameraShow = true
			this.uploadCard = true
			this.uploadCardS = false
			this.chooseSelectedBank = true
			let obj = this.$route.params.item
			this.cardnum = obj.card_no
			this.bankname = obj.bank_name
			this.bankname1 = obj.sub_branch_name
			this.cardUrl = obj.card_front_url
			this.bankId = obj.bank_id
		} else if (this.$route.params.selectFlag === 'selectFlag') {
			this.name = this.$route.params.nameItem.name
			this.cMob = this.$route.params.nameItem.mobile
		}
	},
	// deactivated () {
	// 	console.log('deactived')
	// },
	created () {
		window.scroll(0, 0)
		// console.log(this.$route.params.fromUrl)
	}
}
</script>
<style lang="less">
.productAppointment{
	font-family: PingFangSC-Regular;
		.spaceBack{
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			opacity: 0.5;
			background: transparent;
			z-index: 100;
		}
	.wrapper{
		.topBar{
			height: 317px;
			background: #fff;
			margin-top: 20px;
			text-align: center;
			.title{
				font-size: 32px;
				color: #2672BA;
				padding: 75px 0;
				font-weight: bold;
			}
			.weui-wepay-flow{
        width: 100%;
        box-sizing: border-box;
        padding: 0 100px;
				/*margin-left: 120px;*/
				/*padding: 0;*/
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
						/*width: 224px;*/
            width: 44%;
						height: 6px;
						background: #9099A2;
					}
					.weui-wepay-flow__line.weui-wepay-flow__line_done{
						background: #2672BA;
						.weui-wepay-flow__process{
							background: transparent;
						}
					}
					.weui-wepay-flow__line.weui-wepay-flow__line_ing{
						.weui-wepay-flow__process{
							background: #2672BA;
							height: 6px;
						}
						.weui-wepay-flow__info-top{
							display: none;
						}
					}
				}
			}
		}
		.closeReason,.emailReason{
			border-bottom: 1px solid #CCC;
			.mint-cell{
				border-top: 1px solid #CCC;
				height: 80px;
				.mint-cell-wrapper{
					padding: 0 20px;
					height: 100%;
					line-height: 100%;
					background-image: none;
					.mint-cell-text,.mint-cell-value{
						font-family: PingFangSC-Medium;
						font-size: 28px;
						color: #2672BA;
					}
					.mint-cell-text{
						font-size: 30px;
					}
					.mint-cell-value{
						font-family: PingFangSC-Regular;
					}
				}
			}
		}
		.info{
			margin-top: 20px;
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
					background-image: none;
				}
			}
			.cont{
				margin-bottom: 20px;
				.cercode_box {
					width: 100%;
					height: 350px;
					.picker-items {
						/*height: 244px;*/
						// .picker-item,.picker-item.picker-selected{
						// 	height: 70px !important;
    				// 	line-height: 70px !important;
						// }
					}
					.picker-toolbar {
						height: 56px;
						line-height: 56px;
						.toolbar {
							width: 100%;
							-webkit-box-sizing: border-box;
							-moz-box-sizing: border-box;
							box-sizing: border-box;
							height: 56px;
							line-height: 56px;
							padding: 0 30px;
							color: #2672ba;
							font-size: 34px;
							position: absolute;
							border-bottom: 1px solid #ddd;
							span {
								position: absolute;
								display: inline-block;
							}
							span.cancel {
								left: 30px;
							}
							span.ensure {
								right: 30px;
							}
						}
					}
				}
				.mint-cell{
					height: 80px;
					border-bottom: 1px solid #CCCCCC;
					.mint-cell-wrapper{
						line-height: 80px;
						height: 80px;
						font-size: 30px;
						padding: 0 20px;
						background-image: none;
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
				.mint-field{
					height: 80px;
					.mint-cell-wrapper{
						height: 80px;
						line-height: 80px;
						background-image: none;
						.mint-cell-title{
							width: 150px;
						}
						.mint-cell-value{
							.mint-field-core{
								width: 570px;
								height: 40px;
								line-height: 40px;
								border: 1px solid #ccc;
								border-radius: 5px;
								box-sizing: border-box;
								text-indent: 20px;
							}
						  .mint-field-clear{
								display: none;
							}
						}
					}
				}
				.inputMoney{
					.mint-cell-wrapper{
						border-bottom: 0.013333rem solid #ccc;
						.mint-cell-title{
							width: 155px;
						}
						.mint-cell-value{
							padding-right: 20px;
							width: 580px;
							box-sizing: border-box;
							.mint-field-core{
								border: none;
								text-align: right;
								color: #666;
							}
						}
					}
				}
			}
      .cont.last_cont {
        margin-bottom: 0;
      }
			.submitBtn{
				text-align: center;
				.mint-button.mint-button--primary.mint-button--normal{
					width: 710px;
					height: 72px;
					margin-top: 10px;
					margin-bottom: 30px;
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
			.successBtn,.mailBtn{
				text-align: center;
				padding: 10px 0 30px 0;
				.mint-button.mint-button--primary.mint-button--normal{
					width: 300px;
					height: 72px;
					background: #2672BA;
					border-radius: 8px;
					label{
						font-family: PingFangSC-Regular;
						font-size: 28px;
						color: #FFFFFF;
					}
				}
				button:first-child{
					margin-right: 25px;
				}
				button:nth-child(2){
					margin-left: 25px;
				}
			}
			.uploadCustomer{
				background-color: #f5f5f5;
				.fightMoney{
					margin-bottom: 20px;
				}
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
							height: 100%;
							line-height: 100%;
							padding: 0;
							background-image: none;
							.mint-cell-title{
								width: 130px;
								.mint-cell-text{
									font-size: 26px;
									font-weight: normal;
								}
							}
							.mint-cell-value{
								line-height: 40px;
                position: relative;
								.mint-field-core{
									width: 580px;
									height: 40px;
									line-height: 40px;
									border: 1px solid #ccc;
									border-radius: 5px;
									box-sizing: border-box;
									text-indent: 20px;
								}
								.mint-field-other{
									top: 0;
									/*right: 0;*/
									position: absolute;
                  width: 100%;
                  height: 100%;
									/*transform: rotateZ(90deg);*/
									.define_box {
                    position: absolute;
                    width:100%;
                    height:100%;
                    top:0;
                    left:0;
                    text-align: right;
                    .iconfont{
                      display: inline-block;
                      transform: rotateZ(90deg);
                      font-size: 40px;
                      color: #333;
                    }
                  }
								}
							}
						}
					}
					.mint-field:nth-child(2){
						.mint-field-core{
							background: #f5f5f5;
						}
					}
					.upload_cont{
						width: 132px;
						height: 120px;
						line-height: 120px;
						margin: 0 0;
						.addbig_box{
							height: 120px;
							line-height: 130px;
							.iconfont.icon_bg{
								font-size: 60px;
								line-height: 0;
							}
						}
					}
				}
				.card1{
					background: #fff;
					padding: 30px 20px;
					.mint-cell{
						height: 40px;
						line-height: 40px;
						border: none;
						margin-bottom: 20px;
						.mint-cell-wrapper{
							height: 100%;
							line-height: 100%;
							padding: 0;
							background-image: none;
							.mint-cell-title{
								width: 130px;
								flex: none;
								.mint-cell-text{
									font-size: 26px;
									font-weight: normal;
								}
							}
							.mint-cell-value{
								.mint-field-core{
									width: 580px;
									height: 40px;
									border: 1px solid #ccc;
									border-radius: 5px;
									box-sizing: border-box;
									text-indent: 20px;
								}
							}
						}
					}
					.camera{
						width: 132px;
						height: 120px;
						margin-right: 20px;
					}
				}
				.materialsNeeded, .evidence{
					background-color: #fff;
					.camera{
						padding: 20px;
						img{
							width: 132px;
							height: 120px;
							margin-right: 20px;
						}
					}
				}
				.evidence{
					margin-bottom: 20px;
					.mint-cell{
						.mint-cell-value{
							color: #333;
						}
					}
					.remitAmount{
						.mint-cell-wrapper{
							color: #333;
							font-size: 26px;
							.mint-cell-title{
								.mint-cell-text{
									font-weight: 400;
								}
							}
							.mint-cell-value{
								.mint-field-core{
									width: 180px;
									height: 40px;
								}
								span{
									color: #333;
									font-size: 26px;
								}
							}
						}
					}
				}
			}
			.refund{
				background: #fff;
				.camera{
					padding: 20px;
					img{
						width: 132px;
						height: 120px;
						margin-right: 20px;
					}
				}
			}
			.mailingContract{
				.mint-cell-wrapper{
					background-image: none;
					.mint-cell-title{
						flex: none;
						i{
							font-size: 47px;
						}
					}
				}
				.cont{
					.mint-cell-wrapper{
						.mint-cell-title{
							width: 155px;
						}
						.mint-cell-value{
							.mint-field-core{
								width: 560px;
							}
						}
					}
				}
			}
			.upload_cont{
				height: 100%;
    		line-height: 100%;
				margin: 0;
				// max-width: 132px;
				min-height: 120px;
				// line-height: 120px;
				padding: 0;
				div:first-child{
					height: 100%;
					.addsmall_box{
						height: 120px !important;
					}
					.addbig_box{
						.iconfont.icon_bg{
							line-height: 100px;
						}
					}
				}
			}
			.vux-x-dialog.submitDialog{
				.weui-dialog{
					width: 580px;
					height: 345px;
					background: #FFFFFF;
					border-radius: 10px;
					top: 50% !important;
					left: 50% !important;
					transform: translate(-50%,-50%);
					padding: 0;
					text-align: center;
					.noS{
						display: inline-block;
						font-size: 64px;
						color: #8B8B8B;
						margin: 30px 0;
						line-height: 100px;
					}
					.returnIcon{
						font-size: 70px;
						margin: 20px 0;
					}
					.suc{
						display: inline-block;
						font-size: 100px;
						color: #74BA3B;
						margin: 40px 0;
						line-height: 100px;
					}
					.quit {
						margin-top: 85px;
						margin-bottom: 75px;
						font-family: PingFangSC-Regular;
						font-size: 36px;
						color: #333333;
					}
					.fail{
						margin: 20px 0;
					}
					.success{
						margin-bottom: 40px;
						font-family: PingFangSC-Regular;
						font-size: 30px;
						color: #333333;
						line-height: 1;
					}
					.returnDetailCss{
						margin-bottom: 20px;
						font-family: PingFangSC-Regular;
						font-size: 30px;
						color: #333333;
						line-height: 1;
					}
					.sorry{
						line-height: inherit;
						margin-bottom: 0;
					}
					.tit{
						margin-top: 30px;
						margin-bottom: 30px;
						font-family: PingFangSC-Regular;
						font-size: 30px;
						color: #666666;
					}
					.vux-x-input.weui-cell{
						margin: 0 auto;
						width: 522px;
						height: 76px;
						border: 1px solid #999999;
						border-radius: 10px;
						margin-bottom: 20px;
						padding: 0;
						font-family: PingFangSC-Regular;
						font-size: 30px;
						color: #666666;
						input{
							text-align: center;
						}
					}
					.inputReason{
						height: 38px;
						line-height: 38px;
						margin-bottom: 10px;
						text-align: left;
						margin-left: 28px;
						color: #C61D1A;
					}
					.weui-btn.weui-btn_primary{
						background: #2A7DC1;
						border-radius: 10px;
						width: 280px;
						height: 80px;
						font-family: PingFangSC-Medium;
						font-size: 36px;
						color: #F0F0F0;
					}
				}
			}
		}
	}
}
</style>
