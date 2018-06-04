<template>
  <div class="pptPage">
    <x-header :left-options="{backText: '',preventGoBack:true}" @on-click-back="back(id,item)">产品说明材料</x-header>
    <div class="wrapper">
      <mt-checklist
        v-model="checkedList" :options="newNameList" @change="handleCheckedDocsChange">
      </mt-checklist>
    </div>
    <div class="select">
      <mt-checklist
        v-model="checkAll" :options="option" :label="newList" @change="handleCheckAllChange">
      </mt-checklist>
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
import { XHeader, XDialog, XInput, XButton } from 'vux'
import { getProductFiles, sendTrade } from '@/service/api/products'

export default {
  data () {
    return {
        checkAll: [],
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
        noSelectDialog: false
    }
  },
  components: {
    XHeader,
    XDialog,
    XInput,
    XButton
  },
  methods: {
    back (id, item) {
      // this.$router.push({name: 'ProductDetail', params: {id: id, item: item, email: newEmail, userId: newUserId}})
			this.$router.push({name: 'ProductDetail', params: {id: id, item: item}})
    },
    handleCheckAllChange (val) {
      this.checkedList = val.length ? this.newUrlList : []
      let inputParent = document.querySelector('.mint-checklist')
      Array.from(inputParent.querySelectorAll('input[type="checkbox"]')).forEach((item, index) => {
        item.setAttribute('checked', true)
        if (val.length) {
          item.parentNode.nextElementSibling.classList.add('color')
        } else {
          item.parentNode.nextElementSibling.classList.remove('color')
        }
      })
      },
      handleCheckedDocsChange (value) {
      let inputParent = document.querySelector('.mint-checklist')
      Array.from(inputParent.querySelectorAll('input[type="checkbox"]')).forEach((item, index) => {
        if (item.checked) {
          item.parentNode.nextElementSibling.classList.add('color')
        } else {
          item.parentNode.nextElementSibling.classList.remove('color')
        }
      })
        let checkedCount = value.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.newNameList.length
        let allInput = document.querySelector('.select input.mint-checkbox-input')
        if (checkedCount === this.newNameList.length) {
          allInput.checked = true
        } else {
          allInput.checked = false
        }
      },
      sendEmail () {
        this.dialogTableVisible = true
      },
      sendMessage () {
        this.dialogTableVisible = false
        //
        let obj = {'email': this.newEmail, 'checkedList': this.checkedList, 'userId': this.newUserId, 'type': 1}
        sendTrade(obj).then(res => {
          console.log(res)
          this.successDialog = true
        }).catch(err => {
          console.log(err)
          this.noSelectDialog = true
        })
      },
      successSure () {
        this.successDialog = false
      },
      noSelectSure () {
        this.noSelectDialog = false
      }
  },
  mounted () {
    this.id = this.$route.params.id
    this.item = this.$route.params.item
    // this.newEmail = this.$route.params.email
    // this.newUserId = this.$route.params.userId
    this.newEmail = JSON.parse(window.localStorage.getItem('data')).email
    this.newUserId = JSON.parse(window.localStorage.getItem('data')).userId
		getProductFiles(this.id).then(res => {
      this.documentList = res.data
      const list = []
      const nameList = []
      const urlList = []
      this.documentList.map((item, index) => {
        list.push(item.file_path + ';' + item.name)
        nameList.push({label: item.name, value: item.product_file_id})
        urlList.push(item.product_file_id)
      })
      this.newList = list
      this.newNameList = nameList
      this.newUrlList = urlList
    })
	}
}
</script>

<style lang="less">
.pptPage{
  height: 100%;
  background: #F5F5F5;
  .wrapper{
    background: #F5F5F5;
    padding-bottom: 8px;
    margin-bottom: 82px;
  }
  .el-checkbox-group{
    // margin-bottom: 82px;
  }
  .mint-checklist-title{
    display: none;
  }
  .mint-cell{
    display: block;
    // padding-left: 21px !important;
    padding: 0 0 0 21px !important;
    margin-left: 0px;
    margin-top: 8px;
    height: 82px;
    line-height: 82px;
    background: #fff;
    text-decoration: none;
    .mint-cell-wrapper{
      height: 100%;
      padding: 0;
      background: none;
      .mint-cell-title{
        .mint-checklist-label{
          .mint-checkbox{
            .mint-checkbox-core{
              width: 25px;
              height: 25px;
              border: 1px solid #666666;
              border-radius: 4px;
            }
            .mint-checkbox-core::after{
              border: 2px solid #2672BA;
              border-top: 0px;
              border-left: 0px;
              width: 10px;
              height: 17px;
              top: 0;
              left: 6px;
            }
            .mint-checkbox-input:checked + .mint-checkbox-core{
              background: #fff;
              border: 1px solid #2672BA;
            }
          }
          .mint-checkbox-label{
            font-family: PingFangSC-Regular;
            font-size: 28px;
            color: #333333;
          }
          .color{
            color: #2672BA;
          }
        }
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
  z-index: 55;
  label.el-checkbox {
    display: inline-block;
    margin-top: 0px;
  }
  .button{
    width: 156px;
    height: 50px;
    position: absolute;
    right: 22px;
    top: 20px;
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
        font-size: 100px;
        color: #74BA3B;
        display: inline-block;
        margin: 40px 0;
      }
      .noS{
        font-size: 100px;
        color: #C61D1A;
        display: inline-block;
        margin: 40px 0;
      }
      .success{
        // margin-top: 30px;
        margin-bottom: 40px;
        font-family: PingFangSC-Regular;
        font-size: 30px;
        color: #333333;
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
</style>
