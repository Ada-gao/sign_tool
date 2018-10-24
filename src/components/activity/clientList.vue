<template>
  <div id="activity_singed_list">
    <mt-popup v-model="popupVisible" class="signed_pop">
      <!-- <div class="popup_box">
        <div class="pop_tit">报名成功</div>
        <div class="btn_box">
          <mt-button @click="handlerContinue">继续报名</mt-button>
          <mt-button @click="handlerReturn">返回列表</mt-button>
        </div>
      </div> -->
      <div class="confirm_box text-center">
        <img src="static/img/certify_right.png" alt="">
        <!-- <i class="iconfont icon_success"
            v-show="showSubmit.isSuccess !== 2">&#xe60a;</i> -->
        <!-- <img src="static/img/certify_wrong.png" alt=""> -->
        <!-- <i class="iconfont icon_fail"
            v-show="showSubmit.isSuccess === 2">&#xe626;</i> -->
        <div class="confirm_cont">{{this.signedName}}报名成功</div>
        <div class="btn_box">
          <span class="confirm_btn" @click="returnDetail">返回详情</span>
          <span class="confirm_btn" @click="continueSigned">继续报名</span>
        </div>
      </div>
    </mt-popup>
    <!-- <mt-header fixed title="客户" class="header">
      <router-link :to="{name: 'activityDetail', params: {id: activityId}}" slot="left">
        <mt-button icon="back" class="def_btn"></mt-button>
      </router-link>
    </mt-header> -->
    <x-header :left-options="{showBack: showBack, backText: '', preventGoBack:true}" @on-click-back="toLink" :class="isClick ? 'define_header header' : 'header'">
      <!-- 搜索框组件部分 -->
      <search-tool @searchHandler="updateSearchValue"
                   @cancel="handlerCancel"
                   @ensure="handlerEnsure"></search-tool>
    </x-header>
    <!-- <x-header v-show="isCancel===true" :left-options="{showBack: false}">客户查询 -->
    <!-- </x-header> -->
    <div class="wrapper">
      <loading :show="isShowSpinner"></loading>
      <!-- 搜索框组件部分 -->
      <!-- <search-tool @searchHandler="updateSearchValue"></search-tool> -->
      <!-- <div class="space"></div> -->
      <!-- 展示搜索部分 -->
      <div v-show="isCancel===true" class="search-list">
        <h3 class="searchTitle">搜索结果</h3>
        <ul :data="searchCustomers">
          <li v-for="(item, index) in searchCustomers" :key="index">
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
        </div>
        <div class="list_box">
          <ul v-show="idx === 0" :data="customers">
            <li v-for="(item, index) in customers" :key="index" @click="handlerClick(item.client_id, item.name)">
                <div class="customer_list">
                  <div class="customer_left">
                    <span class="name">{{item.name}}</span>
                    <!-- <span class="gray_item" v-show="item.realname_status === '0'">（实名未认证）</span>
                    <span v-show="item.realname_status === '2'">（实名认证）</span>
                    <span class="red_color" v-show="item.realname_status === '4'">（实名认证过期）</span> -->
                    <span style="display: block;">{{item.mobile}}</span>
                  </div>
                  <div class="customer_right">
                    <span style="display: block;" class="no_signed">未报名</span>
                    <span class="wait_certy" v-show="item.certification_status === '1'">认证待审核</span>
                    <span class="no_certy" v-show="item.certification_status === '3'">身份验证失败</span>
                    <span class="expire_certy" v-show="item.certification_status === '4'">认证已过期</span>
                    <span class="success_certy" v-show="item.certification_status === '2'">{{item.client_type === "1" ? "专业投资者" : "普通投资者"}}</span>
                  </div>
                  <i class="iconfont absolute-center-y">&#xe8d5;</i>
                </div>
            </li>
            <li class="bottom_line" style="background-color: transparent;" v-if="idx === 0 && customers.length >= 5 && !this.isShowSpinner">
              <span></span>
              <span>我是有底线的</span>
              <span></span>
            </li>
          </ul>
          <ul v-show="idx === 1" :data="customers1">
            <li v-for="(item, index) in customers1" :key="index" v-if="item.name" @click="handlerClick(item.client_id)">
                <div class="customer_list">
                  <div class="customer_left">
                    <span class="name">{{item.name}}</span>
                    <!-- <span class="gray_item" v-show="item.realname_status === '0'">（实名未认证）</span>
                    <span class="gray_item" v-show="item.realname_status === '1'">（实名认证待审核）</span>
                    <span v-show="item.realname_status === '2'">（实名认证）</span>
                    <span class="red_color" v-show="item.realname_status === '4'">（实名认证过期）</span> -->
                    <span style="display: block;">{{item.mobile}}</span>
                  </div>
                  <div class="customer_right">
                    <span style="display: block;" class="no_signed">未报名</span>
                    <span class="no_certy" v-show="item.certification_status === '0'">投资者类型未认证</span>
                    <span class="wait_certy" v-show="item.certification_status === '1'">投资者类型认证待审核</span>
                    <span class="success_certy" v-show="item.certification_status === '2'">投资者类型已认证</span>
                    <span class="no_certy" v-show="item.certification_status === '3'">投资者类型认证失败</span>
                    <span class="expire_certy" v-show="item.certification_status === '4'">投资者类型认证已过期</span>
                    <i class="iconfont absolute-center-y">&#xe8d5;</i>
                  </div>
                </div>
            </li>
            <li class="bottom_line" style="background-color: transparent;" v-if="idx === 1 && customers1.length >= 5 && !this.isShowSpinner">
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
  import { signActivity, getSignedClientList } from '@/service/api/activity'
  import { getStore, removeStore } from '@/config/mUtils'
  import Loading from 'base/loading'
  import { MessageBox } from 'mint-ui'

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
        searchCustomers: [],
        isCancel: false,
        idx: 0,
        loadedData: true,
        cancel: null,
        CancelToken: this.$axios.CancelToken,
        popupVisible: false,
        activityId: null,
        isClick: null,
        showBack: true,
        signedList: [],
        allList: [],
        signedName: ''
      }
    },
    mounted () {
      this.activityId = getStore('activityId')
      this.getList()
    },
    methods: {
      toLink () {
        this.$router.push({name: 'activityDetail', params: {id: this.activityId}})
      },
      getList () {
        checkCusomersList().then(res => {
          this.isShowSpinner = false
          let data = res.data
          this.allList = data
          getSignedClientList(this.activityId).then(res => {
            if (res.status === 200) {
              this.signedList = Object.assign([], res.data.records)
              var length2 = this.signedList.length
              var length1 = this.allList.length
              for (var i = 0; i < length1; i++) {
                  for (var j = 0; j < length2; j++) {
                      // 判断添加的数组是否为空了
                      if (this.allList.length > 0) {
                          if (this.allList[i]['client_id'] === this.signedList[j]['clientId']) {
                              this.allList.splice(i, 1) // 利用splice函数删除元素，从第i个位置，截取长度为1的元素
                              length1--
                          }
                      }
                  }
              }
              for (var n = 0; n < this.signedList.length; n++) {
                  this.allList.push(this.signedList[n])
              }
              this.allList.forEach(item => {
                if (item.client_class === 1) {
                  this.customers.push(item)
                } else if (item.client_class === 0 && item.realname_status === '2') {
                  this.customers1.push(item)
                }
              })
            }
          })
          // this.allList.forEach(item => {
          //   if (item.client_class === 1) {
          //     this.customers.push(item)
          //   } else if (item.client_class === 0 && item.realname_status === '2') {
          //     this.customers1.push(item)
          //   }
          // })
        })
      },
      handlerContinue () {
        this.popupVisible = false
      },
      handlerReturn () {
        this.popupVisible = false
        removeStore('activityId')
        this.$router.replace({name: 'activityList'})
      },
      handlerClick (id, name) {
        this.signedName = name
        MessageBox.confirm(`确定给${name}报名活动吗？`, '提交确认').then(action => {
          let params = {
            clientId: id,
            activityId: this.activityId
          }
          signActivity(params).then(res => {
              this.popupVisible = true
          })
        })
      },
      returnDetail () {
        this.$router.push({name: 'activityDetail', params: {id: this.activityId}})
      },
      continueSigned () {
        this.popupVisible = false
        location.reload()
      },
      onItemClick (index) {
        this.idx = index
      },
      handlerEnsure (data) {
        this.isClick = data
        this.showBack = false
      },
      handlerCancel (data) {
        this.isClick = data
        this.showBack = true
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
      }
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/center.less';
  @import '../../common/style/variable.less';
  #activity_singed_list {
    font-family: @font-family-R;
    // .mint-header.header {
    //   height: 98px;
    //   background-color: @new-header-color;
    //   font-size: 36px;
    //   color: #333;
    //   padding-top: 30px;
    // }
    .vux-header.header{
      background: @header-bg;
      .vux-header-left{
        .left-arrow:before{
          border-color: @text-font-color;
        }
      }
      .vux-header-title{
        margin-left: 60px;
      }
    }
    .vux-header.define_header{
      .vux-header-title{
        width: 90%;
        .cancelSearch{
          .ipt{
            width: 85%;
          }
        }
      }
    }
  }
  .confirm_box {
    border-radius: 8px;
    width: 560px;
    height: 549px;
    padding-top: 40px;
    font-family: @font-family-R;
    font-size: @font-size-thirtyT;/*px*/
    color: #4A4A4A;
    img{
      width: 283px;
    }
    .confirm_cont{
      margin: 25px 0;
    }
    .btn_box {
      width: 100%;
      border-top: 1px solid #D2D3D5;
      .confirm_btn{
        display: inline-block;
        width: 49%;
        font-size: @font-size-thirtyS;/*px*/
        color: @text-font-color;
        line-height: 100px;
      }
      .confirm_btn:first-child{
        border-right: 1px solid #D2D3D5;
      }
    }
  }
  // .signed_pop {
  //   width: 77.3%;
  //   height:345px;
  //   .popup_box {
  //     position: relative;
  //     width: 100%;
  //     height: 100%;
  //     font-family: PingFangSC-Regular;
  //     .pop_tit {
  //       position: absolute;
  //       top: 40%;
  //       left: 50%;
  //       transform: translate(-50%, -50%);
  //       font-size: 30px;
  //       color: #333333;
  //     }
  //     .btn_box {
  //       position: absolute;
  //       bottom: 50px;
  //       width: 100%;
  //       text-align: center;
  //       button {
  //         width: 200px;
  //         height: 58px;
  //         line-height: 58px;
  //         text-align: center;
  //         background: @new-font-color;
  //         border-radius: 10px;
  //         font-size: 24px;
  //         color: #F0F0F0;
  //       }
  //       button:nth-of-type(1) {
  //         margin-right: 20px;
  //       }
  //     }
  //     /*div, button {
  //       position: absolute;
  //       left: 50%;
  //       transform: translateX(-50%);
  //     }
  //     div {
  //       top: 30%;
  //       width: 100%;
  //       text-align: center;
  //       font-size: 30px;
  //       color: #333333;
  //     }
  //     button {
  //       bottom: 15%;
  //       display: block;
  //       width: 200px;
  //       height: 58px;
  //       line-height: 58px;
  //       text-align: center;
  //       background: @new-font-color;
  //       border-radius: 10px;
  //       font-size: 24px;
  //       color: #F0F0F0;
  //     }*/
  //   }
  // }
  .wrapper{
    padding-top: 88px;
  }
  .tabbar {
    height: 88px;
    line-height: 88px;
    background-color: #fff;
    width: 100%;
    font-size: 0;
    // padding: 17px 0;
    .tabitem {
      display: inline-block;
      font-size: 30px;
      color: #9b9b9b;
      height: 88px;
      line-height: 88px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      text-align: center;
      vertical-align: middle;
      width: 50%;
      position: relative;
      // &:after {
      //   position: absolute;
      //   display: inline-block;
      //   content: '';
      //   right: 0;
      //   top: 0;
      //   width: 3px;
      //   height: 47px;
      //   background-color: #979797;
      // }
    }
    // .tabitem:nth-of-type(2) {
    //   &:after {
    //     display: none;
    //   }
    // }
    .active {
      color: @new-font-color;
      &:after {
        position: absolute;
        display: inline-block;
        content: '';
        left: 50%;
        transform: translate(-50%, 0);
        bottom: 0;
        width: 120px;
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
        // padding: 20px 25px;
        // background-color: #F5F5F5;
        // padding-bottom: 96px;
        padding: 20px;
        li {
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          background-color: #fff;
          padding: 30px;
          margin-bottom: 20px;
          // font-size: 30px; /*px*/
          // width: 100%;
          // display: block;
          // height: 155px;
          // text-decoration: none;
          // position: relative;
          .customer_list {
            width: 100%;
            height: 100%;
            position: relative;
            .customer_left,
            .customer_right {
              // position: absolute;
              font-size: @font-size-twentyS;/*px*/
              display: inline-block;
              line-height: 37px;
              // color: #2672BA;
              // height: 155px;
              // width: 50%;
              // box-sizing: border-box;
            }
            .customer_left {
              // left: 34px;
              // margin-top: 38px;
              // height: auto;
              line-height: 40px;
              color: @font-color-4A;
              .name{
                display: inline-block;
                font-family: @font-family-M;
                font-size: @font-size-twentyE;/*px*/
                line-height: 40px;
                margin-bottom: 30px;
              }
              // .gray_item{
              //   color: #666;
              // }
              // .red_color{
              //   color: #A10C0C;
              // }
            }
            .customer_right {
              // line-height: 155px;
              // right: 47px;
              text-align: right;
              float: right;
              margin-right: 30px;
              .no_signed{
                color: @font-color-9E;
                margin-bottom: 30px;
              }
              // .red_color {
              //   color: #A10C0C;
              // }
              // /*top: 54px;*/
              // span {
              //   vertical-align: middle;
              // }
              // .gray_item {
              //   color: #666;
              // }
            }
            .iconfont {
              font-size: 40px;
              color: #E6E6E6;
              vertical-align: middle;
              right: -10px;
              margin-left: 10px;
            }
          }
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
