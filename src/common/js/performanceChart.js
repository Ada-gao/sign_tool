import echarts from 'echarts'

let MyEcharts = {
  chartDataFormate: function (data) {
    let xData = []
    let sData = data.series
    for (let i = 1; i <= data.xAxis; i++) {
      xData.push(i)
    }
    return {xData, sData}
  },
  LineChart: function (data) {
    let datas = MyEcharts.chartDataFormate(data)
    let option = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['业绩'],
        left: 30
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      // 另存为图片功能
      // toolbox: {
      //     feature: {
      //         saveAsImage: {}
      //     }
      // },
      xAxis: {
        type: 'category',
        data: datas.xData
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '业绩',
          type: 'line',
          step: 'middle',
          symbol: 'none',
          data: datas.sData
        }
      ]
    }
    return option
  },
  // 图形展示
  RenderChart: function (option, containerIdx) {
    let container = document.getElementById('myChart' + containerIdx + '')
    container.style.width = document.body.clientWidth + 'px'
    let myChart = echarts.init(container)
    myChart.setOption(option)
  }
}

// function DrawChart(option) {
//   // options.id = options.id || 'myChart'
//   // options.xData = options.xData
//   // options.series = options.series
//   option = {
//     id: id || 'myChart',
//     xData: xData,
//     series: series
//   }
//   const chartId = document.getElementById(option.id)
//   const myChart = echarts.init(chartId)
//   const options = {
//     tooltip: {
//       trigger: 'axis'
//     },
//     legend: {
//       data: ['业绩'],
//       left: 30
//     },
//     grid: {
//       left: '3%',
//       right: '4%',
//       bottom: '3%',
//       containLabel: true
//     },
//     // 另存为图片功能
//     // toolbox: {
//     //     feature: {
//     //         saveAsImage: {}
//     //     }
//     // },
//     xAxis: {
//       type: 'category',
//       data: option.xData
//     },
//     yAxis: {
//       type: 'value'
//     },
//     series: [
//       {
//         name: '业绩',
//         type: 'line',
//         step: 'middle',
//         symbol: 'none',
//         data: option.series
//       }
//     ]
//   }
//   myChart.setOption(options)
// }

export default MyEcharts
