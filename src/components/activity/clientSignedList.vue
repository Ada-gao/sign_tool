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
            {{item.name}}（{{item.mobile}}）
          </div>
          <div class="right">
            {{item.method}}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    components: {},
    data () {
      return {
        list: [
          {
            id: 0,
            name: 'paul',
            mobile: '17717054760',
            method: '代报名'
          },
          {
            id: 1,
            name: 'james',
            mobile: '17717054722',
            method: '代报名'
          },
          {
            id: 2,
            name: 'harden',
            mobile: '17717054733',
            method: '代报名'
          },
          {
            id: 3,
            name: 'antetokunbo',
            mobile: '17717054744',
            method: '自报名'
          }
        ]
      }
    },
    methods: {
      handleRoute (item) {
        this.$router.push({path: '/clientSigned/' + item.id, params: item})
      }
    },
    mounted () {}
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
