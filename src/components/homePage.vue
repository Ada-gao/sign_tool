<template>
  <div class="homePage">
    <x-header :left-options="{showBack: false}">首页</x-header>
	<div>
		<mt-spinner type="fading-circle" color="#158FD2" v-if="spinner"></mt-spinner>
	</div>
    <div class="wrapper">
			<img src="static/img/banner.png">
			<!-- <div class="space"></div> -->
			<group class="group-list" :data="productsList"  v-for="(item,index) in productsList" :key="item.product_type_id">
				<cell
				:title="item.name"
				is-link
				:border-intent="false"
				:arrow-direction=" showContentList[index] ? 'up' : 'down'"
				@click.native="showContent(showContentList[index],index)">
				<i slot="icon" v-if="item.name === '二级市场'" class="iconfont red">&#xe604;</i>
				<i slot="icon" v-else-if="item.name === '理财'" class="iconfont red">&#xe605;</i>
				<i slot="icon" v-else-if="item.name === '固收'" class="iconfont blue">&#xe607;</i>
				<i slot="icon" v-else-if="item.name === '另类'" class="iconfont yellow">&#xe60b;</i></cell>
				 <!-- :email="email" :userId="userId" -->
				<selling-products :child-data="item.products" v-show="showContentList[index]"></selling-products>
        <div class="divide-line"></div>
			</group>
    </div>
  </div>
</template>

<script>
import { XHeader, Group, CellBox, Cell } from 'vux'
import SellingProducts from '@/base/sellingProducts/sellingProducts'
import { getProducts } from '@/service/api/products'

export default {
  name: 'HomePage',
  components: {
  	XHeader,
  	Group,
		CellBox,
		Cell,
  	SellingProducts
	},
	methods: {
    showContent (status, index) {
			this.showContentList[index] = !status
    }
  },
  data () {
    return {
			showContentList: {
				'0': true,
				'1': true,
				'2': true,
				'3': true,
				'4': true
			},
			productsList: [],
			spinner: true
			// email: '',
			// userId: ''
    }
	},
	mounted () {
		// this.email = this.$route.params.email
		// this.userId = this.$route.params.userId
		getProducts().then(res => {
			this.spinner = false
			this.productsList = res.data
		}).catch(err => {
			if (err) {
				this.spinner = false
			}
		})
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.homePage{
	height: 100%;
	background: #F5F5F5;
	.vux-header{
		// height: 128px;
	}
	h1, h2 {
		font-weight: normal;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}
	li {
		// display: inline-block;
		margin: 0 10px;
	}
	a {
		color: #42b983;
	}
	img {
		width: 100%;
		// padding-top: 126px;
		vertical-align: bottom;
	}
	.mint-spinner-fading-circle{
		position: absolute;
		z-index: 99;
		top: 50%;
		left: 50%;
		width: 100px !important;
		height: 100px !important;
	}
	.wrapper {
		margin-bottom: 116px;
		background: #F5F5F5;
		// height: calc(100% - 214px);
		.weui-cells{
			margin-top: 20px;
		}
		.weui-cells i{
			margin-right: 35px;
		}
		.weui-cell{
			height: 70px;
			line-height: 70px;
			padding-left: 20px;
			.weui-cell__hd{
				.red{
					color: #C61D1A;
				}
				.blue{
					color: #597ac5;
				}
				.yellow{
					color: #dea05b;
				}
			}
			.vux-cell-bd.vux-cell-primary{
				p{
					label.vux-label{
						font-family: PingFangSC-Semibold;
						font-size: 32px;
						color: #464646;
					}
				}
			}
		}
		.group-list{
			margin-bottom: 20px;
		}
	}
	.icon-finance-2-copy,.icon-finance-1{
		color: #C61D1A;
	}
	.icon-finance-4{
		color: orange;
	}
}
</style>
