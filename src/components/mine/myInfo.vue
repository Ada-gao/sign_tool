<template>
  <div class="infoPage">
    <x-header :left-options="{backText: ''}">我的消息</x-header>
    <div class="wrapper">
      <!-- <group>
        <cell title="姓名：" :value="name"></cell>
        <cell title="手机号：" value=""></cell>
        <cell title="职位：" value=""></cell>
        <cell title="所属部门：" value=""></cell>
      </group> -->
      <group>
        <cell title="姓名：" :value="name"></cell>
        <cell title="手机号：" value=""></cell>
        <cell title="职位：" value=""></cell>
        <cell title="所属部门：" value=""></cell>
      </group>
      <qrcode :value="value"></qrcode>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { XHeader, Group, Cell, CellBox, Qrcode } from 'vux'

export default {
  data () {
    return {
      name: '小小',
      value: ''
    }
  },
  components: {
    XHeader,
    Group,
    Cell,
    CellBox,
    Qrcode
  },
  mounted () {
    let data = JSON.parse(window.localStorage.data)
    this.value = `{'userId': ${data.userId}, 'mobile': ${data.mobile}, 'name': ${data.name}}`
  }
}
</script>

<style lang="less">
.infoPage{
  // .vux-header{
  //   	height: 128px;
  //   .vux-header-title{
  //     height: 100%;
  //     line-height: 128px;
  //     font-size: 36px;
  //   }
  // }
  .wrapper {
    .weui-cell {
      font-size: 30px; /*px*/
      padding-top: 44px;
      padding-bottom: 40px;
      height: 103px;
      box-sizing: border-box;
    }
  }
}

</style>
