<template>
  <div class="customerManagement">
    <x-header :left-options="{backText: '', preventGoBack:true}"
              @on-click-back="toLink">客户详情</x-header>
    <div class="wrapper">
      <div class="info">
        <group>
          <cell-box style="color: #2672ba;">
            <i class="iconfont">&#xe62c;</i>客户信息
            <!-- <span class="fr" style="color:#333;">{{investorType}}</span> -->
          </cell-box>
        </group>
        <div class="space"></div>
        <group>
          <cell-box>
            <label for="name">客户姓名：</label>
            <span class="fr">{{data.name}}</span>
          </cell-box>
          <cell-box>
            <label for="name">客户姓别：</label>
            <span class="fr">{{data.gender === '0' ? '男' : '女'}}</span>
          </cell-box>
          <cell-box>
            <label for="name">客户编号：</label>
            <span class="fr">{{data.client_no}}</span>
          </cell-box>
        </group>
        <div class="space"></div>
        <group class="no_bbottom">
          <cell-box>
            <label for="phone">国籍：</label>
            <span
              class="fr"
              v-if="data.nationality === '0'"
            >中国</span>
            <span
              class="fr"
              v-else
            >其他</span>
          </cell-box>
          <!-- <cell-box v-show="data.nationality === '中国'">
            <label for="email">常住中国城市：</label>
            <span class="fr">{{data.city}}</span>
          </cell-box> -->
          <cell-box>
            <label for="name">常住城市：</label>
            <span class="fr">{{data.city}}</span>
          </cell-box>
          <cell-box>
            <label for="name">微信：</label>
            <span class="fr">{{data.wechat}}</span>
          </cell-box>
          <cell-box>
            <label for="name">邮箱：</label>
            <span class="fr">{{data.email}}</span>
          </cell-box>
          <cell-box>
            <label for="name">客户电话：</label>
            <span class="fr">{{data.mobile}}</span>
          </cell-box>
          <div class="space"></div>
          <cell-box>
            <label>身份证号：</label>
            <span class="fr">{{data.id_no}}</span>
          </cell-box>
          <cell-box>
            <label>证件有效期：</label>
            <span class="fr">{{data.id_start_date}} 至 {{data.id_expiration}}</span>
          </cell-box>
          <cell-box>
            <label>出生日期：</label>
            <span class="fr">{{data.birthday}}</span>
          </cell-box>
          <cell-box>
            <label>地址：</label>
            <span class="fr">{{data.address}}</span>
          </cell-box>
          <cell-box>
            <label>录入时间：</label>
            <span class="fr">{{data.create_time}}</span>
          </cell-box>
          <cell-box>
            <label>资产管理规模：</label>
            <span class="fr">{{data.asset_amount}}万</span>
          </cell-box>
        </group>
        <div class="call-btn">
          <a :href="'tel:'+data.client_id" class="callout">拨打客户电话</a>
        </div>
      </div>
      <div class="space"></div>
      <div class="product">
        <group>
          <!--<mt-cell title="实名认证："-->
                   <!--to="/perfectInfos"-->
                   <!--:value="clickArrowObj.realnameObj.stat"-->
                   <!--:is-link="false">-->
          <!--</mt-cell>-->
          <cell style="color:#333"
                :is-link="!clickArrowObj.realnameObj.disabled"
                :link="{name: 'PerfectInfos'}"
                title="投资者类型："
                :value="clickArrowObj.realnameObj.stat"
                :disabled="clickArrowObj.realnameObj.disabled">
          </cell>
          <div class="space1"></div>
          <group v-if="data.realname_status === '2'">
            <cell style="color:#333"
                  :is-link="!clickArrowObj.cerObj.disabled"
                  :link="{name: 'Certified',params: {id: data.client_id}}"
                  :title="'投资者类型：' + clickArrowObj.cerObj.type"
                  :value="clickArrowObj.cerObj.stat"
                  :disabled="clickArrowObj.cerObj.disabled">
            </cell>
            <div class="space1"></div>
            <cell is-link
                  :link="{name: 'BankList', params: {id: data.client_id, addCard: '1'}}"
                  title="银行卡信息："
            ></cell>
          </group>
          <div class="space1"></div>
          <cell
            is-lilnk
            :link="'/purchasedProducts/'+clientId"
            value-align="left"
            title="客户已购买产品"
          >
          </cell>
          <div class="space"></div>
        </group>
      </div>
      <div class="remark">
        <group>
          <cell-box>备注</cell-box>
        </group>
        <ul>
          <li v-for="(item, index) in remarkList" :key="index">
            <div class="iText text-overflow-one">{{item.remark}}</div>
            <span class="iTime">{{item.create_time}}</span>
            <router-link class="view fr" :to="{name: 'WriteNotes', params: {remark: item.remark}}"><i
              class="iconfont">&#xe624;</i>&nbsp;查看
            </router-link>
          </li>
        </ul>
        <div class="space"></div>
      </div>
      <div class="bottom-remark">
        <div class="add clearfix" @click="addNew">填写备注</div>
      </div>
      <x-dialog v-model="showHideOnBlur" class="add_remark_x" hide-on-blur>
        <textarea ref="textarea" class="add_remark_t" v-model="remarkInfo"></textarea>
        <button @click="submitAddNew" class="add_remark_btn">新增备注</button>
      </x-dialog>
    </div>
    <x-dialog v-model="transformDialog" class="submitDialog">
      <div class="tip">客户当前资产规模已到达500万<br/>
            是否自动转变为专业投资者？</div>
			<x-button type="primary" @click.native="transform">转 变</x-button>
			<x-button type="primary" @click.native="cancel">取 消</x-button>
    </x-dialog>
  </div>
</template>

<script>
  import {
    XHeader,
    Group,
    Cell,
    CellBox,
    Flexbox,
    FlexboxItem,
    XDialog,
    XTextarea,
    XButton,
    TransferDomDirective as TransferDom,
    CellFormPreview
  } from 'vux'
  import {
    checkCusomersDetail,
    checkCustomerRemarks,
    addCustomerRemarks
  } from '@/service/api/customers'
  import {tfCtypeToText, tfCerIdToText} from '@/common/js/filter'
  import {setStore, removeStore} from '@/config/mUtils'

  export default {
    name: 'CustomerManagement',
    directives: {
      TransferDom
    },
    components: {
      XHeader,
      Group,
      Cell,
      CellBox,
      Flexbox,
      FlexboxItem,
      XDialog,
      XTextarea,
      XButton,
      CellFormPreview
    },
    data () {
      return {
        data: {},
        investorType: '',
        clientId: '',
        clientName: '',
        clientType: '',
        stat: '',
        remarkList: [],
        showHideOnBlur: false,
        transformDialog: false,
        remarkInfo: null,
        remarkInput: null,
        clickArrowObj: {
          realnameObj: {
            stat: '',
            disabled: null
          },
          cerObj: {
            stat: '',
            disabled: null,
            type: ''
          }
        }
      }
    },
    beforeRouteLeave (to, from, next) {
      if (to.name === 'CustomerList') {
        removeStore('selfInfos')
      }
      next()
    },
    mounted () {
      let clientId = this.$route.params.id
      checkCustomerRemarks(clientId).then(res => {
        if (res.data.length > 0) {
          this.remarkList = res.data
        }
      })
      clientId === 0 ? (this.investorType = '普通投资者') : (this.investorType = '专业投资者')
      checkCusomersDetail(clientId).then(res => {
        this.data = res.data
        setStore('selfInfos', res.data)
        this.data.asset_amount = this.data.asset_amount || 0
        this.data.create_time = new Date(this.data.create_time).toLocaleDateString().split('/').join('.')
        this.clientId = res.data.client_id
        this.clientName = res.data.name
        this.clientType = res.data.client_type
        if (this.data.asset_amount > 500) {
          this.transformDialog = true
        }
        this.clickArrowObj.cerObj.stat = tfCtypeToText(this.data.certification_status).flag
        this.clickArrowObj.cerObj.disabled = tfCtypeToText(this.data.certification_status).disabled
        if (this.data.client_type === '0') {
          this.clickArrowObj.cerObj.type = '普通投资者'
        } else if (this.data.client_type === '1') {
          this.clickArrowObj.cerObj.type = '专业投资者'
        }
        this.clickArrowObj.realnameObj.stat = tfCerIdToText(this.data.realname_status).flag
        this.clickArrowObj.realnameObj.disabled = tfCerIdToText(this.data.realname_status).disabled
        switch (res.data.client_type) {
          case '0':
            this.stat = '普通投资者'
            break
          case '1':
            this.stat = '专业投资者'
            break
        }
      })
    },
    methods: {
      addNew () {
        this.showHideOnBlur = true
        this.$refs.textarea.focus()
      },
      submitAddNew () {
        this.showHideOnBlur = false
        this.remarkInput = null
        let dateFormat = function (date, fmt) {
          let o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds(),
            'S+': date.getMilliseconds()
          }
          if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
          }
          for (let k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
              fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('' + o[k]).substr(('' + o[k].length))))
            }
          }
          return fmt
        }
        if (!this.remarkInfo || this.remarkInfo.trim().length === 0) return
        this.remarkList.push({
          remark: this.remarkInfo.trim(),
          create_time: dateFormat(new Date(), 'yyyy-MM-dd')
        })
        let params = {
          remark: this.remarkInfo,
          client_name: this.clientName
        }
        addCustomerRemarks(this.clientId, params).then(res => {
          if (res.status === 200) {
            this.remarkInfo = ''
          }
        })
      },
      toLink () {
        this.$router.push({name: 'CustomerList', params: {mark: 0}})
      },
      transform () {
        this.$router.push({name: 'AutoTransfer', params: {id: this.clientId}})
      },
      cancel () {
        this.transformDialog = false
      }
    }
  }
</script>

<style lang="less">
.customerManagement{
  .wrapper {
    .no_bbottom .weui-cells::after {
      content: none;
    }
    .weui-cells.vux-no-group-title{
      .vux-cell-box.weui-cell{
        label{
          font-family: PingFangSC-Medium;
          font-size: 30px;
          color: #333333;
        }
        .fr{
          font-size: 28px;
          color: #666;
        }
      }
    }
    .info{
      .vux-cell-box.weui-cell{
        border-bottom: 1px solid #CCCCCC;
        padding: 0;
        padding-left: 20px;
        height: 83px;
      }
    }
    .id_right {
      text-align: right;
      position: absolute;
      right: 27px;
      span {
        position: static;
        display: inline-block;
        right: 0;
        top: 0;
        transform: translateY(0);
      }
    }
    .call-btn{
      height: 132px;
      background: #fff;
      text-align: center;
      line-height: 132px;
      .callout {
        display: inline-block;
        width: 94.7%;
        height: 72px;
        text-align: center;
        line-height: 72px;
        background: #2672BA;
        border-radius: 10px;
        font-size: 28px;
        color: #FFFFFF;
        &:link,
        &:visited,
        &:hover,
        &:active {
          text-decoration: none;
        }
      }
    }
    .report {
      .vux-tap-active {
        padding-left: 45px;
        padding-top: 20px;
        padding-bottom: 20px;
      }
    }
    .product {
      .mint-cell{
        .mint-cell-wrapper{
          padding-left: 20px;
          .mint-cell-text{
            position: static;
          }
        }
      }
      .vux-cell-box.weui-cell{
        padding: 0;
        padding-left: 20px;
      }
      .weui-cell.vux-tap-active.weui-cell_access{
        padding: 0 20px;
        .vux-cell-bd{
          p{
            label{
              font-family: PingFangSC-Medium;
              font-size: 30px;
              color: #333333;
            }
          }
        }
        .weui-cell__ft{
          font-size: 28px;
          color: #666;
        }
      }
      .cell-form {
        padding: 40px 34px 34px 40px;
        font-size: 22px; /*px*/
        border-bottom: 1px solid #eee; /*no*/
        .cell-form-top {
          margin-bottom: 16px;
          label {
            font-size: 28px; /*px*/
          }
          .grade {
            background-color: #F76E61;
            color: #fff;
            padding: 6px 15px;
          }
        }
        .cell-form-bottom {
          font-size: 24px; /*px*/
          .text-red {
            color: #FF6A6A;
          }
        }
      }
    }
    .risk-evaluation,
    .asset-allocation {
      .weui-cells .weui-cell {
        height: 106px;
        box-sizing: border-box;
      }
    }
    .risk-evaluation i {
      font-size: 40px; /*px*/
    }
    .asset-allocation i {
      font-size: 48px; /*px*/
      margin-right: 12px;
      margin-left: -8px;
    }
    .remark {
      padding-bottom: 120px;
      background-color: #fff;
      .vux-cell-box.weui-cell{
        padding: 0;
        padding-left: 20px;
        font-family: PingFangSC-Medium;
        font-size: 30px;
        color: #333333;
        border-bottom: 1px solid #ccc;
      }
      .weui-cells .weui-cell i {
        font-size: 32px; /*px*/
      }
      ul {
        li {
          border-bottom: 1px solid #eee; /*no*/
          /*padding: 30px 40px;*/
          padding: 20px 120px 0px 68px;
          font-size: 24px; /*px*/
          .iText {
            margin-bottom: 10px;
            font-size: 28px; /*px*/
          }
          .view {
            color: #2672BA;
          }
          .fr i {
            font-size: 24px; /*px*/
            padding-right: 15px;
          }
        }
      }
    }
    .vux-x-dialog {
      .img-box {
        min-height: 200px;
        padding: 30px 14px;
        box-sizing: border-box;
        textarea {
          display: block;
          width: 100%;
          height: 100%;
          outline: none;
          border: 1px solid #ccc; /*no*/
          border-radius: 10px;
          padding: 10px;
          box-sizing: border-box;
        }
      }
    }
    .weui-cells:after {
      content: none;
    }
  }
  .submitDialog {
    .tip{
      font-family: PingFangSC-Regular;
      font-size: 36px;
      color: #333333;
      margin-top: 50px;
      margin-bottom: 35px;
    }
    .weui-btn.weui-btn_primary{
      display: inline-block;
      width: 190px;
      height: 80px;
      background: #2A7DC1;
      border-radius: 10px;
      font-family: PingFangSC-Medium;
      font-size: 36px;
      color: #F0F0F0;
      margin-right: 43px;
    }
    .weui-btn.weui-btn_primary:last-child{
      margin-left: 43px;
      margin-right: 0px;
    }
  }
  .weui-cells {
    .weui-cell {
      height: 80px;
      line-height: 80px;
      box-sizing: border-box;
    }
    span {
      position: absolute;
      right: 27px;
      top: 50%;
      transform: translateY(-50%);
      -webkit-transform: translateY(-50%);
      i {
        margin-right: 12px;
        color: #333;
      }
    }
  }

  .space {
    width: 100%;
    height: 20px;
    background-color: #f5f5f5;
  }

  .space1 {
    width: 100%;
    height: 10px;
    background-color: #f5f5f5;
  }
}
</style>
