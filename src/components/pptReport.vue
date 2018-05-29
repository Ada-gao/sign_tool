<template>
  <div class="page">
    <x-header :left-options="{backText: '',preventGoBack:true}" @on-click-back="back(id,item,newEmail,newUserId)">交易所需材料</x-header>
    <div class="wrapper">
      <el-checkbox-group v-model="checkedList" @change="handleCheckedDocsChange">
        <el-checkbox v-for="(item, index) in documentList" :label="item.file_path" :key="index">{{item.name}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="select">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <el-button type="primary" @click="sendEmail">发送到邮箱</el-button>
      <el-dialog title="请确认您的邮箱" :visible.sync="dialogTableVisible" :append-to-body="append" center>
        <el-input :value="newEmail"></el-input>
        <el-button type="primary" @click="sendMessage">发 送</el-button>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { XHeader } from 'vux'
import { getProductFiles, sendProduct } from '@/service/api/products'

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
      back (id, item, newEmail, newUserId) {
        this.$router.push({name: 'ProductDetail', params: {id: id, item: item, email: newEmail, userId: newUserId}})
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
        sendProduct(obj).then(res => {
          console.log(res)
        })
      }
  },
  mounted () {
    this.id = this.$route.params.id
    this.item = this.$route.params.item
    this.newEmail = this.$route.params.email
    this.newUserId = this.$route.params.userId
		getProductFiles(this.id).then(res => {
      this.documentList = res.data
      const list = []
      this.documentList.map(function (item) {
        return list.push(item.file_path)
      })
      this.newList = list
		})
	}
}
</script>

<style scoped lang="less">
</style>
