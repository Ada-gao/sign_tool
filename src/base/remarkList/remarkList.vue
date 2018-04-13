<template>
  <div class="remark">
    <!-- <group>
      <cell-box>
     	  <i class="icon-clipboard"></i>备注
      </cell-box>
    </group> -->
    <ul>
     	<li v-for="(item, index) in remarkList" :key="index">
        <div class="iText">{{item.text}}</div>
        <span class="iTime">{{item.time}}</span>
        <!-- <i class="icon icon-trash-2" @click="deleteRemark(index)">&nbsp;删除</i> -->
        <router-link class="iconfont icon-view view" to="/writeNotes">&nbsp;查看</router-link>
      </li>
    </ul>
    <div class="bottom-remark">
    	<div class="space"></div>
      <div class="add clearfix" @click="addNew">
        <input class="addInput" type="text" placeholder="新增备注"/>
      </div>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="showHideOnBlur" class="dialog-demo" hide-on-blur>
        <div class="img-box">
          <textarea id="inputing" name="" rows="" cols="" v-model="remarkInfo"></textarea>
        </div>
        <div style="text-align: right;">
          <span @click="submitAddNew" class="vux-emit">新增备注</span>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import { Group, CellBox, XDialog, TransferDomDirective as TransferDom } from 'vux'

export default {
  name: 'RemarkList',
  directives: {
  	TransferDom
  },
  components: {
    Group,
    CellBox,
    XDialog
  },
  data () {
  	return {
  		remarkList: [{
  			text: '客户资金2月18号到期，愿意购买正收益理财产品,客户资金2月18号到期，愿意购买正收益理财产品',
  			time: '2018-1-8'
			}, {
				text: '客户正在搜寻二级市场产品',
				time: '2018-1-8'
			}],
			showHideOnBlur: false,
			remarkInfo: null
  	}
  },
  mounted () {
  	if (this.showHideOnBlur) {
  		document.getElementById('inputing').focus()
  	}
  },
  methods: {
  	deleteRemark (idx) {
  		this.remarkList.splice(idx, 1)
  	},
  	addNew () {
  		this.showHideOnBlur = true
  		document.getElementById('inputing').focus()
  	},
  	submitAddNew () {
  		this.showHideOnBlur = false
  		let dateFormat = function (date, fmt) {
  			let o = {
  				'M+': date.getMonth() + 1,
  				'd+': date.getDate(),
  				'h+': date.getHours(),
  				'm+': date.getMinutes(),
  				's+': date.getSeconds(),
  				'S+': date.getMilliseconds()
  			}
  			if (/(y+)/.test(fmt)) {
  				fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  			}
  			for (let k in o) {
  				if (new RegExp('(' + k + ')').test(fmt)) {
  					fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('' + o[k]).substr(('' + o[k].length))))
  				}
  			}
  			return fmt
  		}
  		if (this.remarkInfo.trim().length === 0) return
  		this.remarkList.push({
  			text: this.remarkInfo.trim(),
  			time: dateFormat(new Date(), 'yyyy-MM-dd')
  		})
  		this.remarkInfo = ''
  	}
  }
}
</script>

<style scoped lang="less">
/*@import '~vux/src/styles/reset';*/
.remark {
		ul {
			li {
				border-bottom: 1px solid #eee; /*no*/
        padding: 20px;
        .iText {
        	margin-bottom: 10px;
        	overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					font-size: 30px; /*px*/
				}
				.iTime {
					font-size: 24px; /*px*/
				}
        .view {
					float: right;
					margin-right: 30px;
					font-size: 24px; /*px*/
        }
        // a {
        // 	margin-right: 30px;
        // }
			}
		}
	}
</style>
