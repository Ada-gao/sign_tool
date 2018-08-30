<template>
  <div class="infoPage">
    <x-header :left-options="{backText: ''}">我的消息</x-header>
    <div class="wrapper">
        <div class="info" :data="infoList" v-for="(item, index) in infoList" :key="index" @click="checkDetail(item.notification_id)">{{item.notification_title}}
          <span class="noCheck" v-if="item.is_read === '0'"></span>
          <span class="iconfont right">&#xe731;</span>
        </div>
      <!-- <group>
        <cell title="姓名：" :value="name"></cell>
        <cell title="手机号：" value=""></cell>
        <cell title="职位：" value=""></cell>
        <cell title="所属部门：" value=""></cell>
      </group> -->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { XHeader, Group, Cell, CellBox } from 'vux'
import { getInfoList } from '@/service/api/aboutMe'

export default {
  data () {
    return {
      name: '小小',
      infoList: [],
      isLink: true
      // value: ''
    }
  },
  components: {
    XHeader,
    Group,
    Cell,
    CellBox
  },
  methods: {
    checkDetail (data) {
      this.$router.push({name: 'WriteNotes', params: {id: data}})
    }
  },
  mounted () {
    getInfoList().then(res => {
      this.infoList = res.data
    })
  }
}
</script>

<style lang="less">
.infoPage{
  .wrapper {
    .info {
      position: relative;
      height: 90px;
      background: #fff;
      line-height: 90px;
      font-family: PingFangSC-Regular;
      font-size: 30px;
      color: #666666;
      border-top: 1px solid #CCCCCC;
      padding-left: 20px;
      .noCheck{
        right: 70px;
        top: 50%;
        transform: translate(0, -50%);
        position: absolute;
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #B68458;
      }
      .right{
        right: 20px;
        position: absolute;
        font-size: 45px;
        color: #999;
      }
    }
  }
}

</style>
