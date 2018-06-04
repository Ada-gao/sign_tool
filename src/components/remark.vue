<template>
	<div class="remarkPage">
		<x-header :left-options="{backText: ''}">备注列表</x-header>
		<div class="wrapper">
			<div class="search">
				<div class="toggle-button">
					<button class="btn btn-no-radius" :class="{'btn-checked': isChecked}" @click="checkIndex(1)" style="border-right: none;">时间</button>
					<button class="btn btn-no-radius" :class="{'btn-checked': !isChecked}" @click="checkIndex(2)">搜索</button>
				</div>
				<div class="toggle-item">
					<div class="item01" v-show="isChecked">
            <button class="time-search1" @click="open('pickerStart')">{{pickerValue1 | formatDate}}</button>
						<mt-datetime-picker
							ref="pickerStart"
							type="date"
							year-format="{value} 年"
							month-format="{value} 月"
							date-format="{value} 日"
							@confirm="handleConfirm1"
							:value="pickerValue1">
						</mt-datetime-picker>
						<span class="line">——</span>
						<button class="time-search2" @click="open('pickerEnd')">{{pickerValue2 | formatDate}}</button>
						<mt-datetime-picker
							ref="pickerEnd"
							type="date"
							year-format="{value} 年"
							month-format="{value} 月"
							date-format="{value} 日"
							@confirm="handleConfirm2"
							:value="pickerValue2">
						</mt-datetime-picker>
					</div>
					<div class="item02" v-show="!isChecked">
						<input type="text" class="text-search" v-model="keyValue" placeholder="搜索 关键字"/>
						<i class="iconfont" @click="search()">&#xe64e;</i>
					</div>
				</div>
			</div>
			<remark-list :list="remarkList"></remark-list>
      <x-dialog v-model="stopDialog" class="dialog-demo errDialog" hide-on-blur>
          <i class="iconfont noS">&#xe626;</i>
          <div class="err">{{errTip}}</div>
          <x-button @click.native="noSelectSure" type="primary">确 定</x-button>
      </x-dialog>
		</div>
	</div>
</template>

<script>
import { XHeader, ButtonTab, ButtonTabItem, Datetime, Group, Calendar, XDialog, XButton } from 'vux'
import RemarkList from '../base/remarkList/remarkList'
import { formatDate } from '@/common/js/date'
import { checkAllCustomerRemarks } from '@/service/api/customers'

export default {
  components: {
    XHeader,
    ButtonTab,
    ButtonTabItem,
    RemarkList,
    Datetime,
    Group,
    Calendar,
    XDialog,
    XButton
  },
  data () {
  	return {
  		isChecked: true,
  		value1: '',
  		value2: null,
			demo5: [],
			pickerVisible: false,
			pickerValue1: new Date(),
      pickerValue2: new Date(),
      remarkList: [],
      keyValue: '',
      stopDialog: false,
      errTip: ''
  	}
	},
	filters: {
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date)
    }
  },
  methods: {
  	checkIndex (num) {
  		num === 1 ? this.isChecked = true : this.isChecked = false
  	},
		open (picker) {
			this.$refs[picker].open()
		},
		handleConfirm1 (val) {
      this.pickerValue1 = val
      let obj = {
        from_date: formatDate(this.pickerValue1),
        to_date: formatDate(this.pickerValue2)
      }
      if (this.pickerValue2.getTime() > this.pickerValue1.getTime()) {
        checkAllCustomerRemarks(obj).then(res => {
          this.remarkList = res.data
        })
      } else {
        this.stopDialog = true
        this.errTip = '开始时间不能大于结束时间'
      }
		},
		handleConfirm2 (val) {
      this.pickerValue2 = val
      let obj = {
        from_date: formatDate(this.pickerValue1),
        to_date: formatDate(this.pickerValue2)
      }
      if (this.pickerValue2.getTime() > this.pickerValue1.getTime()) {
        checkAllCustomerRemarks(obj).then(res => {
          this.remarkList = res.data
        })
      } else {
        this.stopDialog = true
        this.errTip = '结束时间不能小于开始时间'
      }
    },
    search () {
      let obj = {
        q: this.keyValue
      }
      checkAllCustomerRemarks(obj).then(res => {
        this.remarkList = res.data
		  })
    }
  },
  mounted () {
    checkAllCustomerRemarks().then(res => {
      console.log(res.data)
      this.remarkList = res.data
		})
  }
}
</script>

<style lang="less">
.remarkPage{
  height: 100%;
	// .vux-header{
  //   	height: 128px;
  //   .vux-header-title{
  //     height: 100%;
  //     line-height: 128px;
  //     font-size: 36px;
  //   }
  // }
  .wrapper{
    // padding-top: 128px;
    height: 100%;
    background-color: #F5F5F5;
    .search {
        text-align: center;
        height: 237px;
        margin-bottom: 19px;
        background: #fff;
        .toggle-button {
          display: inline-block;
          margin-top: 40px;
          margin-bottom: 50px;
          font-size: 0px;
          .btn.btn-no-radius{
            width: 193px;
            font-family: PingFangSC-Regular;
            font-size: 30px;
            color: #666666;
            border-radius: 0;
            border: 1px solid #979797;
          }
          .btn.btn-no-radius.btn-checked{
            background-color: #0083c5;
            color: #fff;
          }
        }
        .toggle-item {
          margin-bottom: 40px;
          height: 60px;
          .item01,.item02 {
            width: 100%;
            height: 100%;
            text-align: center;
            position: relative;
            .line{
              margin: 0 43px;
            }
            .text-search {
              width: 660px;
              height: 70px;
              text-indent: 30px;
              font-size: 26px;
              color: #999999;
              border: 1px solid #999999;
              border-radius: 10px;
            }
            i {
                position: absolute;
                top: 50%;
                right: 70px;
                transform: translateY(-50%);
                -webkit-transform: translateY(-50%);
                font-size: 45px; /*px*/
                color: #D8D8D8;
              }
            .time-search1,
            .time-search2 {
              width: 240px;
              height: 60px;
              display: inline-block;
              position: relative;
              background-color: #fff;
              color: #666;
              font-size: 30px; /*px*/
              border: 1px solid #979797;
              box-shadow: inset 0 1px 3px 0 rgba(0,0,0,0.50);
              border-radius: 10px;
              outline: none;
            }
          }
          .item02{
            height: 70px;
          }
          // .item02 {
          // 	.weui-cells {
          // 		height: 60px;
          // 	}
          // }
        }
      }
      // .vux-no-group-title {
      //   height: 100%!important;
      // }
      .vux-x-dialog.errDialog{
        .weui-dialog{
        width: 580px;
        height: 345px;
        background: #FFFFFF;
        border-radius: 10px;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%,-50%);
        padding: 0;
        text-align: center;
        .noS{
          display: inline-block;
          font-size: 100px;
          color: #C61D1A;
          margin: 40px 0;
        }
        .err{
          // margin-top: 30px;
          margin-bottom: 40px;
          font-family: PingFangSC-Regular;
          font-size: 30px;
          color: #333333;
        }
        .weui-btn.weui-btn_primary{
          background: #2A7DC1;
          border-radius: 10px;
          width: 280px;
          height: 80px;
          font-family: PingFangSC-Medium;
          font-size: 36px;
          color: #F0F0F0;
        }
      }
    }
  }
}
</style>
