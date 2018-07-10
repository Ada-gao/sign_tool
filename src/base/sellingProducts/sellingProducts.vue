<template>
	<div class="flexbox-wrapper">
		<ul>
			<li v-for="(item, index) in childData" :key="index" @click="toProductDetail(item.product_id,item)">
				<flexbox :gutter="2" wrap="wrap">
					<flexbox-item :span="4" class="item-left">
						<div class="flex-product">
							<div class="flex-left">
								<p v-if="item.is_float === 0" class="line">一</p>
								<p v-else class="rate"><span class="number">{{item.annualized_return}}</span>%</p>
								<!-- <p class="rate">{{item.expected_income}}</p> -->
								<p class="text">{{item.is_float === 0 ? '浮动收益' : '收益对标基准'}}</p>
							</div>
						</div>
					</flexbox-item>
					<flexbox-item class="item-right">
						<div class="flex-product">
							<div class="flex-right">
								<p class="firstp">{{item.product_name}}</p><span class="important" v-if="Date.parse(new Date(item.important_start)) < new Date().getTime() && new Date().getTime() < Date.parse(new Date(item.important_end))">重点产品</span>
								<p v-if="item.minimal_amount != undefined">起投金额：{{item.minimal_amount}}万</p>
                				<p v-else>购买金额：{{item.amount}}万</p>
								<p>投资期限：{{item.investment_horizon}}年</p>
								<!-- <span v-if="item.product_status === 0" class="box red">在建</span> -->
								<span v-if="item.product_status === 1" class="box blue">预热中</span>
								<span v-else-if="item.product_status === 2" class="box green">募集中</span>
								<span v-else-if="item.product_status === 3" class="box gray">已关帐</span>
								<!-- <span v-else-if="item.product_status === 4" class="box red">存续期</span>
								<span v-else-if="item.product_status === 5" class="box gary">已下架</span> -->
							</div>
						</div>
					</flexbox-item>
				</flexbox>
			</li>
		</ul>

    <div class="no_product" v-show="childData.length === 0 && !mark">
      <img src="static/img/purchasedIcon.png">
      <span>亲，请您购买产品哦</span>
    </div>

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
	props: ['childData', 'mark'],
	data () {
	 	return {
			showImportant: false
		 }
	},
	methods: {
		toProductDetail (id, item) {
			// console.log(Date.parse(new Date(item.important_start)), Date.parse(new Date(item.important_end)), new Date().getTime(), Date.parse(new Date(item.important_start)) < new Date().getTime(), new Date().getTime() < Date.parse(new Date(item.important_end)))
			// console.log(Date.parse(new Date(item.important_start)) < new Date().getTime() && new Date().getTime() < Date.parse(new Date(item.important_end)))
		  if (item.minimal_amount === undefined) {
		  	return false
			}
			window.localStorage.setItem('productDetail', JSON.stringify(item))
			this.$router.push({name: 'ProductDetail', params: {id: id, item: item, important: Date.parse(new Date(item.important_start)) < new Date().getTime() && new Date().getTime() < Date.parse(new Date(item.important_end))}})
		}
	},
	 mounted () {
		//  console.log(new Date().getTime())
	 }
}
</script>

<style scoped lang="less">
.vux-flexbox-item.item-left{
	width: 247px;
	.line{
		color: #C61D1A;
		margin-left: 40px;
	}
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
			line-height: 42px;
			height: 42px;
			max-width: 300px;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
		}
		p.firstp{
			display: inline-block;
		}
		span.important{
			padding: 1px 8px;
			background: #AC1E1C;
			border-radius: 5px;
			font-family: PingFangSC-Medium;
			font-size: 18px;
			vertical-align: top;
			margin-left: 10px;
			line-height: 42px;
		}
}
.flexbox-wrapper .vux-flexbox .item-right span.box{
	position: absolute;
	top: -20px;
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
.flexbox-wrapper .vux-flexbox .item-right span.green {
	background-color: #28BCAC;
}
.flexbox-wrapper .vux-flexbox .item-right span.blue {
	background-color: #158FD2;
}
.flexbox-wrapper .vux-flexbox .item-right span.gray{
	background-color: #ccc;
}
.no_product {
  background-color: #f5f5f5;
  padding-top: 150px;
  img,
  span {
    display: block;
    text-align: center;
    margin: 0 auto;
  }
  img {
    width: 556px;
    height: 379px;
  }
  span {
    margin-top: 88px;
    font-family: PingFangSC-Regular;
    font-size: 32px;
    color: #888888;
  }
}
</style>
