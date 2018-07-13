<template>
	<div class="bankList">
		<x-header :left-options="{backText: '', preventGoBack:true}" @on-click-back="back()">银行卡</x-header>
		<div class="wrapper">
			<div class="top">
				<mt-cell title="银行卡信息">
					<span slot="icon" class="iconfont">&#xe621;</span>
				</mt-cell>
        <div class="add_card_btn"
             v-if="addCard !== '2'"
             @click="routerPush">
          <i class="iconfont">&#xe640;</i>
          <span>银行卡</span>
        </div>
			</div>
			<div class="list">
				<div class="item" :data="bankList" v-for="item in bankList" :key="item.bank_id" @click="selected(item)">
					<div class="tip">
						<span class="tit">银行卡号：</span>
						<span class="detail">{{item.card_no}}</span>
					</div>
					<div class="tip">
						<span class="tit">银行名称：</span>
						<span class="detail">{{item.bank_name}}</span>
					</div>
					<div class="tip">
						<span class="tit">支行名称：</span>
						<span class="detail col">{{item.sub_branch_name}}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
import { XHeader } from 'vux'
import { checkCustomerBankDetail } from '@/service/api/customers'
import {getStore} from '@/config/mUtils'
export default{
	components: {
    XHeader
	},
	data () {
		return {
			clientId: '',
			bankList: [],
			mark: '',
			selectedItem: [],
      addCard: null
		}
	},
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'Bankcard' || 'PotentialCustomerList') {
        vm.addCard = '0'
      } else if (from.name === 'CustomerManagement') {
        vm.addCard = '1'
      } else {
        vm.addCard = '2'
      }
    })
  },
	methods: {
    routerPush () {
      this.$router.push({name: 'Bankcard'})
    },
		back () {
			if (this.$route.params.flag) {
        this.$router.push({name: 'ProductAppointment', params: {flag: this.$route.params.flag, mark: this.mark}})
      } else if (this.addCard === '0') {
				this.$router.push({name: 'PotentialCustomerList', params: {id: this.clientId}})
			} else if (this.addCard === '1') {
        this.$router.push({name: 'CustomerManagement', params: {id: this.clientId}})
      }
		},
		selected (item) {
			this.mark = 'selected'
			this.selectedItem = item
			console.log(this.mark, item)
      this.$router.push({name: 'ProductAppointment', params: {flag: this.$route.params.flag, mark: this.mark, item: this.selectedItem}})
		},
		getList () {
			checkCustomerBankDetail(this.clientId).then(res => {
				this.bankList = res.data
			})
		}
	},
	mounted () {
//	  this.addCard = this.$route.params.addCard
	  let selfInfos = JSON.parse(getStore('selfInfos'))
		this.clientId = this.$route.params.id || selfInfos.client_id
		this.getList()
	}
}
</script>
<style lang="less">
.bankList{
	font-family: PingFangSC-Regular;
	.wrapper{
		.top{
      position: relative;
			height: 80px;
			.mint-cell{
				height: 100%;
				.mint-cell-wrapper{
					height: 100%;
					line-height: 100%;
					padding-left: 35px;
					.mint-cell-title{
						font-family: PingFangSC-Medium;
						font-size: 30px;
						color: #2672BA;
						.iconfont{
							font-size: 40px;
							vertical-align: middle;
						}
					}
				}
			}
      .add_card_btn {
        display: inline-block;
        position: absolute;
        right: 42px;
        top: 19px;
        background: #2672BA;
        border-radius: 5px;
        width: 122px;
        height: 42px;
        line-height: 42px;
        color: #fff;
        i {
          vertical-align: bottom;
          font-size: 25px;
          margin-left: 5px;
        }
      }
		}
		.list{
			padding: 20px;
			.item{
				width: 710px;
				padding: 20px;
				height: 210px;
				background: #fff;
				margin-bottom: 20px;
				box-sizing: border-box;
				.tip{
					line-height: 56px;
					.tit{
						font-size: 30px;
						color: #333333;
					}
					.detail{
						font-size: 28px;
						color: #151515;
					}
					.col{
						color: #666;
					}
				}
			}
		}
	}
}
</style>
