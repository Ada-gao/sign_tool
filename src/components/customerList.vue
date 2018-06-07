<template>
  <div>
    <x-header v-show="isCancel===false" :left-options="{showBack: false}">客户
      <router-link slot="right" :to="{name: 'NewCustomer', params: {isMod: 0}}" style="font-size: 30px">新增潜客
      </router-link>
    </x-header>
    <x-header v-show="isCancel===true" :left-options="{showBack: false}">客户查询
    </x-header>
    <div class="wrapper">
      <!-- 搜索框组件部分 -->
      <search-tool @searchHandler="updateSearchValue"></search-tool>
      <div class="space"></div>
      <!-- 展示搜索部分 -->
      <div v-show="isCancel===true" class="search-list">
        <h3 class="searchTitle">搜索结果</h3>
        <ul :data="searchCustomers">
          <li v-for="(item, index) in searchCustomers" :key="index" @click="toLink(item.client_id, item.client_class)">
            <show-search :msg="item" :searchValue="searchVal"></show-search>
          </li>
        </ul>
        <p v-show="!loadedData" style="text-align: center">没有符合你的数据啦</p>
      </div>
      <!-- 展示客户列表部分 -->
      <div class="customer-list" v-show="!isCancel">
        <div class="tabbar">
          <span class="tabitem" :class="{'active': idx === 0}" @click="changeActiveIndex">客户列表</span>
          <i class="sepa"></i>
          <span class="tabitem" :class="{'active': idx === 1}" @click="changeActiveIndex">潜客列表</span>
        </div>
        <ul v-show="idx === 0" :data="customers">
          <li v-for="(item, index) in customers" :key="index">
            <router-link :to="{name: 'CustomerManagement', params: {id: item.client_id}}">
              <p>
                <span class="left-item">{{item.name}}</span>
                <span class="left-item">（{{item.client_no}}）</span>
                <span class="left-item" style="display: block;">{{item.mobile}}</span>
                <span
                  :class="[{'red-color': item.client_type === '1'}, 'right-item']">{{item.client_type === "1" ? "专业投资者" : "普通投资者"}}</span>
              </p>
              <i class="iconfont icon-right"></i>
            </router-link>
          </li>
        </ul>
        <ul v-show="idx === 1" :data="customers1">
          <li v-for="(item, index) in customers1" :key="index" v-if="item.name">
            <router-link :to="{name: 'PotentialCustomerList', params: {id: item.client_id}}">
              <p>
                <span class="left-item">{{item.name}}</span>
                <span class="left-item" v-show="item.client_no">（{{item.client_no}}）</span>
                <span class="left-item" style="display: block;">{{item.mobile}}</span>
                <span class="right-item gray-item" v-show="item.certification_status === '0'">未认证</span>
                <span class="right-item gray-item" v-show="item.certification_status === '1'">认证待审核</span>
                <span class="right-item gray-item" v-show="item.certification_status === '2'">已认证</span>
                <span class="right-item gray-item" v-show="item.certification_status === '3'">已驳回</span>
              </p>
              <i class="iconfont icon-right"></i>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {XHeader, Group, CellBox, XTable, Tab, TabItem} from 'vux'
  import SearchTool from 'base/searchToolBar/searchToolBar'
  import ShowSearch from 'base/searchToolBar/showSearchList'
  import {checkCusomersList} from '@/service/api/customers'
  //  import {customerData} from '@/service/api/customerData'

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
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if (from.name === 'PotentialCustomerList' || from.name === 'NewCustomer') {
          vm.idx = 1
        }
      })
    },
    mounted () {
      checkCusomersList().then(res => {
        let data = res.data
        data.forEach(item => {
          if (item.client_class) {
            this.customers.push(item)
          } else {
            this.customers1.push(item)
          }
        })
      })
    },
    methods: {
      changeActiveIndex () {
        this.idx === 0 ? this.idx = 1 : this.idx = 0
      },
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
          url: '/v1/client/customers/',
          method: 'get',
          params: {
            q: this.searchVal
          },
          cancelToken: new this.CancelToken(c => {
            this.cancel = c
          })
        }).then(res => {
          console.log(res)
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
      toLink (id, clientClass) {
          console.log(clientClass)
          if (clientClass === 0) {
            this.$router.push({name: 'PotentialCustomerList', params: {id: id}})
          } else {
            this.$router.push({name: 'CustomerManagement', params: {id: id}})
          }
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/center.less';

  .tabbar {
    /*height: 80px;*/
    /*line-height: 80px;*/
    /*padding: 16px 0;*/
    background-color: #fff;
    width: 100%;
    font-size: 0;
    .tabitem {
      display: inline-block;
      font-size: 30px;
      color: #9b9b9b;
      height: 80px;
      line-height: 80px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      text-align: center;
      vertical-align: middle;
    }
    .tabitem:nth-of-type(1) {
      width: 374px;
    }
    .tabitem:nth-of-type(2) {
      width: 373px;
    }
    .active {
      color: #2672ba;
    }
    .sepa {
      vertical-align: middle;
      display: inline-block;
      width: 3px;
      height: 47px;
      background-color: #979797;
    }
  }

  .customer-list ul {
    padding: 20px 25px;
    background-color: #F5F5F5;
    padding-bottom: 96px;
    li {
      box-sizing: border-box;
      background-color: #fff;
      height: 155px;
      padding: 32px 47px 32px 32px;
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
          font-size: 28px;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          -webkit-transform: translateY(-50%);
          right: 100px;
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
