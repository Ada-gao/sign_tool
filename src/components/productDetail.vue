<template>
  <div class="page">
    <x-header :left-options="{backText: ''}">产品详情</x-header>
    <div class="wrapper">
      <div class="rate-top">
        <p class="text-plus-white"> <i class="text-1">8.44</i>%<span class="label absolute-center-y">二级市场</span></p>
        <p>近一年收益</p>
      </div>
      <!-- <div class="introduce">
        <div class="title"><span class="line-blue"></span>介绍信息<span class="btn-24 btn-default fr">已关注</span></div>
        <div class="cont">
          <p class="cont-text">产品名称 ：{{name}}</p>
          <p class="cont-text">管理人 : 方新侠</p>
        </div>
      </div>
      <div class="space"></div>
      <div class="asset">
        <div class="title"><span class="line-blue"></span>资产信息</div>
        <div class="cont">
          <p class="cont-text">存续期 ：2年</p>
          <p class="cont-text">募资规模 : 1000万</p>
          <p class="cont-text">认购金额 : 100万</p>
          <p class="cont-text">收益分配 : 年化8%优先回报，80%总回报</p>
          <p class="cont-text">拟投标的 : 债券、股票市场</p>
          <p class="cont-text">产品亮点 : 对冲策略</p>
        </div>
      </div>
      <div class="space"></div> -->
      <div class="product">
        <div class="title"><span class="line-blue"></span>产品信息</div>
        <div class="cont">
          <p class="cont-text">产品名称 ：{{name}}</p>
          <p class="cont-text">产品类型 ：{{name}}</p>
          <p class="cont-text">产品编号 ：{{name}}</p>
          <p class="cont-text">产品LP数量 ：{{name}}</p>
          <p class="cont-text">基金管理人 : 方新侠</p>
        </div>
        <div class="cont">
          <p class="cont-text">年化收益率 ：{{name}}</p>
          <p class="cont-text">发行额度 ：{{name}}</p>
          <p class="cont-text">募集额度 ：{{name}}</p>
          <p class="cont-text">追加金额 ：{{name}}</p>
          <p class="cont-text">起投金额 : 方新侠</p>
          <p class="cont-text">投资门槛 : 方新侠</p>
          <p class="cont-text">募集币种 : 方新侠</p>
          <p class="cont-text">净值 : 方新侠</p>
        </div>
        <div class="cont">
          <p class="cont-text">收益分配方式 ：{{name}}</p>
          <p class="cont-text">风险评级 ：{{name}}</p>
          <p class="cont-text">产品期限 ：{{name}}</p>
          <p class="cont-text">产品亮点 ：{{name}}</p>
        </div>
        <group class="report-pdf">
        	<!-- <cell-box>产品信息</cell-box> -->
        	<cell-box link="/pdfReport" ><i class="iconfont icon-ppt"></i>交易所需材料</cell-box>
        	<cell-box link="/pdfReport"><i class="iconfont icon-ppt"></i>产品说明材料（产品信息ppt）</cell-box>
        	<cell-box link="/pdfReport"><i class="iconfont icon-ppt"></i>产品公告（信息披露）</cell-box>
        </group>
      </div>
      <!-- <div class="space"></div>
      <div class="disclosure">
        <div class="title"><span class="line-blue"></span>信息披露</div>
        <group class="report-pdf">
        	<cell-box>产品信息</cell-box>
        	<cell-box link="/pdfReport"><i class="iconfont icon-ppt"></i>信息披露1: 2018-1-12 12:12:12</cell-box>
        	<cell-box link="/pdfReport"><i class="iconfont icon-ppt"></i>信息披露2: 2018-1-12 12:12:12</cell-box>
        </group>
      </div> -->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { XHeader, Group, CellBox } from 'vux'

export default {
  data () {
    return {
      name: '正收益二级市场投资基金'
    }
  },
  components: {
    XHeader,
    Group,
    CellBox
  },
  mounted () {}
}
</script>

<style scoped lang="less">
@import "../common/style/variable.less";
.vux-header{
  padding-top: 36px;
}
.wrapper {
  // letter-spacing: 2px;
  background: #F5F5F5;
  .rate-top {
    text-align: center;
    height: 230px;
    // background-color: @color-bg-header;
    background-image: url("../../static/img/detailBanner.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    color: #fff;
    overflow: hidden;
    .text-plus-white {
      font-size: 40px; /*px*/
      margin-top: 20px;
      position: relative;
      .text-1 {
        font-size: 72px; /*px*/
      }
      .label {
        background-color: #C61D1A;
        border-radius: 10px;
        font-size: 24px; /*px*/
        padding: 6px 16px;
        // position: absolute;
        // top: 50%;
        // transform: translateY(-50%);
        // -webkit-transform: translateY(-50%);
        margin-left: 32px;
      }
    }
  }
  .title {
    height: 90px;
    margin: 26px 0 20px 0;
    padding: 24px 0;
    box-sizing: border-box;
    position: relative;
    font-size: 30px; /*px*/
    // border-bottom: 1px solid #eee; /*no*/
    background: #fff;
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
    .cont-text {
      font-size: 28px; /*px*/
      padding: 32px 0 32px 42px;
    }
  }
  .report-pdf {
      background-color: #F5F5F5;    
    .weui-cells.vux-no-group-title{
      // height: 126px;
      box-sizing: border-box;
      background-color: #F5F5F5 !important;
      i {
        font-size: 48px; /*px*/
        margin-right: 25px;
        margin-left: 30px;
      }
    }
    .vux-cell-box.weui-cell.vux-tap-active.weui-cell_access{
      background: #fff;
      height: 80px;
      margin-bottom: 7px;
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
</style>
