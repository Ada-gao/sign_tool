<template>
  <div class="page">
    <x-header :left-options="{backText: '',preventGoBack:true}" @on-click-back="back(id,item)">交易所需材料</x-header>
    <div class="wrapper">
      <el-checkbox-group v-model="checkedList" @change="handleCheckedDocsChange">
        <el-checkbox v-for="(item, index) in documentList" :label="item.file_path+';'+item.name" :key="index">{{item.name}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="select">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <el-button type="primary" @click="sendEmail">发送到邮箱</el-button>
      <el-dialog title="请确认您的邮箱" :visible.sync="dialogTableVisible" :append-to-body="append" center class="pdfCloseDialog">
        <el-input :value="newEmail" readonly></el-input>
        <el-button type="primary" @click="sendMessage">发 送</el-button>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { XHeader } from 'vux'
import { getTransaction, sendTrade } from '@/service/api/products'

export default {
  data () {
    return {
        checkAll: false,
        checkedList: [],
        isIndeterminate: true,
        documentList: [],
        dialogTableVisible: false,
        append: true,
        input: '',
        newEmail: '',
        newUserId: ''
    }
  },
  components: {
    XHeader
  },
  methods: {
    back (id, item) {
      // this.$router.push({name: 'ProductDetail', params: {id: id, item: item, email: newEmail, userId: newUserId}})
			this.$router.push({name: 'ProductDetail', params: {id: id, item: item}})
    },
    handleCheckAllChange (val) {
        this.checkedList = val ? this.newList : []
        this.isIndeterminate = false
      },
      handleCheckedDocsChange (value) {
        let checkedCount = value.length
        this.checkAll = checkedCount === this.newList.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.newList.length
      },
      sendEmail () {
        this.dialogTableVisible = true
      },
      sendMessage () {
        this.dialogTableVisible = false
        let obj = {'email': this.newEmail, 'checkedList': this.checkedList, 'userId': this.newUserId}
        sendTrade(obj).then(res => {
          console.log(res)
        })
    }
  },
  mounted () {
    this.id = this.$route.params.id
    this.item = this.$route.params.item
    // this.newEmail = this.$route.params.email
    // this.newUserId = this.$route.params.userId
    this.newEmail = JSON.parse(window.localStorage.getItem('data')).email
    this.newUserId = JSON.parse(window.localStorage.getItem('data')).userId
		getTransaction(this.id).then(res => {
      this.documentList = res.data
      const list = []
      console.log(this.documentList)
      this.documentList.map(function (item) {
        return list.push(item.file_path + ';' + item.name)
      })
      this.newList = list
		})
	}
}
</script>

<style lang="less">
.page{
  height: 100%;
  background: #F5F5F5;
  .el-checkbox-group{
    margin-bottom: 82px;
  }
  label.el-checkbox{
    display: block;
    padding-left: 21px;
    margin-left: 0px;
    margin-top: 8px;
    height: 82px;
    line-height: 82px;
    background: #fff;
    .el-checkbox__input.is-checked+.el-checkbox__label{
      color: #2672BA;
    }
    .el-checkbox__label{
        font-family: PingFangSC-Regular;
        font-size: 28px;
        vertical-align: middle;
        color: #333333;
    }
    .el-checkbox__input{
        .el-checkbox__inner{
          width: 25px;;
          height: 25px;
          border-color: #666666;
          border-radius: 4px;
      }
    }
    .el-checkbox__input.is-checked{
        .el-checkbox__inner{
          width: 25px;;
          height: 25px;
          background: #fff;
          border-color: #2672BA;
      }
      .el-checkbox__inner::after{
        border: 2px solid #2672BA;
        border-top: 0px;
        border-left: 0px;
        top: 0;
        left: 6px;
        width: 10px;
        height: 17px;
      }
    }
  }
}
.demo1-item {
  border: 1px solid #ececec;
  padding: 5px 15px;
}
.demo1-item-selected {
  border: 1px solid green;
}
.select{
  width: 100%;
  position: fixed;
  bottom: 0;
  background: #fff;
  height: 82px;
  label.el-checkbox {
    display: inline-block;
    margin-top: 0px;
  }
  .el-button.el-button--primary{
    position: absolute;
    right: 22px;
    top: 20px;
    background: #2A7DC1;
    border-radius: 10px;
    font-family: PingFangSC-Regular;
    font-size: 20px;
    color: #F0F0F0;
  }
}
.el-dialog__wrapper.pdfCloseDialog .el-dialog{
    width: 580px;
    height: 345px;
    background: #FFFFFF;
    border-radius: 10px;
    top: 50%;
    margin-top: -172px !important;
    .el-icon-close:before{
      content: '';
    }
    .el-dialog__header{
      padding-top: 48px;
      .el-dialog__title{
        font-family: PingFangSC-Regular;
        font-size: 30px;
        color: #666666;
      }
    }
    .el-dialog__body{
      position: relative;
      .el-input{
        width: 522px;
        height: 76px;
        border: 1px solid #999999;
        border-radius: 10px;
        margin-bottom: 33px;
        .el-input__inner{
          height: 100%;
          border-radius: 10px;
          font-family: PingFangSC-Regular;
          font-size: 30px;
          color: #666666;
          text-align: center;
        }
      }
      .el-button.el-button--primary{
        background: #2A7DC1;
        border-radius: 10px;
        width: 280px;
        height: 80px;
        font-family: PingFangSC-Medium;
        font-size: 36px;
        color: #F0F0F0;
        position: absolute;
        left: 50%;
        margin-left: -140px;
        top:135px;
      }
    }
  }
</style>
