<template>
  <div class="customerList">
    <x-header v-show="isCancel===false" :left-options="{showBack: false}">客户
      <router-link slot="right" :to="{name: 'NewCustomer'}" class="add_newcustomer">新增潜客
      </router-link>
    </x-header>
    <x-header v-show="isCancel===true" :left-options="{showBack: false}">客户查询
    </x-header>
    <div class="wrapper">
      <loading :show="isShowSpinner"></loading>
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
          <span class="tabitem" :class="{'active': idx === 0}" @click="onItemClick(0)">客户列表</span>
          <!--<i class="sepa"></i>-->
          <span class="tabitem" :class="{'active': idx === 1}" @click="onItemClick(1)">潜客列表</span>
          <!--<i class="sepa"></i>-->
          <span class="tabitem" :class="{'active': idx === 2}" @click="onItemClick(2)">手机未验证客户</span>
        </div>
        <div class="list_box">
          <!--<loading :show="isShowSpinner"></loading>-->
          <ul v-show="idx === 0" :data="customers">
            <li v-for="(item, index) in customers" :key="index">
              <router-link :to="{name: 'CustomerManagement', params: {id: item.client_id}}">
                <div class="customer_list">
                  <div class="customer_left">
                    <span>{{item.name}}</span>
                    <span class="gray_item" v-show="item.realname_status === '0'">（实名未认证）</span>
                    <!-- <span class="gray_item" v-show="item.realname_status === '1'">（实名认证待审核）</span> -->
                    <span v-show="item.realname_status === '2'">（实名认证）</span>
                    <span class="red_color" v-show="item.realname_status === '4'">（实名认证过期）</span>
                    <span style="display: block;">{{item.mobile}}</span>
                  </div>
                  <div class="customer_right">
                    <!-- <todo:>确认显示状态</todo:> -->
                  <!-- <span :class="[{'red_color': item.client_type === '1'}]">
                    {{item.client_type === "1" ? "专业投资者" : "普通投资者"}}
                  </span> -->
                    <!-- <span class="gray_item" v-show="item.certification_status === '0'">投资者身份未认证</span> -->
                    <span class="gray_item" v-show="item.certification_status === '1'">认证待审核</span>
                    <!--<span v-show="item.certification_status === '2'">{{item.client_type === "1" ? "专业投资者" : "普通投资者"}}</span>-->
                    <span>{{item.client_type === "1" ? "专业投资者" : "普通投资者"}}</span>
                    <span class="red_color" v-show="item.certification_status === '3'">普通投资者身份验证失败</span>
                    <!--<span class="red_color" v-show="item.certification_status === '4'">普通投资者认证已过期</span>-->
                    <i class="iconfont icon-right"></i>
                  </div>
                </div>
                <!--<i class="iconfont icon-right"></i>-->
              </router-link>
            </li>
          </ul>
          <ul v-show="idx === 1" :data="customers1">
            <li v-for="(item, index) in customers1" :key="index" v-if="item.name">
              <router-link :to="{name: 'PotentialCustomerList', params: {id: item.client_id, mark: 1}}">
                <div class="customer_list">
                  <div class="customer_left">
                    <span>{{item.name}}</span>
                    <span class="gray_item" v-show="item.realname_status === '0'">（实名未认证）</span>
                    <span class="gray_item" v-show="item.realname_status === '1'">（实名认证待审核）</span>
                    <span v-show="item.realname_status === '2'">（实名认证）</span>
                    <span class="red_color" v-show="item.realname_status === '4'">（实名认证过期）</span>
                    <span style="display: block;">{{item.mobile}}</span>
                  </div>
                  <div class="customer_right">
                    <span class="gray_item" v-show="item.certification_status === '0'">投资者身份未认证</span>
                    <span class="gray_item" v-show="item.certification_status === '1'">投资者身份认证待审核</span>
                    <span class="gray_item" v-show="item.certification_status === '2'">投资者身份已认证</span>
                    <span class="red_color" v-show="item.certification_status === '3'">普通投资者身份验证失败</span>
                    <span class="red_color" v-show="item.certification_status === '4'">普通投资者认证已过期</span>
                    <i class="iconfont icon-right"></i>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
          <ul v-show="idx === 2" :data="customers2">
            <li v-for="(item, index) in customers2" :key="index" v-if="item.name">
              <router-link :to="{name: 'PotentialCustomerList', params: {id: item.client_id, mark: 2}}">
                <div class="customer_list">
                  <div class="customer_left">
                    <span>{{item.name}}</span>
                    <span style="display: block;">{{item.mobile}}</span>
                  </div>
                  <div class="customer_right">
                    <span class="gray_item" v-show="item.mobile_validated === '1'">手机号未认证</span>
                    <i class="iconfont icon-right"></i>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
          <div v-show="idx === 0 && customers.length === 0 && !this.isShowSpinner" class="no_data">
            <img src="static/img/customerIcon.png">
            <span>亲，暂时没有客户哦</span>
          </div>
          <div v-show="idx === 1 && customers1.length === 0 && !this.isShowSpinner"  class="no_data">
            <img src="static/img/customerIcon.png">
            <span>亲，暂时没有潜客哦</span>
          </div>
          <div v-show="idx === 2 && customers2.length === 0 && !this.isShowSpinner"  class="no_data">
            <img src="static/img/customerIcon.png">
            <span>亲，暂时没有手机未验证客户哦</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {XHeader, Group, CellBox, XTable, Tab, TabItem} from 'vux'
  import SearchTool from 'base/searchToolBar/searchToolBar'
  import ShowSearch from 'base/searchToolBar/showSearchList'
  import {checkCusomersList} from '@/service/api/customers'
  import Loading from 'base/loading'

  export default {
    components: {
      XHeader,
      Group,
      CellBox,
      XTable,
      Tab,
      TabItem,
      SearchTool,
      ShowSearch,
      Loading
    },
    data () {
      return {
        searchVal: '',
        isShowSpinner: true,
        customers: [],
        customers1: [],
        customers2: [],
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
        vm.idx = to.params.mark
      })
    },
    mounted () {
      checkCusomersList().then(res => {
        this.isShowSpinner = false
        let data = res.data
        data.forEach(item => {
          if (item.client_class === 1) {
            this.customers.push(item)
          } else if (item.client_class === 0) {
            this.customers1.push(item)
          } else if (item.client_class === null && item.mobile_validated === '1') {
            this.customers2.push(item)
          }
        })
      })
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
          url: '/v1/client/customers/',
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
      toLink (id, clientClass) {
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
      padding: 17px 0;
      .tabitem {
        display: inline-block;
        font-size: 30px;
        color: #9b9b9b;
        height: 46px;
        line-height: 46px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        text-align: center;
        vertical-align: middle;
        width: 33.3%;
        position: relative;
        &:after {
          position: absolute;
          display: inline-block;
          content: '';
          right: 0;
          top: 0;
          width: 3px;
          height: 47px;
          background-color: #979797;
        }
      }
      /*.tabitem:nth-of-type(1) {*/
        /*width: 246px;*/
      /*}*/
      /*.tabitem:nth-of-type(2) {*/
        /*width: 246px;*/
      /*}*/
      .tabitem:nth-of-type(3) {
        &:after {
          display: none;
        }
      }
      .active {
        color: #2672ba;
      }
      /*.sepa {*/
        /*vertical-align: middle;*/
        /*display: inline-block;*/
        /*width: 3px;*/
        /*height: 47px;*/
        /*background-color: #979797;*/
      /*}*/
    }

    .customer-list {
      height: calc(100% - 130px);
      .list_box {
        position: relative;
        height: calc(100% - 178px);
        ul {
          padding: 20px 25px;
          background-color: #F5F5F5;
          padding-bottom: 96px;
          li {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            background-color: #fff;
            font-size: 30px; /*px*/
            margin-bottom: 20px;
            a {
              width: 100%;
              display: block;
              height: 155px;
              text-decoration: none;
              position: relative;
              .customer_left,
              .customer_right {
                position: absolute;
                font-family: PingFangSC-Regular;
                font-size: 26px;
                color: #2672BA;
                height: 155px;
              }
              .customer_left {
                left: 34px;
                margin-top: 38px;
                height: auto;
                line-height: 40px;
                .gray_item{
                  color: #666;
                }
                .red_color{
                  color: #A10C0C;
                }
              }
              .customer_right {
                line-height: 155px;
                right: 47px;
                .red_color {
                  color: #A10C0C;
                }
                /*top: 54px;*/
                span {
                  vertical-align: middle;
                }
                .gray_item {
                  color: #666;
                }
                .icon-right {
                  font-size: 40px;
                  color: #999;
                  vertical-align: middle;
                }
              }
            }
          }
        }
        .no_data {
          img,
          span {
            display: block;
            text-align: center;
            margin: 0 auto;
          }
          img {
            width: 556px;
            height: 379px;
          }
          span {
            margin-top: 88px;
            font-family: PingFangSC-Regular;
            font-size: 32px;
            color: #888888;
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
