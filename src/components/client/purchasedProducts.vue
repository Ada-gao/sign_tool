<template>
  <div class="purchased">
    <x-header :left-options="{backText: '', preventGoBack: true}"
              @on-click-back="toLink(id)">已购买产品
    </x-header>
    <div class="content wrapper">
      <div style="overflow: hidden;">
        <ul class="tabbar" :style="{'width': ulWidth}">
          <li v-for="(item,index) in tabBars"
              :key="index"
              :style="{'width': liWidth}"
              @click="switchTab(index)"
              :class="n === index ? 'active' : ''"
          >{{item}}
          </li>
        </ul>
      </div>
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
        ulWidth: '100%',
        liWidth: '',
        tabBars: ['全部'],
        content: {
          '0': []
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
      this.liWidth = document.documentElement.offsetWidth / 5 + 'px'
      this.getList()
    },
    methods: {
      getList () {
        checkSpecifiedPro(this.id).then(res => {
          res.data.forEach(item => {
            this.tabBars.push(item.name)
            if (item.product.length > 0) {
              item.product.map(ele => {
                this.content['0'].push(ele)
              })
            }
            item.product.map((el, idx) => {
              this.content[idx + 1] = []
            })
          })
          console.log(this.content)
          let cnt = Math.ceil(this.tabBars.length / 5)
          this.ulWidth = cnt * 100 + '%'
          // console.log(document.documentElement.offsetWidth)
//          this.content['0'].forEach((value, index) => {
//            /**
//             * product_type_id
//             * 1:固收
//             * 2:理财
//             * 3:二级市场
//             * 4:另类
//             */
//            switch (value.product_type_id) {
//              case 1:
//                this.content['1'].push(value)
//                break
//              case 2:
//                this.content['2'].push(value)
//                break
//              case 3:
//                this.content['3'].push(value)
//                break
//              case 4:
//                this.content['4'].push(value)
//                break
//            }
//          })
        })
      },
      toLink (id) {
        this.$router.replace({name: 'CustomerManagement', params: {id}})
      },
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
      overflow: hidden;
      /*padding-top: 108px;*/
    }
    ul.tabbar {
      font-size: 0;
      height: 80px;
      line-height: 80px;
      overflow-x: auto;
      li {
        font-size: 30px;
        display: inline-block;
        /*width: 150px;*/
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
