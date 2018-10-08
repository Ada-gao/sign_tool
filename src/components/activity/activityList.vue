<template>
  <div class="activity_list">
    <!-- <mt-header fixed title="活动列表" class="header">
      <router-link to="/" slot="left">
        <mt-button icon="back" class="def_btn"></mt-button>
      </router-link>
    </mt-header> -->
    <x-header class="header" :left-options="{backText: ''}">活动列表</x-header>
    <div class="activity_cont">
      <ul>
        <li v-for="(item, index) in list" :key="index" @click="handleRouter(item.activityId)">
          <div class="header">{{index + 1}}</div>
          <img :src="src" alt="">
          <div class="bottom">
            <div class="left">
              <i class="iconfont">&#xe637;</i>
              <span>{{item.activitySite}}</span>
            </div>
            <div class="right">
              <span>
                <i>开始：</i>
                <i>{{item.activityStart}}</i>
              </span>
              <span>
                <i>结束：</i>
                <i>{{item.activityEnd}}</i>
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import { getActivityList } from '@/service/api/activity'
  import { parseTime } from '@/common/js/filter'
  export default {
    components: {},
    data () {
      return {
        src: 'static/img/banner.jpg',
        list: null
      }
    },
    methods: {
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
<style lang="less" scoped>
  @import '../../common/style/variable.less';
  .activity_list {
    font-family: PingFangSC-Regular;
    .mint-header.header {
      height: 88px;
      background-color: @new-header-color;
      font-size: 36px;
      color: #333;
      padding-top: 40px;
    }
    .activity_cont {
      padding-top: 88px;
      background-color: @new-bg-color;
      li {
        .header {
          height: 96px;
          line-height: 96px;
          color: @new-font-color;
          padding-left: 20px;
          font-size: 30px;
        }
        img {
          display: block;
          width: 100%;
          height: 370px;
        }
        .bottom {
          position: relative;
          height: 118px;
          color: #626161;
          .left, .right {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
          }
          .left {
            left: 20px;
            font-size: 26px;
            i, span {
              vertical-align: baseline;
            }
            i {
              font-size: 30px;
            }
          }
          .right {
            right: 20px;
            font-size: 24px;
            width: 280px;
            height: 66px;
          }
        }
      }
      li:not(:last-child) {
        border-bottom: 1px solid #dadada;
      }
    }
  }
</style>
