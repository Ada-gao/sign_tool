<template>
  <div class="flexbox-wrapper">
    <ul>
      <li v-if="!((parseInt((new Date() - new Date(item.close_date)) / 1000) > item.cooling_period * 60 * 60) && (item.product_status === 3))" v-for="(item, index) in childDataTemp" :key="index" @click="toProductDetail(item.product_id,item)">
      <div class="content">
        <span class="important text-center" v-if="Date.parse(new Date(item.important_start)) < new Date().getTime() && new Date().getTime() < Date.parse(new Date(item.important_end))">重点产品</span>
        <span class="tit vertical-align">{{item.product_name}}&nbsp;&nbsp;</span>
        <span v-if="item.product_status === 1" class="box red vertical-align">预热中</span>
        <span v-else-if="item.product_status === 2" class="box green vertical-align">募集中</span>
        <span v-else-if="item.product_status === 3" class="box gray vertical-align">已关帐</span>
        <div class="item">
          <div :class="item.is_float === 0 ? 'text-center left vertical-align' : 'left vertical-align'">
            <span v-if="item.is_float === 0" class="number mar vertical-align">-</span>
            <span v-else>
              <span class="number vertical-align">{{item.annualized_return}}</span><span class="percent vertical-align">%</span>
            </span>
            <div class="text text-left">{{item.is_float === 0 ? '浮动收益' : '收益对标基准'}}</div>
          </div>
          <span class="bor-line vertical-align"></span>
          <div class="right vertical-align">
            <div class="text line-height">产品期限：<span class="tit cont">{{item.investment_horizon}}{{item.investment_horizon_unit === '0' ? '月' : '年'}}</span></div>
            <div class="text line-height" v-if="item.minimal_amount != undefined">起投金额：<span class="tit cont">{{item.minimal_amount}}万</span></div>
            <div class="text line-height" v-else>购买金额：<span class="tit cont">{{item.amount}}万</span></div>
          </div>
          <span class="iconfont right-btn">&#xe8d5;</span>
        </div>
      </div>
        <!-- <flexbox :gutter="2" wrap="wrap">
          <flexbox-item :span="4" class="item-left">
            <div class="flex-product">
              <div class="flex-left">
                <p v-if="item.is_float === 0" class="line">一</p>
                <p v-else class="rate"><span class="number">{{item.annualized_return}}</span>%</p>
                <p class="text">{{item.is_float === 0 ? '浮动收益' : '收益对标基准'}}</p>
              </div>
            </div>
          </flexbox-item>
          <flexbox-item class="item-right">
            <div class="flex-product">
              <div class="flex-right">
                <p class="firstp">{{item.product_name}}</p><span class="important" v-if="Date.parse(new Date(item.important_start)) < new Date().getTime() && new Date().getTime() < Date.parse(new Date(item.important_end))">重点产品</span>
                <p v-if="item.minimal_amount != undefined">起投金额：{{item.minimal_amount}}万</p>
                <p v-else>购买金额：{{item.amount}}万</p>
                <p>产品期限：{{item.investment_horizon}}{{item.investment_horizon_unit === '0' ? '月' : '年'}}</p>
                <span v-if="item.product_status === 1" class="box blue">预热中</span>
                <span v-else-if="item.product_status === 2" class="box green">募集中</span>
                <span v-else-if="item.product_status === 3" class="box gray">已关帐</span>
              </div>
            </div>
          </flexbox-item>
        </flexbox> -->
      </li>
    </ul>
    <!--<div class="no_product" v-show="childData.length === 0 && !mark">-->
    <!--<img src="static/img/purchasedIcon.png">-->
    <!--<span>亲，请您购买产品哦</span>-->
    <!--</div>-->
    <div class="no_product text-center" v-show="flag && !mark">
      <div class="warn absolute-center-xy">
        <i class="iconfont">&#xe869;</i>
        <p>暂无产品</p>
      </div>
    </div>
    <mt-popup v-model="popupVisible">
      <mt-spinner type="fading-circle" class="spinner_box" v-show="popupVisible"></mt-spinner>
    </mt-popup>

  </div>
</template>

<script>
  import { XHeader, Group, CellBox, Flexbox, FlexboxItem } from 'vux'
  export default {
    name: 'SellingProducts',
    components: {
      XHeader,
      Group,
      CellBox,
      Flexbox,
      FlexboxItem
    },
    props: ['childData', 'mark', 'popupVisible'],
    watch: {
      'popupVisible': function (n, o) {
        // console.log(this.childData)
        this.setData()
      },
      childData: {
        handler: function (n, o) {
          this.childDataTemp = [...n]
          if (n.length > 0) {
            this.childDataFlag = true
            this.flag = false
          } else {
            this.flag = true
          }
        },
        deep: true
      }
    },
    data () {
      return {
        showImportant: false,
        flag: false,
        childDataTemp: [],
        filterArr: [],
        childDataFlag: false,
        timer: null
      }
    },
    methods: {
      setData () {
        this.timer = setTimeout(() => {
          if (this.childDataFlag) {
            // console.log('come in')
            this.childDataTemp = this.childData
            // console.log(this.childDataTemp)
            if (this.childDataTemp.length === 0) {
              this.flag = true
            } else {
              this.$emit('cgPopup', false)
            }
          }
          clearTimeout(this.timer)
          this.timer = null
        }, 300)
      },
      toProductDetail (id, item) {
        // console.log(Date.parse(new Date(item.important_start)), Date.parse(new Date(item.important_end)), new Date().getTime(), Date.parse(new Date(item.important_start)) < new Date().getTime(), new Date().getTime() < Date.parse(new Date(item.important_end)))
        // console.log(Date.parse(new Date(item.important_start)) < new Date().getTime() && new Date().getTime() < Date.parse(new Date(item.important_end)))
        if (item.minimal_amount === undefined) {
          return false
        }
        window.localStorage.setItem('productDetail', JSON.stringify(item))
        this.$router.push({name: 'ProductDetail', params: {id: id, item: item, important: Date.parse(new Date(item.important_start)) < new Date().getTime() && new Date().getTime() < Date.parse(new Date(item.important_end))}})
      }
    },
    mounted () {
      if (this.$route.name === 'HomePage') {
        // console.log('homePage')
        // console.log(this.childData)
        this.childDataTemp = this.childData
        // this.childDataTemp.map(item => {
          // console.log(item.product_status === 3)
          // console.log(item.cooling_period, item.close_date)
        // })
      }
      //  console.log(new Date().getTime())
    }
  }
</script>

<style scoped lang="less">
@import "../../common/style/variable.less";
.content{
  padding: 40px;
  height: 247px;
  border-top: 1px solid #E9E9E9;/*no*/
  position: relative;
  overflow: hidden;
  background: @back-color-white;
  .important{
    width: 200px;
    background: #BD9D62;
    transform: rotate(40deg);
    position: absolute;
    top: 30px;
    right: -50px;
    display: inline-block;
    background: @text-font-color;
    font-family: @font-family-R;
    font-size: @font-size-twenty;/*px*/
    color: @back-color-white;
  }
  .tit{
    font-family: @font-family-M;
    font-size: @font-size-twentyE;/*px*/
    color: @font-color-black;
  }
  .box{
    display: inline-block;
    font-family: @font-family-R;
    font-size: @font-size-twenty;/*px*/
    border-radius: 4px;/*no*/
    padding: 0 5px;
    height: 28px;
    line-height: 28px;
  }
  .red{
    color: @font-color-red;
    background: rgba(240,93,89,0.10);
  }
  .green{
    color: @font-color-green;
    background: rgba(57,162,115,0.10);
  }
  .gray{
    color: @font-color-9B;
    background: rgba(155,155,155,0.10);
  }
  .item{
    margin-top: 12px;
    .left, .right{
      display: inline-block;
      font-family: @font-family-M;
      .number{
        font-size: 60px;/*px*/
        color: #FF2E24;
        line-height: 84px;
      }
      .mar{
        margin-right: 120px;
      }
      .percent{
        font-size: 34px;/*px*/
        color: #EE5250;
      }
      .text{
        font-family: @font-family-R;
        font-size: @font-size-twentyF;/*px*/
        color: @font-color-9B;
        .cont{
          font-size: @font-size-twentyF;/*px*/
        }
      }
      .text-left{
        text-align: left;
      }
      .line-height{
        line-height: 53px;
      }
    }
    .left{
      width: 238px;
    }
    .bor-line{
      display: inline-block;
      width: 1px;/*no*/
      height: 87px;
      background: #E9E9E9;
      margin-right: 80px;
    }
    .right-btn{
      position: absolute;
      right: 40px;
      top: 50%;
      font-size: 60px;/*px*/
      color: #F2F2F2;
    }
  }
}
.no_product{
  .warn{
    i{
      font-size: 150px;/*px*/
      color: @back-color-E8;
    }
    p{
      font-family: @font-family-R;
      font-size: @font-size-twentyS;
      color: #ccc;
      margin-top: 25px;
    }
  }
}
  // .vux-flexbox-item.item-left{
  //   width: 247px;
  //   .line{
  //     color: #C61D1A;
  //     margin-left: 40px;
  //   }
  //   .number{
  //     font-size: 60px !important;
  //     color: #C61D1A;
  //   }
  //   .text{
  //     font-family: PingFangSC-Regular;
  //     font-size: 24px;
  //     color: #464646;
  //   }
  // }
  // .vux-flexbox-item.item-right{
  //   position: relative;
  //   padding-top: 46px;
  //   font-family: PingFangSC-Regular;
  //   font-size: 30px;
  //   color: #464646;
  //   p{
  //     font-size: 30px !important;
  //     line-height: 42px;
  //     height: 42px;
  //     max-width: 300px;
  //     overflow: hidden;
  //     text-overflow:ellipsis;
  //     white-space: nowrap;
  //   }
  //   p.firstp{
  //     display: inline-block;
  //   }
  //   span.important{
  //     padding: 1px 8px;
  //     background: #AC1E1C;
  //     border-radius: 5px;
  //     font-family: PingFangSC-Medium;
  //     font-size: 18px;
  //     vertical-align: top;
  //     margin-left: 10px;
  //     line-height: 42px;
  //   }
  // }
  // .flexbox-wrapper .vux-flexbox .item-right span.box{
  //   position: absolute;
  //   top: -20px;
  //   right: 10px;
  //   width: 90px;
  //   height: 49px;
  //   border-radius: 10px;
  //   font-size: 24px;
  //   text-align: center;
  //   line-height: 49px;
  // }
  // .flexbox-wrapper .vux-flexbox .item-right span{
  //   font-family: PingFangSC-Semibold;
  // }
  // .flexbox-wrapper .vux-flexbox .item-right span.red {
  //   background-color: #C61D1A;
  // }
  // .flexbox-wrapper .vux-flexbox .item-right span.green {
  //   background-color: #28BCAC;
  // }
  // .flexbox-wrapper .vux-flexbox .item-right span.blue {
  //   background-color: #158FD2;
  // }
  // .flexbox-wrapper .vux-flexbox .item-right span.gray{
  //   background-color: #ccc;
  // }
  // .no_product {
  //   background-color: #f5f5f5;
  //   padding-top: 150px;
  //   img,
  //   span {
  //     display: block;
  //     text-align: center;
  //     margin: 0 auto;
  //   }
  //   img {
  //     width: 556px;
  //     height: 379px;
  //   }
  //   span {
  //     margin-top: 88px;
  //     font-family: PingFangSC-Regular;
  //     font-size: 32px;
  //     color: #888888;
  //   }
  // }
</style>
