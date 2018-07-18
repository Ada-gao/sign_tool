<template>
	<div class="allBottom">
    <tabbar v-model="idx">
      <tabbar-item :link="{name: 'HomePage'}" @on-item-click="clickThis">
        <i slot="icon" class="iconfont">&#xe63f;</i>
        <span slot="label">产品</span>
      </tabbar-item>
      <tabbar-item :link="{name: 'ReservationList'}" @on-item-click="clickThis">
        <i slot="icon" class="iconfont">&#xe653;</i>
        <span slot="label">交易</span>
      </tabbar-item>
      <tabbar-item :link="{name: 'CustomerList', params: {mark: 0}}" @on-item-click="clickThis">
        <i slot="icon" class="iconfont">&#xe62c;</i>
        <span slot="label">客户</span>
      </tabbar-item>
      <tabbar-item :link="{name: 'AboutMe'}" @on-item-click="clickThis">
        <i slot="icon" class="iconfont">&#xe639;</i>
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
	</div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'
// import index from 'vue';

export default {
  components: {
    Tabbar,
    TabbarItem
  },
  data () {
    const _route = this.$route
    let idx = 0
    if (_route.name === 'HomePage') {
      idx = 0
    } else if (_route.name === 'ReservationList') {
      idx = 1
    } else if (_route.name === 'CustomerList') {
      idx = 2
    } else {
      idx = 3
    }
    return {
      idx: idx
    }
  },
  methods: {
    clickThis (index) {
      this.idx = index
    }
  }
}
</script>

<style lang="less">
.allBottom {
  .weui-tabbar {
		height: 98px;
    .weui-tabbar__item{
      font-size: 26px; /*px*/
      box-sizing: border-box;
      text-decoration: none;
      p.weui-tabbar__label{
        span{
          font-size: 20px;
        }
      }
      .weui-tabbar__icon{
        height: 48px;
        width: 100%;
        margin-bottom: 6px;
        text-align: center;
        i {
          font-size: 48px;
          line-height: 58px;
          display: block;
        }
      }
    }
    .weui-tabbar__item:nth-child(2){
      .weui-tabbar__icon{
        i{
          font-size: 43px;
        }
      }
    }
    .weui-bar__item_on.weui-tabbar__item:nth-child(2){
      .weui-tabbar__icon{
        i{
          font-size: 43px;
        }
      }
    }
  }
}
</style>
