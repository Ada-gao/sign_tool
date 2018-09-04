<template>
  <div class="homePage">
    <x-header :left-options="{showBack: false}">首页</x-header>
	<div>
		<mt-spinner type="fading-circle" color="#158FD2" v-if="spinner"></mt-spinner>
	</div>
    <div class="wrapper">
			<img src="static/img/banner.png" @click="handleRoute">
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
				<i slot="icon" v-else-if="item.name === '另类'" class="iconfont yellow">&#xe60b;</i>
				<i slot="icon" v-else class="iconfont yellow">&#xe633;</i>
				</cell>
				 <!-- :email="email" :userId="userId" -->
				<selling-products :child-data="item.products"
                          mark="homePage"
                          @cgPopup="cgPopup"
                          :popupVisible="popupVisible"
                          v-show="showContentList[index]"></selling-products>
        <div class="divide-line"></div>
			</group>
    </div>
  </div>
</template>

<script>
import { XHeader, Group, CellBox, Cell } from 'vux'
import SellingProducts from '@/base/sellingProducts/sellingProducts'
import { getProducts } from '@/service/api/products'
import { getTags } from '@/service/api/mineJPush'
import Vue from 'vue'
import { getInfoList } from '@/service/api/aboutMe'

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
      popupVisible: false
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
		this.getTag()
		getInfoList().then(res => {
			console.log('Jpush...........777777')
			// let noCheckInfo = res.data.filter(item => item.is_read === '0')
			// window.JPush.setApplicationIconBadgeNumber(noCheckInfo.length)
		})
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.homePage{
	height: 100%;
	background: #F5F5F5;
	// .vux-header{
	// 	height: 128px;
	// }
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
		transform: translate(-50%,-50%);
		width: 80px !important;
		height: 80px !important;
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
				i{
					vertical-align: middle;
				}
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
