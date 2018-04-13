<template>
	<div>
		<flexbox :gutter="2" wrap="wrap" v-for="(item, index) in productData" :key="index">
			<flexbox-item :span="4" class="item-left">
				<div class="flex-product">
					<div class="flex-left">
						<p class="rate"><span>{{item.yieldRate | twoDecimals}}</span>%</p>
						<p class="text">近一年收益</p>
					</div>
				</div>
			</flexbox-item>
			<flexbox-item>
				<div class="flex-product">
					<div class="flex-right">
						<p class="r-title">{{item.title}}</p>
						<group>
							<x-number title="投资金额: "
							  @on-change="change"
								v-model="item.changeVal"
							  :min="minNum"
								align=""
								width="90px"
								fillable></x-number>
						</group>
						<span class="red-label">{{item.marketLabel}}</span>
					</div>
				</div>
			</flexbox-item>
		</flexbox>
		<!-- <flexbox :gutter="2" wrap="wrap">
			<flexbox-item :span="4" class="item-left">
				<div class="flex-product">
					<div class="flex-left">
						<p class="rate"><span>12.00</span>%</p>
						<p class="text">近一年收益</p>
					</div>
				</div>
			</flexbox-item>
			<flexbox-item>
				<div class="flex-product">
					<div class="flex-right">
						<p class="r-title">正收益理财产品</p>
						<group>
							<x-number title="投资金额: "
							  @on-change="change"
								v-model="changeVal2"
							 fillable :min="minNum" align="" width="90px"></x-number>
						</group>
						<span class="red-label">二级市场</span>
					</div>
				</div>
			</flexbox-item>
		</flexbox> -->
	</div>
</template>

<script>
import { Flexbox, FlexboxItem, XNumber, Group } from 'vux'
import bus from 'common/js/eventVue'

export default {
  components: {
    Flexbox,
    FlexboxItem,
		XNumber,
		Group
	},
	props: ['productData'],
  data () {
    return {
      isAttention: 1,
			minNum: 0
    }
	},
	methods: {
		change (val) {
			let count = 0
			let _data = this.productData
			_data.forEach(item => {
				count += item.changeVal
			})
			let emitData = {
				count: count,
				idx: this.productData[0].idx
			}
			bus.$emit('emitNum', emitData)
		}
	}
}
</script>

<style scoped lang="less">
.vux-flexbox {
	border-top: 1px solid #eee;
	padding-top: 20px;
  padding-bottom: 20px;
  position: relative;
  .vux-flexbox-item:nth-child(2) {
		border-left: 1px solid #eee;
	}
	.vux-flexbox-item {
		padding: 20px;
    box-sizing: border-box;
		.flex-product {
			p {
				margin-bottom: 6px;
				margin-top: 0;
			}
			.text {
				font-size: 24px; /*px*/
			}
			.r-title {
				font-size: 32px; /*px*/
			}
			.flex-left {
				text-align: center;
				.rate {
					color: #f04155;
					font-size: 30px; /*px*/
					span {
						font-size: 50px; /*px*/
					}
				}
			}
			// .flex-right span {
			// 	background-color: #fd6060;
			// 	color: #fff;
			// 	font-size: 11px;
			// 	padding: 3px 6px;
      // }
    }
  }
  .btn {
    border: none;
    border-radius: 2px;
    color: #fff;
    margin-right: 20px;
    padding: 3px 6px 5px 6px;
    width: 52px;
    position: absolute;
    top: 10px;
    right: 0px;
  }
  .btn-primary {
    background-color: #0083c5;
  }
}
</style>
