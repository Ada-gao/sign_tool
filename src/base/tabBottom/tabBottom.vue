<template>
	<div>
    <tabbar v-model="idx">
      <tabbar-item :link="{name: 'HomePage'}" exact @on-item-click="clickThis">
        <span slot="label"><i class="iconfont icon-manage_fill"></i>产品</span>
      </tabbar-item>
      <tabbar-item :link="{name: 'CustomerList'}" @on-item-click="clickThis">
        <span slot="label"><i class="iconfont icon-friend"></i>客户</span>
      </tabbar-item>
      <tabbar-item :link="{name: 'AboutMe'}" exact @on-item-click="clickThis">
        <span slot="label"><i class="iconfont icon-kehuguanli"></i>我的</span>
      </tabbar-item>
    </tabbar>
	</div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'

export default {
  components: {
    Tabbar,
    TabbarItem
  },
  data () {
    return {
      idx: 0
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
		font-size: 20px; /*px*/
		box-sizing: border-box;
		i {
			font-size: 47px; /*px*/
			display: block;
		}
	}
}
</style>
