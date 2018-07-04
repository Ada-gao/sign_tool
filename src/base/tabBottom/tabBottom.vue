<template>
	<div>
    <tabbar v-model="idx">
      <tabbar-item :link="{name: 'HomePage'}" @on-item-click="clickThis">
        <span slot="label"><i class="iconfont">&#xe63f;</i>产品</span>
      </tabbar-item>
      <tabbar-item :link="{name: 'ReservationList'}" @on-item-click="clickThis">
        <span slot="label"><i class="iconfont">&#xe653;</i>预约</span>
      </tabbar-item>
      <tabbar-item :link="{name: 'CustomerList'}" @on-item-click="clickThis">
        <span slot="label"><i class="iconfont">&#xe62c;</i>客户</span>
      </tabbar-item>
      <tabbar-item :link="{name: 'AboutMe'}" @on-item-click="clickThis">
        <span slot="label"><i class="iconfont">&#xe639;</i>我的</span>
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

<style scoped lang="less">
.weui-tabbar {
	.weui-tabbar__item {
		height: 90px;
		font-size: 26px; /*px*/
    box-sizing: border-box;
    text-decoration: none;
    span{
      font-size: 20px;
    }
		i {
			font-size: 47px; /*px*/
			display: block;
		}
	}
}
</style>
