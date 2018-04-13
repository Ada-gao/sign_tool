<template>
	<div>
		<x-header :left-options="{backText: ''}">风险测评</x-header>
    <div class="wrapper">
      <investor :investor-data="investorInfo"></investor>
      <br>
      <step v-model="step" background-color='#fbf9fe' style="width: 80%; margin-left: 10%;">
        <step-item description="输入财务状况"></step-item>
        <step-item description="保障发布"></step-item>
        <step-item description="资产分析"></step-item>
        <step-item description="财务预测"></step-item>
        <step-item description="风险评估"></step-item>
      </step>
      <group :title="groupTitle" v-show="step == index" v-for="(i, index) in stepTitle" :key="index">
        <popup-picker v-for="item in i" :key="item.title" :title="`${item.title}：`" :data="list1" v-model="item.val" :display-format="format"></popup-picker>
      </group>
      <div v-show="step == 4">
        <rotate-button></rotate-button>
        <div class="intrest-rate">
          <span class="text-plus">历史年华收益率 <i class="red-text-1">8.44</i>%</span>
          <span class="text-plus fr">波动收益率<i class="red-text-1">9.70</i>%</span>
        </div>
        <div id="riskChart" style="width: 100%;height: 433px;margin-top: 30px;"></div>
        <p style="padding: 0 30px;">如您一样的投资者更适合能随着时间推移提供相对稳定收益的低风险投资</p>
      </div>
      <div class="btn_wrap" :class="isPosition ? 'position' : ''">
        <x-button type="primary" @click.native="nextStep">{{buttonText}}</x-button>
      </div>
    </div>
	</div>
</template>

<script>
import { XHeader, Group, XInput, Step, StepItem, XButton, PopupPicker } from 'vux'
import echarts from 'echarts'
import RotateButton from 'base/rotateButton/rotateButton'
import Investor from 'base/investor/investor'

export default {
	name: 'NewCustomer',
  components: {
    XHeader,
    Group,
    XInput,
    Step,
    StepItem,
    XButton,
    PopupPicker,
    RotateButton,
    Investor
  },
  data () {
  	return {
      step: 0,
      isPosition: true,
      buttonText: '下一项',
      groupTitle: '您的财务状况，有助于我们提供更符合您的资产配置',
      stepTitle: [
        [{
          title: '年收入',
          val: []
        }, {
          title: '年支出',
          val: []
        }, {
          title: '总负债',
          val: []
        }, {
          title: '每年偿还额',
          val: []
        }],
        [{
          title: '重大疾病',
          val: []
        }, {
          title: '定期寿险',
          val: []
        }, {
          title: '高端医疗',
          val: []
        }, {
          title: '年金',
          val: []
        }, {
          title: '终身寿险',
          val: []
        }],
        [{
          title: '理财',
          val: []
        }, {
          title: '固收',
          val: []
        }, {
          title: '二级市场',
          val: []
        }, {
          title: '另类投资',
          val: []
        }],
        [{
          title: '退休年龄',
          val: []
        }, {
          title: '预计支出增长率',
          val: []
        }, {
          title: '预计收入增长率',
          val: []
        }, {
          title: '子女预算',
          val: []
        }, {
          title: '遗产馈赠',
          val: []
        }]
      ],
      list1: this.createData(),
      value0: [],
      value1: [],
      value2: [],
      value3: [],
      format: function (value, name) {
        value[0] = parseInt(value[0])
        value[1] = parseInt(value[1])
        return `${value[0] + value[1]}万`
      },
      investorInfo: {
        name: '大卫史文森',
        profession: '专业投资者',
        type: '稳健性'
      }
  	}
  },
  mounted () {
  	this.createData()
    this.drawLineChart()
  },
  methods: {
  	nextStep () {
      this.step++
      // console.log(this.step)
      if (this.step > 0) {
        this.groupTitle = ''
      }
      if (this.step === 4) {
        this.isPosition = false
        this.buttonText = '最后提交'
      } else if (this.step > 4) {
        this.$router.push({name: 'CustomerManagement'})
      }
    },
    createData () {
      let largeList = []
      let chargeList = []
      for (let i = 0; i < 100; i++) {
        largeList.push(`${i * 100}万`)
        chargeList.push(`${i}万`)
      }
      return [largeList, chargeList]
    },
    drawLineChart () {
      let riskChart = document.getElementById('riskChart')
      riskChart.style.width = document.body.clientWidth + 'px'
      let myChart = echarts.init(riskChart)
      let options = {
        title: {
          text: '生命周期现金流',
          left: 37,
          textStyle: {
            color: '#666',
            fontSize: 26
          }
        },
        legend: {
          icon: 'roundRect',
          data: ['资产'],
          right: 26,
          itemHeight: 26,
          itemWidth: 26,
          textStyle: {
            fontSize: 26,
            padding: [0, 0, 0, 13]
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
          },
          itemStyle: {
            normal: {
              color: '#2B7DC2'
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
.btn_wrap {
  padding: 0 37px;
  margin-top: 2rem;
  position: relative;
  width: 100%;
  bottom: 30px;
  .weui-btn_primary {
    border-radius: 60px;
    background-color: #3693E0;
    width: 644px;
    height: 88px;
    box-sizing: border-box;
    display: inline-block;
    text-align: center;
    color: #fff;
    line-height: 88px;
    font-size: 32px; /*px*/
  }
}
.position {
  position: fixed;
}
.wrapper {
  // padding-top: 126px;
  .intrest-rate {
    padding: 0 30px;
    margin: 42px 0;
    margin-top: 72px;
    .text-plus {
      font-size: 24px; /*px*/
      .red-text-1 {
        margin: 0 10px;
      }
    }
  }
}
</style>
