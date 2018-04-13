<template>
	<div>
		<x-header :left-options="{backText: ''}">填写备注</x-header>
		<div class="wrapper">
			<!--<input type="text" v-focus v-model="msg"/>-->
			<textarea class="inputing" v-focus v-model="msg" name="" rows="" cols=""></textarea>
		</div>
	</div>
</template>

<script>
import { XHeader } from 'vux'
// import RemarkList from 'base/remarkList/remarkList'

export default {
  components: {
    XHeader
  },
  data () {
  	return {
  		msg: '客户资金2月18号到期，愿意购买正收益理财产品,客户资金2月18号到期，愿意购买正收益理财产品,客户资金2月18号到期，愿意购买正收益理财产品,客户资金2月18号到期，愿意购买正收益理财产品,客户资金2月18号到期，愿意购买正收益理财产品,客户资金2月18号到期，愿意购买正收益理财产品'
  	}
  }
}
</script>

<style scoped="scoped" lang="less">
.wrapper {
	// padding: 20px;
	height: 1000px;
	.inputing {
		border: none;
		width: 100%;
		font-size: 34px; /*px*/
		height: 100%;
		outline: none;
		color: #999;
		line-height: 1.5;
		padding: 20px;
		box-sizing: border-box;
	}
}
</style>
