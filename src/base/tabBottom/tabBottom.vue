<template>
	<div class="allBottom">
    <tabbar v-model="idx">
      <tabbar-item :link="{name: 'HomePage'}" @on-item-click="clickThis">
        <i slot="icon" v-if="icon1" class="iconfont">&#xe608;</i>
        <i slot="icon" v-else class="iconfont select">&#xe604;</i>
        <span slot="label" :class="icon1 ? '' : 'select'">产品</span>
      </tabbar-item>
      <tabbar-item :link="{name: 'ReservationList'}" @on-item-click="clickThis">
        <i slot="icon" v-if="icon2" class="iconfont">&#xe60a;</i>
        <i slot="icon" v-else class="iconfont select">&#xe605;</i>
        <span slot="label" :class="icon2 ? '' : 'select'">交易</span>
      </tabbar-item>
      <tabbar-item :link="{name: 'CustomerList', params: {mark: 0}}" @on-item-click="clickThis">
        <i slot="icon" v-if="icon3" class="iconfont">&#xe619;</i>
        <i slot="icon" v-else class="iconfont select">&#xe617;</i>
        <span slot="label" :class="icon3 ? '' : 'select'">客户</span>
      </tabbar-item>
      <tabbar-item :link="{name: 'AboutMe'}" @on-item-click="clickThis">
        <i slot="icon" v-if="icon4" class="iconfont">&#xe60f;</i>
        <i slot="icon" v-else class="iconfont select">&#xe60e;</i>
        <span slot="label" :class="icon4 ? '' : 'select'">我的</span>
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
      idx: idx,
      icon1: true,
      icon2: true,
      icon3: true,
      icon4: true
    }
  },
  methods: {
    clickThis (index) {
      this.idx = index
      if (index === 0) {
        this.icon1 = false
        this.icon2 = true
        this.icon3 = true
        this.icon4 = true
      } else if (index === 1) {
        this.icon2 = false
        this.icon1 = true
        this.icon3 = true
        this.icon4 = true
      } else if (index === 2) {
        this.icon3 = false
        this.icon1 = true
        this.icon2 = true
        this.icon4 = true
      } else if (index === 3) {
        this.icon4 = false
        this.icon1 = true
        this.icon2 = true
        this.icon3 = true
      }
    }
  }
}
</script>

<style lang="less">
@import "../../common/style/variable.less";
.allBottom {
  .weui-tabbar {
		height: 98px;
    .weui-tabbar__item{
      font-size: 26px; /*px*/
      box-sizing: border-box;
      text-decoration: none;
      p.weui-tabbar__label{
        span{
          font-size: @font-size-twenty;/*px*/
          color: #CBCBCB;
        }
        .select{
          color: @header-bg;
        }
      }
      .weui-tabbar__icon{
        height: 48px;
        width: 100%;
        margin-bottom: 6px;
        text-align: center;
        i {
          font-size: 40px;/*px*/
          line-height: 58px;
          display: block;
          color: #CBCBCB;
        }
        .select{
          color: @header-bg;
        }
      }
    }
    // .weui-tabbar__item:nth-child(2){
    //   .weui-tabbar__icon{
    //     i{
    //       font-size: 43px;
    //     }
    //   }
    // }
    // .weui-bar__item_on.weui-tabbar__item:nth-child(2){
    //   .weui-tabbar__icon{
    //     i{
    //       font-size: 43px;
    //     }
    //   }
    // }
  }
}
</style>
