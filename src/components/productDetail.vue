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
        <p class="year">近一年收益</p>
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
          <p class="cont-text">年化收益率 ：{{item.annualized_return}}</p>
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
        	<!-- <cell-box is-link @click="toPdfReport(id,item)">交易所需材料</cell-box>
        	<cell-box link="/pptReport">产品说明材料（产品信息ppt）</cell-box>
        	<cell-box link="/productReport">产品公告（信息披露）</cell-box>-->
          <div class="doc" @click="toPdfReport(id,item)">交易所需材料<span class="iconfont right">&#xe731;</span></div>
          <div class="doc" @click="toPptReport(id,item)">产品说明材料（产品信息ppt）<span class="iconfont right">&#xe731;</span></div>
          <div class="doc" @click="toProductReport(id,item)">产品公告（信息披露）<span class="iconfont right">&#xe731;</span></div>
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
    toPdfReport (id, item) {
      // this.$router.push({name: 'PdfReport', params: {id: id, item: item, email: email, userId: userId}})
			this.$router.push({name: 'PdfReport', params: {id: id, item: item}})
    },
    toPptReport (id, item) {
      // this.$router.push({name: 'PptReport', params: {id: id, item: item, email: email, userId: userId}})
			this.$router.push({name: 'PptReport', params: {id: id, item: item}})
    },
    toProductReport (id, item) {
      // this.$router.push({name: 'ProductReport', params: {id: id, item: item, email: email, userId: userId}})
			this.$router.push({name: 'ProductReport', params: {id: id, item: item}})
    }
  },
  mounted () {
    this.id = this.$route.params.id
    this.item = this.$route.params.item
    // this.email = this.$route.params.email
    // this.userId = this.$route.params.userId
  }
}
</script>

<style lang="less">
@import "../common/style/variable.less";
.vux-header{
  // padding-top: 36px;
  .vux-header-title{
    font-family: PingFangSC-Regular;
    font-size: 36px !important;
  }
}
.detailPage{
  .wrapper {
    // letter-spacing: 2px;
    background: #F5F5F5;
    padding-bottom: 0px;
    .rate-top {
      text-align: center;
      height: 286px;
      // background-color: @color-bg-header;
      background-image: url("../../static/img/detailBanner.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      color: #fff;
      overflow: hidden;
      .text-plus-white {
        font-size: 48px; /*px*/
        margin-top: 37px;
        position: relative;
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
          top: 37px;
          font-family: PingFangSC-Semibold;
        }
      }
      .year{
        font-family: PingFangSC-Regular;
        font-size: 30px;
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
        padding: 32px 0 32px 42px;
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
      // .weui-cells.vux-no-group-title{
      //   // height: 126px;
      //   box-sizing: border-box;
      //   background-color: #F5F5F5;
      //   i {
      //     font-size: 48px; /*px*/
      //     margin-right: 25px;
      //     margin-left: 30px;
      //   }
      // }
      // .vux-cell-box.weui-cell.vux-tap-active.weui-cell_access{
      //   background: #fff;
      //   height: 80px;
      //   margin-bottom: 7px;
      // }
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
