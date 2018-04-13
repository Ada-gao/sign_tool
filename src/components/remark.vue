<template>
	<div>
		<x-header :left-options="{backText: ''}">备注列表</x-header>
		<div class="wrapper">
			<div class="search">
				<div class="toggle-button">
					<button class="btn btn-no-radius" :class="{'btn-checked': isChecked}" @click="checkIndex(1)" style="border-right: none;">时间</button>
					<button class="btn btn-no-radius" :class="{'btn-checked': !isChecked}" @click="checkIndex(2)">搜索</button>
				</div>
				<div class="toggle-item">
					<div class="item01" v-show="isChecked">
						<input type="text" />
						<i class="iconfont icon-search"></i>
					</div>
					<div class="item02" v-show="!isChecked">
						日历选择器
						<!--<group>
							<datetime
				        v-model="value1"
				        @on-change="change"
				        @on-cancel="log('cancel')"
				        @on-confirm="log('confirm')"
				        @on-hide="log('hide', $event)"></datetime>
						</group>-->
					</div>
				</div>
			</div>
			<remark-list></remark-list>
		</div>
	</div>
</template>

<script>
import { XHeader, ButtonTab, ButtonTabItem, Datetime, Group } from 'vux'
import RemarkList from 'base/remarkList/remarkList'

export default {
  components: {
    XHeader,
    ButtonTab,
    ButtonTabItem,
    RemarkList,
    Datetime,
    Group
  },
  data () {
  	return {
  		isChecked: true,
  		value1: null
  	}
  },
  methods: {
  	checkIndex (num) {
  		num === 1 ? this.isChecked = true : this.isChecked = false
  	},
  	change (value) {
  		console.log(value)
  	},
  	log (str1, str2 = '') {
      console.log(str1, str2)
    }
  }
}
</script>

<style scoped lang="less">
.search {
	text-align: center;
	.toggle-button {
		display: inline-block;
	}
	.toggle-item {
		margin-bottom: 40px;
		height: 60px;
		.item01 {
			width: 500px;
			height: 100%;
	    position: relative;
	    margin-left: 100px;
			input {
				width: 100%;
				height: 100%;
			}
			i {
				position: absolute;
		    top: 50%;
		    right: 20px;
		    transform: translateY(-50%);
		    font-size: 45px; /*px*/
		  	color: #999;
			}
		}
		.item02 {
			.weui-cells {
				height: 60px;
			}
		}
	}
}
.toggle-button {
	font-size: 0px;
	margin-top: 40px;
	margin-bottom: 40px;
	/*position: absolute;*/
	/*top: 10px;*/
	/*right: 10px;*/
}
.btn-checked {
	background-color: #0083c5;
	color: #fff;
}
.btn-no-radius {
	border-radius: 0;
}
</style>
