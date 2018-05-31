<template>
  <div class="remark">
    <group>
      <cell-box>备注</cell-box>
    </group>
    <ul>
     	<li v-for="(item, index) in list" :key="index">
        <div class="iText text-overflow-one">{{item.remark}}</div>
        <span class="iTime">{{item.create_time}}</span>
        <!-- <i class="icon icon-trash-2" @click="deleteRemark(index)">&nbsp;删除</i> -->
        <router-link class="view" :to="{name:'WriteNotes', params: {remark: item.remark}}"><span class="iconfont eye">&#xe624;</span>&nbsp;查看</router-link>
      </li>
    </ul>
    <!-- <div class="bottom-remark">
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
          <button @click="submitAddNew" class="btn btn-primary vux-emit">新增备注</button>
        </div>
      </x-dialog>
    </div> -->
  </div>
</template>

<script>
import { Group, CellBox, XDialog, TransferDomDirective as TransferDom } from 'vux'

export default {
	name: 'RemarkList',
	props: ['list'],
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
  		this.list.splice(idx, 1)
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
  		this.list.push({
  			text: this.remarkInfo.trim(),
  			time: dateFormat(new Date(), 'yyyy-MM-dd')
  		})
  		this.remarkInfo = ''
  	}
  }
}
</script>

<style lang="less">
/*@import '~vux/src/styles/reset';*/
.remark {
	background: #fff;
	.weui-cells{
		height: 82px;
		line-height: 82px;
		.vux-cell-box.weui-cell{
			padding: 0;
			padding-left: 25px;
			font-family: PingFangSC-Medium;
			font-size: 30px;
			color: #333333;
		}
	}
	.weui-cells:before{
		border-top: 0px;
		height: 0px;
	}
	.weui-cells:after{
		border: 1px solid #979797;
	}
		ul {
			li {
				position: relative;
				height: 132px;
				padding: 20px 69px 0 72px;
        .iText {
        	margin-bottom: 23px;
        	// overflow: hidden;
					// text-overflow:ellipsis;
					// white-space: nowrap;
					font-size: 26px;
					color: #666666;
				}
				.iTime {
					font-size: 24px;
					color: #999;
				}
        .view {
					margin-right: 30px;
					font-size: 26px;
					color: #2672BA;
					text-decoration: none;
					position: absolute;
					right: 45px;
					top: 71px;
					.eye{
						font-size: 45px;
						vertical-align: middle;
					}
        }
			}
		}
	}
</style>
