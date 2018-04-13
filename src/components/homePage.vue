<template>
  <div>
    <x-header :left-options="{showBack: false}">产品</x-header>
    <div class="wrapper">
			<img src="static/img/banner.jpg">
			<div class="space"></div>
    	<group>
        <cell-box>
        	<i class="iconfont icon-finance-2-copy"></i>理财
        </cell-box>
      </group>
      <div class="products-box">
      	<selling-products :child-data="prodcuts"></selling-products>
      </div>
			<div class="space"></div>
    	<group>
        <cell-box>
        	<i class="iconfont icon-finance-3-copy"></i>固守
        </cell-box>
      </group>
      <div class="products-box">
      	<selling-products :child-data="prodcuts"></selling-products>
      </div>
			<div class="space"></div>
    	<group>
        <cell-box>
        	<i class="iconfont icon-finance-1"></i>二级市场产品
        </cell-box>
      </group>
      <div class="products-box">
      	<selling-products :child-data="prodcuts"></selling-products>
      </div>
			<div class="space"></div>
    	<group>
        <cell-box>
        	<i class="iconfont icon-finance-4"></i>另类投资
        </cell-box>
      </group>
      <div class="products-box">
      	<selling-products :child-data="prodcuts"></selling-products>
      </div>
    </div>
  </div>
</template>

<script>
import { XHeader, Group, CellBox } from 'vux'
import SellingProducts from '@/base/sellingProducts/sellingProducts'
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
    	prodcuts: [
    		{
    			rate: 13.00,
    			pTitle: '正收益理财产品',
    			pLabel: '二级市场'
    		}, {
    			rate: 12.00,
    			pTitle: '正收益理财产品',
    			pLabel: '二级市场'
    		}, {
    			rate: 13.00,
    			pTitle: '正收益理财产品',
    			pLabel: '二级市场'
    		}, {
    			rate: 12.00,
    			pTitle: '正收益理财产品',
    			pLabel: '二级市场'
    		}, {
    			rate: 13.00,
    			pTitle: '正收益理财产品',
    			pLabel: '二级市场'
    		}
    	]
    }
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
	padding-bottom: 116px;
	.vux-flexbox {
		border-top: 1px solid #eee;
		padding-top: 20px;
		padding-bottom: 20px;
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
					font-size: 10px; /*px*/
				}
				.flex-left .rate {
					color: #f04155;
					span {
						font-size: 24px; /*px*/
					}
				}
				.flex-right {
					p:nth-child(1) {
						font-size: 18px; /*px*/
					}
					span {
						background-color: #fd6060;
						color: #fff;
						font-size: 12px; /*px*/
						padding: 3px 6px;
		      }
				}
			}
		}
	}
}
</style>
