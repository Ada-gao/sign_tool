<template>
  <div id="signed_list">
    <!-- <mt-header fixed title="报名客户列表" class="header">
      <router-link :to="{name: 'activityDetail', params: {id: activityId}}" slot="left">
        <mt-button icon="back" class="def_btn"></mt-button>
      </router-link>
    </mt-header> -->
    <x-header :left-options="{backText: '', preventGoBack:true}" @on-click-back="toLink" class='header'>
      报名列表
    </x-header>
    <div class="detail">
      <div class="space"></div>
      <div class="signed_num">
        <span class="left">
          <p class="total_num">{{this.list.length}}人</p>
          <p class="name">总共报名</p>
        </span>
        <span class="middle">
          <p class="ownSigned_num">{{this.ownSigned}}人</p>
          <p class="name">自报名</p>
        </span>
        <span class="right">
          <p class="num">{{this.list.length - ownSigned}}人</p>
          <p class="name">代报名</p>
        </span>
      </div>
      <div class="space"></div>
      <ul class="signed_ul">
        <li v-for="item in list" :key="item.id" @click="handleRoute(item.activityClientId)">
          <div class="left">
            {{item.clientName}}（{{item.mobile}}）
          </div>
          <span class="right own" v-show="item.registrationType === '自报名'">
            {{item.registrationType}}
          </span>
          <span class="right other" v-show="item.registrationType === '代报名'">
            {{item.registrationType}}
          </span>
          <i class="iconfont absolute-center-y">&#xe8d5;</i>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import {XHeader} from 'vux'
  import { getSignedClientList } from '@/service/api/activity'
  import { getStore } from '@/config/mUtils'
  export default {
    components: {
      XHeader
    },
    data () {
      return {
        list: [],
        activityId: null,
        ownSigned: 0
      }
    },
    methods: {
      toLink () {
        this.$router.push({name: 'activityDetail', params: {id: this.activityId}})
      },
      getList () {
        getSignedClientList(this.activityId).then(res => {
          if (res.status === 200) {
            this.list = Object.assign([], res.data.records)
            this.list.forEach(item => {
              if (item.registrationType === 0) {
                this.ownSigned++
              }
              item.registrationType = item.registrationType === 0 ? '自报名' : '代报名'
            })
          }
        })
      },
      handleRoute (id) {
        this.$router.push({name: 'clientSigned', params: {id}})
      }
    },
    mounted () {
      this.activityId = getStore('activityId')
      this.getList()
    }
  }
</script>
<style lang="less">
  @import '../../common/style/variable.less';
  #signed_list {
    font-family: @font-family-R;
    // .mint-header.header {
    //   height: 88px;
    //   background-color: @new-header-color;
    //   font-size: 36px;
    //   color: #333;
    //   padding-top: 40px;
    // }
    .vux-header.header{
      background: @header-bg;
      .vux-header-left{
        .left-arrow:before{
          border-color: @text-font-color;
        }
      }
      .vux-header-title{
        color: @back-color-white;
      }
    }
    .detail {
      padding: 0 20px;
      padding-top: 126px;
      background-color: @new-bg-color;
      .signed_num{
        padding: 30px;
        background: @back-color-white;
        span{
          display: inline-block;
          text-align: center;
          width: 32.5%;
        }
        .left{
          text-align: left;
        }
        .right{
          text-align: right;
        }
        .total_num,.ownSigned_num,.num{
          line-height: 45px;
          font-size: @font-size-thirtyT;
          margin-bottom: 13px;
        }
        .total_num{
          color: @font-color-4A;
          margin-left: 10px;
        }
        .ownSigned_num{
          color: @font-color-green;
        }
        .num{
          color: @font-color-orange2;
          margin-right: 10px;
        }
        .name{
          font-size: @font-size-twentyF;/*px*/
          color: @font-color-9E;
          line-height: 33px;
        }
      }
      .signed_ul {
        li {
          background: #FFFFFF;
          box-shadow: 0 2px 10px 0 #E7E2DC;
          border-radius: 6px;
          padding: 30px;
          position: relative;
          .left {
            font-size: @font-size-twentyE;/*px*/
            color: @font-color-4A;
            display: inline-block;
          }
          .right {
            font-size: @font-size-twentyS;/*px*/
            float: right;
            margin-right: 89px;
          }
          .own{
            color: @font-color-green;
          }
          .other{
            color: @font-color-orange2;
          }
          i{
            font-size: 50px;
            color:#DADADA;
            right: 27px;
          }
        }
        li:not(:last-child) {
          margin-bottom: 20px;
        }
      }
    }
  }
</style>
