<template>
  <div class="purchased">
    <x-header :left-options="{backText: ''}"
              left-options.preventGoBack="true"
              on-click-back="toLink(id)">已购买产品
    </x-header>
    <div class="content wrapper">
      <ul class="tabbar">
        <li v-for="(item,index) in tabBars"
            :key="index"
            @click="switchTab(index)"
            :class="n === index ? 'active' : ''"
        >{{item}}
        </li>
      </ul>
      <div class="space"></div>
      <selling-products :child-data="content[n]"
                        @cgPopup="cgPopup"
                        :popupVisible="popupVisible"></selling-products>
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
        popupVisible: false,
        n: 0,
        tabBars: ['全部', '固收', '理财', '二级市场', '另类投资'],
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
      if (from.name === 'CustomerManagement') {
        next(vm => {
          vm.popupVisible = true
          vm.id = from.params.id
        })
      } else {
        next(vm => {
          vm.id = from.params.id
        })
      }
    },
    mounted () {
      this.id = this.$route.params.id
      checkSpecifiedPro(this.id).then(res => {
        this.content['0'] = res.data
        this.content['0'].forEach((value, index) => {
          /**
           * product_type_id
           * 1:固收
           * 2:理财
           * 3:二级市场
           * 4:另类
           */
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
      },
      cgPopup (data) {
        this.popupVisible = data
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
      background-color: #fff;
      /*padding-top: 108px;*/
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
