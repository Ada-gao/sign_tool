<template>
	<div>
    <tabbar>
      <tabbar-item selected :link="{name: 'HomePage'}" exact>
        <span slot="label"><i class="iconfont icon-manage_fill"></i>产品</span>
      </tabbar-item>
      <tabbar-item :link="{name: 'CustomerList'}">
        <span slot="label"><i class="iconfont icon-friend"></i>客户</span>
      </tabbar-item>
      <tabbar-item :link="{name: 'Remark'}" exact>
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
  }
}
</script>

<style scoped lang="less">
.weui-tabbar {
	margin-bottom: constant(safe-area-inset-bottom); /* iOS 11.0 */
	margin-bottom: env(safe-area-inset-bottom); /* iOS 11.2 */
}
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
