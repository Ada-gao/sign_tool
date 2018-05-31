<template>
  <div class="purchased">
    <x-header :left-options="{backText: ''}"
              left-options.preventGoBack="true"
              on-click-back="toLink(id)">已购买产品
    </x-header>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="first">
        <div class="space"></div>
        <div class="">1</div>
      </el-tab-pane>
      <el-tab-pane label="理财" name="second">
        <div class="space"></div>
        <div class="">2</div>
      </el-tab-pane>
      <el-tab-pane label="二级市场" name="third">
        <div class="space"></div>
        <div class="">3</div>
      </el-tab-pane>
      <el-tab-pane label="固收" name="fourth">
        <div class="space"></div>
        <div class="">4</div>
      </el-tab-pane>
      <el-tab-pane label="另类投资" name="fifth">
        <div class="space"></div>
        <div class="">5</div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import {XHeader} from 'vux'
  import {checkSpecifiedPro} from '@/service/api/customers'
  export default {
    name: 'PurchasedProducts',
    components: {
      XHeader
    },
    data () {
      return {
        id: '',
        productLists: [],
        activeName: 'first'
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
        this.productsList = res.data
        console.log(this.productsList)
      })
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
      }
    }
  }
</script>
<style lang="less">
  .el-tabs {
    padding-top: 108px;
    .el-tabs__nav {
      width: 100%;
      .el-tabs__item {
        height: 80px;
        line-height: 80px;
        width: 20%;
        padding: 0;
        text-align: center;
        font-size: 30px;
        color: #666;
        font-weight: normal;
      }
      .el-tabs__item.is-active {
        color: #409EFF;
      }
    }
  }
  .el-tabs__nav-wrap::after {
    content: none;
  }
  .purchased {
    .space {
      height: 20px;
      background-color: #f5f5f5;
    }
  }
</style>
