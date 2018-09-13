<template>
  <div class="homePage">
    <common-header title="产品"></common-header>
		<div>
			<mt-spinner type="fading-circle" color="#158FD2" v-if="spinner"></mt-spinner>
		</div>
    <div class="wrapper">
			<div class="swipe">
				<mt-swipe :auto="4000">
					<mt-swipe-item><img src="static/img/banner.png" @click="handleRoute"></mt-swipe-item>
					<mt-swipe-item><img src="static/img/banner.png" @click="handleRoute"></mt-swipe-item>
					<mt-swipe-item><img src="static/img/banner.png" @click="handleRoute"></mt-swipe-item>
				</mt-swipe>
			</div>
			<div class="announcement">
				<i class="iconfont vertical-align">&#xe62e;</i>
				<span>点击查看更多活动…</span>
				<span class="more">查看 <i class="iconfont vertical-align">&#xe6d6;</i></span>
			</div>
			<div class="space"></div>
			<div style="overflow: hidden; overflow-x: auto;">
        <ul class="tabbar" :style="{'width': ulWidth}">
          <li v-for="(item,index) in tabBars"
              :key="index"
              :style="{'width': liWidth + 'px', 'left': liWidth * index + 'px'}"
              @click="switchTab(index)"
              :class="n === index ? 'active text-center' : 'text-center'"
          >{{item}}
          </li>
        </ul>
      </div>
			<!-- <group class="group-list" :data="productsList"  v-for="(item,index) in productsList" :key="item.product_type_id">
				<cell
				:title="item.name"
				is-link
				:border-intent="false"
				:arrow-direction=" showContentList[index] ? 'up' : 'down'"
				@click.native="showContent(showContentList[index],index)">
				<i slot="icon" v-if="item.name === '二级市场'" class="iconfont red">&#xe604;</i>
				<i slot="icon" v-else-if="item.name === '理财'" class="iconfont red">&#xe605;</i>
				<i slot="icon" v-else-if="item.name === '固收'" class="iconfont blue">&#xe607;</i>
				<i slot="icon" v-else-if="item.name === '另类'" class="iconfont yellow">&#xe60b;</i>
				<i slot="icon" v-else class="iconfont yellow">&#xe633;</i>
				</cell> -->
				<selling-products :child-data="products[n]"
                          mark="homePage"
                          @cgPopup="cgPopup"
                          :popupVisible="popupVisible"></selling-products>
        <!-- <div class="divide-line"></div>
				v-show="showContentList[index]"
			</group> -->
			<div class="bottom-line text-center" v-if="this.choosePro.length >= 5">
				<span class="bot">我是有底线的</span>
			</div>
    </div>
  </div>
</template>

<script>
import { XHeader, Group, CellBox, Cell } from 'vux'
import SellingProducts from '@/base/sellingProducts/sellingProducts'
import commonHeader from '@/base/infoHeader/header'
import { getProducts } from '@/service/api/products'
import { getTags } from '@/service/api/mineJPush'
import Vue from 'vue'
// import { getInfoList } from '@/service/api/aboutMe'

export default {
  name: 'HomePage',
  components: {
  	XHeader,
  	Group,
		CellBox,
		Cell,
		SellingProducts,
		commonHeader
	},
	methods: {
		switchTab (index) {
			this.n = index
			this.choosePro = this.products[this.n]
		},
    handleRoute () {
      this.$router.push({name: 'activityList'})
    },
    showContent (status, index) {
		  this.showContentList[index] = !status
    },
    cgPopup (data) {
      this.popupVisible = data
		},
		getTag () {
			getTags().then(res => {
				if (!res.data.tags) return
				const tags = [].concat(res.data.tags.split(','))
        if (Vue.cordova.jPush) {
          Vue.cordova.jPush.setTags({ sequence: 1, tags: tags },
            function (result) {
              console.log(result.tags)
            }, function (error) {
              console.log(error.code)
            })
        }
			})
		}
  },
  data () {
    return {
			showContentList: {
				'0': true,
				'1': true,
				'2': true,
				'3': true,
				'4': true,
				'5': true,
				'6': true,
				'7': true,
				'8': true,
				'9': true,
				'10': true
			},
			productsList: [],
			spinner: true,
			popupVisible: false,
			tabBars: [],
			ulWidth: '100%',
			liWidth: '',
			n: 0,
			products: [],
			choosePro: []
			// email: '',
			// userId: ''
    }
	},
	mounted () {
		// this.email = this.$route.params.email
		// this.userId = this.$route.params.userId
		this.liWidth = document.documentElement.offsetWidth / 4
		getProducts().then(res => {
			this.spinner = false
			this.productsList = res.data
			this.productsList.map(item => {
				this.tabBars.push(item.name)
				this.products.push(item.products)
			})
			this.choosePro = this.products[this.n]
			// let cnt = Math.ceil(this.tabBars.length / 4)
			let cnt = this.tabBars.length / 4
      this.ulWidth = cnt * 100 + '%'
		}).catch(err => {
			if (err) {
				this.spinner = false
			}
		})
		this.getTag()
		// getInfoList().then(res => {
		// 	console.log('Jpush...........777777')
		// 	// let noCheckInfo = res.data.filter(item => item.is_read === '0')
		// 	// window.JPush.setApplicationIconBadgeNumber(noCheckInfo.length)
		// })
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "../../common/style/variable.less";
.homePage{
	height: 100%;
	background: #F5F5F5;
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
		transform: translate(-50%,-50%);
		width: 80px !important;
		height: 80px !important;
	}
	.wrapper {
		margin-bottom: 98px;
		background: #F5F5F5;
		// height: calc(100% - 214px);
		.swipe{
			width: 100%;
			height: 310px;
		}
		.announcement{
			width: 100%;
			height: 88px;
			line-height: 88px;
			background: @back-color-white;
			padding: 0 30px;
			color: @font-color-orange1;
			font-family: @font-family-R;
			font-size: @font-size-twentyF;/*px*/
			i{
				font-size: 35px;/*px*/
			}
			.more{
				position: absolute;
				right: 20px;
				font-size: @font-size-twenty;/*px*/
				i{
					font-size: 22px;/*px*/
				}
			}
		}
		ul.tabbar {
      font-size: 0;
      height: 80px;
			line-height: 80px;
			position: relative;
			background: @back-color-white;
      li {
				font-family: @font-family-M;
        font-size: @font-size-thirty;/*px*/
        display: inline-block;
        /*width: 150px;*/
        color: @font-color-4A;
        position: absolute;
      }
      li.active {
        color: @text-font-color;
      }
      li.active::after {
        content: '';
        position: absolute;
        display: block;
        width: 60px;
				height: 6px;
				border-radius: 2px;/*no*/
        background: @text-font-color;
				bottom: -5px;
				left: 50%;
				transform: translate(-50%, 0);
      }
		}
		.bottom-line{
			height: 73px;
			line-height: 73px;
			font-family: @font-family-R;
			font-size: @font-size-twentyF;/*px*/
			color: #D6D6D6;
			.bot:before, .bot:after{
				display: inline-block;
				content: '';
				width: 106px;
				height: 3px;
				background:#D6D6D6;
				vertical-align: middle;
				position: relative;
			}
			.bot:before{
				right: 20px;
			}
			.bot:after{
				left: 20px;
			}
		}
		// .weui-cells{
		// 	margin-top: 20px;
		// }
		// .weui-cells i{
		// 	margin-right: 35px;
		// }
		// .weui-cell{
		// 	height: 70px;
		// 	line-height: 70px;
		// 	padding-left: 20px;
		// 	.weui-cell__hd{
		// 		i{
		// 			vertical-align: middle;
		// 		}
		// 		.red{
		// 			color: #C61D1A;
		// 		}
		// 		.blue{
		// 			color: #597ac5;
		// 		}
		// 		.yellow{
		// 			color: #dea05b;
		// 		}
		// 	}
		// 	.vux-cell-bd.vux-cell-primary{
		// 		p{
		// 			label.vux-label{
		// 				font-family: PingFangSC-Semibold;
		// 				font-size: 32px;
		// 				color: #464646;
		// 			}
		// 		}
		// 	}
		// }
		// .group-list{
		// 	margin-bottom: 20px;
		// }
	}
	// .icon-finance-2-copy,.icon-finance-1{
	// 	color: #C61D1A;
	// }
	// .icon-finance-4{
	// 	color: orange;
	// }
}
</style>
