<template>
  <div>
    <x-header v-show="isCancel===false" :left-options="{showBack: false}">客户
      <router-link slot="right" :to="{name: 'NewCustomer', params: {isMod: 0}}">新增潜客</router-link>
    </x-header>
    <x-header v-show="isCancel===true" :left-options="{showBack: false}">客户查询
    </x-header>
    <!-- 搜索框组件部分 -->
    <search-tool @searchHandler="updateSearchValue"></search-tool>
    <div class="space"></div>
    <!-- 展示搜索部分 -->
    <div v-show="isCancel===true" class="search-list">
      <h3 class="searchTitle">搜索结果</h3>
      <ul :data="searchCustomers">
        <li v-for="(item, index) in searchCustomers" :key="index" @click="toLink(item.client_id)">
          <show-search :msg="item" :searchValue="searchVal"></show-search>
        </li>
      </ul>
      <p v-show="!loadedData" style="text-align: center">没有符合你的数据啦</p>
    </div>
    <!-- 展示客户列表部分 -->
    <div class="customer-list" v-show="!isCancel">
      <tab :line-width="5" active-color="#0083c5" v-model="idx">
        <tab-item selected @on-item-click="onItemClick">客户列表</tab-item>
        <tab-item @on-item-click="onItemClick">潜客列表</tab-item>
      </tab>
      <ul v-show="idx === 0" :data="customers">
        <li v-for="(item, index) in customers" :key="index">
          <router-link :to="{name: 'CustomerManagement', params: {id: item.client_id}}">
            <!--<p>{{item.name}}</p>-->
            <!--<p style="margin-top: 10px">{{item.mobile}}</p>-->
            <p>
              <span class="left-item">{{item.name}}</span>
              <span :class="[{'red-color': item.client_type === 1}, 'right-item']">{{item.client_type ? "专业投资者" : "普通投资者"}}</span>
            </p>
            <i class="iconfont icon-right"></i>
          </router-link>
        </li>
      </ul>
      <ul v-show="idx === 1" :data="customers1">
        <li v-for="(item, index) in customers1" :key="index" v-if="item.name">
          <router-link :to="{name: 'CustomerManagement', params: {id: item.client_id}}">
            <!--<p>{{item.name}}</p>-->
            <!--<p style="margin-top: 10px">{{item.mobile}}</p>-->
            <p>
              <span class="left-item">{{item.name}}</span>
              <span class="right-item gray-item" v-show="item.certification_status === 0">未认证</span>
              <span class="right-item gray-item" v-show="item.certification_status === 1">认证待审核</span>
            </p>
            <i class="iconfont icon-right"></i>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {XHeader, Group, CellBox, XTable, Tab, TabItem} from 'vux'
  import SearchTool from 'base/searchToolBar/searchToolBar'
  import ShowSearch from 'base/searchToolBar/showSearchList'
//  import {checkCusomersList} from '@/service/api/customers'
  import {customerData} from '@/service/api/customerData'

  export default {
    components: {
      XHeader,
      Group,
      CellBox,
      XTable,
      Tab,
      TabItem,
      SearchTool,
      ShowSearch
    },
    data () {
      return {
        searchVal: '',
        customers: [],
        customers1: [],
        searchCustomers: [],
        isCancel: false,
        idx: 0,
        loadedData: true,
        cancel: null,
        CancelToken: this.$axios.CancelToken
      }
    },
    mounted () {
//	  checkCusomersList().then(res => {
//			let data = res.data
//      console.log(data)
//		  data.forEach(item => {
//			  if (item.client_class) {
//				  this.customers.push(item)
//			  } else {
//				  this.customers1.push(item)
//			  }
//		  })
//	  })

      customerData.forEach(item => {
        if (item.client_class) {
          this.customers.push(item)
        } else {
          this.customers1.push(item)
        }
      })
    },
    computed: {
      // items () {
      // 	let _this = this
      // 	let _search = this.searchKey
      // 	let _customers = this.customers
      // 	if (!_search) {
      // 		return false
      // 	} else {
      // 		 return _customers.filter(function (customer) {
      // 			return Object.keys(customer).some(function (key) {
      // 				if (String(customer[key]).toLowerCase().indexOf(_search) > -1) {
      // 				// customer = String(customer).replace(new RegExp(_search, 'g'), '<span class="search-text">' + _search + '</span>')
      // 				if (customer.length === 0) {
      // 					_this.loadedData = false
      // 				} else {
      // 					_this.loadedData = true
      // 				}
      // 				return customer
      // 			}
      // 			})
      // 		})
      // 	}
      // }
    },
    watch: {
      items (newVal, oldVal) {
        if (newVal.length === 0) {
          this.loadedData = false
        }
      }
    },
    methods: {
      onItemClick (index) {
        this.idx = index
      },
      updateSearchValue (data) {
        this.searchVal = data._search
        this.isCancel = data.isCancel

        if (this.searchVal === '' || !this.searchVal) {
          this.searchCustomers = []
          return
        }

        this.$axios({
          url: '/v1/client/searchCustomers/',
          method: 'get',
          params: {
            q: this.searchVal
          },
          cancelToken: new this.CancelToken(c => {
            this.cancel = c
          })
        }).then(res => {
          if (res.status === 200) {
            if (res.data.length === 0) {
              this.loadedData = false
              this.searchCustomers = []
            } else {
              this.loadedData = true
              this.searchCustomers = res.data
            }
          }
        })
      },
      toLink (id) {
        this.$router.push({name: 'CustomerManagement', params: {id: id}})
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/center.less';

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
        text-decoration: none;
        .left-item,
        .right-item {
          color: #0083c5;
        }
        .right-item {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          -webkit-transform: translateY(-50%);
          right: 70px;
        }
        .gray-item {
          color: #999;
        }
        .red-color {
          color: #a10c0c;
        }
        i {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          -webkit-transform: translateY(-50%);
          right: 40px;
          font-size: 30px; /*px*/
          font-weight: bold;
          color: #999;
          // fill: #999;
        }
      }
    }
  }

  .search-list {
    padding-bottom: 96px;
    .searchTitle {
      padding-top: 26px;
      padding-left: 28px;
    }
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

  a {
    text-decoration: none;
  }
</style>
