<template>
  <div class="page">
    <x-header :left-options="{backText: ''}">我的信息</x-header>
    <div class="wrapper">
      <group>
        <cell title="姓名：" :value="name"></cell>
        <cell title="手机号：" value=""></cell>
        <cell title="职位：" value=""></cell>
        <cell title="所属部门：" value=""></cell>
        <cell title=""></cell>
      </group>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { XHeader, Group, Cell, CellBox } from 'vux'

export default {
  data () {
    return {
      name: '小小'
    }
  },
  components: {
    XHeader,
    Group,
    Cell,
    CellBox
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
}
</style>
