<template>
  <div class="purchased">
    <x-header :left-options="{backText: ''}"
              left-options.preventGoBack="true"
              on-click-back="toLink(id)">已购买产品
    </x-header>
    <div class="content">
      <ul class="tabbar">
        <li v-for="(item,index) in tabBars"
            :key="index"
            @click="switchTab(index)"
            :class="n === index ? 'active' : ''"
        >{{item}}
        </li>
      </ul>
      <div class="space"></div>
      <selling-products :child-data="content[n]"></selling-products>
    </div>
  </div>
</template>
<script>
  import {XHeader} from 'vux'
  import {checkSpecifiedPro} from '@/service/api/customers'
  import SellingProducts from '@/base/sellingProducts/sellingProducts'
  export default {
    name: 'PurchasedProducts',
    components: {
      XHeader,
      SellingProducts
    },
    data () {
      return {
        id: '',
        n: 0,
        tabBars: ['全部', '理财', '二级市场', '固收', '另类投资'],
        content: {
          '0': [],
          '1': [],
          '2': [],
          '3': [],
          '4': []
        }
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.id = from.params.id
      })
    },
    mounted () {
      this.id = this.$route.params.id
      checkSpecifiedPro(this.id).then(res => {
        this.content['0'] = res.data
        this.content['0'].forEach((value, index) => {
          switch (value.product_type_id) {
            case 1:
              this.content['1'].push(value)
              break
            case 2:
              this.content['2'].push(value)
              break
            case 3:
              this.content['3'].push(value)
              break
            case 4:
              this.content['4'].push(value)
              break
          }
        })
      })
    },
    methods: {
      switchTab (index) {
          this.n = index
      }
    }
  }
</script>
<style lang="less">
  .purchased {
    .space {
      height: 20px;
      background-color: #f5f5f5;
    }
    .content {
      padding-top: 108px;
    }
    ul.tabbar {
      font-size: 0;
      height: 80px;
      line-height: 80px;
      li {
        font-size: 30px;
        display: inline-block;
        width: 20%;
        text-align: center;
        color: #666;
        position: relative;
      }
      li.active {
        color: #2672ba;
      }
      li.active::after {
        content: '';
        position: absolute;
        display: block;
        width: 100%;
        height: 10px;
        background-color: #2672ba;
        bottom: -5px;
      }
    }
  }
</style>
