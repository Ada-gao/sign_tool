<template>
  <div id="detailPage">
    <x-header class="header" :left-options="{backText: '',preventGoBack:true}" @on-click-back="back()">{{item.product_name}}</x-header>
    <div class="wrapper">
      <div class="rate-top">
        <div class="announcement" v-show="item.announcement">
          <span class="announcement-tit iconfont">&#xe603;</span>
          <span class="announcement-detail">
            <span class="detail-text">
              {{item.announcement}}&nbsp;&nbsp;
            </span>
          </span>
        </div>
        <div class="top-detail text-center">
          <!-- <div class="num-percent"> -->
            <span v-if="item.is_float === 0" class="number mar">-</span>
            <span v-else>
              <span class="number">{{item.annualized_return}}</span><span class="percent">%</span>
            </span>
            <div class="text">{{item.is_float === 0 ? '浮动收益' : '收益对标基准'}}</div>
            <div class="tit">
              <span>{{item.product_status|turnText(productStatus)}}</span>
              <span class="twice">{{item.product_type}}</span>
              <span>{{item.product_cons_name}}</span>
            </div>
          <!-- </div> -->
        </div>
        <!-- <p class="text-plus-white">
          <span v-if="item.is_float === 0">一</span>
          <span v-else><i class="percent">{{item.annualized_return}}</i>%</span>
          <span class="label absolute-center-y">{{item.product_type_name}}</span>
        </p>
        <p class="year">{{item.is_float === 0 ? '浮动收益' : '收益对标基准'}}</p> -->
      </div>
			<div class="space"></div>
      <div class="middle-cont">
        <span class="left">
          产品期限
          <p>{{item.investment_horizon}}{{item.investment_horizon_unit|turnText(investmentHorizonUnit)}}</p>
        </span>
        <span class="right">
          起投金额
          <p class="cont-text">{{item.minimal_amount}}万</p>
        </span>
      </div>
			<div class="space"></div>
      <div class="base-info">
        <p>基本信息</p>
        <table border="0" cellspacing="0" cellpadding="0">
          <tr><td>产品名称</td><td>{{item.product_name}}</td></tr>
          <tr><td>产品结构类型</td><td>{{item.product_cons_name}}</td></tr>
          <tr><td>产品收益类型</td><td>{{item.product_type}}</td></tr>
          <tr><td>产品风险级别</td><td>{{item.product_risk_level}}</td></tr>
          <!-- <tr><td>交易币种</td><td>{{item.currency_id === 1 ? '人民币' : '美元' }}</td></tr> -->
          <tr><td>交易币种</td><td>{{item.currency_name}}</td></tr>
          <tr>
            <td>购买人群</td><td><span v-for="(p, i) in item.buying_crowds" :key="i">{{p|turnText(buyingCrowds)}}{{item.buying_crowds.length !== 1 && p|turnText(buyingCrowds) ? '/' : ''}} </span></td>
          </tr>
        </table>
        <table border="0" cellspacing="0" cellpadding="0" v-if="show" class="tableTwo">
          <tr>
            <td>产品期限</td><td>{{item.investment_horizon}}{{item.investment_horizon_unit|turnText(investmentHorizonUnit)}}</td>
          </tr>
          <tr><td>募集额度</td><td>{{item.collection_amount}}</td></tr>
          <tr><td>募集人数</td><td>{{item.product_lp}}</td></tr>
          <tr><td>起投金额</td><td>{{item.minimal_amount}}万</td></tr>
          <tr><td>最低追加金额</td><td>{{item.minimal_add_amount}}万</td></tr>
          <tr><td>收益分配方式</td><td>{{item.income_distribution}}</td></tr>
          <tr><td>资产团队</td><td>{{item.asset_team}}</td></tr>
          <tr><td>托管银行</td><td>{{item.custodian_bank}}</td></tr>
          <tr><td>关联产品</td><td>{{item.relevance_name}}</td></tr>
          <tr>
            <td>付息方式</td><td>{{item.interest_payment|turnText(interestPayment)}}</td>
          </tr>
          <tr>
            <td>认购费</td>
            <td>{{item.subscribe|turnText(subscribe)}} {{item.subscribe_rate||''}}<span v-show="item.subscribe_rate">%</span></td>
          </tr>
          <tr><td>账户名称</td><td>{{item.account_name}}</td></tr>
          <tr><td>账号</td><td>{{item.card_no}}</td></tr>
          <tr><td>支行名称</td><td>{{item.bank_name}}</td></tr>
          <tr><td>大额支付行号</td><td>{{item.payment_number}}</td></tr>
        </table>
        <group class="info-detail">
          <cell
          :title="show ? '收起信息' : '查看更多信息'"
          is-link
          :border-intent="false"
				  :arrow-direction="show ? 'up' : 'down'"
          @click.native="show = !show"></cell>
        </group>
      </div>
			<div class="space"></div>
      <!-- <div class="product"> -->
        <!-- <div class="title"><span class="line-blue"></span>产品信息</div>
        <div class="cont">
          <p class="cont-text firstName">产品名称 ：{{item.product_name}}
            <span class="important" v-if="this.$route.params.important">重点产品</span>
          </p>
          <p class="cont-text">产品结构类型 ：{{item.product_cons_name}}</p>
          <p class="cont-text">产品类型 ：{{item.product_type_name}}</p>
          <p class="cont-text">产品风险级别 ：{{item.product_risk_level}}</p> -->
          <!-- <p class="cont-text" v-if="item.product_status === 1">产品状态 ：预热中</p>
          <p class="cont-text" v-else-if="item.product_status === 2">产品状态 ：募集中</p>
          <p class="cont-text" v-else-if="item.product_status === 3">产品状态 ：已关帐</p> -->
          <!-- <p class="cont-text">产品编号 ：{{item.product_code}}</p> -->
          <!-- <p class="cont-text">基金管理人 : {{item.manager}}</p> -->
        <!-- </div>
        <div class="cont">
          <p class="cont-text">交易币种 : {{item.currency_id === 1 ? '人民币' : '美元' }}</p>
          <p class="cont-text" v-if="item.buying_crowds === '0'">购买人群 ：大陆</p>
          <p class="cont-text" v-if="item.buying_crowds === '1'">购买人群 ：港澳台</p>
          <p class="cont-text" v-if="item.buying_crowds === '2'">购买人群 ：境外</p>
          <p class="cont-text" v-if="item.investment_horizon_unit === '0'">产品期限 ：{{item.investment_horizon}}月</p>
          <p class="cont-text" v-if="item.investment_horizon_unit === '1'">产品期限 ：{{item.investment_horizon}}年</p>
          <p class="cont-text" v-if="item.investment_horizon_unit === '2'">产品期限 ：{{item.investment_horizon}}天</p> -->
          <!-- <p class="cont-text" v-if="item.is_float === 0">浮动收益 ：一</p> -->
          <!-- <p class="cont-text" v-else>收益对标基准 ：{{item.annualized_return}}%</p> -->
          <!-- <p class="cont-text">发行额度 ：{{item.collection_amount}}万</p> -->
          <!-- <p class="cont-text">募集额度 ：{{item.collection_amount}}万</p>
          <p class="cont-text">募集人数 ：{{item.product_lp}}</p> -->
          <!-- <p class="cont-text">最低追加金额 ：{{item.minimal_add_amount}}万</p> -->
          <!-- <p class="cont-text">起投金额 : {{item.minimal_amount}}万</p> -->
          <!-- <p class="cont-text">投资门槛 : </p> -->
          <!-- <p class="cont-text">净值 : {{item.net_value}}</p> -->
        <!-- </div>
        <div class="cont">
          <p class="cont-text">起投金额 : {{item.minimal_amount}}万</p>
          <p class="cont-text">最低追加金额 ：{{item.minimal_add_amount}}万</p>
          <p class="cont-text">收益分配方式 ：{{item.income_distribution}}</p>
          <p class="cont-text">资产团队 ：{{item.asset_team}}</p>
          <p class="cont-text">托管银行 ：{{item.custodian_bank}}</p>
          <p class="cont-text">关联产品 ：{{item.relevance_name}}</p>
          <p class="cont-text" v-if="item.interest_payment === '0'">付息方式 ：无</p>
          <p class="cont-text" v-if="item.interest_payment === '1'">付息方式 ：季度付息</p>
          <p class="cont-text" v-if="item.interest_payment === '2'">付息方式 ：自然季度付息</p>
          <p class="cont-text" v-if="item.interest_payment === '3'">付息方式 ：半年度付息</p>
          <p class="cont-text" v-if="item.interest_payment === '4'">付息方式 ：按年付息</p>
          <p class="cont-text" v-if="item.subscribe === '0'">认购费 ：无需认购</p>
          <p class="cont-text" v-else-if="item.subscribe === '1'">认购费 ：价内认购</p>
          <p class="cont-text" v-else-if="item.subscribe === '2'">认购费 ：{{item.subscribe_rate}}%</p>
          <p class="cont-text">账户名称 ：{{item.account_name}}</p>
          <p class="cont-text">账号 ：{{item.card_no}}</p>
          <p class="cont-text">支行名称 ：{{item.bank_name}}</p> -->
          <!-- <p class="cont-text">产品亮点 ：{{item.highlight}}</p> -->
          <!-- <p class="cont-text">大额支付行号 ：{{item.payment_number}}</p>
        </div> -->
        <div class="report-pdf">
          <div class="doc" @click="toPdfReport(id)">交易所需材料<span class="iconfont right">&#xe8d5;</span></div>
          <div class="doc" @click="toPptReport(id)">产品说明材料<span class="iconfont right">&#xe8d5;</span></div>
          <div class="doc" @click="toUploadCustomer(id)">客户所需上传材料<span class="iconfont right">&#xe8d5;</span></div>
          <div class="doc" v-if="item.after_buy_file === '1'" @click="toProductReport(id)">投后报告<span class="iconfont right">&#xe8d5;</span></div>
        </div>
			  <div class="space"></div>
        <div class="reservation" v-if="showBtn">
          <mt-button @click="toAppointment">预约</mt-button>
        </div>
        <div class="reservation" v-if="item.product_status == 2 && item.is_pause === '1'">
          <mt-button disabled>预约</mt-button>
        </div>
        <div class="space32"></div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { XHeader, Group, CellBox, Cell } from 'vux'
import { getProductDetail } from '@/service/api/products'

export default {
  data () {
    return {
      item: [],
      id: '',
      prePath: '',
      showBtn: true,
      show: false,
      interestPayment: JSON.parse(localStorage.getItem('interest_payment')),
      productStatus: JSON.parse(localStorage.getItem('product_status')),
      investmentHorizonUnit: JSON.parse(localStorage.getItem('investment_horizon_unit')),
      buyingCrowds: JSON.parse(localStorage.getItem('buying_crowds')),
      subscribe: [
        {
          value: 0,
          label: '无认购费'
        }, {
          value: 1,
          label: '价内认购'
        }, {
          value: 2,
          label: '价外认购'
        }
      ]
      // ,
      // email: '',
      // userId: ''
    }
  },
  components: {
    XHeader,
    Group,
    CellBox,
    Cell
  },
  beforeRouteEnter (to, from, next) {
		next(vm => {
			vm.prePath = from.path
		})
  },
  methods: {
    getList (id) {
      getProductDetail(id).then(res => {
        this.item = res.data
        this.item.buying_crowds = res.data.buying_crowds.split(',')
        if (this.$route.params.showBtn === 'hide' || this.item.product_status !== 2 || this.item.is_pause === '1') {
          this.showBtn = false
        }
        if (!this.item.announcement) return
        this.$nextTick(function () {
          this.scrollAnnouncement()
        })
      })
    },
    back () {
      if (this.$route.params.flag && !this.$route.params.return) {
        this.$router.push({name: 'ProductAppointment', params: {flag: this.$route.params.flag}})
      } else if (this.$route.params.flag === 'reservationList' && this.$route.params.return === 'none') {
        this.$router.push({name: 'ReservationList'})
      } else {
        this.$router.push({name: 'HomePage'})
      }
    },
    toPdfReport (id) {
			this.$router.push({name: 'PdfReport', params: {id: id, mark: 0}})
    },
    toPptReport (id) {
			this.$router.push({name: 'PdfReport', params: {id: id, mark: 1}})
    },
    toProductReport (id) {
			this.$router.push({name: 'PdfReport', params: {id: id, mark: 2}})
    },
    toUploadCustomer (id) {
			this.$router.push({name: 'PdfReport', params: {id: id, mark: 3}})
    },
    toAppointment () {
      console.log('toAppointment')
      this.$router.push({
        name: 'ProductAppointment',
        params: {
          productInfo: this.item.product_name,
          productId: this.id,
          fromUrl: 'productDetail',
          minimalAmount: this.item.minimal_amount,
          collectionAmount: this.item.collection_amount,
          riskLevel: this.item.product_risk_level
          // productStatus: this.item.product_status
        }
      })
    },
    scrollAnnouncement () {
      var speed = 50 // 速度 -- px每秒
      var $marquee = document.querySelector('.announcement-detail')
      var $marqueeContent = $marquee.querySelector('.detail-text')
      if (!($marquee.offsetWidth < $marquee.scrollWidth)) {
        return
      }
      // 内容复制3份好有连续性
      $marqueeContent.innerHTML = $marqueeContent.innerHTML + $marqueeContent.innerHTML + $marqueeContent.innerHTML
      var contentWidth = $marqueeContent.getBoundingClientRect().width
       if (contentWidth <= 0) { // 没有内容搞什么动画
         return
       }
      // 内容复制了3份，宽度也要除以3
      contentWidth = contentWidth / 3
      // 计算一次动画应该要花费多少时间
      var onceTime = contentWidth / speed * 1000 // ms
      $marqueeContent.style.animationDuration = onceTime + 'ms'
    }
  },
  mounted () {
    this.id = this.$route.params.id
    this.getList(this.id)
    // if (this.$route.params.flag === 'productDetail' || this.$route.params.flag === 'reservationList') {
    //   this.item = this.$route.params.item
    // } else {
    //   this.item = JSON.parse(window.localStorage.getItem('productDetail'))
    // }
    // console.log(this.$route.params.showBtn)
    // console.log(this.item.product_status)
    // if (this.$route.params.showBtn === 'hide' || this.item.product_status !== 2 || this.item.is_pause === '1') {
    //   this.showBtn = false
    // }
    window.scroll(0, 0)
    // this.$nextTick(function () {
    //   this.scrollAnnouncement()
    // })
  }
}
</script>

<style lang="less">
@import "../../common/style/variable.less";
#detailPage{
  .vux-header.header{
    background: #D4B67F;
    .vux-header-left{
      .left-arrow:before{
        border-color: @back-color-white;
      }
    }
    .vux-header-title{
      color: @back-color-white;
    }
  }
  .wrapper {
    // background: #F5F5F5;
    padding-bottom: 0px;
    padding-top: 126px;
    .rate-top {
      // text-align: center;
      // height: 365px;
      // background-image: url("data:image/png;base64,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");
      // background-repeat: no-repeat;
      // background-size: 100% 100%;
      background: #D4B67F;
      color: @back-color-white;
      font-family: @font-family-R;
      .announcement{
        height: 60px;
        line-height: 60px;
        font-size: @font-size-twentyE;/*px*/
        padding: 0 30px;
        background: rgba(255, 0, 0, 0.15);
        @-webkit-keyframes kf-marque-animation{
          0% {
            -webkit-transform: translateX(0);
            -moz-transform: translateX(0);
            -ms-transform: translateX(0);
            -o-transform: translateX(0);
            transform: translateX(0);
          }
          100% {
            -webkit-transform: translateX(-33.3%);
            -moz-transform: translateX(-33.3%);
            -ms-transform: translateX(-33.3%);
            -o-transform: translateX(-33.3%);
            transform: translateX(-33.3%);
          }
        }
        @keyframes kf-marque-animation{
          0% {
            -webkit-transform: translateX(0);
            -moz-transform: translateX(0);
            -ms-transform: translateX(0);
            -o-transform: translateX(0);
            transform: translateX(0);
          }
          100% {
            -webkit-transform: translateX(-33.3%);
            -moz-transform: translateX(-33.3%);
            -ms-transform: translateX(-33.3%);
            -o-transform: translateX(-33.3%);
            transform: translateX(-33.3%);
          }
        }
        .announcement-tit{
          font-size: 48px;/*px*/
        }
        .announcement-detail{
          /*width: 570px;*/
          width: 76%;
          height: 60px;
          line-height: 60px;
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: clip;
          position: absolute;
          left: 107px;
          .detail-text{
            display: inline-block;
            position: relative;
            padding-right: 0px;
            white-space: nowrap;
            -o-animation: kf-marque-animation 0s infinite linear;
            -webkit-animation: kf-marque-animation 0s infinite linear;
            animation: kf-marque-animation 0s infinite linear;
          }
        }
      }
      .top-detail{
        padding: 39px 0;
        height: 305px;
        // .num-percent{
          .number, .percent{
            font-family: @font-family-M;
          }
          .number{
            font-size: 72px;/*px*/
            line-height: 100px;
          }
          .percent{
            font-size: 34px;/*px*/
          }
          .text{
            font-size: @font-size-twentyE;
            line-height: 40px;
          }
        // }
        .tit{
          font-size: @font-size-twentyS;
          margin-top: 40px;
          span{
            display: inline-block;
            // width: 138px;
            height: 46px;
            line-height: 46px;
            border: 1px solid #FFFFFF;
            border-radius: 100px;/*px*/
            padding: 0 30px;
          }
          .twice{
            margin: 0 38px;
          }
        }
      }
      // .text-plus-white {
      //   font-size: 48px; /*px*/
      //   margin-top: 50px;
      //   position: relative;
      //   height: 115px;
      //   .percent {
      //     font-family: PingFangSC-Regular;
      //     font-size: 72px;
      //     color: #FFFFFF;
      //   }
      //   .label {
      //     width: 182px;
      //     height: 46px;
      //     text-align: center;
      //     line-height: 46px;
      //     background-color: #C61D1A;
      //     border-radius: 10px;
      //     font-size: 28px; /*px*/
      //     margin-left: 38px;
      //     top: 15px;
      //     font-family: PingFangSC-Semibold;
      //   }
      // }
      // .year{
      //   font-family: PingFangSC-Regular;
      //   font-size: 30px;
      //   // margin-top: 40px;
      //   height: 48px;
      // }
    }
    .middle-cont{
      background: @back-color-white;
      padding-top: 20px;
      height: 134px;
      .left, .right{
        display: inline-block;
        width: 370px;
        padding-left: 80px;
        font-size: @font-size-twentyF;/*px*/
        color: @font-color-9B;
        p{
          line-height: 50px;
          font-family: @font-family-M;
          font-size: @font-size-thirtyS;/*px*/
          color: @font-color-orange1;
        }
      }
      .left{
        border-right: 1px solid #DADADA;
      }
    }
    .base-info{
      background: @back-color-white;
      padding: 40px;
      p{
        font-family: @font-family-M;
        font-size: @font-size-thirtyT;/*px*/
        color: @font-color-black;
        line-height: 45px;
        margin-bottom: 20px;
      }
      table{
        border-right:1px solid #DADADA;/*no*/
        border-bottom:1px solid #DADADA;/*no*/
        // margin: 20px 0 40px 0;
        tr{
          width: 671px;
          height: 70px;
          line-height: 70px;
          td{
            border-left:1px solid #DADADA;/*no*/
            border-top:1px solid #DADADA;/*no*/
            padding-left: 20px;
          }
          td:first-child{
            width: 29%;
            background: #FFFCF9;
            font-size: @font-size-twentyS;/*px*/
            color: #5F616B;
          }
          td:nth-child(2){
            width: 475px;
            font-size: @font-size-twentyE;/*px*/
            color: @font-color-4A;
          }
        }
      }
      .tableTwo{
        tr:first-child{
          td{
            border-top: none;
          }
        }
      }
      .info-detail{
        margin-top: 40px;
        p{
          font-family: @font-family-R;
          font-size: @font-size-twentyE; /*px*/
          line-height: 40px;
        }
        .weui-cell__ft.vux-cell-arrow-transition.vux-cell-arrow-down:after,
        .weui-cell__ft.vux-cell-arrow-transition.vux-cell-arrow-up:after{
          border-color: #DADADA;
        }
      }
    }
    .report-pdf{
      padding: 0 40px;
      background: @back-color-white;
      width: 100%;
      .doc{
        height: 104px;
        line-height: 104px;
        border-bottom: 1px solid #E9E9E9;
        font-size: @font-size-thirty;/*px*/
        color: #171A27;
        .right{
          float: right;
          margin-right: -20px;
          font-size: 60px;/*px*/
          color: #DADADA;
        }
      }
    }
    .reservation{
      .mint-button.mint-button--default{
        width: 670px;
      }
    }
    .space32{
      height: 32px;
    }
    // .box{
    //   // display: -webkit-box;
    //   // overflow-x: auto;
    //   // -webkit-overflow-scrolling: touch;
    //   height: 70px;
    //   white-space: nowrap;
    //   background: #EB4F4C;
    // }
    // .title {
    //   height: 90px;
    //   margin: 26px 0 20px 0;
    //   padding: 24px 0;
    //   box-sizing: border-box;
    //   position: relative;
    //   background: #fff;
    //   font-family: PingFangSC-Semibold;
    //   font-size: 32px;
    //   color: #333333;
    //   .line-blue {
    //     // width: 10px;
    //     // height: 28px;
    //     display: inline-block;
    //     border-radius: 5px;
    //     // background-color: #146AB2;
    //     margin: 0 10px;
    //     vertical-align: text-bottom;
    //   }
    // }
    // .cont {
    //   background: #fff;
    //   margin-bottom: 22px;
    //   font-family: PingFangSC-Regular;
    //   font-size: 30px;
    //   color: #333333;
    //   .cont-text {
    //     // font-size: 28px; /*px*/
    //     padding: 20px 0 20px 20px;
    //     .important{
    //       padding: 1px 8px;
    //       background: #AC1E1C;
    //       border-radius: 5px;
    //       font-family: PingFangSC-Medium;
    //       font-size: 18px;
    //       // vertical-align: middle;
    //       margin-left: 20px;
    //       color: #fff;
    //       position: absolute;
    //       top: 27px;
    //     }
    //   }
    //   .firstName{
    //     position: relative;
    //   }
    // }
    // .report-pdf {
    //     background-color: #F5F5F5;
    //     font-family: PingFangSC-Regular;
    //     font-size: 30px;
    //     color: #333333;
    //   .doc{
    //     height: 80px;
    //     line-height: 80px;
    //     padding-left: 29px;
    //     background: #fff;
    //     margin-bottom: 7px;
    //     .right{
    //       right: 10px;
    //       position: absolute;
    //       font-size: 45px;
    //       color: #999
    //     }
    //   }
    // }
    // .reservation{
    //   text-align: center;
    //   .mint-button.mint-button--primary.mint-button--normal{
    //     /*width: 710px;*/
    //     width: 94.67%;
    //     height: 72px;
    //     margin-top: 33px;
    //     margin-bottom: 40px;
    //     padding: 0;
    //     background: #2672BA;
    //     border-radius: 8px;
    //     label{
    //       font-family: PingFangSC-Regular;
    //       font-size: 28px;
    //       color: #FFFFFF;
    //     }
    //   }
    // }
    // .reservationDisabled{
    //   .mint-button.mint-button--primary.mint-button--normal{
    //     background: #ccc;
    //   }
    // }
    // .btn-24 {
    //   font-size: 24px; /*px*/
    //   color: #ccc;
    //   padding: 6px 16px;
    //   border: 1px solid #eee;
    //   position: absolute;
    //   right: 27px;
    //   top: 50%;
    //   transform: translateY(-50%);
    // }
  }
}
</style>
