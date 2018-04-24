<template>
	<div>
    <tabbar v-model="idx">
      <tabbar-item :link="{name: 'HomePage'}" @on-item-click="clickThis">
        <span slot="label"><i class="iconfont icon-manage_fill"></i>产品</span>
      </tabbar-item>
      <tabbar-item :link="{name: 'CustomerList'}" @on-item-click="clickThis">
        <span slot="label"><i class="iconfont icon-friend"></i>客户</span>
      </tabbar-item>
      <tabbar-item :link="{name: 'AboutMe'}" @on-item-click="clickThis">
        <span slot="label"><i class="iconfont icon-kehuguanli"></i>我的</span>
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
    } else if (_route.name === 'CustomerList') {
      idx = 1
    } else {
      idx = 2
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
		height: 96px;
		font-size: 26px; /*px*/
    box-sizing: border-box;
    text-decoration: none;
		i {
			font-size: 47px; /*px*/
			display: block;
		}
	}
}
</style>
