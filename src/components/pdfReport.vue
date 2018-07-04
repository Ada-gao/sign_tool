<template>
  <div class="pdfPage">
    <x-header :left-options="{backText: '',preventGoBack:true}" @on-click-back="back(id)">{{title}}</x-header>
    <div class="wrapper">
      <check-list ref="checkList" v-model="value" :options="documentList" :multiple="true" v-if="this.$route.params.mark !== 3">
        <template slot-scope="props">
            <div @click="get(props.item)">
						<i class="eye iconfont">&#xe6ce;</i>
            </div>
        </template>
      </check-list>
      <ul>
        <li v-for="(item, index) in documentList" :key="index">{{item.file_name}}</li>
      </ul>
    </div>
    <div class="select" v-if="this.$route.params.mark !== 3">
      <div :class="'my_checkbox' + (this.flag ? ' checked' : '' )">
        <div :class="'box mint-toast-icon mintui mintui-success' + (this.flag ? ' checked' : '' )" @click="checkAll"></div>
        <div class="name">全选</div>
      </div>
      <button class="button" @click="sendEmail">发送到邮箱</button>
      <x-dialog v-model="dialogTableVisible" class="dialog-demo pdfCloseDialog" hide-on-blur>
          <div class="confirm">请确认您的邮箱</div>
          <x-input
            :value="newEmail"
            readonly
            :show-clear="clear">
          </x-input>
          <x-button @click.native="sendMessage" type="primary">发 送</x-button>
      </x-dialog>
      <x-dialog v-model="successDialog" class="dialog-demo successDialog" hide-on-blur>
          <i class="iconfont suc">&#xe60a;</i>
          <div class="success">邮件将在五分钟之内发送到您的邮箱</div>
          <x-button @click.native="successSure" type="primary">确 定</x-button>
      </x-dialog>
      <x-dialog v-model="noSelectDialog" class="dialog-demo successDialog" hide-on-blur>
          <i class="iconfont noS">&#xe626;</i>
          <div class="success">您未选中任何邮件</div>
          <x-button @click.native="noSelectSure" type="primary">确 定</x-button>
      </x-dialog>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import CheckList from '@/base/checkList/checkList'
import { XHeader, XDialog, XInput, XButton } from 'vux'
import { getTransaction, sendTrade, getProductFiles, getAnnoucement, getCustomerMaterials } from '@/service/api/products'
import pdf from '@/base/report/pdf'
let Base64 = require('js-base64').Base64
export default {
  components: {
    CheckList,
    XHeader,
    XDialog,
    XInput,
    XButton,
    pdf
  },
  data () {
    return {
      value: [],
      flag: false,
      checkedList: [],
      checkedVal: '',
      documentList: [],
      dialogTableVisible: false,
      successDialog: false,
      append: true,
      input: '',
      newEmail: '',
      newUserId: '',
      newList: [],
      newNameList: [],
      newUrlList: [],
      option: ['全选'],
      clear: false,
      noSelectDialog: false,
      pdfUrl: '',
      title: '',
      type: null,
      customerNameList: []
    }
	},
	watch: {
    value: {
      handler: function (newVal, oldVal) {
        if (newVal.length === 0 && oldVal.length === 0) {
        } else {
          this.flag = !this.documentList.some(item => newVal.indexOf(item) === -1)
        }
      },
      deep: true
    }
  },
  methods: {
    get (test) {
			this.$router.push({name: 'Report', params: {url: Base64.encode(test.file_path), tip: this.title, mark: this.type, id: this.id}})
    },
    checkAll () {
			this.flag = !this.flag
      this.$refs.checkList.checkAll(this.flag)
    },
    back (id) {
			this.$router.push({name: 'ProductDetail', params: {id: id}})
    },
      sendEmail () {
				this.dialogTableVisible = true
      },
      sendMessage () {
				this.dialogTableVisible = false
        this.checkedList = []
        if (this.$route.params.mark === 0) {
            this.value.map((item, index) => {
					  this.checkedList.push(item.transaction_file_id)
				  })
        } else if (this.$route.params.mark === 1) {
            this.value.map((item, index) => {
            this.checkedList.push(item.product_file_id)
          })
        } else if (this.$route.params.mark === 2) {
            this.value.map((item, index) => {
            this.checkedList.push(item.announcement_file_id)
          })
        }
        let obj = {'email': this.newEmail, 'checkedList': this.checkedList, 'userId': this.newUserId, 'type': this.type}
        sendTrade(obj).then(res => {
          this.successDialog = true
        }).catch(err => {
          if (err) {
            this.noSelectDialog = true
          }
        })
      },
      successSure () {
        this.successDialog = false
      },
      noSelectSure () {
        this.noSelectDialog = false
      }
	},
	created () {
		this.id = this.$route.params.id
		this.$nextTick(function () {
      if (this.$route.params.mark === 0) {
        this.type = 0
        this.title = '交易所需材料'
        getTransaction(this.id).then(res => {
          this.documentList = res.data
          const list = []
          const nameList = []
          const urlList = []
          this.documentList.map((item, index) => {
            list.push(item.file_path + ';' + item.name)
            nameList.push({label: item.name, value: item.transaction_file_id})
            urlList.push(item.transaction_file_id)
          })
          this.newList = list
          this.value = nameList
          this.newUrlList = urlList
        })
      } else if (this.$route.params.mark === 1) {
        this.type = 1
        this.title = '产品说明材料'
        getProductFiles(this.id).then(res => {
          this.documentList = res.data
          const list = []
          const nameList = []
          const urlList = []
          this.documentList.map((item, index) => {
            list.push(item.file_path + ';' + item.name)
            nameList.push({label: item.name, value: item.transaction_file_id})
            urlList.push(item.transaction_file_id)
          })
          this.newList = list
          this.value = nameList
          this.newUrlList = urlList
        })
      } else if (this.$route.params.mark === 2) {
        this.type = 2
        this.title = '产品公告'
        getAnnoucement(this.id).then(res => {
          this.documentList = res.data
          const list = []
          const nameList = []
          const urlList = []
          this.documentList.map((item, index) => {
            list.push(item.file_path + ';' + item.name)
            nameList.push({label: item.name, value: item.transaction_file_id})
            urlList.push(item.transaction_file_id)
          })
          this.newList = list
          this.value = nameList
          this.newUrlList = urlList
        })
      } else if (this.$route.params.mark === 3) {
        this.title = '上传客户材料'
        getCustomerMaterials(this.id).then(res => {
          this.documentList = res.data.data
        })
      }
		})
	},
  mounted () {
    this.newEmail = JSON.parse(window.localStorage.getItem('data')).email
    this.newUserId = JSON.parse(window.localStorage.getItem('data')).userId
	}
}
</script>
<style lang="less">
.pdfPage{
  height: 100%;
  background: #F5F5F5;
  .wrapper{
    background: #F5F5F5;
    padding-bottom: 8px;
    margin-bottom: 82px;
		.eye{
			font-size: 40px;
			color: #2A7DC1;
    }
    li{
      height: 82px;
      line-height: 82px;
      background: #fff;
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #333333;
      margin-bottom: 8px;
      padding-left: 20px;
    }
	}
	.select{
		width: 100%;
		padding: 0 20px;
		position: fixed;
		bottom: 0;
		background: #fff;
		height: 82px;
		z-index: 55;
		box-sizing: border-box;
		.my_checkbox{
   		display: flex;
      justify-content: space-between;
      align-items: center;
			height: 100%;
			line-height: 100%;
      .box{
        width: 25px;
        height: 25px;
        border-radius: 20%;
        border: 1px solid #666;
				position: absolute;
				top: 50%;
        transform: translate(0, -50%);
        &::before{
          color: #2672BA;
          font-size: 16px;
          width: 25px;
          height: 25px;
          position: absolute;
          left: 0;
          top: 0;
          border-radius: 20%;
          display: flex;
          justify-content: center;
          align-items: center;
          transform: rotate(45deg) scale(0);
          transition: transform .2s;
        }
      }
      .name{
        flex-grow: 1;
				margin-left: 40px;
				font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #333333;
      }
      &.checked{
        .box{
					background-color: #fff;
          border: 1px solid #2672BA;
          &::before{
						transform: rotate(0deg) scale(1);
          }
        }
        .name{
					color: #2672BA;
        }
      }
	}
	.button{
    width: 156px;
    height: 50px;
    position: absolute;
    right: 20px;
		top: 50%;
		transform: translate(0, -50%);
    background: #2A7DC1;
    border-radius: 10px;
    font-family: PingFangSC-Regular;
    font-size: 20px;
    color: #F0F0F0;
    outline: none;
	}
	.vux-x-dialog.pdfCloseDialog{
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
      .confirm{
        margin-top: 48px;
        margin-bottom: 31px;
        font-family: PingFangSC-Regular;
        font-size: 30px;
        color: #666666;
      }
      .vux-x-input.weui-cell{
        margin: 0 auto;
        width: 522px;
        height: 76px;
        border: 1px solid #999999;
        border-radius: 10px;
        margin-bottom: 33px;
        padding: 0;
        font-family: PingFangSC-Regular;
        font-size: 30px;
        color: #666666;
        input{
          text-align: center;
        }
      }
      .weui-btn.weui-btn_primary{
        background: #2A7DC1;
        border-radius: 10px;
        width: 280px;
        height: 80px;
        font-family: PingFangSC-Medium;
        font-size: 36px;
        color: #F0F0F0;
      }
    }
  }
  .vux-x-dialog.successDialog{
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
      .suc{
        display: inline-block;
        font-size: 100px;
        color: #74BA3B;
        margin: 40px 0;
				line-height: 100px;
      }
      .noS{
        display: inline-block;
        font-size: 100px;
        color: #C61D1A;
        margin: 40px 0;
				line-height: 100px;
      }
      .success{
        // margin-top: 30px;
        margin-bottom: 40px;
        font-family: PingFangSC-Regular;
        font-size: 30px;
        color: #333333;
        line-height: 1;
      }
      .weui-btn.weui-btn_primary{
        background: #2A7DC1;
        border-radius: 10px;
        width: 280px;
        height: 80px;
        font-family: PingFangSC-Medium;
        font-size: 36px;
        color: #F0F0F0;
      }
    }
  }
  }
  .pdfDialog{
    .weui-dialog{
    margin: 60px 40px;
    overflow: scroll;
    width: calc(100% - 80px);
    height: calc(100% - 120px);
    transform: none;
    padding: 0;
    .cancleBtn{
      width: 100%;
      height: 80px;
      position: fixed;
      bottom: 60px;
      left: 50%;
      transform: translate(-50%, 0);
      background: #fff;
      padding: 20px;
      .weui-btn.weui-btn_primary{
        background: #2A7DC1;
        border-radius: 10px;
        width: 280px;
        height: 80px;
        font-family: PingFangSC-Medium;
        font-size: 36px;
        color: #F0F0F0;
      }
    }
    }
  }
}
</style>
