<template>
	<div>
		<x-header v-show="isCancel===false" :left-options="{showBack: false}">客户
			<router-link slot="right" to="/newCustomer/0">新增潜客</router-link>
		</x-header>
		<x-header v-show="isCancel===true" :left-options="{showBack: false}">客户查询
			<router-link slot="right" to="/a">a</router-link>
		</x-header>
		<div class="search" :class="{cancelSearch: isCancel}">
			<input class="ipt" type="text"
				v-model.trim="searchKey"
				placeholder="搜索姓名、电话"
				@click="isCancel=true"
				@input="searchEvent"/>
			<button class="btn-cancel" @click="cancelSearchEvent">取消</button>
		</div>
		<div class="space"></div>
		<div v-show="isCancel===true" class="searchList">
			<ul>
				<li v-for="(item, index) in items" :key="index" @click="toLink">
					<span>{{item.phoneNum}}</span>
					<span class="ml-200">{{item.name}}</span>
				</li>
			</ul>
		</div>
		<div class="customer-list" v-show="isCancel===false">
			<tab :line-width="5" active-color="#0083c5" v-model="idx">
				<tab-item selected @on-item-click="onItemClick">客户列表</tab-item>
				<tab-item @on-item-click="onItemClick">潜在客户</tab-item>
			</tab>
			<ul v-show="idx === 0">
				<li v-for="(item, index) in customers" :key="index">
					<router-link :to="{name: 'CustomerManagement', params: {id: 1}}">
						<p>{{item.name}}</p>
						<p>{{item.phoneNum}}</p>
						<x-icon type="ios-arrow-forward" size="30"></x-icon>
					</router-link>
				</li>
			</ul>
			<ul v-show="idx === 1">
				<li v-for="(item, index) in customers1" :key="index">
					<router-link :to="{name: 'CustomerManagement', params: {id: 1}}">
						<p>{{item.name}}</p>
						<p>{{item.phoneNum}}</p>
						<x-icon type="ios-arrow-forward" size="30"></x-icon>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { XHeader, Group, CellBox, XTable, Tab, TabItem } from 'vux'

export default {
  components: {
    XHeader,
    Group,
    CellBox,
    XTable,
		Tab,
		TabItem
  },
  data () {
  	return {
  		searchKey: '',
  		customers: [
  			{
  				name: '赵一',
  				phoneNum: '18888888888'
  			}, {
  				name: '董颖',
  				phoneNum: '17777777777'
  			}, {
  				name: '吴萌',
  				phoneNum: '16666666666'
  			}, {
  				name: 'lilian',
  				phoneNum: '15555555555'
  			}, {
  				name: 'joe',
  				phoneNum: '14444444444'
  			}, {
  				name: '孙艺洲',
  				phoneNum: '13333333333'
  			}, {
  				name: '蒙自',
  				phoneNum: '12222222222'
  			}, {
  				name: 'joe',
  				phoneNum: '12222224444'
  			}, {
  				name: '孙艺洲',
  				phoneNum: '13444433333'
  			}, {
  				name: '蒙自',
  				phoneNum: '13422222222'
  			}
  		],
  		customers1: [
  			{
  				name: '赵er',
  				phoneNum: '18888888888'
  			}, {
  				name: '董颖',
  				phoneNum: '17777777777'
  			}, {
  				name: '吴萌',
  				phoneNum: '16666666666'
  			}, {
  				name: 'lilian',
  				phoneNum: '15555555555'
  			}, {
  				name: 'joe',
  				phoneNum: '14444444444'
  			}, {
  				name: '孙艺洲',
  				phoneNum: '13333333333'
  			}, {
  				name: '蒙自',
  				phoneNum: '12222222222'
  			}, {
  				name: 'joe',
  				phoneNum: '12222224444'
  			}, {
  				name: '孙艺洲',
  				phoneNum: '13444433333'
  			}, {
  				name: '蒙自',
  				phoneNum: '13422222222'
  			}
  		],
			isCancel: false,
			idx: 0
  	}
  },
  computed: {
  	items () {
			let _search = this.searchKey
			let _customers = this.customers
			if (!_search) {
				return false
			} else {
  			 return _customers.filter(function (customer) {
  				return Object.keys(customer).some(function (key) {
  					if (String(customer[key]).toLowerCase().indexOf(_search) > -1) {
							customer = String(customer).replace(new RegExp(_search, 'g'), '<span class="search-text">' + _search + '</span>')
							console.log(customer)
							return customer
						}
  				})
  			})
			}
			// _customers.forEach(item => {
			// 	let replaceReg = new RegExp(_search, 'g')
			// 	let replaceString = '<span class="search-text">' + _search + '</span>'
			// 	for (let key in item) {
			// 		item[key] = item[key].replace(replaceReg, replaceString)
			// 	}
			// })
  		// return _customers
		}
	},
	// mounted () {
	// 	let replaceReg = new RegExp(this.searchKey, 'g')
	// 	items.replace(replaceReg, '<b>' + this.searchKey + '</b>')
	// },
	methods: {
		onItemClick (index) {
			this.idx = index
			console.log(index)
		},
		cancelSearchEvent () {
			this.isCancel = false
			this.searchKey = ''
		},
		searchEvent () {},
		toLink () {
			this.$router.push({name: 'CustomerManagement', params: {id: 1}})
		}
	}
}
</script>

<style scoped lang="less">
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/center.less';
.search {
	padding: 161px 0 35px 30px;
	.ipt {
		border: 1px solid #ccc; /*no*/
		padding: 21px 34px;
		border-radius: 5px;
		width: 636px;
		height: 67px;
		box-sizing: border-box;
		font-size: 28px; /*px*/
	}
	.btn-cancel {
		outline: none;
		background-color: #fff;
		color: #0083c5;
		font-size: 28px; /*px*/
		display: none;
		letter-spacing: 12px;
		margin-left: 30px;
	}
}
.cancelSearch {
	.ipt {
		width: 549px;
	}
	.btn-cancel {
		display: inline-block;
	}
}
.customer-list ul {
	padding: 20px 25px;
	background-color: #F5F5F5;
	padding-bottom: 96px;
	li {
    background-color: #fff;
    padding: 40px;
		font-size: 30px; /*px*/
		margin-bottom: 20px;
		position: relative;
		a {
			display: block;
			svg {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				right: 40px;
				fill: #999;
			}
		}
	}
}
.searchList {
	ul {
		padding: 30px;
		font-size: 30px; /*px*/
		li {
			border-top: 1px solid #eee;
			padding: 20px;
			.ml-200 {
				margin-left: 200px;
			}
		}
	}
}
.search-text {
	color: #FF4747;
}
</style>
