<template>
	<div id="remark-page">
		<x-header class="header" :left-options="{backText: '', preventGoBack:true}" @on-click-back="back()">备注列表</x-header>
		<div class="wrapper">
			<div class="search">
				<div class="toggle-button">
					<span class="btn-time" :class="{'btn-checked': isChecked}" @click="checkIndex(1)">时间</span>
					<span class="btn-search" :class="{'btn-checked': !isChecked}" @click="checkIndex(2)">搜索</span>
				</div>
				<div class="toggle-item">
					<div class="item01" v-show="isChecked">
            <button class="time-search1" @click="open('pickerStart')" v-if="pickerValue1 === ''">起始日期</button>
            <button class="time-search1" @click="open('pickerStart')" v-else>{{pickerValue1 | formatDate}}</button>
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
						<button class="time-search2" @click="open('pickerEnd')" v-if="pickerValue2 === ''">结束日期</button>
						<button class="time-search2" @click="open('pickerEnd')" v-else>{{pickerValue2 | formatDate}}</button>
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
						<i class="iconfont absolute-center-y" @click="search()">&#xe609;</i>
					</div>
				</div>
			</div>
      <div class="white-space"></div>
			<remark-list :list="remarkList"
                   @handlerExpand="handlerExpand"
                   @handlerFlag="handlerFlag"
                   v-if="show"></remark-list>
      <div class="no-remark text-center" v-if="!show">
        <div class="warn absolute-center-xy">
          <i class="iconfont">&#xe869;</i>
          <p>暂无备注</p>
        </div>
      </div>
      <!-- <x-dialog v-model="stopDialog" class="dialog-demo errDialog" hide-on-blur>
          <i class="iconfont noS">&#xe626;</i>
          <div class="err">{{errTip}}</div>
          <x-button @click.native="noSelectSure" type="primary">确 定</x-button>
      </x-dialog> -->
		</div>
	</div>
</template>

<script>
import { XHeader, ButtonTab, ButtonTabItem, Datetime, Group, Calendar, XDialog, XButton } from 'vux'
import RemarkList from '@/base/remarkList/index'
import { formatDate } from '@/common/js/date'
import { checkAllCustomerRemarks } from '@/service/api/customers'
import { Toast } from 'mint-ui'

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
			pickerValue1: '',
      pickerValue2: '',
      remarkList: [],
      startList: [],
      keyValue: '',
      // stopDialog: false,
      // errTip: '',
      show: true
  	}
	},
	filters: {
    formatDate (time) {
      if (time === '') {
        return ''
      } else {
        var date = new Date(time)
        return formatDate(date)
      }
    }
  },
  methods: {
    back () {
      this.$router.push({name: 'AboutMe'})
    },
  	checkIndex (num) {
      num === 1 ? this.isChecked = true : this.isChecked = false
      this.remarkList = this.startList
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
        // this.stopDialog = true
        Toast({
          message: '开始时间不能大于结束时间'
        })
        // this.errTip = '开始时间不能大于结束时间'
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
        Toast({
          message: '结束时间不能小于开始时间'
        })
        // this.stopDialog = true
        // this.errTip = '结束时间不能小于开始时间'
      }
    },
    // noSelectSure () {
    //   this.stopDialog = false
    // },
    search () {
      let obj = {
        q: this.keyValue
      }
      checkAllCustomerRemarks(obj).then(res => {
        this.remarkList = res.data
		  })
    },
    handlerFlag (data) {
      this.remarkList[data.index].flag = data.flag
    },
    handlerExpand (data) {
      this.remarkList[data.index].expand = data.expand
    }
  },
  mounted () {
    checkAllCustomerRemarks().then(res => {
      this.startList = res.data
      this.remarkList = res.data
      if (this.remarkList.length === 0) {
        this.show = false
      } else {
        this.show = true
      }
		})
  }
}
</script>

<style lang="less">
@import "../../common/style/variable.less";
#remark-page{
  height: 100%;
	.vux-header.header{
    background: @header-bg;
    .vux-header-left{
      .left-arrow:before{
        border-color: @text-font-color;
      }
    }
    .vux-header-title{
      color: @back-color-white;
    }
  }
  .wrapper{
    background: @back-color-white;
    .search {
        text-align: center;
        height: 247px;
        // margin-bottom: 19px;
        background: #fff;
        .toggle-button {
          display: inline-block;
          margin-top: 36px;
          margin-bottom: 51px;
          // width: 385px;
          height: 59px;
          line-height: 59px;
          border: 1px solid @font-color-9E;/*no*/
          border-radius: 5px;/*no*/
          overflow: hidden;
          font-family: @font-family-R;
          font-size: @font-size-thirty;/*px*/
          color: #666666;
          .btn-time, .btn-search{
            display: inline-block;
            width: 192px;
            height: 58px;
            border-radius: 5px;/*no*/
          }
          .btn-checked{
            background: @text-font-color;
            color: @back-color-white;
          }
        }
        .toggle-item {
          height: 70px;
          .item01,.item02 {
            width: 100%;
            height: 100%;
            text-align: center;
            position: relative;
            .line{
              margin: 0 43px;
            }
            .text-search {
              width: 665px;
              height: 70px;
              text-indent: 20px;
              font-family: @font-family-R;
              font-size: 26px;
              color: @font-color-999;
              border: 1px solid #999999;/*no*/
              border-radius: 10px;/*no*/
            }
            i {
                right: 70px;
                font-size: 35px; /*px*/
                color: #D8D8D8;
              }
            .time-search1,
            .time-search2 {
              width: 240px;
              height: 70px;
              display: inline-block;
              position: relative;
              background-color: #fff;
              color: #666;
              font-size: 30px; /*px*/
              border: 1px solid #979797;
              box-shadow: inset 0 1px 3px 0 rgba(0,0,0,0.50);
              border-radius: 10px;
              outline: none;
              vertical-align: middle;
            }
          }
          .item02{
            height: 70px;
          }
          .mint-popup.mint-datetime.mint-popup-bottom{
            .picker.mint-datetime-picker{
              .picker-toolbar{
                height: 60px;
                .mint-datetime-action.mint-datetime-cancel,.mint-datetime-action.mint-datetime-confirm{
                  line-height: 60px;
                  font-size: 28px;/*px*/
                  color: @text-font-color;
                }
              }
            }
          }
        }
      }
      .white-space{
        height: 30px;
        background: @back-color-white;
      }
      .no-remark{
        .warn{
          i{
            font-size: 150px;/*px*/
            color: @back-color-E8;
          }
          p{
            font-family: @font-family-R;
            font-size: @font-size-twentyS;
            color: #ccc;
            margin-top: 25px;
          }
        }
      }
    //   .vux-x-dialog.errDialog{
    //     .weui-dialog{
    //     width: 580px;
    //     height: 345px;
    //     background: #FFFFFF;
    //     border-radius: 10px;
    //     top: 50% !important;
    //     left: 50% !important;
    //     transform: translate(-50%,-50%);
    //     padding: 0;
    //     text-align: center;
    //     .noS{
    //       display: inline-block;
    //       font-size: 100px;
    //       color: #C61D1A;
    //       margin: 40px 0;
    //     }
    //     .err{
    //       // margin-top: 30px;
    //       margin-bottom: 40px;
    //       font-family: PingFangSC-Regular;
    //       font-size: 30px;
    //       color: #333333;
    //     }
    //     .weui-btn.weui-btn_primary{
    //       background: #2A7DC1;
    //       border-radius: 10px;
    //       width: 280px;
    //       height: 80px;
    //       font-family: PingFangSC-Medium;
    //       font-size: 36px;
    //       color: #F0F0F0;
    //     }
    //   }
    // }
  }
}
</style>
