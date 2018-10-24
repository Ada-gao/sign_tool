<template>
  <div id="activity_list">
    <!-- <mt-header fixed title="活动列表" class="header">
      <router-link to="/" slot="left">
        <mt-button icon="back" class="def_btn"></mt-button>
      </router-link>
    </mt-header> -->
    <x-header class="header" :left-options="{backText: '', preventGoBack: true}" @on-click-back="back()">活动列表</x-header>
    <div class="activity_cont">
      <ul>
        <li v-for="(item, index) in list" :key="index" @click="handleRouter(item.activityId)">
          <div class="img"><img :src="item.activityBannerUrl" alt=""></div>
          <div class="bottom">
            <div class="left">
              <p class="title">
                <span class="tit">{{item.activityName}}</span>
                <span class="address">
                  <i class="iconfont">&#xe647;</i>
                  <span>{{item.activitySite}}</span>
                </span>
              </p>
              <p class="time">
                活动时间：{{item.activityStart}} - {{item.activityEnd}}
              </p>
            </div>
          </div>
        </li>
      </ul>
      <div class="bottom-line text-center" v-if="this.list.length >= 2">
				<span class="bot">我是有底线的</span>
			</div>
    </div>
  </div>
</template>
<script>
  import { XHeader } from 'vux'
  import { getActivityList } from '@/service/api/activity'
  import { parseTime } from '@/common/js/filter'
  export default {
    components: {
      XHeader
    },
    data () {
      return {
        src: 'static/img/测试banner.jpg',
        list: []
      }
    },
    methods: {
      back () {
        this.$router.push({name: 'HomePage'})
      },
      getList () {
        getActivityList().then(res => {
          if (res.status === 200) {
            this.list = Object.assign([], res.data.records)
            this.list.forEach(item => {
              item.activityStart = parseTime(item.activityStart, '{y}.{m}.{d} {h}:{i}')
              item.activityEnd = parseTime(item.activityEnd, '{y}.{m}.{d} {h}:{i}')
            })
          }
        })
      },
      handleRouter (id) {
        this.$router.push({name: 'activityDetail', params: {id}})
      }
    },
    mounted () {
      this.getList()
    }
  }
</script>
<style lang="less">
  @import '../../common/style/variable.less';
  #activity_list {
    font-family: @font-family-M;
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
    .activity_cont {
      padding-top: 88px;
      // padding-top: 126px;
      background-color: @new-bg-color;
      li {
        height: 488px;
        margin-bottom: 20px;
        background: @back-color-white;
        padding: 30px 30px;
        box-sizing: border-box;
        img{
          width: 100%;
          height: 309px;
        }
        // .img{
        //   width: calc(100% - 60px);
        //   margin: 0 auto;
        //   overflow: hidden;
        //   height: 309px;
        //   margin-bottom: 20px;
        //   img {
        //     display: block;
        //     width: calc(100% + 60px);
        //     margin-left: -30px;
        //   }
        // }
        .bottom {
          color: @font-color-9B;
          // padding: 0 30px;
          .left {
            .title{
              margin-bottom: 20px;
              height: 45px;
              line-height: 45px;
              .tit{
                display: inline-block;
                font-size: @font-size-thirtyT;/*px*/
                color: #2E2E2E;
                width: 570px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
              }
              .address{
                display: inline-block;
                width: 100px;
                font-size: @font-size-twentyS;/*px*/
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                i{
                  font-size: 32px;/*px*/
                }
              }
            }
            .time{
              font-family: @font-family-R;
              font-size: @font-size-twentyF;/*px*/
              color: @font-color-9B;
            }
          }
        }
      }
      li:last-child {
        margin-bottom: 0px;
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
    }
  }
</style>
