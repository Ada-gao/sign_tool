<template>
  <div class="activity_list">
    <mt-header fixed title="报名客户列表" class="header">
      <router-link :to="{name: 'activityDetail'}" slot="left">
        <mt-button icon="back" class="def_btn"></mt-button>
      </router-link>
    </mt-header>
    <div class="detail">
      <ul class="signed_ul">
        <li v-for="item in list" :key="item.id" @click="handleRoute(item)">
          <div class="left">
            {{item.clientName}}（{{item.mobile}}）
          </div>
          <div class="right">
            {{item.registrationType}}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import { getSignedClientList } from '@/service/api/activity'
  export default {
    components: {},
    data () {
      return {
        list: []
      }
    },
    methods: {
      getList () {
        getSignedClientList(1).then(res => {
          if (res.status === 200) {
            this.list = Object.assign([], res.data.records)
            this.list.forEach(item => {
              item.registrationType = item.registrationType === 0 ? '自报名' : '代报名'
            })
          }
        })
      },
      handleRoute (item) {
        this.$router.push({path: '/clientSigned/' + item.id, params: item})
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
    .detail {
      padding-top: 88px;
      background-color: @new-bg-color;
      .signed_ul {
        padding: 20px 27px;
        box-sizing: border-box;
        li {
          background: #FFFFFF;
          border: 1px solid #DDDDDD;
          border-radius: 5px;
          height: 155px;
          line-height: 155px;
          position: relative;
          padding: 0 34px;
          font-family: PingFangSC-Regular;
          font-size: 26px;
          .left, .right {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
          }
          .left {
            left: 34px;
            color: #333333;
          }
          .right {
            right: 34px;
            color: @new-font-color;
          }
        }
        li:not(:last-child) {
          margin-bottom: 20px;
        }
      }
    }
  }
</style>
