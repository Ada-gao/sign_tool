<template>
	<div class="customList">
		<x-header :left-options="{backText: '', preventGoBack:true}" @on-click-back="back()">客户</x-header>
		<div class="wrapper">
			<div class="search">
				<input type="text" class="text-search" v-model.trim="keyValue" placeholder="搜索 客户名 手机号码"/>
				<i class="iconfont icon_search" @click="search()">&#xe609;</i>
			</div>
			<div class="title">客户列表</div>
			<div class="item" :data="list" v-for="item in list" :key="item.client_id" @click="chooseName(item)" v-if="show">
				<span class="name">{{item.name}}（{{item.mobile}}）</span>
				<span class="tip" v-if="item.client_type === '0'">普通投资者</span>
				<span class="tip" v-if="item.client_type === '1'">专业投资者</span>
			</div>
			<div class="noList" v-if="!show">
				<img src="static/img/customerIcon.png" alt="">
        <div>暂时没有可预约客户</div>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
import { XHeader } from 'vux'
import { appointmentList } from '@/service/api/appointment'
export default {
  components: {
    XHeader
	},
	data () {
		return {
			keyValue: '',
			list: '',
			selectFlag: 'selectFlag',
			show: true
		}
	},
	methods: {
		back () {
			this.$router.push({name: 'ProductAppointment', params: {flag: this.$route.params.flag, riskLevel: this.$route.params.riskLevel}})
		},
		search () {
			let obj = {q: this.keyValue}
			appointmentList(this.$route.params.riskLevel, obj).then(res => {
				this.list = res.data
			})
		},
		chooseName (item) {
			this.$router.push({name: 'ProductAppointment', params: {selectFlag: this.selectFlag, nameItem: item, flag: this.$route.params.flag}})
		},
		getList () {
			appointmentList(this.$route.params.riskLevel).then(res => {
				this.list = res.data
				if (res.data.length === 0) {
					this.show = false
				}
			})
		}
	},
	mounted () {
		this.getList()
	}
}
</script>
<style lang="less">
.customList{
	font-family: PingFangSC-Regular;
	height: 100%;
	.wrapper{
		.search{
			width: 100%;
			height: 110px;
			line-height: 110px;
			text-align: center;
			position: relative;
			background: #fff;
			.text-search{
				width: 665px;
				height: 70px;
				text-indent: 30px;
				font-size: 26px;
				color: #999999;
				border: 1px solid #999999;
				border-radius: 10px;
			}
			i{
				position: absolute;
				top: 50%;
				right: 70px;
				transform: translateY(-50%);
				-webkit-transform: translateY(-50%);
				font-size: 45px; /*px*/
				color: #D8D8D8;
			}
		}
		.title{
			height: 80px;
			line-height: 80px;
			background: #fff;
			text-align: center;
			font-size: 30px;
			color: #2A7DC1;
			margin: 20px 0;
		}
		.item{
			width: 670px;
			height: 155px;
			line-height: 155px;
			background: #fff;
			border: 1px solid #DDDDDD;
			border-radius: 5px;
			margin: 0 auto;
			margin-bottom: 20px;
			font-size: 24px;
			color: #2672BA;
			padding: 0 34px;
			box-sizing: border-box;
			.name{
				a{
					color: #2672BA;
				}
			}
			.tip{
				float: right;
			}
		}
		.noList{
			width: 100%;
			// height: calc(100% - 230px);
			text-align: center;
			margin-top: 200px;
			img{
				width: 550px;
			}
			div{
				font-size: 32px;
				color: #888888;
				margin-top: 88px;
			}
		}
	}
}
</style>
