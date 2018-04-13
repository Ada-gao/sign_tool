<template>
  <div>
    <x-header :left-options="{backText: ''}">客户主页</x-header>
    <div class="wrapper">
    	<div class="info">
        <group>
          <cell-box>
          	<i class="iconfont icon-friendadd"></i>客户信息
						<span class="fr" @click="toLink"><i class="iconfont icon-brush"></i>修改</span>
						<!-- <router-link style="position: absolute; right: 27px; top: 10px" to="/newCustomer/1"><i class="iconfont icon-brush"></i>修改</router-link> -->
          </cell-box>
        </group>
        <group>
          <cell-box>
          	<label for="name">姓名：</label>
            <span class="fr">{{cName}}</span>
          </cell-box>
        </group>
        <group>
          <cell-box>
          	<label for="phone">电话：</label>
            <span class="fr">{{cPhone}}</span>
          </cell-box>
        </group>
        <group>
          <cell-box>
          	<label for="email">邮箱：</label>
            <span class="fr">{{cEmail}}</span>
          </cell-box>
        </group>
        <!-- <div class="content">
          <div class="content-text">
            <label for="name">姓名：</label>
            <span class="fr">{{cName}}</span>
          </div>
          <div class="content-text">
          	<label for="phone">电话：</label>
            <span class="fr">{{cPhone}}</span>
          </div>
          <div class="content-text">
            <label for="email">邮箱：</label>
            <span class="fr">{{cEmail}}</span>
          </div>
        </div> -->
    	</div>
    	<div class="space"></div>
    	<div class="product">
        <group>
          <cell-box>
          	<i class="iconfont icon-purchaseInfo"></i>
          	交易信息
          </cell-box>
        </group>
				<div v-for="(listItem, index) in list" :key="index" class="cell-form">
					<div class="cell-form-top">
						<label for="">{{listItem.name}}</label>
						<span class="fr grade">{{listItem.mark}}</span>
					</div>
					<div class="cell-form-bottom">
						金额：<span class="text-red">{{listItem.money}}万</span>
						<span class="fr">{{listItem.time}}</span>
					</div>
				</div>
    	</div>
    	<div class="space"></div>
			<div class="risk-evaluation">
				<group>
          <cell-box link="/riskRating">
          	<i class="iconfont icon-fengxianguibi-"></i>风险测评
          	<span class="padding-r-60">重新测评</span>
          </cell-box>
        </group>
			</div>
			<div class="space"></div>
			<div class="asset-allocation">
				<group>
          <cell-box link="/assetAllocation">
          	<i class="iconfont icon-intelligent"></i>资产配置
          	<span class="padding-r-60">智能投顾</span>
          </cell-box>
        </group>
			</div>
			<div class="space"></div>
    	<div class="report">
        <group>
          <cell-box>
          	<i class="iconfont icon-licai"></i>投资组合报告
          </cell-box>
          <cell-box v-for="item in reportList" :link="item.toLink" :key="item.title">{{item.title}}</cell-box>
        </group>
    	</div>
    	<div class="space"></div>
    	<div class="remark">
        <group>
          <cell-box>
          	<i class="iconfont icon-cart"></i>备注
          </cell-box>
        </group>
        <ul>
        	<li v-for="(item, index) in remarkList" :key="index">
        		<div class="iText">{{item.text}}</div>
        		<span class="iTime">{{item.time}}</span>
        		<!-- <i class="icon-trash-2" @click="deleteRemark(index)">&nbsp;删除</i> -->
        		<b class="fr"><i class="iconfont icon-view"></i>&nbsp;查看</b>
        	</li>
        </ul>
				<div class="space"></div>
			</div>
      <div class="bottom-remark">
        <div class="add clearfix">
          <input type="text" @click="addNew" class="addInput" placeholder="新增备注"/>
        </div>
      </div>
      <div v-transfer-dom>
        <x-dialog v-model="showHideOnBlur" class="dialog-demo" hide-on-blur>
          <div class="img-box">
            <textarea v-focus id="inputing" name="" rows="" cols="" v-model="remarkInfo"></textarea>
          </div>
          <div style="text-align: right;">
            <button @click="submitAddNew" class="btn btn-primary vux-emit">新增备注</button>
          </div>
        </x-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { XHeader, Group, Cell, CellBox, Flexbox, FlexboxItem, XDialog, TransferDomDirective as TransferDom, CellFormPreview } from 'vux'

export default {
  name: 'CustomerManagement',
  directives: {
  	TransferDom
  },
  components: {
    XHeader,
    Group,
    Cell,
    CellBox,
    Flexbox,
    FlexboxItem,
    XDialog,
		CellFormPreview
  },
  data () {
  	return {
  		reportList: [
				{
					title: '组合报告1',
					toLink: '/combinedReport'
				}, {
					title: '组合报告2',
					toLink: '/combinedReport'
				}
  		],
  		remarkList: [{
  			text: '客户资金2月18号到期，愿意购买正收益理财产品',
  			time: '2018-1-8'
			}, {
				text: '客户正在搜寻二级市场产品',
				time: '2018-1-8'
			}],
			showHideOnBlur: false,
			remarkInfo: null,
			cName: '金晓晓',
			cPhone: '12345678901',
			cEmail: '12345678901@163.com',
			list: [{
				name: '正收益债券基金',
				mark: '二级市场',
				money: '1000',
				time: '2017/8/12 12:12'
			}, {
				name: '正收益基金',
				mark: '二级市场',
				money: '2000',
				time: '2017/8/12 12:12'
			}]
  	}
  },
  mounted () {
  	if (this.showHideOnBlur) {
  		document.getElementById('inputing').focus()
  	}
  },
  methods: {
  	deleteRemark (idx) {
  		this.remarkList.splice(idx, 1)
  	},
  	addNew () {
  		this.showHideOnBlur = true
  		document.getElementById('inputing').focus()
  	},
  	submitAddNew () {
  		this.showHideOnBlur = false
  		let dateFormat = function (date, fmt) {
  			let o = {
  				'M+': date.getMonth() + 1,
  				'd+': date.getDate(),
  				'h+': date.getHours(),
  				'm+': date.getMinutes(),
  				's+': date.getSeconds(),
  				'S+': date.getMilliseconds()
  			}
  			if (/(y+)/.test(fmt)) {
  				fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  			}
  			for (let k in o) {
  				if (new RegExp('(' + k + ')').test(fmt)) {
  					fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('' + o[k]).substr(('' + o[k].length))))
  				}
  			}
  			return fmt
  		}
  		if (!this.remarkInfo || this.remarkInfo.trim().length === 0) return
  		this.remarkList.push({
  			text: this.remarkInfo.trim(),
  			time: dateFormat(new Date(), 'yyyy-MM-dd')
  		})
  		this.remarkInfo = ''
		},
		toLink () {
			this.$router.push({name: 'NewCustomer', params: {num: 1}})
		}
  }
}
</script>

<style scoped lang="less">
/*@import '~vux/src/styles/reset';*/
.wrapper {
	// padding-top: 126px;
	.info {
		.content {
			// padding-left: 45px;
			// padding-bottom: 30px;
			padding: 0 34px 30px 45px;
			font-size: 30px; /*px*/
			.content-text {
				margin-top: 30px;
			}
		}
	}
	.report {
		.vux-tap-active {
			padding-left: 45px;
			padding-top: 20px;
			padding-bottom: 20px;
		}
	}
	.product {
		.cell-form {
			padding: 40px 34px 34px 40px;
			font-size: 22px; /*px*/
			border-bottom: 1px solid #eee;
			.cell-form-top {
				margin-bottom: 16px;
				label{
					font-size: 28px; /*px*/
				}
				.grade {
					background-color: #F76E61;
					color: #fff;
					padding: 6px 15px;
				}
			}
			.cell-form-bottom {
				font-size: 24px; /*px*/
				.text-red {
					color: #FF6A6A;
				}
			}
		}
	}
	.risk-evaluation,
	.asset-allocation {
		.weui-cells .weui-cell {
			height: 106px;
			box-sizing: border-box;
		}
	}
	.risk-evaluation i {
		font-size: 40px; /*px*/
	}
	.asset-allocation i {
		font-size: 48px; /*px*/
		margin-right: 12px;
		margin-left: -8px;
	}
	.remark {
		padding-bottom: 120px;
		.weui-cells .weui-cell i {
			font-size: 32px; /*px*/
		}
		ul {
			li {
				border-bottom: 1px solid #eee;
				padding: 30px 40px;
				font-size: 24px; /*px*/
        .iText {
					margin-bottom: 10px;
					font-size: 28px; /*px*/
				}
				.fr i {
					font-size: 24px; /*px*/
					padding-right: 15px;
				}
			}
		}
	}
	.vux-x-dialog {
		.img-box {
			min-height: 200px;
    	padding: 30px 14px;
			box-sizing: border-box;
			textarea {
				display: block;
				width: 100%;
				height: 100%;
				outline: none;
				border: 1px solid #ccc;
				border-radius: 10px;
			}
		}
	}
}
.weui-cells {
	.weui-cell {
		height: 80px;
		line-height: 80px;
		box-sizing: border-box;
	}
	span {
		position: absolute;
		right: 27px;
		top: 50%;
		transform: translateY(-50%);
		i {
			margin-right: 12px;
			color: #333;
		}
	}
}
.space {
	width: 100%;
	height: 10px;
	background-color: #eee;
}
</style>
