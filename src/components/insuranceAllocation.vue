<template>
  <div class="page">
    <x-header :left-options="{backText: ''}">保险配置</x-header>
    <div class="wrapper">
      <div id="insuranceChart" style="width: 100%; height: 400px"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { XHeader } from 'vux'
import echarts from 'echarts'

export default {
  data () {
    return {
      chartData: [
      	{
      		desc: '年金',
      		guaranteeGap: 30,
      		existInsured: 5
      	},
      	{
      		desc: '定期寿险',
      		guaranteeGap: 1100,
      		existInsured: 500
      	},
      	{
      		desc: '重疾保险',
      		guaranteeGap: 160,
      		existInsured: 160
      	},
      	{
      		desc: '高额医疗',
      		guaranteeGap: '无',
      		existInsured: '有'
      	},
      	{
      		desc: '终身寿险',
      		guaranteeGap: 125,
      		existInsured: 0
      	}
      ]
    }
  },
  components: {
    XHeader
  },
  mounted () {
    this.drawBar()
  },
  methods: {
    drawBar () {
      let _this = this
      let myChartId = document.getElementById('insuranceChart')
      let myChart = echarts.init(myChartId)
      let options = {
       grid: {
          left: '5%',
          top: '10%',
          containLabel: true
        },
        tooltip: {
        	show: false,
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
            // label: {
            //   margin: 10
            // }
          },
          // position: ['50%', '50%'],
        	formatter: function (params) {
     		    // console.log(params)
            let span = ''
           	let data = _this.chartData
           	data.forEach((item, i) => {
              if (item.desc === params[0].axisValue) {
                // if(params[2].seriesName === '保障缺口') {
                  // span = data[i].guaranteeGap + '万; '
                // } else if(params[3].seriesName === '已有保额') {
                  span = data[i].existInsured + '万'
                // }
              }
            })
            return span
        	}
        },
        legend: {
        	data: ['保障缺口', '已有保额'],
        	bottom: 0,
        	itemWidth: 10,
        	itemHeight: 10,
        	itemGap: 50
        },
        xAxis: {
          type: 'value',
          min: 0,
          max: 100,
          boundaryGap: [0],
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          },
        	splitLine: {
        		show: false
        	},
        	axisLabel: {
            show: false
          },
          axisTick: {
          	show: false
          }
        },
        yAxis: {
          type: 'category',
          inverse: true,
          data: ['年金', '定期寿险', '重疾保险', '高额医疗', '终身寿险'],
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#eee'
            }
          },
          axisLabel: {
            color: '#333'
          }
        },
        series: [
        { // 柱状图留白
          name: '辅助',
          type: 'bar',
          stack: '缺口',
          itemStyle: {
            normal: {
              barBorderColor: 'rgba(0,0,0,0)',
              color: 'rgba(0,0,0,0)'
            },
            emphasis: {
              barBorderColor: 'rgba(0,0,0,0)',
              color: 'rgba(0,0,0,0)'
            }
          },
          data: [1, 1, 1, 1, 1]
        }, { // 柱状图留白
          name: '辅助',
          type: 'bar',
          stack: '保额',
          itemStyle: {
            normal: {
              barBorderColor: 'rgba(0,0,0,0)',
              color: 'rgba(0,0,0,0)'
            },
            emphasis: {
              barBorderColor: 'rgba(0,0,0,0)',
              color: 'rgba(0,0,0,0)'
            }
          },
          data: [1, 1, 1, 1, 1]
        }, {
          name: '保障缺口',
          type: 'bar',
          stack: '缺口',
          data: [100, 100, 100, 100, 100],
          barWidth: 8,
          itemStyle: {
            normal: {
              color: '#7cc3ff',
              barBorderRadius: 10,
              label: {
                show: true,
                position: 'right',
                offset: [-25, -20],
                formatter: function (params) {
                  let result = ''
                  let data = _this.chartData
                  if (!isNaN(data[params.dataIndex].guaranteeGap)) {
                    result += data[params.dataIndex].guaranteeGap + '万'
                  } else {
                    result += data[params.dataIndex].guaranteeGap
                  }
                  return result
                },
                color: '#333',
                backgroundColor: {
                  image: 'static/img/label1.png'
                },
                padding: [3, 5, 10, 5]
                // lineHeight: 10
                // distance: 150
                // verticalAlign: 'top'
              }
            }
          }
        }, {
          name: '已有保额',
          type: 'bar',
          stack: '保额',
          data: [14, 31, 100, 100, 0],
          barWidth: 8,
          barGap: '-100%',
          itemStyle: {
            normal: {
              color: '#2b7dc2',
              barBorderRadius: 10,
              label: {
                show: true,
                position: 'right',
                offset: [-25, -20],
                formatter: function (params) {
                  let result = ''
                  let data = _this.chartData
                  let _existInsured = data[params.dataIndex].existInsured
                  if (_existInsured === 0 || _existInsured === '无') {
                    result += ''
                  } else if (!isNaN(_existInsured)) {
                    result += _existInsured + '万'
                  } else if (isNaN(_existInsured)) {
                    result += _existInsured
                  }
                  return result
                },
                color: '#333',
                backgroundColor: {
                  image: 'static/img/label1.png'
                },
                padding: [3, 5, 10, 5]
              }
            }
          }
        }]
      }
      myChart.setOption(options)
    }
  }
}
</script>

<style scoped lang="less">
.wrapper {
  padding-top: 126px;
}
</style>
