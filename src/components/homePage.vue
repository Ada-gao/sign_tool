<template>
  <div>
    <x-header :left-options="{showBack: false}">产品</x-header>
    <div class="wrapper">
			<img src="static/img/banner.jpg">
			<div class="space"></div>
			<div class="group-list" :data="productsList" v-for="item in productsList" :key="item.product_type_id">
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
			</div>
    	<!-- <group>
        <cell-box>
        	<i class="iconfont icon-finance-2-copy"></i>理财
        </cell-box>
      </group>
      <div class="products-box">
      	<selling-products :child-data="products[0].list1"></selling-products>
      </div>
			<div class="space"></div>
    	<group>
        <cell-box>
        	<i class="iconfont icon-finance-3-copy"></i>固收
        </cell-box>
      </group>
      <div class="products-box">
      	<selling-products :child-data="products[1].list2"></selling-products>
      </div>
			<div class="space"></div>
    	<group>
        <cell-box>
        	<i class="iconfont icon-finance-1"></i>二级市场产品
        </cell-box>
      </group>
      <div class="products-box">
      	<selling-products :child-data="products[2].list3"></selling-products>
      </div>
			<div class="space"></div>
    	<group>
        <cell-box>
        	<i class="iconfont icon-finance-4"></i>另类投资
        </cell-box>
      </group>
      <div class="products-box">
      	<selling-products :child-data="products[3].list4"></selling-products>
      </div> -->
    </div>
		<!-- <router-view></router-view> -->
  </div>
</template>

<script>
import { XHeader, Group, CellBox } from 'vux'
import SellingProducts from '@/base/sellingProducts/sellingProducts'
import { getProducts } from '@/service/api/products'

export default {
  name: 'HomePage',
  components: {
  	XHeader,
  	Group,
  	CellBox,
  	SellingProducts
  },
  data () {
    return {
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
			]
    }
	},
	mounted () {
		getProducts().then(res => {
			this.productsList = res.data
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
