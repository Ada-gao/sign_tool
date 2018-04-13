<template>
	<div style="height: 100%;">
		<x-header :left-options="{backText: ''}">组合报告</x-header>
		<div class="wrapper">
      <tab :animate="false" :line-width=6 active-color="#2B7DC2" bar-active-color='#2B7DC2' v-model="index">
        <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in titleList" @on-item-click="onItemClick" :key="index">{{item}}</tab-item>
      </tab>
      <!--<swiper v-model="index" height="100px" :show-dots="false">-->
        <!--<swiper-item v-for="(item, index) in contentList" :key="index">-->
          <!--<div class="tab-swiper vux-center">{{item}} Container</div>-->
        <!--</swiper-item>-->
      <!--</swiper>-->
      <ul class="wrapper-ul">
        <li v-for="(item, contentIndex) in contentList" v-show="contentIndex == index" :key="contentIndex">
          <div>
          	<div class="content1">
              <div class="title"><span></span>投资饼状图</div>
          		<div :id="item.chartName[0]"></div>
          	</div>
          	<div class="space"></div>
          	<div class="content2">
              <div class="title"><span></span>投资分析图</div>
          		<div :id="item.chartName[1]"></div>
          	</div>
          	<div class="space"></div>
          	<group class="insurance-allocation">
          		<cell-box link="/insuranceAllocation">保险配置</cell-box>
          	</group>
          	<div class="space"></div>
          	<group class="cash-flow">
          		<cell-box link="/cashFlow">生命周期现金流</cell-box>
          	</group>
          	<div class="space"></div>
          	<group class="report-pdf">
          		<cell-box>PDF投资组合报告</cell-box>
          		<cell-box link="/pdfReport"><i class="iconfont icon-ppt"></i>资产组合报告1: 2018-1-12 12:12:12</cell-box>
          	</group>
          </div>
        </li>
      </ul>
		</div>
	</div>
</template>

<script>
import { XHeader, GridItem, Tab, TabItem, Swiper, SwiperItem, CellBox, Group } from 'vux'
import echarts from 'echarts'
import 'echarts-gl'
import RemarkList from 'base/remarkList/remarkList'

export default {
  components: {
    XHeader,
    GridItem,
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    CellBox,
    Group,
    RemarkList
  },
  data () {
    return {
      titleList: ['原有投资比例', '推荐投资比例', '标准投资比例'],
      contentList: [
        {
        	chartName: ['contChartPie1', 'contChartScatter1', 'contChartBar1'],
        	chartData: {
        		chart3: [
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
        				guaranteeGap: 125,
        				existInsured: 125
        			},
        			{
        				desc: '终身寿险',
        				guaranteeGap: 125,
        				existInsured: 0
        			}
        		]
        	}
        }, {
        	chartName: ['contChartPie2', 'contChartScatter2', 'contChartBar2'],
        	chartData: {
        		chart3: [
        			{
        				desc: '年金',
        				guaranteeGap: 30,
        				existInsured: 20
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
        				guaranteeGap: 125,
        				existInsured: 125
        			},
        			{
        				desc: '终身寿险',
        				guaranteeGap: 125,
        				existInsured: 0
        			}
        		]
        	}
        }, {
        	chartName: ['contChartPie3', 'contChartScatter3', 'contChartBar3'],
        	chartData: {
        		chart3: [
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
        				guaranteeGap: 125,
        				existInsured: 125
        			},
        			{
        				desc: '终身寿险',
        				guaranteeGap: 125,
        				existInsured: 0
        			}
        		]
        	}
        }
      ],
      index: 0,
      demo2: '原有投资报告',
      chartName: 'contChartPie1',
  		remarkList: [{
  			text: '客户资金2月18号到期，愿意购买正收益理财产品',
  			time: '2018-1-8'
			}, {
				text: '客户正在搜寻二级市场产品',
				time: '2018-1-8'
			}],
			showHideOnBlur: false,
      lengedData: {
        legnedTitle: ['理财金额', '固收金额', '二级市场金额', '另类金额', '总额'],
        lengedNum: [225, 200, 150, 125, 700]
      }
    }
  },
  mounted () {
  	this.drawChartPie1()
  	this.drawChartScatter1()
//	this._setWrapperHeight()
  },
  methods: {
    onItemClick (index) {
    	// 测试
    	let idx = index + 1
      // let contChart = document.getElementById(`contChartPie${index}`)
      // let cont = document.querySelector(`#contChartPie${idx}`)
      this.drawChartPie1(idx)
      this.drawChartScatter1(idx)
    },
    drawChartPie1 (index = 1) {
      let _this = this
    	let chartPie = document.querySelector(`#contChartPie${index}`)
    	chartPie.style.width = document.body.clientWidth + 'px'
    	let contChart1 = echarts.init(chartPie)
    	let options1 = {
    		// title: {
        //   text: '投资饼状图',
        //   x: 'left',
        //   left: 50,
        //   textStyle: {
        //   	color: '#333',
        //   	fontSize: 22,
        //   	fontWeight: '400'
        //   }
        // },
        legend: {
          icon: 'circle',
          orient: 'vertical',
          right: 40,
          // top: 50,
          bottom: 0,
          itemWidth: 20,
          itemHeight: 20,
          itemGap: 20,
          textStyle: {
            fontSize: 28, /* px */
            padding: [0, 0, 0, 26]
          },
          // data: ['理财金额', '固收金额', '二级市场金额', '另类金额'],
          data: _this.lengedData.legnedTitle,
          formatter: function (name) {
            let index = 0
            let _lengedData = _this.lengedData
            _lengedData.legnedTitle.forEach((value, i) => {
              if (value === name) {
                index = i
              }
            })
            return name + '  ' + _lengedData.lengedNum[index] + '万'
          }
        },
        grid: {
          left: '15%',
          top: 0,
          containLabel: true
        },
        series: [
          {
            name: '投资',
            type: 'pie',
            radius: '100%',
            center: ['25%', '50%'],
            hoverAnimation: false,
            label: {
            	normal: {
            		position: 'inner',
                fontSize: 25 /* px */
            	}
            },
            data: [
              {value: 225, name: '理财金额'},
              {value: 200, name: '固收金额'},
              {value: 150, name: '二级市场金额'},
              {value: 125, name: '另类金额'},
              {value: '', name: '总额'}
            ],
            itemStyle: {
            	normal: {
            		label: {
            			show: 'true',
            			formatter: function (params) {
                    return Math.round(params.percent) + '%'
                  }
            		}
            	}
            }
          }
        ],
        color: ['#FC595C', '#FCB45D', '#949CB0', '#43BCBB']
    	}
    	contChart1.setOption(options1)
    },
    getDate () {
//  	let legendData = []
//  	let seriesData = []
    	let projectList = ['理财金额', '固收金额', '二级市场金额', '另类金额']
    	let moneyList = ['125', '200', '25', '150']
    	let arr = []
      	for (let i = 0; i < moneyList.length; i++) {
      		let pro = projectList[i]
          let mon = moneyList[i]
          let proMon = pro + '  ' + mon + '万'
          arr.push(proMon)
       }
    },
    drawChartScatter1 (index = 1) {
    	let contChart2 = echarts.init(document.getElementById(`contChartScatter${index}`))
      let options2 = {
      	// title: {
        //   text: '投资分析图',
        //   x: 'left',
        //   top: '10px',
        //   left: 50,
        //   textStyle: {
        //   	color: '#333',
        //   	fontSize: 14,
        //   	fontWeight: '400'
        //   }
        // },
        grid3D: {
          // width: 700,
          // height: 500,
        	axisTick: {
        		show: false
        	},
        	axisLabel: {
        		margin: 3
        	},
          left: 'center',
          top: -80,
          containLabel: true,
          viewControl: {
            distance: 200
          }
        },
        xAxis3D: {
            type: 'value',
            name: '周期',
            nameGap: 13,
            axisLine: {
              lineStyle: {
                color: '#9370DB'
              }
            },
            nameTextStyle: {
              color: '#333'
            },
            min: 0,
            max: 8
        },
        zAxis3D: {
        	type: 'value',
        	name: '收益率',
        	nameGap: 13,
          axisLine: {
            lineStyle: {
              color: '#e86361'
            }
          },
          nameTextStyle: {
            color: '#333'
          },
          min: 0,
          max: 20
        },
        yAxis3D: {
        	type: 'value',
        	name: '波动率',
        	nameGap: 13,
        	axisLine: {
            lineStyle: {
              color: '#0083c5'
            }
          },
          nameTextStyle: {
            color: '#333'
          },
          min: 0,
          max: 40
        },
        dataset: {
//        dimensions: [
//          'Income',
//          'Life Expectancy',
//          'Population',
//          'Country',
//          {name: 'Year', type: 'ordinal'}
//        ],
          source: [
            [2, 2, 8], [3, 40, 15], [2, 30, 10], [3, 15, 12]
          ]
        },
        series: [
          {
            type: 'scatter3D',
            symbolSize: 15,
            encode: {
              x: 'Country',
              y: 'Life Expectancy',
              z: 'Income',
              tooltip: [0, 1, 2, 3, 4]
            }
          }
        ]
      }
    	contChart2.setOption(options2)
    },
    _setWrapperHeight () {
      let height1 = document.getElementsByClassName('vux-header')[0].clientHeight
      let height2 = document.getElementsByClassName('vux-tab-item')[0].clientHeight
      let height3 = document.getElementsByClassName('weui-grid')[0].clientHeight
      let wrapperUl = document.getElementsByClassName('wrapper-ul')[0]
      let heightBody = document.body.clientHeight
      let maxHeight = heightBody - height1 - height2 - height3
      wrapperUl.style.height = maxHeight + 'px'
    }
  }
}
</script>

<style scoped lang="less">
// body {
// 	background-color: #eee;
// }
.weui-cells {
	i {
		font-size: 18px; /*px*/
		margin-right: 10px;
		padding-bottom: 5px;
		color: #0083C5;
	}
}
.wrapper-ul {
  overflow: auto;
  #contChartPie1,
  #contChartPie2,
  #contChartPie3 {
    width: 100%;
    height: 295px;
  }
  #contChartScatter1,
  #contChartScatter2,
  #contChartScatter3 {
    width: 100%;
    height: 450px;
  }
  .content1 {
    height: 455px;
    // padding-top: 42px;
    // padding-bottom: 57px;
    box-sizing: border-box;
  }
  .content2 {
    height: 595px;
    box-sizing: border-box;
  }
  .content1,
  .content2 {
    .title {
      margin-top: 33px;
      margin-bottom: 40px;
      span {
        padding: 2px 5px;
        background-color: #2B7DC2;
        border-radius: 3px;
        margin-right: 12px;
        margin-left: 27px;
      }
    }
  }
  .insurance-allocation,
  .cash-flow {
    .weui-cells .weui-cell {
      height: 102px;
      padding-top: 32px;
      padding-bottom: 37px;
      box-sizing: border-box;
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
      &:nth-child(1) {
        height: 92px;
        box-sizing: border-box;
      }
    }
  }
}
</style>
