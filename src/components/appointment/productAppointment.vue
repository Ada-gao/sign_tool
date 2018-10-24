<template>
    <div class="productAppointment" @touchmove="touchScreen">
    	<x-header class="balck-header" :left-options="{backText: '', preventGoBack:true}" @on-click-back="back()">{{topBar}}</x-header>
			<!-- <div class="spaceBack" v-if="showSpace" @click="spaceClick"></div> -->
			<div class="wrapper">
				<div class="topBar">
					<div class="title"
						v-if="!firstStep"
						:class="{
							'statusYellow':appointmentList.status==='1001'||appointmentList.status==='2001'||appointmentList.status==='2002'||(appointmentList.status==='2003' && appointmentList.refund_status==='2')||(appointmentList.status==='2003' && appointmentList.refund_status==='3')||appointmentList.status==='3001'||appointmentList.status==='3002',
							'statusRed':appointmentList.status==='1002' || appointmentList.status==='1004'||(appointmentList.status==='2003' && appointmentList.refund_status==='0')||(appointmentList.status==='2003' && appointmentList.refund_status==='1')||appointmentList.status==='3003',
							'statusGreen':appointmentList.status==='1003'||appointmentList.status==='2004'||(appointmentList.status==='2003' && appointmentList.refund_status==='4')||appointmentList.status==='3004',
							'statusGray':appointmentList.status==='1005'
						}">
						<i class="iconfont"
							:class="{
							'icon-shenhezhong':appointmentList.status==='1001'||appointmentList.status==='2001'||appointmentList.status==='2002'||(appointmentList.status==='2003' && appointmentList.refund_status==='2')||appointmentList.status==='3001'||appointmentList.status==='3002',
							'icon-guanbi':appointmentList.status==='1002' || appointmentList.status==='1004'||(appointmentList.status==='2003' && appointmentList.refund_status==='0')||(appointmentList.status==='2003' && appointmentList.refund_status==='1')||appointmentList.status==='3003',
							'icon-yuyuechenggong':appointmentList.status==='1003'||appointmentList.status==='2004'||(appointmentList.status==='2003' && appointmentList.refund_status==='4')||appointmentList.status==='3004',
							'icon-alert-warning':appointmentList.status==='1005'||(appointmentList.status==='2003' && appointmentList.refund_status==='3')
						}"></i>
						{{appointmentList.status|turnText(appointmentStatus)}} {{appointmentList.refund_status|turnText(refundStatus)}}
					</div>
					<div class="title statusYellow" v-else>预约提交中</div>
					<flow>
						<flow-state title="预约" is-done></flow-state>
						<flow-line line-span=224 tip="ing" :is-done="appointmentDone"></flow-line>
						<flow-state title="打款" :is-done="giveMoneyDone"></flow-state>
						<flow-line line-span=224 :is-done="giveMoneyIng"></flow-line>
						<flow-state title="合同管理" :is-done="contractManage"></flow-state>
					</flow>
				</div>
				<div class="closeReason" v-if="closeOrderReason">
					<!-- <mt-cell :title= failTitle>{{closeReason}}</mt-cell> -->
					<span class="reason-title">原因: </span>
					<span class="reason-content">{{closeReason}}</span>
				</div>
				<div class="emailReason"  v-if="appointmentList.status === '3003'">
					<!-- <mt-cell title="原因：">{{emailClose}}</mt-cell>
					<mt-cell title="寄出合同方式：">{{emailType}}</mt-cell> -->
					<span class="reason-title">寄出合同方式：</span>
					<span class="reason-content">{{emailType}}</span>
				</div>
				<div class="info">
					<mt-cell title="预约信息" class="tit">
						<i v-if="!topBar.includes('预约')" class="iconfont" :class="[appointInfoShow ? 'icon-shouqi' : 'icon-xiala']" @click="toggleShow1('appointInfo')"></i>
					</mt-cell>
					<div class="cont" v-show="appointInfoShow">
						<!-- <mt-field label="用户名: " placeholder="请输入用户名" v-model="name" readonly></mt-field> -->
						<!-- <mt-cell title="预约编号：" v-if="appointmentCode">{{codeA}}</mt-cell> -->
						<mt-cell title="客户姓名：" is-link @click.native="chooseName" v-if="showNameClick">{{name}}</mt-cell>
						<mt-cell title="客户姓名：" v-if="!showNameClick" :value="name"></mt-cell>
						<mt-cell title="手机号码：" :value="cMob"></mt-cell>
						<mt-field label="预约金额(万)：" class="inputMoney" placeholder="请输入预约金额" v-model="money" v-if="showMoneyClick"></mt-field>
						<!-- <mt-cell title="预约金额：" is-link @click.native="chooseMoney" v-if="showMoneyClick">{{money}}</mt-cell> -->
						<mt-cell title="预约金额：" v-if="!showMoneyClick">{{money}}万</mt-cell>
						<mt-cell title="预约时间：">{{nowTime}}</mt-cell>
						<mt-cell title="已打款审核通过时间：" v-if="alreadyPass">{{alreadyPassTime}}</mt-cell>
					</div>
					<div class="mb20"></div>
					<mt-cell title="产品信息" class="tit">
						<i v-if="!topBar.includes('预约')" class="iconfont" :class="[productInfoShow ? 'icon-shouqi' : 'icon-xiala']" @click="toggleShow1('productInfo')"></i>
					</mt-cell>
					<div class="cont" v-show="productInfoShow">
						<mt-cell title="产品名称：">{{product_name}}</mt-cell>
						<mt-cell title="产品信息：" value="查看" is-link @click.native="returnProductInfo" class="watch"></mt-cell>
					</div>
					<div class="mb20"></div>
					<div class="uploadCustomer" v-if="uploadShow">
						<div class="cont">
							<div class="fightMoney">
								<!--  :to="{name: 'BankList', params: {id: this.client_id, flag: this.$route.params.fromUrl || this.$route.params.flag}}"  -->
								<mt-cell v-if="chooseSelectedBank" title="银行卡信息" class="tit border-b-0" @click.native="chooseBankCard" is-link>
									<span class="cardSelected">选择已绑定银行卡</span>
								</mt-cell>
								<mt-cell v-else title="银行卡信息" class="tit border-b-0">
									<i class="iconfont" :class="[bankInfoShow ? 'icon-shouqi' : 'icon-xiala']" @click="toggleShow1('bankInfo')"></i>
								</mt-cell>
								<div class="warn" v-if="chooseSelectedBank">
									<i class="iconfont icon-alert-warning" style=""></i>
									为保证正常到账和汇款，请确保银行信息完整准确，如果是新输入银行卡信息，需要上传银行卡照片进行审核!
								</div>
								<div class="card" v-if="uploadCard">
										<mt-field label="银行卡号:" v-model="cardnum" placeholder="请输入银行卡号"></mt-field>
										<mt-field class="click-block" label="银行名称:" v-model="bankname" readonly placeholder="请选择银行">
                      <div class="define_box"
                           @click="chooseBankName">
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
										<mt-field label="支行名称:" v-model="bankname1" placeholder="请输入支行名称"></mt-field>
										<div class="camera">
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
								</div>
								<div class="card1" v-show="uploadCardS && bankInfoShow">
									<mt-cell title="银行卡号:" :value="cardNum"></mt-cell>
									<mt-cell title="银行名称:" :value="cardName"></mt-cell>
									<mt-cell title="支行名称:" :value="cardName1"></mt-cell>
									<img class="camera" :src="cardUrl" @click="showBigImg('bank')">
        						<!-- <thumbnails v-if="showImg" :imgTotal="cardUrl" :showImg="showImg" v-on:hideBigPop="hideBigImg"></thumbnails> -->
								</div>
							</div>
							<div class="evidence">
								<mt-cell title="打款凭证" class="tit border-b-0">
									<i class="iconfont" :class="[remitInfoShow ? 'icon-shouqi' : 'icon-xiala']" @click="toggleShow1('remitInfo')"></i>
								</mt-cell>
								<div v-show="remitInfoShow" class="remitAmount">打款金额(万): <input class="remitAmount" v-model="remitAmount" type="number" pattern="\d*" placeholder="输入打款金额"></div>
								<!-- <mt-field v-show="remitInfoShow" class="remitAmount" label="打款金额(万):" v-model="remitAmount" placeholder="输入打款金额" ></mt-field> -->
								<div class="camera" v-show="remitInfoShow">
									<camera
										 v-if="evidenceShow"
										:popupVisible="popupVisible"
										@imgHandler="imageHandler4"
										:imageArr='evidenceUrls'
										:isFromAppointment="fromAppointment"
										:isFromBank="fromBank"
										@showPopup="showPopup"
										@hidePopup="hidePopup">
									</camera>
									<img v-else v-for="(item, index) in evidenceUrl" :key="index" @click="showBigImg('remit', index)" :src="item">
								</div>
							</div>
							<!-- <div class="evidence" v-if="!evidenceShow">
								<mt-cell class="remitAmount tit border-b-0" title="打款凭证">
									<i class="iconfont" :class="[remitInfoShow ? 'icon-shouqi' : 'icon-xiala']" @click="toggleShow1"></i>
								</mt-cell>
								<mt-field class="remitAmount" label="打款金额(万):" v-model="remitAmount" placeholder="输入打款金额"></mt-field>
								<div class="camera">
									<img v-for="(item, index) in evidenceUrl" :key="index" @click="showBigImg('remit', index)" :src="item">
								</div>
							</div> -->
							<div class="materialsNeeded">
								<mt-cell title="客户所需提交材料" class="tit border-b-0">
									<i class="iconfont" :class="[transcInfoShow ? 'icon-shouqi' : 'icon-xiala']" @click="toggleShow1('transcInfo')"></i>
								</mt-cell>
								<div class="camera" v-show="transcInfoShow">
									<ul>
										<li v-for="(item, index) in customerMaterials" :key="index">
											<span class="title">{{index + 1}}.{{item.file_name}}</span>
										</li>
									</ul>
									<camera v-if="uploadCardMaterials" :popupVisible="popupVisible"
										@imgHandler="imageHandler2"
              							:imageArr="materialsUrls"
										:isFromAppointment="fromAppointment"
              							:isFromBank="fromBank"
										@showPopup="showPopup"
										@hidePopup="hidePopup">
									</camera>
									<img v-else v-for="(item, index) in tradeUrl" :key="index" @click="showBigImg('material', index)" :src="item">
								</div>
							</div>
							<!-- <div class="materialsNeeded" v-if="!uploadCardMaterials">
								<mt-cell title="交易所需材料" class="tit"></mt-cell>
								<div class="camera" v-for="(item, index) in tradeUrl" :key="index" @click="showBigImg('material', index)">
									<img :src="item">
								</div>
							</div> -->
						</div>
						<div class="mb20"></div>
					</div>
					<div class="refund" v-if="uploadRefund||repeatUploadRefund">
						<mt-cell title="退款申请书" class="tit">
							<i class="iconfont" :class="[refundInfoShow ? 'icon-shouqi' : 'icon-xiala']" @click="toggleShow1('refundInfo')"></i>
						</mt-cell>
						<div class="cont" v-show="refundInfoShow">
							<div class="camera">
								<camera
									v-if="uploadRefund"
									:popupVisible="popupVisible"
									@imgHandler="imageHandler3"
									:imageArr="refundUrls"
									:isFromAppointment="fromAppointment"
									:isFromBank="fromBank"
									@showPopup="showPopup"
									@hidePopup="hidePopup">
								</camera>
								<img
									v-if="repeatUploadRefund"
									v-for="(item, index) in refundUrl"
									:key="index"
									@click="showBigImg('refund', index)"
									:src="item">
							</div>
						</div>
						<div class="mb20"></div>
					</div>
					<!-- <div class="mb20"></div> -->
					<!-- <div class="refund" v-if="repeatUploadRefund">
						<div class="cont">
							<mt-cell title="提交退款申请书"></mt-cell>
							<div class="camera">
								<img v-for="(item, index) in refundUrl" :key="index" @click="showBigImg('refund', index)" :src="item">
							</div>
						</div>
					</div> -->
					<div class="mailingContract" v-if="sendEmail||sendEmailW">
						<mt-cell title="邮寄合同" class="tit">
							<i class="iconfont" :class="[contractInfoShow ? 'icon-shouqi' : 'icon-xiala']" @click="toggleShow1('contractInfo')"></i>
						</mt-cell>
						<div class="cont last_cont" v-if="sendEmail && contractInfoShow">
							<mt-cell title="合同编号：" :value="contractNumW"></mt-cell>
							<mt-cell title="快递公司：" :value="expresszCom"></mt-cell>
							<mt-cell title="快递编号：" :value="expressNums"></mt-cell>
              <div class="space"></div>
						</div>
						<div class="cont" v-if="sendEmailW">
							<mt-field label="合同编号：" v-model="cantractNum"></mt-field>
							<mt-field label="快递公司：" v-model="expressCompany"></mt-field>
							<mt-field label="快递编号：" v-model="expressNum"></mt-field>
						</div>
					</div>
					<!-- <div class="mailingContract" v-if="sendEmailW">
						<mt-cell title="邮寄合同" class="tit">
						</mt-cell>
						<div class="cont">
							<mt-field label="合同编号：" v-model="cantractNum"></mt-field>
							<mt-field label="快递公司：" v-model="expressCompany"></mt-field>
							<mt-field label="快递编号：" v-model="expressNum"></mt-field>
						</div>
					</div> -->
					<div class="submitBtn" v-if="firstStep">
					<!-- <div class="submitBtn" v-if="submitAppointmentBtnShow"> -->
          	<mt-button type="primary" @click.native="submitAppointmentBtn">提交预约</mt-button>
					</div>
					<div class="submitBtn" v-if="(appointmentList.status === '1002') && !firstStep">
					<!-- <div class="submitBtn" v-if="repeatAppointmentBtnShow"> -->
          	<mt-button type="primary" @click.native="repeatAppointmentBtn">重新预约</mt-button>
					</div>
					<div class="submitBtn" v-if="(appointmentList.refund_status === '1'  && !firstStep) || (appointmentList.refund_status === '3' && !firstStep)">
          	<mt-button type="primary" @click.native="refund">{{appointmentList.refund_status === '1'? '发起退款': '重新发起退款'}}</mt-button>
					</div>
					<!-- <div class="submitBtn" v-if="initiateRefund">
          	<mt-button type="primary" @click.native="refund">{{refundLan}}</mt-button>
					</div> -->
					<div class="successBtn" v-if="appointmentList.status === '1003' && !firstStep">
					<!-- <div class="successBtn" v-if="sucBtn"> -->
          	<mt-button plain type="default" @click.native="cancleAppointment">取消预约</mt-button>
          	<mt-button type="primary" @click.native="submitPayMaterials">提交打款材料</mt-button>
					</div>
					<div class="submitBtn" v-if="appointmentList.status === '2002' && !firstStep">
					<!-- <div class="submitBtn" v-if="repeatPayMaterials"> -->
          	<mt-button type="primary" @click.native="repeatSubmitPayMaterials">重新提交打款材料</mt-button>
					</div>
					<div class="submitBtn" v-if="appointmentList.status === '3003' && !firstStep">
					<!-- <div class="submitBtn" v-if="uploadContract"> -->
          	<mt-button type="primary" @click.native="emailContract">重新提交</mt-button>
					</div>
					<div class="mailBtn" v-if="appointmentList.status === '2004' && !firstStep">
					<!-- <div class="mailBtn" v-if="giveMoneySuc"> -->
          	<mt-button type="primary" @click.native="emailContract">去邮寄合同</mt-button>
          	<!-- <mt-button type="primary" @click.native="closeOrderform">订单关闭</mt-button> -->
					</div>
					<x-dialog v-model="submitDialog" class="dialog-demo submitDialog">
						<img :src="submitAppointImg" alt="">
						<div class="returnDetailCss">
							{{submitAppointDetail}}<span v-if="!submitFailStatus">...{{count}}s</span></div>
						<!-- <div v-if="!submitFailStatus" class="returnDetailCss">{{submitAppointDetail}}...{{count}}s</div>
						<div v-else class="returnDetailCss">{{submitAppointDetail}}</div> -->
						<div v-if="!submitFailStatus" class="bottomBack" @click="returnDetail">返回产品详情</div>
						<div v-else class="bottomBack" @click="submitDialog=false">确定</div>
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
					<x-dialog v-model="closeOrderR" class="dialog-demo submitDialog" hide-on-blur>
						<div class="quit">确定关闭订单吗</div>
						<x-button @click.native="sendMessage" type="primary">确 定</x-button>
					</x-dialog>
					<!-- <x-dialog v-model="sureCancleA" class="dialog-demo submitDialog" hide-on-blur>
						<div class="quit">确定取消预约吗</div>
						<x-button @click.native="sureCancle" type="primary">确 定</x-button>
					</x-dialog> -->
					<!-- <x-dialog v-model="submitSucDialog" class="dialog-demo submitDialog" hide-on-blur>
						<i class="iconfont suc">&#xe60a;</i>
						<div class="success">您的提交已成功</div>
						<x-button @click.native="sucMakeSure" type="primary">返回产品详情</x-button>
					</x-dialog> -->
					<x-dialog v-model="failSubmit" class="dialog-demo submitDialog" hide-on-blur>
						<!-- <i class="iconfont noS fail">&#xe626;</i> -->
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
import { getCustomerMaterials } from '@/service/api/products'
import { submitAppointment, cancelAppointment, submitMaterials, statusDetail, sendEmail, orderClose, requestRefund } from '@/service/api/appointment'
import { getProducts } from '@/service/api/products'
import { checkBankDetail } from '@/service/api/customers'
import { formatDate } from '@/common/js/date'
import thumbnails from '@/base/camera/thumbnails'
import { MessageBox, Toast } from 'mint-ui'

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
			appointmentList: {
				status: '-1'
			},
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
			refundUrl: '',
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
			timer1: null,
			client_id: '',
			customerMaterials: [],
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
			],
			selectClientObj: null,
			submitFailStatus: false,
			submitAppointImg: 'static/img/certify_right.png',
			appointInfoShow: true,
			productInfoShow: true,
			bankInfoShow: true,
			remitInfoShow: true,
			transcInfoShow: true,
			refundInfoShow: true,
			contractInfoShow: true,
			appointmentStatus: JSON.parse(localStorage.getItem('appointment_status')),
			refundStatus: JSON.parse(localStorage.getItem('refund_status')),
			routeParams: null,
			firstStep: false
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
			toggleShow1 (type) {
				if (type === 'remitInfo') {
					this.remitInfoShow = !this.remitInfoShow
				} else if (type === 'productInfo') {
					this.productInfoShow = !this.productInfoShow
				} else if (type === 'appointInfo') {
					this.appointInfoShow = !this.appointInfoShow
				} else if (type === 'bankInfo') {
					this.bankInfoShow = !this.bankInfoShow
				} else if (type === 'remitInfo') {
					this.remitInfoShow = !this.remitInfoShow
				} else if (type === 'transcInfo') {
					this.transcInfoShow = !this.transcInfoShow
				} else if (type === 'refundInfo') {
					this.refundInfoShow = !this.refundInfoShow
				} else if (type === 'contractInfo') {
					this.contractInfoShow = !this.contractInfoShow
				}
			},
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
				// if (this.$route.params.fromUrl === 'productDetail') {
				// 	document.getElementsByTagName('input')[0].blur()
				// }
				// if (this.appointmentList.status === '1003' || this.appointmentList.status === '2002' || this.appointmentList.status === '2004' || this.appointmentList.status === '3003') {
				// 	document.getElementsByTagName('input')[0].blur()
				// 	document.getElementsByTagName('input')[1].blur()
				// 	document.getElementsByTagName('input')[2].blur()
				// 	document.getElementsByTagName('input')[3].blur()
				// 	document.getElementsByTagName('input')[4].blur()
				// }
				Array.from(document.querySelectorAll("input[type='text']")).map(item => {
					item.blur()
				})
			},
			chooseName () {
				const riskLevel = localStorage.getItem('riskLevel')
				if (riskLevel) {
					this.$router.push({name: 'CustomerNameList', params: {flag: this.$route.params.fromUrl || this.$route.params.flag, riskLevel: riskLevel}})
				} else {
					// 从客户列表页来后，路由参数发生了改变，被替换了，故请求接口获取 riskLevel
					// 保存 riskLevel 到 localStorage 里，可以不用再调取下面的 getProducts 接口
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
				console.log('showpopup..............')
				Array.from(document.querySelectorAll("input[type='text']")).map(item => {
					item.blur()
				})
				this.timer1 = null
                this.timer1 = setTimeout(() => {
					this.popupVisible = data
                }, 3000)
			},
      hidePopup (data) {
        this.popupVisible = data
			},
			chooseBankName () {
				Array.from(document.querySelectorAll("input[type='text']")).map(item => {
					item.blur()
				})
				this.timer1 = null
				if (this.alertMsg === true) {
					// return
				} else {
					this.timer1 = setTimeout(() => {
						this.showBankCardName = true
					}, 600)
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
					// this.alertMsg = true
					this.msgDetail = '还有信息没填写哦～'
					Toast({
						message: this.msgDetail,
						duration: 3000
					})
					return
				}
				if (this.money < this.minimalAmount) {
					this.msgDetail = '预约金额小于起投金额，不可预约'
					Toast({
						message: this.msgDetail,
						duration: 3000
					})
					// this.alertMsg = true
					return
				}
				if (this.money > this.collectionAmount) {
					this.msgDetail = '预约金额大于募集金额，不可预约'
					Toast({
						message: this.msgDetail,
						duration: 3000
					})
					// this.alertMsg = true
					return
				}
				// let selectObj = this.appointmentList.find(item => item.mobile === this.cMob)
				let obj = {
					'client_id': this.selectClientObj.client_id,
					'client_mobile': this.cMob,
					'client_no': this.selectClientObj.client_no,
					'client_name': this.name,
					'client_type': this.selectClientObj.client_type,
					'risk_level': this.selectClientObj.risk_level,
					'product_id': this.product_id,
					'product_name': this.product_name,
					'appointment_amount': parseInt(this.money),
					'appointment_date': this.nowTime
				}
				submitAppointment(obj).then(res => {
					this.submitDialog = true
					if (res.status === 200) {
						this.submitFailStatus = false
						this.autoReturnDetail()
						this.submitAppointImg = 'static/img/certify_right.png'
						if (res.data.message === '预约成功') {
							this.submitAppointDetail = '您的预约已提交成功'
						} else {
							this.submitAppointDetail = '已提交待审核中…'
						}
					} else {
						this.submitFailStatus = true
						this.submitAppointDetail = '提交失败请重新提交！'
						this.submitAppointImg = 'static/img/certify_wrong.png'
					}
				})
			},
			repeatAppointmentBtn () {
				if (this.name === '' || this.money === '') {
					// this.alertMsg = true
					this.msgDetail = '还有信息没填写哦～'
					Toast({
						message: this.msgDetail,
						duration: 3000
					})
					return
				}
				if (this.money < this.minimalAmount) {
					this.msgDetail = '预约金额小于起投金额，不可预约'
					Toast({
						message: this.msgDetail,
						duration: 3000
					})
					// this.alertMsg = true
					return
				}
				if (this.money > this.collectionAmount) {
					this.msgDetail = '预约金额大于募集金额，不可预约'
					Toast({
						message: this.msgDetail,
						duration: 3000
					})
					// this.alertMsg = true
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
						this.submitAppointImg = 'static/img/certify_right.png'
						if (res.message === '预约成功') {
							this.submitAppointDetail = '您的预约已提交成功'
						} else {
							this.submitAppointDetail = '已提交待审核中…'
						}
					} else {
						this.submitDialog = true
						this.submitAppointDetail = '提交失败请重新提交！'
						this.submitAppointImg = 'static/img/certify_wrong.png'
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
				// console.log(this.materialSrc)
				if (this.evidenceUrl === undefined || this.materialSrc === undefined || this.cardUrl === undefined || this.bankname === '' || this.bankname1 === '' || this.cardnum === '') {
					// this.alertMsg = true
					this.msgDetail = '还有信息没填写哦～'
					Toast({
						message: this.msgDetail,
						duration: 3000
					})
					return
				}
				if (!/(^\d{17}$)|(^\d{16}$)|(^\d{19}$)/.test(this.cardnum)) {
					// this.alertMsg = true
					this.msgDetail = '银行卡输入有误'
					Toast({
						message: this.msgDetail,
						duration: 3000
					})
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
					'client_id': this.appointmentList.client_id
				}
				MessageBox({
					title: '提交确认',
					message: '提交后不可修改，确认提交吗?',
					showCancelButton: true
					}).then(action => {
						if (action === 'cancel') {
							MessageBox.close(false)
							return
						}
						submitMaterials(this.appointmentId, obj).then(res => {
							if (res.status === 200) {
								this.submitDialog = true
								this.autoReturnDetail()
								this.submitAppointDetail = '已提交待审核中…'
								this.submitAppointImg = 'static/img/certify_right.png'
							}
						})
					})
				// submitMaterials(this.appointmentId, obj).then(res => {
				// 	if (res.status === 200) {
				// 		this.submitDialog = true
				// 		this.autoReturnDetail()
				// 		this.submitAppointDetail = '已提交待审核中…'
				// 	}
				// })
			},
			repeatSubmitPayMaterials () {
				if (!/(^\d{15}$)|(^\d{16}$)|(^\d{19}$)/.test(this.cardnum)) {
					// this.alertMsg = true
					this.msgDetail = '银行卡输入有误'
					Toast({
						message: this.msgDetail,
						duration: 3000
					})
					return
				}
				if (this.evidenceUrl === undefined || this.materialSrc === undefined || this.cardUrl === undefined || this.bankname === '' || this.bankname1 === '' || this.cardnum === '') {
					// this.alertMsg = true
					this.msgDetail = '还有信息没填写哦～'
					Toast({
						message: this.msgDetail,
						duration: 3000
					})
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
					'client_id': this.appointmentList.client_id,
					'flag': '1'
				}
				MessageBox({
					title: '提交确认',
					message: '提交后不可修改，确认提交吗?',
					showCancelButton: true
					}).then(action => {
						if (action === 'cancel') {
							MessageBox.close(false)
							return
						}
						submitMaterials(this.appointmentId, obj).then(res => {
							if (res.status === 200) {
								this.submitDialog = true
								this.autoReturnDetail()
								this.submitAppointDetail = '已提交待审核中…'
								this.submitAppointImg = 'static/img/certify_right.png'
							}
						})
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
				// console.log(data)
				this.evidenceUrl = data
			},
			refund () {
				if (this.refundSrc.length === 0) {
					// this.alertMsg = true
					this.msgDetail = '还有信息没填写哦～'
					Toast({
						message: this.msgDetail,
						duration: 3000
					})
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
				// this.sureCancleA = true
				MessageBox({
					title: '取消预约',
					message: '确定取消预约吗?',
					showCancelButton: true
					}).then(action => {
						if (action === 'cancel') {
							MessageBox.close(false)
							return
						}
						this.sureCancle()
					})
			},
			sureCancle () {
				cancelAppointment(this.appointmentId).then(res => {
					if (res.status === 200) {
						// window.reload()
						this.appointmentList.status = '1004'
						this.topTitle = '预约取消'
						this.sucBtn = false
						this.uploadShow = false
						this.sureCancleA = false
					}
				})
			},
			emailContract () {
				if (this.cantractNum === '' || this.expressCompany === '' || this.expressNum === '') {
					// this.alertMsg = true
					this.msgDetail = '还有信息没填写哦～'
					Toast({
						message: this.msgDetail,
						duration: 3000
					})
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
					this.topTitle = '预约' // 已用变量代替
					this.name = ''
					this.cMob = ''
					this.money = ''
					this.appointInfoShow = true
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
					localStorage.setItem('riskLevel', this.$route.params.riskLevel)
					localStorage.setItem('minimalAmount', this.$route.params.minimalAmount)
					localStorage.setItem('collectionAmount', this.$route.params.collectionAmount)
					this.firstStep = true
					// appointmentList(this.$route.params.riskLevel).then(res => {
					// 	this.appointmentList = res.data
					// })
					console.log(this.appointmentList)
			},
			getList () {
				this.appointmentId = this.$route.params.appointmentId
				this.orderCloseSuc = false
				this.showNameClick = false
				this.firstStep = false
				
				statusDetail(this.appointmentId).then(res => {
					this.appointmentList = res.data
					this.client_id = this.appointmentList.client_id
					this.product_id = this.appointmentList.product_id
					this.showMoneyClick = false
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
					this.closeReason = this.appointmentList.order_closure_remark || this.appointmentList.contract_no_pass_remark
					// this.emailClose = this.appointmentList.contract_no_pass_remark
					this.remitAmount = this.appointmentList.remit_amount
					getCustomerMaterials(this.product_id).then(res => {
						if (this.appointmentList.client_type === '0') {
							this.customerMaterials = res.data.data.filter(item => item.client_type == '0')
						} else if (this.appointmentList.client_type === '1'){
							this.customerMaterials = res.data.data.filter(item => item.client_type == '1')
						}
					})
					if (this.appointmentList.audit_contract_express === '0') {
						this.emailType = '自取'
					} else if (this.appointmentList.audit_contract_express === '1') {
						this.emailType = '快递寄出'
					}
					if (this.appointmentList.status.includes('100')) { // 控制信息展开/收起
						this.appointInfoShow = true
						this.productInfoShow = true
					} else {
						this.appointInfoShow = false
						this.productInfoShow = false
					}
					if (this.appointmentList.status === '1004') {
						this.remitInfoShow = false
					}
					if (this.appointmentList.status.includes('2003') || this.appointmentList.status.includes('2004') || this.appointmentList.status.includes('300')) { // 订单关闭
						this.transcInfoShow = false
						this.bankInfoShow = false
						this.remitInfoShow = false
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
						console.log('localstorage')
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
						this.showNameClick = false // 预约失败时，应根据原因修改预约数据，而非客户
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
						this.appointInfoShow = false
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
							// this.topTitle = '订单关闭 无需退款'
						} else if (this.appointmentList.refund_status === '1') {
							// this.topTitle = '需要退款'
							this.uploadRefund = true
							this.initiateRefund = true
						} else if (this.appointmentList.refund_status === '2') {
							this.topTitle = '退款申请中'
							this.repeatUploadRefund = true
							this.refundInfoShow = false // 数据收起
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
							this.refundInfoShow = false // 数据收起
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
						// this.transcInfoShow = false // 数据收起
						// this.bankInfoShow = false // 数据收起
						// this.remitInfoShow = false // 数据收起
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
						this.contractInfoShow = false
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
		// console.log(from)
		next(vm => {
			vm.prePath = from.path
			// vm.getList()
		})
	},
	activated () {
		console.log('the params in this.$route')
		console.log(this.$route.params)
		if (this.$route.params.fromUrl === 'productDetail') {
			this.writeAppointment()
			// this.getList()
		} else if (this.$route.params.fromUrl === 'reservationList') {
			this.refundUrls = []
			this.materialsUrls = []
			this.evidenceUrls = []
			this.cardUrl = ''
			this.evidenceUrl = []
			this.materialSrc = []
			this.refundSrc = []
			console.log('重新预约')
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
			this.selectClientObj = this.$route.params.nameItem
			// console.log(this.$route.params.nameItem)
		}
	},
	// deactivated () {
	// 	console.log('deactived')
	// },
	created () {
		window.scroll(0, 0)
		// console.log('this.appointmentList.client_id')
		// console.log(this.appointmentList.client_id)
		console.log('this.$route.params')
		console.log(this.$route.params)
		window.onpopstate = () => {
			this.back()
		}
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
.statusGray {
	color: @font-color-9E!important;
}
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
		padding-bottom: 0px;
		.topBar{
			height: 221px;
			background: #fff;
			margin-top: 20px;
			text-align: center;
			.title{
				font-size: 36px;
				color: @font-color-4A;
				padding: 30px 0;
				font-weight: 100;
			}
			.iconfont {
				font-size: 36px;
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
							background: #E0E0E0;
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
							border: 3px solid #E0E0E0;
							border-radius: 50%;
							z-index: -1;
						}
						.weui-wepay-flow__title-bottom{
							margin-top: 22px;
							padding: 0 18px;
							height: 33px;
							line-height: 33px;
							// border: 2px solid #2672BA;
							// border-radius: 8px;
							font-size: 24px;
							color: @text-font-noEdit;
						}
					}
					.weui-wepay-flow__li.weui-wepay-flow__li_done{
						.weui-wepay-flow__state{
							background: @font-color-orange1;
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
							border: 3px solid @font-color-orange1;
							border-radius: 50%;
							z-index: -1;
						}
						.weui-wepay-flow__title-bottom {
							color: @font-color-orange1;
						}
					}
					.weui-wepay-flow__line{
						/*width: 224px;*/
            width: 44%;
						height: 6px;
						background: #E0E0E0;
					}
					.weui-wepay-flow__line.weui-wepay-flow__line_done{
						background: @font-color-orange1;
						.weui-wepay-flow__process{
							background: transparent;
						}
					}
					.weui-wepay-flow__line.weui-wepay-flow__line_ing{
						.weui-wepay-flow__process{
							background: @font-color-orange1;
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
			// border-bottom: 1px solid #CCC;
			.mint-cell{
				// border-top: 1px solid #CCC;
				// height: 80px;
				height: 100%;
				.mint-cell-wrapper{
					padding: 0 20px;
					height: 100%;
					line-height: 100%;
					background-image: none;
					.mint-cell-text,.mint-cell-value{
						font-family: PingFangSC-Medium;
						font-size: 28px;
						// color: #2672BA;
						color: #4A4A4A;
					}
					.mint-cell-text{
						font-size: 30px;
						white-space: nowrap;
					}
					.mint-cell-value{
						font-family: PingFangSC-Regular;
						line-height: 1.2;
					}
				}
			}
		}
		.closeReason {
			background: #fff;
			display: flex;
			padding: 0 40px 20px;
			line-height: 40px;
			.reason-title {
				color: #F05D59;
				font-size: 30px;
				width: 90px;
				white-space: nowrap;
			}
			.reason-content {
				font-size: 26px;
				color: #4A4A4A;
				margin-left: 20px;
			}
		}
		.info{
			margin-top: 20px;
			.mint-cell{
				.mint-cell-wrapper{
					.mint-cell-value{
						.iconfont{
							color: #E6E6E6;
						}
					}
				}
			}
			.iconfont{
				color: #E6E6E6;
			}
			.mint-cell.watch{
				.mint-cell-wrapper{
					.mint-cell-value{
						span{
							color: #3377FF;
						}
					}
				}
			}
			.mint-cell.border-b-0 {
				border-bottom: none!important;
			}
			.mint-cell.tit{
				// margin-bottom: 20px;
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
					.mint-cell-text {
						font-family: PingFangSC-Medium;
						font-size: 32px;
						color: #4A4A4A;
						position: relative;
						padding-left: 15px;
						line-height: 80px;
						&::before {
							position: absolute;
							width: 6px;
							height: 30px;
							background-color: @font-color-orange1;
							content: '';
							top: 50%;
							transform: translate(0, -50%);
							left: 0;
						}
					}
				}
			}
			.cont{
				// margin-bottom: 20px;
				.cercode_box {
					width: 100%;
					height: 350px;
					// .picker-items {
						/*height: 244px;*/
						// .picker-item,.picker-item.picker-selected{
						// 	height: 70px !important;
    				// 	line-height: 70px !important;
						// }
					// }
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
							color: @text-font-color;
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
					border-bottom: 1px solid #e9e9e9;/*px*/
					.mint-cell-wrapper{
						line-height: 80px;
						height: 80px;
						font-size: 30px;
						padding: 0 20px;
						background-image: none;
						.mint-cell-title{
							.mint-cell-text{
								color: #4A4A4A;
								font-size: 30px;
							}
						}
						.mint-cell-value{
							color: #4A4A4A;
						}
						.mint-cell-allow-right::after{
							width: 18px;
							height: 18px;
							color: @text-font-noEdit;
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
						.mint-cell-title .mint-cell-text{
							// width: 170px;
							white-space: nowrap;
						}
						.mint-cell-value{
							.mint-field-core{
								width: 570px;
								height: 40px;
								line-height: 40px;
								// border: 1px solid #ccc;
								border-radius: 5px;
								box-sizing: border-box;
								text-indent: 20px;
								text-align: right;
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
							width: 200px;
						}
						.mint-cell-value{
							padding-right: 20px;
							width: 530px;
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
			.mb20 {
				height: 20px;
			}
      .cont.last_cont {
        margin-bottom: 0;
      }
			.submitBtn, .mailBtn{
				text-align: center;
				.mint-button.mint-button--primary.mint-button--normal{
					width: 670px;
					height: 88px;
					margin-top: 10px;
					margin-bottom: 30px;
					padding: 0;
					background: linear-gradient(to right, #DFC189, #BD9D62);
					border-radius: 4px;
					label{
						font-family: PingFangSC-Regular;
						font-size: 36px;
						color: #FFFFFF;
					}
				}
			}
			.successBtn{
				text-align: center;
				padding: 10px 0 30px 0;
				.mint-button.mint-button--default {
					border: 1px solid #C4902D;
					color: #C4902D;
					background: #fff;
					display: inline-block;
					width: 40%;
					height: 88px;
					vertical-align: middle;
				}
				.mint-button.mint-button--primary.mint-button--normal{
					/*width: 300px;*/
          width: 40%;
					height: 88px;
					background: linear-gradient(to right, #DFC189, #BD9D62);
					vertical-align: text-top;
					// border-radius: 8px;
					vertical-align: middle;
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
			.mailBtn{
				.mint-button.mint-button--primary.mint-button--normal{
          			width: 84%;
				}
			}
			.uploadCustomer{
				background-color: #f5f5f5;
				.fightMoney{
					margin-bottom: 20px;
				}
				.cardSelected{
					// background: #2672BA;
					// border: 1px solid #2672BA;
					// border-radius: 8px;
					font-size: 30px;
					color: #3377FF;
					height: 50px;
					line-height: 50px;
					// padding: 0 15px;
				}
				.warn{
					padding: 0 70px;
					background: #fff;
					// border-bottom: 1px solid #ccc;
					color: #A0A0A0;
					font-size: 24px;
					position: relative;
					.iconfont {
						position: absolute;
						left: 40px;
						color: #FFBE00;
						font-size: 22px;
					}
				}
				.card{
					background: #fff;
					padding: 30px 20px;
					.mint-cell.mint-field.bankname{
						.mint-field-other{
							top: 0;
							/*right: 0;*/
							position: absolute;
							width: 100%;
							height: 100%;
						}
					}
					.mint-field{
						// height: 40px;
						// line-height: 40px;
						// border: none;
						// margin-bottom: 20px;
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
									// border: 1px solid #ccc;
									border-radius: 5px;
									box-sizing: border-box;
									text-indent: 20px;
								}
								.mint-field-other{
									top: 0;
									/*right: 0;*/
									position: absolute;
									// width: 100%;
									// height: 100%;
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
					.mint-field.click-block{
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
						// .mint-field-core{
						// 	background: #f5f5f5;
						// }
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
				.materialsNeeded,
				.evidence,
				.card{
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
				.materialsNeeded{
					ul{
						margin-bottom: 30px;
						li{
							font-size: 26px;/*px*/
							color: #333333;
						}
					}
				}
				.card{
					background-color: #fff;
					.camera{
						padding: 20px 20px 20px 0;
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
						// flex: none;
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
					width: 560px;
					height: 549px;
					background: #FFFFFF;
					border-radius: 10px;
					top: 50% !important;
					left: 50% !important;
					transform: translate(-50%,-50%);
					padding: 0;
					text-align: center;
					img {
						width: 283px;
						margin-top: 40px;
					}
					// .noS{
					// 	display: inline-block;
					// 	font-size: 64px;
					// 	color: #8B8B8B;
					// 	margin: 30px 0;
					// 	line-height: 100px;
					// }
					// .returnIcon{
					// 	font-size: 70px;
					// 	margin: 20px 0;
					// }
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
						margin: 34px 0;
						font-family: PingFangSC-Regular;
						font-size: 30px;
						color: #333333;
						line-height: 1;
					}
					.bottomBack {
						border-top: 1px solid #ccc;
						color: #BD9D62;
						height: 100px;
						line-height: 100px;
						font-size: 36px;
						position: absolute;
						width: 100%;
						bottom: 0;
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
