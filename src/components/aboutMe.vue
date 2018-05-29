<template>
  <div class="mypage">
    <x-header :left-options="{showBack: false}">我的</x-header>
    <div class="wrapper">
      <group>
        <cell title="我的消息" :link="{name: 'MyInfo'}">
				  <i slot="icon" class="iconfont icon">&#xe63e;</i>
        </cell>
        <cell title="我的备注" :link="{name: 'Remark'}">
				  <i slot="icon" class="iconfont icon">&#xe7d1;</i>
        </cell>
        <!-- <cell title="我的业绩" :link="{name: 'MyPerformance'}"></cell> -->
        <cell title="关于我们" :link="{name: 'MyVersion'}">
				  <i slot="icon" class="iconfont icon">&#xe60e;</i>
        </cell>
        <cell title="退出" @click.native="logout">
				  <i slot="icon" class="iconfont icon">&#xe60c;</i>
        </cell>
        <!-- <x-switch title="退出" v-model="show3"></x-switch> -->
        <!-- <cell title=""></cell> -->
      </group>
      <el-dialog title="您确定要退出吗？" :visible.sync="dialogTableVisible" :append-to-body="append" center>
        <el-button type="primary" @click="sure">确 定</el-button>
        <el-button type="primary" @click="cancle">取 消</el-button>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { XHeader, Group, Cell, CellBox, Actionsheet, XSwitch } from 'vux'
import { removeStore } from '@/config/mUtils'

export default {
  data () {
    return {
      show3: false,
      menus3: {
        men1: '确认退出'
      },
      dialogTableVisible: false,
      append: true
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
    logoutEvent (key) {
      if (key === 'men1') {
        console.log(key)
        removeStore('token')
        this.$router.push({name: 'Login'})
      }
    },
    logout () {
      this.show3 = !this.show3
      this.dialogTableVisible = true
    },
    sure () {
      console.log('ssss')
    },
    cancle () {
      console.log('cccc')
    }
  }
}
</script>

<style lang="less">
.mypage{
  .wrapper {
    padding-bottom: 0;
    .weui-cells.vux-no-group-title{
      margin-top: 22px;
    }
    .weui-cell {
      font-size: 30px; /*px*/
      padding-top: 44px;
      padding-bottom: 40px;
      height: 103px;
      box-sizing: border-box;
      height: 82px;
      padding-left: 20px;
      .icon{
        color: #2672BA;
        font-size: 40px;
      }
      label{
        font-family: PingFangSC-Medium;
        font-size: 30px;
        color: #333333;
      }
    }
    .weui-actionsheet {
      .weui-actionsheet__cell {
        font-size: 38px!important; /*px*/
      }
    }
  }
  .el-dialog.el-dialog--center{
    width: 580px;
    height: 345px;
  }
}
</style>
