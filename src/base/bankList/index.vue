<template>
  <div class="bankList">
    <mt-popup v-model="popupVisible">
      <mt-spinner type="fading-circle" class="spinner_box" v-show="popupVisible"></mt-spinner>
    </mt-popup>
    <x-header class="header" :left-options="{backText: '', preventGoBack:true}" @on-click-back="back()">银行卡
      <div slot="right" class="add_card_btn"
             v-if="addCard !== '2'"
             @click="routerPush">
          <i class="iconfont">&#xe6bd;</i>
          <span>新增银行卡</span>
        </div>
    </x-header>
    <div class="wrapper">
      <!-- <div class="top"> -->
        <!-- <mt-cell title="银行卡信息">
          <span slot="icon" class="iconfont">&#xe621;</span>
        </mt-cell> -->
        <!-- <div class="add_card_btn"
             v-if="addCard !== '2'"
             @click="routerPush">
          <i class="iconfont">&#xe640;</i>
          <span>银行卡</span>
        </div> -->
      <!-- </div> -->
      <div class="space"></div>
      <div class="list">
        <div class="item" :data="bankList" v-for="(item, index) in bankList" :key="index" @click="selected(item)">
          <!-- <div class="tip"> -->
            <!-- <span class="tit">银行名称：</span> -->
            <p class="bankname">{{item.bank_name}}</p>
          <!-- </div> -->
          <!-- <div class="tip"> -->
            <!-- <span class="tit">支行名称：</span> -->
            <p class="subname">{{item.sub_branch_name}}</p>
          <!-- </div> -->
          <!-- <div class="tip"> -->
            <!-- <span class="tit">银行卡号：</span> -->
            <p class="num">{{item.card_no.substr(0,4) + `&nbsp;&nbsp;&nbsp;&nbsp;` + "****" + `&nbsp;&nbsp;&nbsp;&nbsp;` + "****" + `&nbsp;&nbsp;&nbsp;&nbsp;` + item.card_no.substr(-4)}}</p>
          <!-- </div> -->
            <span class="iconfont">&#xe620;</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import { XHeader } from 'vux'
  import { checkCustomerBankDetail } from '@/service/api/customers'
  import {getStore} from '@/config/mUtils'
  export default{
    components: {
      XHeader
    },
    data () {
      return {
        clientId: '',
        bankList: [],
        mark: '',
        selectedItem: [],
        popupVisible: true,
        timer: null,
       addCard: null
//        stat: null
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        // console.log(from)
        vm.fromPath = from.path
        // console.log(vm.fromPath)
//        if (from.name === 'Bankcard' || from.name === 'PotentialCustomerList') {
//          vm.addCard = '0'
//        } else if (from.name === 'CustomerManagement') {
//          vm.addCard = '1'
//        } else {
//          vm.addCard = '2'
//        }
//        if (from.name === 'PotentialCustomerList') {
//          vm.addCard = '0'
//          vm.stat = true
//        } else if (from.name === 'CustomerManagement') {
//          vm.addCard = '1'
//          vm.stat = true
//        } else if (from.name === 'Bankcard') {
//          vm.stat = true
//        } else {
//          vm.addCard = '2'
//          vm.stat = false
//        }
      })
    },
    methods: {
     routerPush () {
       this.$router.push({name: 'Bankcard', params: {addCard: this.addCard}})
     },
      back () {
        // flag: 判断是否是从预约页面进来的
        if (this.$route.params.flag) {
          this.$router.push({name: 'ProductAppointment', params: {flag: this.$route.params.flag, mark: this.mark}})
        } else if (this.$route.params.addCard === '0') {
          this.$router.replace({name: 'PotentialCustomerList', params: {id: this.clientId}})
        } else if (this.$route.params.addCard === '1') {
          this.$router.replace({name: 'CustomerManagement', params: {id: this.clientId}})
        }
      },
      selected (item) {
        if (!this.$route.params.flag) return
        this.mark = 'selected'
        this.selectedItem = item
        // console.log(this.mark, item)
        this.$router.push({name: 'ProductAppointment', params: {flag: this.$route.params.flag, mark: this.mark, item: this.selectedItem}})
      },
      getList () {
        checkCustomerBankDetail(this.clientId).then(res => {
          this.timer = setTimeout(() => {
            this.bankList = res.data
            this.popupVisible = false
          }, 200)
        })
      }
    },
    mounted () {
      console.log(this.$route.params)
      this.addCard = this.$route.params.addCard
      // let selfInfos = JSON.parse(getStore('selfInfos'))
      this.clientId = this.$route.params.id || JSON.parse(getStore('selfInfos')).client_id
      this.getList()
    }
  }
</script>
<style lang="less">
  @import "../../common/style/variable.less";
  .bankList{
    font-family: @font-family-R;
    .vux-header.header{
      .vux-header-right{
        width: 23%;
        height: 42px;
        right: 30px;
        top: 66px;
        .add_card_btn {
          display: inline-block;
          position: absolute;
          // right: 32px;
          // top: 19px;
          line-height: 42px;
          font-size: @font-size-twentyS;/*px*/
          color: #BD9D62;
          i {
            vertical-align: bottom;
            font-size: 25px;
            margin-left: 5px;
          }
        }
      }
    }
    .wrapper{
      padding-left: 20px;
      padding-right: 20px;
      .top{
        position: relative;
        height: 80px;
        // .mint-cell{
        //   height: 100%;
        //   .mint-cell-wrapper{
        //     height: 100%;
        //     line-height: 100%;
        //     padding-left: 35px;
        //     .mint-cell-title{
        //       font-family: PingFangSC-Medium;
        //       font-size: 30px;
        //       color: #2672BA;
        //       .iconfont{
        //         font-size: 40px;
        //         vertical-align: middle;
        //       }
        //     }
        //   }
        // }
      }
      .list{
        // width: 710px;
        margin: 0 auto;
        .item{
          /*width: 710px;*/
          // width: 94.7%;
          padding: 30px 40px;
          height: 238px;
          margin-bottom: 20px;
          font-family: @font-family-M;
          color: @back-color-white;
          position: relative;
          border-radius: 8px;/*no*/
          .bankname{
            font-size: @font-size-thirtyS;/*px*/
          }
          .subname{
            font-size: @font-size-twentyF;/*px*/
            margin-bottom: 40px;
          }
          .num{
				    font-size: @font-size-thirtyT;/*px*/
          }
          span{
            position: absolute;
            top: 25px;
            right: 40px;
            font-size: 35px;
          }
          // .tip{
          //   line-height: 56px;
          //   .tit{
          //     font-size: 30px;
          //     color: #333333;
          //   }
          //   .detail{
          //     font-size: 28px;
          //     color: #151515;
          //   }
          //   .col{
          //     color: #666;
          //   }
          // }

        }
        .item:nth-child(3n+1){
          background: linear-gradient(90deg, #E8CE9D 0%, #C6A570 100%);
          span{
            color: rgba(255, 255, 255, 0.6);
          }
        }
        .item:nth-child(3n+2){
          background:  linear-gradient(90deg, #5DA3DC 0%, #4067C7 100%);
          span{
            color: rgba(255, 255, 255, 0.6);
          }
        }
        .item:nth-child(3n+3){
          background: linear-gradient(90deg, #27C1B3 0%, #0D86AF 100%);
          span{
            color: rgba(255, 255, 255, 0.6);
          }
        }
      }
    }
  }
</style>
