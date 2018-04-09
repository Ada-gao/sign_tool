	<template>
	<div>
		<x-header :left-options="{backText: ''}">资产配置</x-header>
		<div class="wrapper" style="overflow: auto;">
      <investor :investor-data="investorInfo"></investor>
			<div class="echarts-bar" ref="echartWrapper">
				<div v-show="isChecked" id="myChart1" ref="myChart1"></div>
				<div v-show="!isChecked" id="myChart2" ref="myChart2"></div>
				<div class="toggle-button">
					<button class="btn btn-small" :class="{'btn-checked': isChecked}" @click="toggleShowChart(1)" style="border-right: none;">金额</button>
					<button class="btn btn-small" :class="{'btn-checked': !isChecked}" @click="toggleShowChart(2)">比例</button>
				</div>
			</div>
			<div class="score">
				<p class="sum-up">得分总结：新增的投资会改善您资产的<span class="red-text">收益性、流动性、波动性</span>。</p>
				<div class="add-invest">
					<span>新增投资比例：</span>
					<inline-x-number v-bind:min="minNum" width="183px" v-bind:step="stepNum" v-bind:value="inputVal" @on-change="change"></inline-x-number>
					<span>万</span>
					<div class="divide-line"></div>
					<p class="text-plus">得分：<span class="red-text-1">{{investScore}}</span>分
						<i class="icon-help_outline" style="font-size: 18px;margin-left: 5px;color: #ccc;"></i>
					</p>
				</div>
			</div>
		</div>
		<footer-button></footer-button>
	</div>
</template>

<script>
import { XHeader, InlineXNumber, Grid, GridItem } from 'vux'
import FooterButton from 'base/footer/footer'
import Investor from 'base/investor/investor'
import echarts from 'echarts'

export default {
  components: {
    XHeader,
    InlineXNumber,
    Grid,
    GridItem,
    Investor,
    FooterButton
  },
  props: {
    min: {
      type: Number
    },
    step: {
      type: Number
    }
  },
  data () {
    return {
      isChecked: true,
      originalScore: 60,
      idealScore: 100,
      investScore: 69,
      minNum: 0,
      stepNum: 100,
      inputVal: 0,
      chartData: {
        legendData: {
          legendTitle: ['原有投资比例', '理想投资比例'],
          legendNum: [60, 100]
        }
      },
      investorInfo: {
        name: '大卫史文森',
        profession: '专业投资者',
        type: '稳健性'
      }
    }
  },
  mounted () {
    this._drawAsset1()
    window.addEventListener('resize', () => {
      this._drawAsset1()
      this._drawAsset2()
    })
  },
  methods: {
    _drawAsset1 () {
      let _this = this
      let myChart1 = echarts.init(document.getElementById('myChart1'))
      let options1 = {
        legend: {
          icon: 'roundRect',
          orient: 'vertical',
          bottom: 80,
          itemHeight: 17,
          itemWidth: 17,
          itemGap: 17,
          textStyle: {
            fontSize: 22, /* px */
            padding: [0, 0, 0, 13]
          },
          data: _this.chartData.legendData.legendTitle,
          formatter: function (name) {
            let index = 0
            let _legendData = _this.chartData.legendData
            _legendData.legendTitle.forEach((value, i) => {
              if (value === name) {
                index = i
              }
            })
            return name + '    得分：' + _legendData.legendNum[index] + '分'
          }
        },
        grid: {
          left: '10%',
          top: 60,
          bottom: 180,
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0],
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          }
        },
        yAxis: {
          type: 'category',
          inverse: true,
          data: ['理财金额', '固收金额', '二级市场金额', '另类投资金额'],
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          },
          axisLabel: {
            color: '#333'
          }
        },
        series: [{
          name: '辅助',
          type: 'bar',
          stack: '原有',
          itemStyle: {
            normal: {
              barBorderColor: 'rgba(0,0,0,0)',
              color: 'rgba(0,0,0,0)'
            }
          },
          data: [5, 5, 5, 5]
        }, {
          name: '辅助',
          type: 'bar',
          stack: '理想',
          itemStyle: {
            normal: {
              barBorderColor: 'rgba(0,0,0,0)',
              color: 'rgba(0,0,0,0)'
            }
          },
          data: [5, 5, 5, 5]
        }, {
          name: '原有投资比例',
          type: 'bar',
          stack: '原有',
          data: [125, 200, 25, 150],
          barWidth: 8,
          itemStyle: {
            normal: {
              color: '#FFCF94',
              barBorderRadius: 10,
              label: {
                show: true,
                position: 'right',
                offset: [-25, -20],
                formatter: '{c}万',
                color: '#333',
                backgroundColor: {
                  image: 'static/img/label1.png'
                },
                padding: [3, 5, 10, 5]
              }
            }
          }
        }, {
          name: '理想投资比例',
          type: 'bar',
          stack: '理想',
          data: [125, 125, 125, 125],
          barWidth: 8,
          itemStyle: {
            normal: {
              color: '#7CC3FF',
              barBorderRadius: 10
            }
          }
        }]
      }
      myChart1.setOption(options1)
    },
    _drawAsset2 () {
      this._setChartWidth()
      let _this = this
      let myChart2 = echarts.init(document.getElementById('myChart2'))
      let options2 = {
        legend: {
          icon: 'roundRect',
          orient: 'vertical',
          bottom: 80,
          itemHeight: 17,
          itemWidth: 17,
          itemGap: 17,
          textStyle: {
            fontSize: 22, /* px */
            padding: [0, 0, 0, 13]
          },
          data: _this.chartData.legendData.legendTitle,
          formatter: function (name) {
            let index = 0
            let _legendData = _this.chartData.legendData
            _legendData.legendTitle.forEach((value, i) => {
              if (value === name) {
                index = i
              }
            })
            return name + '    得分：' + _legendData.legendNum[index] + '分'
          }
        },
        grid: {
          left: '10%',
          top: 60,
          bottom: 180,
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0],
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          }
        },
        yAxis: {
          type: 'category',
          inverse: true,
          data: ['理财金额', '固收金额', '二级市场金额', '另类投资金额'],
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          },
          axisLabel: {
            color: '#333'
          }
        },
        series: [{
          name: '辅助',
          type: 'bar',
          stack: '原有',
          itemStyle: {
            normal: {
              barBorderColor: 'rgba(0,0,0,0)',
              color: 'rgba(0,0,0,0)'
            }
          },
          data: [1, 1, 1, 1]
        }, {
          name: '辅助',
          type: 'bar',
          stack: '理想',
          itemStyle: {
            normal: {
              barBorderColor: 'rgba(0,0,0,0)',
              color: 'rgba(0,0,0,0)'
            }
          },
          data: [1, 1, 1, 1]
        }, {
          name: '原有投资比例',
          type: 'bar',
          stack: '原有',
          data: [25, 40, 5, 30],
          barWidth: 8,
          itemStyle: {
            normal: {
              color: '#FFCF94',
              barBorderRadius: 10,
              label: {
                show: true,
                position: 'right',
                offset: [-25, -20],
                formatter: '{c}%',
                color: '#333',
                backgroundColor: {
                  image: 'static/img/label1.png'
                },
                padding: [3, 5, 10, 5]
              }
            }
          }
        }, {
          name: '理想投资比例',
          type: 'bar',
          stack: '理想',
          data: [25, 25, 25, 25],
          barWidth: 8,
          itemStyle: {
            normal: {
              color: '#7CC3FF',
              barBorderRadius: 10
            }
          }
        }]
      }
      myChart2.setOption(options2)
    },
    toggleShowChart (num) {
      num === 1 ? this.isChecked = true : this.isChecked = false
      this._drawAsset2()
    },
    _setChartWidth () {
      let myChartBar1 = document.getElementById('myChart1')
      let myChartBar2 = document.getElementById('myChart2')
      let width = document.body.clientWidth
      myChartBar1.style.width = width + 'px'
      myChartBar2.style.width = width + 'px'
    },
    change (val) {
      this.investScore++
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
/*@import '../common/style/theme.less';*/
// .investor {
// 	text-align: left;
//   padding: 13px 20px 15px 20px;
//   box-sizing: border-box;
//   height: 114px;
// 	background-color: #eee;
//   position: relative;
//   color: #333;
//   .ist-name {
//     font-size: 32px; /*px*/
//   }
//   .ist-tag {
//     font-size: 26px; /*px*/
//   }
// }
.echarts-bar {
	position: relative;
	/*width: 100%;*/
	.toggle-button {
		font-size: 0;
		position: absolute;
		top: 22px;
		right: 22px;
	}
	.btn-checked {
		background-color: #0083c5;
		color: #fff;
	}
	#myChart2, #myChart1 {
		width: 100%;
		height: 463px;
	}
}
.score {
	border-top: 1px solid orange;
	background-color: blanchedalmond;
	padding: 0 23px 40px 23px;
	.sum-up {
		// margin-top: 15px;
		text-align: left;
    font-size: 24px; /*px*/
    padding: 30px 0;
    .red-text {
      color: #FC4938;
    }
	}
	.add-invest {
		border: 1px solid #FFBE76;
		background-color: #fff;
		border-radius: 5px;
		padding: 45px 20px 60px 20px;
    white-space: nowrap;
    text-align: center;
		/*.divide-line {
			width: 100%;
			background-color: #ccc;
			height: 1px;
			margin-top: 20px;
			margin-bottom: 20px;
		}*/
		> span {
      display: inline-block;
      font-size: 24px; /*px*/
		}
		.x-number {
			a {
				background-color: #236282 !important;
        border-radius: 5px !important;
        > svg {
          fill: #fff;
        }
			}
			input {
				background-color: #ccc;
			}
		}
		.vux-inline-x-number {
      vertical-align: middle;
			.vux-number-selector-sub {
				background-color: #236282 !important;
        border-radius: 5px !important;
			}
			.vux-number-selector {
				background-color: #236282 !important;
        border-radius: 5px !important;
        svg {
          fill: #fff;
        }
			}
			input {
				background-color: #ccc;
				width: 100px !important;
			}
		}
	}
}
/*公共分割线*/
.divide-line {
	width: 100%;
	background-color: #ccc;
	height: 1px;
	margin-top: 50px;
	margin-bottom: 50px;
}
</style>
