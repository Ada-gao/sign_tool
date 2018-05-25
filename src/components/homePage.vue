<template>
  <div>
    <x-header :left-options="{showBack: false}">首页</x-header>
    <div class="wrapper">
			<img src="static/img/banner.jpg">
			<div class="space"></div>
			<!-- <div class="group-list" :data="productsList" v-for="item in productsList" :key="item.product_type_id">
				<group>
					<cell-box>
						<i class="iconfont"
							:class="{'icon-finance-3-copy': item.product_type_id === 3,
							'icon-finance-2-copy': item.product_type_id === 2,
							'icon-finance-1': item.product_type_id === 1,
							'icon-finance-4': item.product_type_id === 4}"
							></i>{{item.product_type_name}}
					</cell-box>
				</group>
				<div class="products-box">
					<selling-products :child-data="item.products"></selling-products>
				</div>
				<div class="space"></div>
			</div> -->
			<group class="group-list" :data="productsList" >
				<cell
				:title="name1"
        is-link
        :border-intent="false"
        :arrow-direction=" showContent001 ? 'up' : 'down'"
        @click.native="showContent(showContent001 =!showContent001)">
				<i slot="icon" class="iconfont icon-finance-3-copy"></i></cell>

				<selling-products :child-data="productsList[0].products" v-if="showContent001"></selling-products>

        <div class="divide-line"></div>

        <cell
				:title="name2"
        is-link
        :border-intent="false"
        :arrow-direction="showContent002 ? 'up' : 'down'"
        @click.native="showContent(showContent002=!showContent002)">
				<i slot="icon" class="iconfont icon-finance-2-copy"></i></cell>

				<selling-products :child-data="productsList[1].products" v-if="showContent002"></selling-products>

        <div class="divide-line"></div>

        <cell
				:title="name3"
        is-link
        :border-intent="false"
        :arrow-direction="showContent003 ? 'up' : 'down'"
        @click.native="showContent(showContent003=!showContent003)">
				<i slot="icon" class="iconfont icon-finance-1"></i></cell>

				<selling-products :child-data="productsList[2].products" v-if="showContent003"></selling-products>

        <div class="divide-line"></div>

				<cell
        is-link
				:title="name4"
        :border-intent="false"
        :arrow-direction="showContent004 ? 'up' : 'down'"
        @click.native="showContent(showContent004 =!showContent004)">
				<i slot="icon" class="iconfont icon-finance-4"></i></cell>
				<selling-products :child-data="productsList[3].products" v-if="showContent004"></selling-products>

        <div class="divide-line"></div>

      </group>
    </div>
		<!-- <router-view></router-view> -->
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
    showContent (index) {
      console.log(index)
    }
  },
  data () {
    return {
				showContent001: false,
      	showContent002: false,
      	showContent003: false,
				showContent004: false,
    		productsList: [
//				{
//					list1: {}
//				},
//				{
//					list2: {}
//				},
//				{
//					list3: {}
//				},
//				{
//					list4: {}
//				}
			],
			name1: '固收',
			name2: '理财',
			name3: '二级市场',
			name4: '另类'
    }
	},
	mounted () {
		getProducts().then(res => {
		// debugger
			this.productsList = res.data
			this.name1 = this.productsList[0].name
			this.name2 = this.productsList[1].name
			this.name3 = this.productsList[2].name
			this.name4 = this.productsList[3].name
			console.log(this.productsList)
			// this.products.forEach(item => {
			// 	if (item.product_type_name === '理财') {
			// 		this.products[0].list1 = item.products
			// 		console.log(this.products.list1)
			// 	} else if (item.product_type_name === '固收') {
			// 		console.log(this.products)
			// 		this.products[1].list2 = item.products
			// 	} else if (item.product_type_name === '二级市场') {
			// 		console.log(this.products)
			// 		this.products[2].list3 = item.products
			// 	} else if (item.product_type_name === '另类投资') {
			// 		console.log(this.products)
			// 		this.products[3].list4 = item.products
			// 	}
			// })
		})
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
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
.wrapper {
	padding-bottom: 96px;
}
.icon-finance-2-copy,.icon-finance-1{
	color: #C61D1A;
}
.icon-finance-4{
	color: orange;
}
// .wrapper {
// 	padding-bottom: 116px;
// 	.vux-flexbox {
// 		border-top: 1px solid #eee; /*no*/
// 		padding-top: 20px;
// 		padding-bottom: 20px;
// 	  .vux-flexbox-item:nth-child(2) {
// 			border-left: 1px solid #eee; /*no*/
// 		}
// 		.vux-flexbox-item {
// 			padding: 20px;
// 	    box-sizing: border-box;
// 			.flex-product {
// 				p {
// 					margin-bottom: 6px;
// 					margin-top: 0;
// 				}
// 				.text {
// 					font-size: 10px; /*px*/
// 				}
// 				.flex-left .rate {
// 					color: #f04155;
// 					span {
// 						font-size: 24px; /*px*/
// 					}
// 				}
// 				.flex-right {
// 					p:nth-child(1) {
// 						font-size: 18px; /*px*/
// 					}
// 					span {
// 						background-color: #fd6060;
// 						color: #fff;
// 						font-size: 12px; /*px*/
// 						padding: 3px 6px;
// 		      }
// 				}
// 			}
// 		}
// 	}
// }
</style>
