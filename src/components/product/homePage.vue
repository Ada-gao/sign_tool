<template>
  <div class="homePage">
    <common-header title="产品" flag="HomePage"></common-header>
		<div>
			<mt-spinner type="fading-circle" color="#158FD2" v-if="spinner"></mt-spinner>
		</div>
    <div class="wrapper">
			<div class="swipe">
				<mt-swipe :auto="4000">
					<mt-swipe-item><img src="static/img/测试banner.jpg"></mt-swipe-item>
					<mt-swipe-item><img src="static/img/测试banner.jpg"></mt-swipe-item>
					<mt-swipe-item><img src="static/img/测试banner.jpg"></mt-swipe-item>
				</mt-swipe>
			</div>
			<div class="announcement">
				<i class="iconfont vertical-align">&#xe62e;</i>
				<span>点击查看更多活动…</span>
				<span class="more" @click="handleRoute">查看 <i class="iconfont vertical-align">&#xe6d6;</i></span>
			</div>
			<div class="space"></div>
			<div style="overflow: hidden; overflow-x: auto;" v-if="!spinner">
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
                          :popupVisible="popupVisible"
													class="reservation-wrapper"
													v-if="this.choosePro.length !== 0"></selling-products>
				<div class="no-product text-center" v-if="this.choosePro.length === 0">
					<div class="warn absolute-center-xy">
						<i class="iconfont">&#xe869;</i>
						<p>暂无产品</p>
					</div>
				</div>
        <!-- <div class="divide-line"></div>
				v-show="showContentList[index]"
			</group> -->
			<div class="bottom-line text-center" v-if="this.choosePro.length >= 5">
				<span class="bot">我是有底线的</span>
			</div>
    </div>
		<!-- 版本升级 -->
    <div class="v_dialog" v-show="versionVisible">
      <div class="v_main">
        <div class="bgImg">
          <p class="version_number">V{{versionData.versionName}}</p>
        </div>
        <!--<img class="img" src="../../assets/images/version.png" alt=""/>-->
        <div class="content">
          <div class="title">【新版本特性】</div>
          <pre class="v_list" v-html="versionData.promptText">
          </pre>
          <a :href="versionData.packageUrl" class="ves_buttom">立即升级</a>
        </div>
        <i class="iconfont icon-guanbi" v-if="versionClose" @click="closeVersion"></i>
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
import { getLatestVersion } from '@/service/api/aboutMe'
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
		},
    closeVersion () {
      this.versionVisible = false
      sessionStorage.setItem('closeVersions', true)
      // localStorage.setItem('versionRemark', this.versionVisible)
		},
		updateVersionApp (appPackage, platform, versionName, versionCode) {
      let closeData = sessionStorage.getItem('closeVersions')
      if (closeData) {
        this.versionVisible = false
      } else {
        getLatestVersion(appPackage, platform, versionName, versionCode).then(res => {
					// alert(JSON.parse(res.data))
					// localStorage.setItem('appVersion', JSON.stringify(res.data))
          this.versionData = res.data
          // this.packageUrl = res.data.packageUrl
          if (res.data) {
            // 弹出升级框
            this.versionVisible = true
            // this.packageUrl = res.data.packageUrl
            // this.promptText = res.data.promptText
            if (res.data.promptType === 'Silence') { // 静默
              this.versionVisible = false
            } else if (res.data.promptType === 'Force') { // 强制升级
              this.versionClose = false
            } else if (res.data.promptType === 'Recommend') { // 推荐升级
              this.versionClose = true
            }
          } else {
            this.versionVisible = false
          }
        })
      }
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
			choosePro: [],
			versionVisible: false,
			versionData: {},
			versionClose: true,
			appPackage: 'com.suxianginvestment.crm01'
			// email: '',
			// userId: ''
    }
	},
	created () {
		let _this = this
		_this.devicePlatform = Vue.cordova.device.platform
		/* global cordova */
    cordova.getAppVersion.getVersionCode(function (version) {
      // alert(cordova.getAppVersion)
      _this.versionCode = version
			let versionName = Vue.cordova.appInfo.version
			let params = {
				appPackage: _this.appPackage,
				platform: _this.devicePlatform,
				versionName: versionName,
				versionCode: _this.versionCode
			}
      _this.updateVersionApp(params)
    })
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
				bottom: 0px;
				left: 50%;
				transform: translate(-50%, 0);
      }
		}
		.no-product{
			position: relative;
			height: 610px;
			.warn{
				i{
					font-size: 150px;/*px*/
					color: @back-color-E8;
				}
				p{
					font-family: @font-family-R;
					font-size: @font-size-twentyS;/*px*/
					color: #ccc;
					margin-top: 25px;
				}
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
