<template>
  <div class="page">
    <x-header :left-options="{showBack: false}">我的</x-header>
    <div class="wrapper">
      <group>
        <cell title="我的信息" :link="{name: 'MyInfo'}"></cell>
        <cell title="我的备注" :link="{name: 'Remark'}"></cell>
        <cell title="我的业绩" :link="{name: 'MyPerformance'}"></cell>
        <cell title="关于我们" :link="{name: 'MyVersion'}"></cell>
        <cell title="退出" @click.native="logout" is-link></cell>
        <!-- <x-switch title="退出" v-model="show3"></x-switch> -->
        <cell title=""></cell>
      </group>
      <actionsheet v-model="show3" :menus="menus3" @on-click-menu="click" show-cancel></actionsheet>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { XHeader, Group, Cell, CellBox, Actionsheet, XSwitch } from 'vux'

export default {
  data () {
    return {
      show3: false,
      menus3: {
        men1: '确认退出'
      }
    }
  },
  components: {
    XHeader,
    Group,
    Cell,
    CellBox,
    Actionsheet,
    XSwitch
  },
  methods: {
    click (key) {
      console.log(key)
    },
    logout () {
      this.show3 = !this.show3
    }
  }
}
</script>

<style scoped lang="less">
.wrapper {
  .weui-cell {
    font-size: 30px; /*px*/
    padding-top: 44px;
    padding-bottom: 40px;
    height: 103px;
    box-sizing: border-box;
  }
  .weui-actionsheet {
    .weui-actionsheet__cell {
      font-size: 38px!important; /*px*/
    }
  }
}
</style>
