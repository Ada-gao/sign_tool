<template>
  <div class="page">
    <x-header :left-options="{backText: ''}">我的业绩</x-header>
    <div class="wrapper">
      <div class="situation">
        <p class="label-text">我的业绩指标：<span class="red-text">300万</span></p>
        <p class="label-text">完成业绩量：<span class="red-text">150万</span></p>
        <p class="label-text">业绩完成比例：<span class="red-text">100%</span></p>
        <p class="label-text">业绩量排名：<span class="red-text">42名</span></p>
      </div>
      <div class="Charts">
        <div class="toggle-button">
          <button class="btn btn-gray" @click="drawChart1" :class="isClick === 1? 'btn-primary': ''">月</button>
          <button class="btn btn-gray" @click="drawChart2" :class="isClick === 2? 'btn-primary': ''">季</button>
          <button class="btn btn-gray" @click="drawChart3" :class="isClick === 3? 'btn-primary': ''">半年</button>
          <button class="btn btn-gray" @click="drawChart4" :class="isClick === 4? 'btn-primary': ''">年</button>
        </div>
        <div id="myChart1" v-show="isClick === 1" style="height: 435px; width: 100%"></div>
        <div id="myChart2" v-show="isClick === 2" style="height: 435px; width: 100%"></div>
        <div id="myChart3" v-show="isClick === 3" style="height: 435px; width: 100%"></div>
        <div id="myChart4" v-show="isClick === 4" style="height: 435px; width: 100%"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { XHeader } from 'vux'
// import echarts from 'echarts'
import MyEcharts from 'common/js/performanceChart'

export default {
  data () {
    return {
      isClick: 1,
      chartData: {
        month: {
          xAxis: 31,
          series: [220, 282, 201, 234, 290, 430, 410, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200]
        },
        quarter: {
          xAxis: 12,
          series: [220, 282, 201, 234, 290, 430, 410, 200, 200, 200, 200, 200]
        },
        halfAYear: {
          xAxis: 6,
          series: [220, 282, 201, 234, 290, 430, 410]
        },
        year: {
          xAxis: 12,
          series: [220, 282, 201, 234, 290, 430, 410, 200, 200, 200, 200, 200]
        }
      }
    }
  },
  components: {
    XHeader
  },
  mounted () {
    // this.drawChart(index)
    this.drawChart1()
    // this.drawChart2()
    // this.drawChart3()
    // this.drawChart4()
    // console.log(this.isClick)
  },
  methods: {
    // drawChart (index) {
    //   this.isClick = index
    //   // console.log(index)
    //   let _this = this
    //   let opt = MyEcharts.LineChart({
    //     xAxis: _this.chartData[index - 1].xAxis,
    //     series: _this.chartData[index - 1].series
    //   })
    //   MyEcharts.RenderChart(opt, index)
    // }
    drawChart1 () {
      this.isClick = 1
      let _this = this
      let opt1 = MyEcharts.LineChart({
        xAxis: _this.chartData.month.xAxis,
        series: _this.chartData.month.series
      })
      MyEcharts.RenderChart(opt1, 1)
    },
    drawChart2 () {
      this.isClick = 2
      let _this = this
      let opt1 = MyEcharts.LineChart({
        xAxis: _this.chartData.quarter.xAxis,
        series: _this.chartData.quarter.series
      })
      MyEcharts.RenderChart(opt1, 2)
    },
    drawChart3 () {
      this.isClick = 3
      let _this = this
      let opt1 = MyEcharts.LineChart({
        xAxis: _this.chartData.halfAYear.xAxis,
        series: _this.chartData.halfAYear.series
      })
      MyEcharts.RenderChart(opt1, 3)
    },
    drawChart4 () {
      this.isClick = 4
      let _this = this
      let opt1 = MyEcharts.LineChart({
        xAxis: _this.chartData.year.xAxis,
        series: _this.chartData.year.series
      })
      MyEcharts.RenderChart(opt1, 4)
    }
  }
}
</script>

<style scoped lang="less">
.wrapper {
  .situation {
    padding: 50px 30px;
    font-size: 30px; /*px*/
    line-height: 60px;
    .label-text {
      .red-text {
        color: #FF4545;
      }
    }
  }
  .Charts {
    position: relative;
  }
  .toggle-button {
    position: absolute;
    right: 40px;
    z-index: 100;
    .btn {
      padding: 4px 0;
      background-color: #eee;
      border: none;
      border-radius: 0;
      width: 90px;
    }
    .btn-primary {
      background-color: #FF4545;
      // padding: 6px 0;
      // padding: 0;
      // text-align: center;
      // box-sizing: border-box;

    }
  }
}
</style>
