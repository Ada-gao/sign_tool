<template>
  <div class="page">
    <x-header :left-options="{backText: ''}">推荐产品</x-header>
    <div class="wrapper">
      <investor :investor-data="investorInfo"></investor>
      <group class="wrap-product">
        <cell
        title="理财: 125万"
        :value="'新增' + valList1.value1 + '万'"
        is-link
        :border-intent="false"
        :arrow-direction="showContent001 ? 'up' : 'down'"
        @click.native="showContent(showContent001=!showContent001)">
          <!-- <i class="icon-radio-unchecked"></i> -->
        </cell>

        <template v-if="showContent001">
          <cell-box :border-intent="false" class="sub-item">
            <recommend-products :product-data="productList.list1"></recommend-products>
          </cell-box>
        </template>
        <div class="divide-line"></div>

        <cell
        title="固收: 200万"
        :value="'新增' + valList1.value2 + '万'"
        is-link
        :border-intent="false"
        :arrow-direction="showContent002 ? 'up' : 'down'"
        @click.native="showContent(showContent002=!showContent002)"></cell>

        <template v-if="showContent002">
          <cell-box :border-intent="false" class="sub-item">
            <recommend-products :product-data="productList.list2"></recommend-products>
          </cell-box>
        </template>
        <div class="divide-line"></div>

        <cell
        title="二级市场: 25万"
        :value="'新增' + valList1.value3 + '万'"
        is-link
        :border-intent="false"
        :arrow-direction="showContent003 ? 'up' : 'down'"
        @click.native="showContent(showContent003=!showContent003)"></cell>

        <template v-if="showContent003">
          <cell-box :border-intent="false" class="sub-item">
            <recommend-products :product-data="productList.list3"></recommend-products>
          </cell-box>
        </template>
        <div class="divide-line"></div>

        <cell
        title="另类: 150万"
        :value="'新增' + valList1.value4 + '万'"
        is-link
        :border-intent="false"
        :arrow-direction="showContent004 ? 'up' : 'down'"
        @click.native="showContent(showContent004=!showContent004)"></cell>

        <template v-if="showContent004">
          <cell-box :border-intent="false" class="sub-item">
            <recommend-products :product-data="productList.list4"></recommend-products>
          </cell-box>
        </template>
      </group>
      <div class="btn_wrap" :class="isPosition ? 'position' : ''">
        <x-button type="primary" @click.native="nextStep">确认生成报告</x-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { XHeader, Cell, CellBox, Group, GridItem, XButton } from 'vux'
import Investor from 'base/investor/investor'
import RecommendProducts from 'base/recommendProducts/recommendProducts'
import bus from 'common/js/eventVue'

export default {
  data () {
    return {
      showContent001: false,
      showContent002: false,
      showContent003: true,
      showContent004: false,
      isPosition: false,
      valList1: {
        value1: 0,
        value2: 0,
        value3: 100,
        value4: 0
      },
      investorInfo: {
        name: '大卫史文森',
        profession: '专业投资者',
        type: '稳健性',
        score: 69
      },
      productList: {
        list1: [{
          idx: 'value1',
          yieldRate: 10,
          title: '正收益产品1',
          marketLabel: '二级市场',
          changeVal: 0
        }, {
          yieldRate: 11,
          title: '正收益产品2',
          marketLabel: '二级市场',
          changeVal: 0
        }, {
          yieldRate: 11,
          title: '正收益产品2',
          marketLabel: '二级市场',
          changeVal: 0
        }],
        list2: [{
          idx: 'value2',
          yieldRate: 12,
          title: '正收益产品1',
          marketLabel: '二级市场',
          changeVal: 0
        }, {
          yieldRate: 13,
          title: '正收益产品2',
          marketLabel: '二级市场',
          changeVal: 0
        }],
        list3: [{
          idx: 'value3',
          yieldRate: 14,
          title: '正收益产品1',
          marketLabel: '二级市场',
          changeVal: 100
        }, {
          yieldRate: 15,
          title: '正收益产品2',
          marketLabel: '二级市场',
          changeVal: 0
        }],
        list4: [{
          idx: 'value4',
          yieldRate: 16,
          title: '正收益产品1',
          marketLabel: '二级市场',
          changeVal: 0
        }, {
          yieldRate: 17,
          title: '正收益产品2',
          marketLabel: '二级市场',
          changeVal: 0
        }, {
          yieldRate: 18,
          title: '正收益产品2',
          marketLabel: '二级市场',
          changeVal: 0
        }]
      }
    }
  },
  components: {
    XHeader,
    Investor,
    Cell,
    CellBox,
    Group,
    RecommendProducts,
    GridItem,
    XButton
  },
  mounted () {
    bus.$on('emitNum', msg => {
      let _val = this.valList1
      for (let key in _val) {
        if (key === msg.idx) {
          _val[key] = msg.count
        }
      }
    })
  },
  methods: {
    nextStep () {
      this.$router.push({name: 'CustomerManagement'})
    },
    // _setWrapperHeight () {
    //   let height1 = document.getElementsByClassName('vux-header')[0].clientHeight
    //   let height2 = this.$refs.investor.clientHeight
    //   let height3 = document.getElementsByClassName('weui-grid')[0].clientHeight
    //   let wrapper = document.getElementsByClassName('wrapper')[0]
    //   let heightBody = document.body.clientHeight
    //   let maxHeight = heightBody - height1 - height2 - height3
    //   wrapper.style.height = maxHeight + 'px'
    // },
    showContent (index) {
      // this._setWrapperHeight()
      // console.log(index)
    }
  }
}
</script>

<style scoped lang="less">
.wrap-product {
	overflow: auto;
	// margin-top: -20px;
	/*max-height: 545px;*/
}
.weui-cells,
.vux-no-group-title {
  margin-top: 0 !important;
  > .vux-tap-active.weui-cell_access {
    text-align: left;
    padding-top: 0;
    padding-bottom: 0;
    height: 100px;
    line-height: 100px;
    // 无效
    // > .vux-cell-bd > p {
    //   margin-top: 10px !important;
    //   margin-bottom: 10px !important;
    // }
    // > .weui-cell__ft {
    //   color: #333 !important;
    //   padding-right: 30px !important;
    //   i {
    //     font-size: 24px;
    //     right: -6px;
    //     position: absolute;
    //     top: -12px;
    //   }
    // }
  }
  /*.weui-cell_access .weui-cell__ft {
    padding-right: 30px;
  }*/
  .vux-cell-box {
		padding: 0;
		> div {
      width: 100%;
		}
	}
	.divide-line {
		height: 10px;
		background-color: #eee;
	}
}
</style>
