<template>
	<div class="flexbox-wrapper">
		<ul>
			<li v-for="(item, index) in childData" :key="index" @click="toProductDetail(item.product_id,item)">
				<flexbox :gutter="2" wrap="wrap">
					<flexbox-item :span="4" class="item-left">
						<div class="flex-product">
							<div class="flex-left">
								<p class="rate"><span class="number">{{item.annualized_return}}</span>%</p>
								<!-- <p class="rate">{{item.expected_income}}</p> -->
								<p class="text">收益对标基准</p>
							</div>
						</div>
					</flexbox-item>
					<flexbox-item class="item-right">
						<div class="flex-product">
							<div class="flex-right">
								<p>{{item.product_name}}</p>
								<p v-if="item.minimal_amount != undefined">起投金额：{{item.minimal_amount}}万</p>
                <p v-else>购买金额：{{item.amount}}万</p>
								<p>投资期限：{{item.investment_horizon}}年</p>
								<span v-if="item.product_status === 0" class="box red">在建</span>
								<span v-else-if="item.product_status === 1" class="box blue">预热中</span>
								<span v-else-if="item.product_status === 2" class="box red">募集中</span>
								<!-- <span v-else-if="item.product_status === 3" class="free"></span> -->
								<span v-else-if="item.product_status === 4" class="box red">存续期</span>
								<span v-else-if="item.product_status === 5" class="box gary">已下架</span>
							</div>
						</div>
					</flexbox-item>
				</flexbox>
			</li>
		</ul>

	</div>
</template>

<script>
import { XHeader, Group, CellBox, Flexbox, FlexboxItem } from 'vux'
export default {
	name: 'SellingProducts',
  	components: {
		XHeader,
		Group,
		CellBox,
		Flexbox,
		FlexboxItem
	  },
	  //, 'email', 'userId'
	props: ['childData'],
	// data () {
	//  	return {
	// 		 newemail: '',
	// 		 newuserId: ''
	// 	 }
	// },
	methods: {
		toProductDetail (id, item) {
		    if (item.minimal_amount === undefined) {
		        return false
        }
			// this.$router.push({name: 'ProductDetail', params: {id: id, item: item, email: newemail, userId: newuserId}})
			this.$router.push({name: 'ProductDetail', params: {id: id, item: item}})
		}
	}
	// mounted () {
	// 	this.newemail = this.email
	// 	this.newuserId = this.userId
	// }
}
</script>

<style scoped lang="less">
.vux-flexbox-item.item-left{
	width: 247px;
	.number{
		font-size: 60px !important;
		color: #C61D1A;
	}
	.text{
		font-family: PingFangSC-Regular;
		font-size: 24px;
		color: #464646;
	}
}
.vux-flexbox-item.item-right{
	position: relative;
	padding-top: 46px;
	font-family: PingFangSC-Regular;
	font-size: 30px;
	color: #464646;
		p{
			font-size: 30px !important;
		}
}
.flexbox-wrapper .vux-flexbox .item-right span.box{
	position: absolute;
	top: 0;
	right: 10px;
	width: 90px;
	height: 49px;
	border-radius: 10px;
	font-size: 24px;
	text-align: center;
	line-height: 49px;
}
.flexbox-wrapper .vux-flexbox .item-right span{
	font-family: PingFangSC-Semibold;
}
.flexbox-wrapper .vux-flexbox .item-right span.red {
	background-color: #C61D1A;
}
.flexbox-wrapper .vux-flexbox .item-right span.blue {
	background-color: #158FD2;
}
.flexbox-wrapper .vux-flexbox .item-right span.gray{
	background-color: #666666;
}
</style>
