<template>
  <div class="mypage">
    <x-header :left-options="{showBack: false}">我的</x-header>
    <div class="wrapper">
      <div class="top">
        <div class="img"><img src="static/img/banner.png" alt=""></div>
        <div class="right">
          <p>用户名：</p>
          <p>手机号码：</p>
        </div>
      </div>
      <group>
        <cell title="我的消息" :link="{name: 'MyInfo'}">
				  <i slot="icon" class="iconfont icon">&#xe62d;</i>
        </cell>
        <cell title="我的备注" :link="{name: 'Remark'}">
				  <i slot="icon" class="iconfont icon">&#xe622;</i>
        </cell>
        <cell title="我的二维码" :link="{name: 'Remark'}">
				  <i slot="icon" class="iconfont icon">&#xe614;</i>
        </cell>
        <!-- <cell title="我的业绩" :link="{name: 'MyPerformance'}"></cell> -->
        <cell title="关于我们" :link="{name: 'MyVersion'}">
				  <i slot="icon" class="iconfont icon">&#xe625;</i>
        </cell>
        <cell title="退出" @click.native="logout">
				  <i slot="icon" class="iconfont icon">&#xe60c;</i>
        </cell>
      </group>
      <!-- <actionsheet v-model="show3" :menus="menus3" @on-click-menu="logoutEvent" show-cancel></actionsheet> -->
      <!-- <el-dialog title="您确定要退出吗？" :visible.sync="dialogTableVisible" :append-to-body="append" center :show-close="show" class="closeDialog">
        <div class="button">
          <el-button type="primary" @click="logoutEvent('men1')">确 定</el-button>
          <el-button type="primary" @click="cancle">取 消</el-button>
        </div>
      </el-dialog> -->
      <x-dialog v-model="dialogTableVisible" class="dialog-demo quitDialog" hide-on-blur>
          <div class="quit">您确定要退出吗？</div>
          <x-button @click.native="logoutEvent('men1')" type="primary">确 定</x-button>
          <x-button @click.native="cancle" type="primary">取 消</x-button>
      </x-dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { XHeader, Group, Cell, CellBox, Actionsheet, XSwitch, XDialog, XButton } from 'vux'
import { removeStore } from '@/config/mUtils'

export default {
  data () {
    return {
      show3: false,
      menus3: {
        men1: '确认退出'
      },
      dialogTableVisible: false,
      append: true,
      show: false
    }
  },
  components: {
    XHeader,
    Group,
    Cell,
    CellBox,
    Actionsheet,
    XSwitch,
    XDialog,
    XButton
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
      this.dialogTableVisible = false
    }
  }
}
</script>

<style lang="less">
.mypage{
  .vux-header{
    background: #fff !important;
    .vux-header-title{
      color: #000;
    }
  }
  .wrapper {
    padding-bottom: 0;
    .top{
      height: 266px;
      background: #fff;
      margin-bottom: 27px;
      padding-top: 70px;
      padding-left: 80px;
      .img{
        border-radius: 50%;
        width: 130px;
        height: 130px;
        overflow: hidden;
        display: inline-block;        
        img{
          width: 100%;
          height: 100%;
        }
      }
      .right{
        display: inline-block;
      }
    }
    .weui-cells{
      margin-top: 0px;
    }
    .weui-cell:after{
      border-top: 1px solid #CCCCCC;
    }
    .weui-cells:after{
      border-bottom: 1px solid #CCCCCC;
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
        color: #DD4D4C;
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
    .quitDialog{
      .weui-dialog{
      width: 580px;
      height: 345px;
      background: #FFFFFF;
      border-radius: 10px;
      top: 50% !important;
      left: 50% !important;
      transform: translate(-50%,-50%);
      padding: 0;
      text-align: center;
      .quit{
        margin-top: 85px;
        margin-bottom: 75px;
        font-family: PingFangSC-Regular;
        font-size: 36px;
        color: #333333;
      }
      .weui-btn.weui-btn_primary{
        display: inline-block;
        background: #2A7DC1;
        border-radius: 10px;
        width: 190px;
        height: 80px;
        font-family: PingFangSC-Medium;
        font-size: 36px;
        color: #F0F0F0;
      }
      .weui-btn.weui-btn_primary:first-child{
        margin-left: 43px;
      }
      .weui-btn.weui-btn_primary:nth-child(2){
        margin-right: 43px;
      }
      }
    }
  }
}

</style>
