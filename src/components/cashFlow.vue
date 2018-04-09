<template>
  <div class="page">
    <x-header :left-options="{backText: ''}">生命周期现金流</x-header>
    <div class="wrapper" style="padding-top: 126px">
      <div id="asset" style="width: 100%; height: 500px"></div>
      <div class="asset-text">
        <div class="group">
          <span class="title-left">您从2017年开始在正收益财富理财</span>
        </div>
        <div class="group">
          <span class="title-left">最高理财收益</span>
          <span class="fr">{{profit.max | percent}}</span>
        </div>
        <div class="group">
          <span class="title-left">最低理财收益</span>
          <span class="fr">{{profit.min | percent}}</span>
        </div>
        <div class="group">
          <span class="title-left">达到预期收益比例</span>
          <span class="fr">{{profit.ratio}}</span>
        </div>
        <div class="group">
          <span class="title-left">理财总收入</span>
          <span class="fr">{{profit.total}}万</span>
        </div>
        <div class="group">
          <span class="title-left">活到85岁将赚得</span>
          <span class="fr">{{profit.will}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { XHeader } from 'vux'
import echarts from 'echarts'

export default {
  data () {
    return {
      profit: {
        max: 0.085,
        min: 0.085,
        ratio: 100,
        total: 42.5,
        will: 0
      }
    }
  },
  components: {
    XHeader
  },
  mounted () {
    this.drawAssetLine()
  },
  methods: {
    drawAssetLine () {
      let assetId = document.getElementById('asset')
      let myChart = echarts.init(assetId)
      let options1 = {
        color: ['#2b7dc2'],
        legend: {
          type: 'plain',
          bottom: 0,
          right: 70,
          icon: 'roundRect',
          itemWidth: 20,
          itemHeight: 20,
          borderRadius: 10,
          textStyle: {
            padding: [0, 0, 0, 10]
          }
        },
        xAxis: {
          type: 'category',
          data: ['35', '40', '45', '50', '55', '60', '65', '70', '75', '80', '85']
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: [{
          name: '资产',
          data: [10, 15, 18, 25, 40, 65, 83, 98, 101, 80, 0],
          type: 'line',
          smooth: 0.3,
          symbol: 'none',
          smoothMonotone: 'y',
          lineStyle: {
            color: '#84c0f3',
            width: 4
          }
        }]
      }
      myChart.setOption(options1)
    }
  }
}
</script>

<style scoped lang="less">
.wrapper {
  .asset-text {
    .group {
      border-bottom: 1px solid #eee;
      height: 94px;
      line-height: 94px;
      .title-left {
        margin-left: 60px;
      }
      .fr {
        margin-right: 60px;
      }
    }
  }
}
</style>
