<template>
  <div class="page">
    <x-header :left-options="{backText: ''}">正收益理财产品</x-header>
    <div class="wrapper">
      <div class="rate-top">
        <p class="text-plus-white"> <i class="text-1">8.44</i>%<span class="label">二级市场</span></p>
        <p>近一年收益</p>
      </div>
      <div class="introduce">
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
      <div class="space"></div>
      <div class="product">
        <div class="title"><span class="line-blue"></span>产品信息</div>
        <group class="report-pdf">
        	<!-- <cell-box>产品信息</cell-box> -->
        	<cell-box link="/pdfReport"><i class="iconfont icon-ppt"></i>产品资料1: 2018-1-12 12:12:12</cell-box>
        	<cell-box link="/pdfReport"><i class="iconfont icon-ppt"></i>产品资料2: 2018-1-12 12:12:12</cell-box>
        </group>
      </div>
      <div class="space"></div>
      <div class="disclosure">
        <div class="title"><span class="line-blue"></span>信息披露</div>
        <group class="report-pdf">
        	<!-- <cell-box>产品信息</cell-box> -->
        	<cell-box link="/pdfReport"><i class="iconfont icon-ppt"></i>信息披露1: 2018-1-12 12:12:12</cell-box>
        	<cell-box link="/pdfReport"><i class="iconfont icon-ppt"></i>信息披露2: 2018-1-12 12:12:12</cell-box>
        </group>
      </div>
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
  }
}
</script>

<style scoped lang="less">
@import "../common/style/variable.less";
.wrapper {
  // letter-spacing: 2px;
  .rate-top {
    text-align: center;
    height: 230px;
    background-color: @color-bg-header;
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
        background-color: #F76E61;
        font-size: 24px; /*px*/
        padding: 6px 16px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        margin-left: 32px;
      }
    }
  }
  .title {
    height: 88px;
    padding: 24px 0;
    box-sizing: border-box;
    position: relative;
    font-size: 30px; /*px*/
    border-bottom: 1px solid #eee;
    .line-blue {
      width: 10px;
      height: 28px;
      display: inline-block;
      border-radius: 5px;
      background-color: #146AB2;
      margin: 0 15px;
      vertical-align: text-bottom;
    }
  }
  .cont {
    .cont-text {
      font-size: 28px; /*px*/
      padding: 32px 0 32px 42px;
    }
  }
  .report-pdf {
    .weui-cells .weui-cell {
      height: 126px;
      box-sizing: border-box;
      i {
        font-size: 48px; /*px*/
        margin-right: 25px;
        margin-left: 30px;
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
</style>
