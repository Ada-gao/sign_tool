<template>
  <div class="customerList">
    <x-header :left-options="{showBack: false}" :class="{define_header: isClick}">
      <!-- 搜索框组件部分 -->
      <search-tool @searchHandler="updateSearchValue"
                   @cancel="handlerCancel"
                   @ensure="handlerEnsure"></search-tool>
      <router-link v-if="isCancel===false" slot="right" :to="{name: 'NewCustomer'}" class="add_newcustomer">
        <i class="iconfont add_icon">&#xe6bd;</i>
        <i>新增潜客</i>
      </router-link>
    </x-header>
    <div class="wrapper">
      <loading :show="isShowSpinner"></loading>
      <!-- 搜索框组件部分 -->
      <!--<search-tool @searchHandler="updateSearchValue"></search-tool>-->
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
          <span class="tabitem" :class="{'active': idx === 1}" @click="onItemClick(1)">潜客列表</span>
          <span class="tabitem" :class="{'active': idx === 2}" @click="onItemClick(2)">手机未验证客户</span>
        </div>
        <div class="list_box">
          <ul v-show="idx === 0" :data="customers">
            <li v-for="(item, index) in customers" :key="index">
              <router-link :to="{name: 'CustomerManagement', params: {id: item.client_id}}">
                <div class="customer_list">
                  <div class="customer_left">
                    <span class="font28">{{item.name}}</span>
                    <span>{{item.mobile}}</span>
                  </div>
                  <div class="customer_right">
                    <div class="right_cont">
                      <span class="success_certy">实名已认证</span>
                      <span class="wait_certy" v-if="item.certification_status === '1'">认证待审核</span>
                      <span class="no_certy" v-else-if="item.certification_status === '3'">认证失败</span>
                      <span class="expire_certy" v-else-if="item.certification_status === '4'">认证已过期</span>
                      <span class="success_certy" v-else-if="item.certification_status === '2'">{{item.client_type === "1" ? "专业投资者" : "普通投资者"}}</span>
                      <i class="iconfont icon-right"></i>
                    </div>
                  </div>
                </div>
              </router-link>
            </li>
            <li class="bottom_line" style="background-color: transparent;" v-if="idx === 0 && customers.length >= 5 && !this.isShowSpinner">
              <span></span>
              <span>我是有底线的</span>
              <span></span>
            </li>
          </ul>
          <ul v-show="idx === 1" :data="customers1">
            <li v-for="(item, index) in customers1" :key="index" v-if="item.name">
              <router-link :to="{name: 'PotentialCustomerList', params: {id: item.client_id, mark: 1}}">
                <div class="customer_list">
                  <div class="customer_left">
                    <span class="font28">{{item.name}}</span>
                    <span>{{item.mobile}}</span>
                  </div>
                  <div class="customer_right">
                    <div class="right_cont">
                      <span class="no_certy" v-if="item.realname_status === '0'">实名未认证</span>
                      <span class="wait_certy" v-else-if="item.realname_status === '1'">实名认证待审核</span>
                      <span class="success_certy" v-else-if="item.realname_status === '2'">实名已认证</span>
                      <span class="no_certy" v-else-if="item.realname_status === '3'">实名认证失败</span>
                      <span class="expire_certy" v-else-if="item.realname_status === '4'">实名认证已过期</span>
                      <span class="no_certy" v-if="item.certification_status === '0'">投资者类型未认证</span>
                      <span class="wait_certy" v-else-if="item.certification_status === '1'">投资者类型认证待审核</span>
                      <span class="success_certy" v-else-if="item.certification_status === '2'">投资者类型已认证</span>
                      <span class="no_certy" v-else-if="item.certification_status === '3'">投资者类型认证失败</span>
                      <span class="expire_certy" v-else-if="item.certification_status === '4'">投资者类型认证已过期</span>
                      <i class="iconfont icon-right"></i>
                    </div>
                  </div>
                </div>
              </router-link>
            </li>
            <li class="bottom_line" style="background-color: transparent;" v-if="idx === 1 && customers1.length >= 5 && !this.isShowSpinner">
              <span></span>
              <span>我是有底线的</span>
              <span></span>
            </li>
          </ul>
          <ul v-show="idx === 2" :data="customers2">
            <li v-for="(item, index) in customers2" :key="index" v-if="item.name">
              <router-link :to="{name: 'PotentialCustomerList', params: {id: item.client_id, mark: 2}}">
                <div class="customer_list">
                  <div class="customer_left">
                    <span class="font28">{{item.name}}</span>
                    <span>{{item.mobile}}</span>
                  </div>
                  <div class="novalidate_right">
                    <div class="right_cont">
                      <span class="no_certy" v-show="item.mobile_validated === '1'">手机号未认证</span>
                      <i class="iconfont icon-right"></i>
                    </div>
                  </div>
                </div>
              </router-link>
            </li>
            <li class="bottom_line" style="background-color: transparent;" v-if="idx === 2 && customers2.length >= 5 && !this.isShowSpinner">
              <span></span>
              <span>我是有底线的</span>
              <span></span>
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
        isClick: null,
        CancelToken: this.$axios.CancelToken
      }
    },
//    beforeRouteEnter (to, from, next) {
//      next(vm => {
//        if (!from.params.mark) {
//          vm.idx = 0
//        } else {
//          vm.idx = from.params.mark
//        }
//      })
//    },
    mounted () {
      this.idx = this.$route.params.mark ? this.$route.params.mark : 0
      this.getList()
    },
    methods: {
      getList () {
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
      onItemClick (index) {
        this.idx = index
      },
      handlerEnsure (data) {
        this.isClick = data
      },
      handlerCancel (data) {
        this.isClick = data
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
  @import '../../common/style/variable';
  .tabbar {
    height: 80px;
    line-height: 80px;
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
      width: 33.3%;
      position: relative;
    }
    .active {
      color: @new-font-color;
      &:after {
        position: absolute;
        display: inline-block;
        content: '';
        left: 7%;
        bottom: 0;
        width: 86%;
        height: 6px;
        background-color: @new-font-color;
      }
    }
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
          margin-bottom: 20px;
          a {
            width: 100%;
            display: block;
            height: 167px;
            position: relative;
            .customer_list {
              width: 100%;
              height: 100%;
              .customer_left,
              .customer_right {
                position: absolute;
                font-family: PingFangSC-Regular;
                font-size: 26px;
                height: 155px;
                width: 50%;
                box-sizing: border-box;
              }
              .customer_left {
                left: 34px;
                margin-top: 38px;
                height: auto;
                line-height: 40px;
                span {
                  display: block;
                }
                .font28 {
                  font-size: 28px;
                }
                span:nth-of-type(2) {
                  margin-top: 30px;
                }
              }
              .customer_right {
                right: 30px;
                height: 100%;
                .right_cont {
                  position: relative;
                  width: 100%;
                  height: 100%;
                  span {
                    position: absolute;
                    right: 70px;
                  }
                  span:nth-of-type(1) {
                    top: 24%;
                  }
                  span:nth-of-type(2) {
                    bottom: 13%;
                  }
                  .icon-right {
                    font-size: 40px;
                    color: #e6e6e6;
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%);
                  }
                }
              }
              .novalidate_right {
                position: absolute;
                width: 50%;
                right: 30px;
                top: 50%;
                transform: translateY(-50%);
                height: 100%;
                .right_cont {
                  position: relative;
                  width: 100%;
                  height: 100%;
                  text-align: right;
                  .icon-right {
                    font-size: 40px;
                    color: #e6e6e6;
                    margin-left: 20px;
                  }
                  span, i {
                    vertical-align: middle;
                    height: 100%;
                    display: inline-block;
                    line-height: 167px;
                  }
                }
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
  .list_name {
    font-size: 28px;
  }
  .bottom_line {
    width: 100%;
    font-size: 0;
    text-align: center;
    span {
      display: inline-block;
      vertical-align: middle;
    }
    span:nth-of-type(odd) {
      /*height: 1px;*/
      border: 1px solid #D6D6D6;
      width: 15.14%;
    }
    span:nth-of-type(2) {
      font-size: 24px;
      color: #D6D6D6;
      margin: 0 20px;
    }
  }
</style>
