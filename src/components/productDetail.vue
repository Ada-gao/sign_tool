<template>
  <div class="detailPage">
    <x-header :left-options="{backText: '',preventGoBack:true}" @on-click-back="back()">产品详情</x-header>
    <div class="wrapper">
      <div class="rate-top">
        <p class="text-plus-white">
          <i class="percent">{{item.annualized_return}}</i>%
          <span class="label absolute-center-y" v-if="item.product_type_id === 1">二级市场</span>
          <span class="label absolute-center-y" v-else-if="item.product_type_id === 2">理财</span>
          <span class="label absolute-center-y" v-else-if="item.product_type_id === 3">固收</span>
          <span class="label absolute-center-y" v-else-if="item.product_type_id === 4">另类</span>
        </p>
        <p class="year">收益对标基准</p>
      </div>
      <div class="product">
        <div class="title"><span class="line-blue"></span>产品信息</div>
        <div class="cont">
          <p class="cont-text">产品名称 ：{{item.product_name}}</p>
          <p class="cont-text" v-if="item.product_type_id === 1">产品类型 ：二级市场</p>
          <p class="cont-text" v-else-if="item.product_type_id === 2">产品类型 ：理财</p>
          <p class="cont-text" v-else-if="item.product_type_id === 3">产品类型 ：固收</p>
          <p class="cont-text" v-else-if="item.product_type_id === 4">产品类型 ：另类</p>
          <p class="cont-text">产品编号 ：{{item.product_code}}</p>
          <p class="cont-text">产品LP数量 ：{{item.product_lp}}</p>
          <p class="cont-text">基金管理人 : {{item.manager}}</p>
        </div>
        <div class="cont">
          <p class="cont-text">收益对标基准 ：{{item.annualized_return}}</p>
          <!-- <p class="cont-text">发行额度 ：{{name}}</p> -->
          <p class="cont-text">募集额度 ：{{item.collection_amount}}万</p>
          <p class="cont-text">追加金额 ：{{item.minimal_add_amount}}万</p>
          <p class="cont-text">起投金额 : {{item.minimal_amount}}万</p>
          <!-- <p class="cont-text">投资门槛 : 方新侠</p> -->
          <p class="cont-text">募集币种 : {{item.currency_id === 1 ? '人民币' : '美元' }}</p>
          <p class="cont-text">净值 : {{item.net_value}}</p>
        </div>
        <div class="cont">
          <p class="cont-text">收益分配方式 ：{{item.income_distribution}}</p>
          <p class="cont-text">风险评级 ：{{item.product_risk_level}}</p>
          <p class="cont-text">产品期限 ：{{item.investment_horizon}}</p>
          <p class="cont-text">产品亮点 ：{{item.highlight}}</p>
        </div>
        <div class="report-pdf">
          <div class="doc" @click="toPdfReport(id)">交易所需材料<span class="iconfont right">&#xe731;</span></div>
          <div class="doc" @click="toPptReport(id)">产品说明材料<span class="iconfont right">&#xe731;</span></div>
          <div class="doc" @click="toProductReport(id)">产品公告<span class="iconfont right">&#xe731;</span></div>
          <div class="doc" @click="toProductReport(id)">上传客户材料<span class="iconfont right">&#xe731;</span></div>
        </div>
        <div class="reservation" v-show="item.product_status === 2">
          <mt-button type="primary" @click="toAppointment">预约</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { XHeader, Group, CellBox } from 'vux'

export default {
  data () {
    return {
      item: [],
      id: ''
      // ,
      // email: '',
      // userId: ''
    }
  },
  components: {
    XHeader,
    Group,
    CellBox
  },
  methods: {
    back () {
			this.$router.push({name: 'HomePage'})
    },
    toPdfReport (id) {
			this.$router.push({name: 'PdfReport', params: {id: id}})
    },
    toPptReport (id) {
			this.$router.push({name: 'PptReport', params: {id: id}})
    },
    toProductReport (id) {
			this.$router.push({name: 'ProductReport', params: {id: id}})
    },
    toAppointment () {
      this.$router.push({name: 'ProductAppointment'})
    }
  },
  mounted () {
    this.id = this.$route.params.id
    this.item = JSON.parse(window.localStorage.getItem('productDetail'))
    window.scroll(0, 0)
  }
}
</script>

<style lang="less">
@import "../common/style/variable.less";
.vux-header{
  .vux-header-title{
    font-family: PingFangSC-Regular;
    font-size: 36px !important;
  }
}
.detailPage{
  .wrapper {
    background: #F5F5F5;
    padding-bottom: 0px;
    .rate-top {
      text-align: center;
      height: 286px;
      background-image: url("data:image/png;base64,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");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      color: #fff;
      overflow: hidden;
      .text-plus-white {
        font-size: 48px; /*px*/
        margin-top: 50px;
        position: relative;
        height: 115px;
        .percent {
          font-family: PingFangSC-Regular;
          font-size: 72px;
          color: #FFFFFF;
        }
        .label {
          width: 182px;
          height: 46px;
          text-align: center;
          line-height: 46px;
          background-color: #C61D1A;
          border-radius: 10px;
          font-size: 28px; /*px*/
          margin-left: 38px;
          top: 15px;
          font-family: PingFangSC-Semibold;
        }
      }
      .year{
        font-family: PingFangSC-Regular;
        font-size: 30px;
        // margin-top: 40px;
        height: 48px;
      }
    }
    .title {
      height: 90px;
      margin: 26px 0 20px 0;
      padding: 24px 0;
      box-sizing: border-box;
      position: relative;
      background: #fff;
      font-family: PingFangSC-Semibold;
      font-size: 32px;
      color: #333333;
      .line-blue {
        // width: 10px;
        // height: 28px;
        display: inline-block;
        border-radius: 5px;
        // background-color: #146AB2;
        margin: 0 15px;
        vertical-align: text-bottom;
      }
    }
    .cont {
      background: #fff;
      margin-bottom: 22px;
      font-family: PingFangSC-Regular;
      font-size: 30px;
      color: #333333;
      .cont-text {
        font-size: 28px; /*px*/
        padding: 32px 0 32px 29px;
      }
    }
    .report-pdf {
        background-color: #F5F5F5;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #333333;
      .doc{
        height: 80px;
        line-height: 80px;
        padding-left: 29px;
        background: #fff;
        margin-bottom: 7px;
        .right{
          right: 10px;
          position: absolute;
          font-size: 45px;
          color: #999
        }
      }
    }
    .reservation{
      text-align: center;
      .mint-button.mint-button--primary.mint-button--normal{
        width: 710px;
        height: 72px;
        margin-top: 33px;
        margin-bottom: 40px;
        padding: 0;
        background: #2672BA;
        border-radius: 8px;
        label{
          font-family: PingFangSC-Regular;
          font-size: 28px;
          color: #FFFFFF;
        }
      }
    }
    .btn-24 {
      font-size: 24px; /*px*/
      color: #ccc;
      padding: 6px 16px;
      border: 1px solid #eee;
      position: absolute;
      right: 27px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
