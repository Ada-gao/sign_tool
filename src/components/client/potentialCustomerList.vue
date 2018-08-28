<template>
  <div class="potentialPage">
    <x-header :left-options="{backText: '', preventGoBack:true}" @on-click-back="toLink">{{topTitle}}</x-header>
    <div class="potential wrapper">
      <div class="info">
        <group>
          <cell-box style="color: #2672ba;">
            <i class="iconfont">&#xe62c;</i>客户信息
          </cell-box>
        </group>
        <div class="space"></div>
        <group>
          <cell-box>
            <label style="color:#333">客户姓名：</label>
            <span class="fr">{{data.name}}</span>
          </cell-box>
          <cell-box>
            <label style="color:#333">国籍：</label>
            <span
              class="fr"
              v-if="data.nationality === '0'"
            >中国</span>
            <span
              class="fr"
              v-else
            >其他</span>
          </cell-box>
          <cell-box v-show="data.nationality === '0'">
            <label style="color:#333">常住城市：</label>
            <span class="fr">{{data.city}}</span>
          </cell-box>
          <cell-box>
            <label style="color:#333">微信：</label>
            <span class="fr">{{data.wechat}}</span>
          </cell-box>
          <cell-box>
            <label style="color:#333">邮箱：</label>
            <span class="fr">{{data.email}}</span>
          </cell-box>
          <div class="ver_box">
            <div class="mobile_box"
                 :class="{'limit_width': data.mobile_validated === '1'}">
              <span class="mobile_title">手机号码：</span>
              <span class="mobile_number"
                    :class="{'limit_width': data.mobile_validated === '1'}">
                <span>{{data.mobile}}</span>{{data.mobile_validated === '1' ? '(未验证)' : '(已验证)'}}
              </span>
            </div>
            <span class="verificate"
                  @click="showValPop"
                  v-show="data.mobile_validated === '1'">去验证</span>
          </div>
          <cell-box>
            <label style="color:#333">录入时间：</label>
            <span class="fr">{{data.create_time}}</span>
          </cell-box>
          <div class="space" v-if="data.realname_status === '2'"></div>
          <group v-if="data.realname_status === '2'">
            <cell-box>
              <label style="color:#333">证件号码：</label>
              <span class="fr">{{data.id_no}}</span>
            </cell-box>
            <cell-box>
              <label style="color:#333">证件类型：</label>
              <span class="fr">{{data.id_type}}</span>
            </cell-box>
            <cell-box>
              <label style="color:#333">证件有效期：</label>
              <span class="fr">{{data.id_start_date}} 至 {{data.id_expiration}}</span>
            </cell-box>
            <cell-box>
              <label style="color:#333">出生日期：</label>
              <span class="fr">{{data.birthday}}</span>
            </cell-box>
            <cell-box>
              <label style="color:#333">地址：</label>
              <span class="fr">{{data.address}}</span>
            </cell-box>
          </group>
          <!--<cell-box>-->
            <!--<label style="color:#333">录入时间：</label>-->
            <!--<span class="fr">{{data.email}}</span>-->
          <!--</cell-box>-->
        </group>
        <div class="call-btn">
          <a :href="'tel:'+data.mobile" class="callout">拨打客户电话</a>
        </div>
      </div>
      <div v-if="data.mobile_validated === '0'">
        <div class="space"></div>
        <div class="product">
          <group>
          <cell style="color:#333"
                :is-link="!clickArrowObj.realnameObj.disabled"
                :link="{name: 'PerfectInfos'}"
                title="实名认证："
                :value="clickArrowObj.realnameObj.stat"
                :disabled="clickArrowObj.realnameObj.disabled">
          </cell>
          <div class="space1" v-if="data.realname_status === '2'"></div>
          <group v-if="data.realname_status === '2'">
            <cell style="color:#333"
                  :is-link="!clickArrowObj.cerObj.disabled"
                  :link="{name: 'Certified',params: {id: client_id}}"
                  :title="'投资者类型：' + clickArrowObj.cerObj.type"
                  :value="clickArrowObj.cerObj.stat"
                  :disabled="clickArrowObj.cerObj.disabled"
            >
            </cell>
            <div class="space1"></div>
            <cell is-link
                  :link="{name: 'BankList', params: {addCard: '0'}}"
                  title="银行卡信息："
            ></cell>
          </group>
        <div class="space"></div>
          </group>
        </div>
        <div class="remark">
          <group>
            <cell-box>备注</cell-box>
          </group>
          <ul :class="{'no_padding' : remarkList.length === 0}">
            <li v-for="(item, index) in remarkList" :key="index">
              <div class="iText text-overflow-one">{{item.remark}}</div>
              <span class="iTime">{{item.create_time}}</span>
              <router-link class="view fr" :to="{name: 'WriteNotes', params: {remark: item.remark}}">
                <i class="iconfont" style="font-size:36px;vertical-align: middle;">&#xe624;</i>
                <span class="font-size:26px;color:#2672ba;vertical-align: middle;">查看</span>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="bottom-remark">
          <div class="add clearfix" @click="addNew">新增备注</div>
        </div>
      </div>
      <x-dialog v-model="showHideOnBlur" class="add_remark_x" hide-on-blur>
        <textarea ref="textarea" class="add_remark_t" v-model="remarkInfo"></textarea>
        <button @click="submitAddNew" class="add_remark_btn">新增备注</button>
      </x-dialog>
      <x-dialog v-model="validatePop" class="dialog-demo msg_dialog">
        <div class="msg_title" style="text-align:center">提示</div>
        <span class="msg_ipt" style="width:100%;display: block;text-align:center">{{validateCont}}</span>
        <x-button type="primary" @click.native="hideValPop">确 定</x-button>
      </x-dialog>
      <x-dialog v-model="verificate.isShow"
                :hide-on-blur="true"
                class="dialog-demo msg_dialog">
        <div class="msg_title">
          <span>手机号：</span>
          <span>{{data.mobile}}</span>
        </div>
        <div class="msg_cont">
          <span>邀请码：</span>
          <input type="text" class="msg_ipt" v-model="verificate.code">
          <span class="verificate_code"
                v-if="!verificate.isTimeout"
                @click="sendVerCode">发送邀请码</span>
          <span class="verificate_code"
                v-else>{{verificate.num}}s</span>
        </div>
        <div class="alert_msg" v-if="alertCont">{{alertCont}}</div>
        <x-button type="primary" @click.native="hideVerBox">确 定</x-button>
      </x-dialog>
    </div>
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
    XButton,
    TransferDomDirective as TransferDom,
    CellFormPreview
  } from 'vux'
  import {
    checkCusomersDetail,
    addCustomerRemarks,
    checkCustomerRemarks,
    confirmVercode,
    sendVerCode
  } from '@/service/api/customers'

  import {setStore, removeStore} from '@/config/mUtils'
  import {tfCtypeToText, tfCerIdToText, tfIdtype} from '@/common/js/filter'

  export default {
    name: 'PotentialCustomerList',
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
      XButton,
      CellFormPreview
    },
    data () {
      return {
        verificate: {
          isShow: false,
          timer: null,
          num: 60,
          isTimeout: false,
          code: ''
        },
        data: {},
        client_id: 0,
        remarkList: [],
        showHideOnBlur: false,
        validatePop: false,
        validateCont: '',
        alertCont: '',
        remarkInfo: '',
        remarkInput: null,
        modifiedVal: '',
        topTitle: '',
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
    mounted () {
      this.client_id = this.$route.params.id
      checkCustomerRemarks(this.client_id).then(res => {
        if (res.status === 200) {
          if (res.data.length > 0) {
            this.remarkList = res.data
          }
        }
      })
      checkCusomersDetail(this.client_id).then(res => {
        let selfInfos = Object.assign({}, res.data)
        setStore('selfInfos', selfInfos)
        this.data = Object.assign({}, res.data)
        this.data.id_type = tfIdtype(this.data.id_type)
        console.log(this.data)
        this.topTitle = this.data.mobile_validated === '0' ? '潜客信息' : '手机未验证'
        this.clickArrowObj.cerObj.stat = tfCtypeToText(this.data.certification_status).flag
        this.clickArrowObj.cerObj.disabled = tfCtypeToText(this.data.certification_status).disabled
        if (this.data.client_type === '0') {
          this.clickArrowObj.cerObj.type = '普通投资者'
        } else if (this.data.client_type === '1') {
          this.clickArrowObj.cerObj.type = '专业投资者'
        }
        this.clickArrowObj.realnameObj.stat = tfCerIdToText(this.data.realname_status).flag
        this.clickArrowObj.realnameObj.disabled = tfCerIdToText(this.data.realname_status).disabled
      })
      window.onpopstate = () => {
        this.toLink()
      }
    },
    methods: {
      hideVerBox () {
        if (!this.verificate.code) {
          // this.verificate.isTimeout = false
          // this.verificate.num = 60
          // clearInterval(this.verificate.timer)
          this.alertCont = '邀请码不能为空'
          return false
        }
        let params = {
          code: this.verificate.code,
          mobile: this.data.mobile
        }
        if (params.code) {
          confirmVercode(params).then(res => {
            this.alertCont = this.verificate.code = ''
            if (res.status === 200) {
              this.data.mobile_validated = res.data.mobile_validated
              if (res.data.mobile_validated === '0') {
                this.topTitle = '潜客信息'
                this.validateCont = '验证通过'
              } else {
                this.topTitle = '手机未验证'
                this.validateCont = '验证失败'
              }
            } else {
              this.topTitle = '手机未验证'
              this.data.mobile_validated = '1'
              this.validateCont = '验证失败'
            }
            this.verificate.isShow = false
            this.validatePop = true
            this.verificate.code = ''
            clearInterval(this.verificate.timer)
            this.verificate.num = 60
          }).catch(() => {
            this.alertCont = this.verificate.code = ''
            this.verificate.isShow = false
            clearInterval(this.verificate.timer)
            this.verificate.num = 60
          })
        }
      },
      hideValPop () {
        this.validatePop = false
      },
      showValPop () {
        this.verificate.isShow = true
        clearInterval(this.verificate.timer)
        this.verificate.code = ''
        this.verificate.num = 60
        this.alertCont = this.verificate.isTimeout = false
      },
      sendVerCode () {
          this.verificate.isTimeout = true
        let params = {
          username: this.data.mobile,
          code_flag: 1
        }
        sendVerCode(params).then(res => {
        })
        this.verificate.timer = setInterval(() => {
          --this.verificate.num
          if (this.verificate.num === 0) {
            this.verificate.isTimeout = false
            this.verificate.num = 60
            clearInterval(this.verificate.timer)
          }
        }, 1000)
      },
      convert (state, disabled) {
        switch (state) {
          case '0':
          case '1':
          case '3':
            disabled = true
            break
          case '2':
            disabled = false
            break
        }
        return disabled
      },
      toLink () {
        removeStore('selfInfos')
        this.$router.replace({name: 'CustomerList', params: {mark: (this.topTitle === '潜客信息' ? 1 : 2)}})
      },
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

        let params = {
          remark: this.remarkInfo,
          client_name: this.data.name
        }
        addCustomerRemarks(this.client_id, params).then(res => {
          if (res.status === 200) {
            this.remarkList.push({
              remark: this.remarkInfo.trim(),
              create_time: dateFormat(new Date(), 'yyyy-MM-dd')
            })
            this.remarkInfo = ''
          }
        }).catch(() => {
          this.remarkInfo = ''
        })
      }
    }
  }
</script>

<style scoped lang="less">
  /*@import '~vux/src/styles/reset';*/
  .v-transfer-dom .vux-x-dialog .weui-dialog {
    width: 100%;
    bottom: 0;
    margin-bottom: 0;
    height: auto;
  }

  .potential {
    .no_bbottom .weui-cells::after {
      content: none;
    }
    .weui-cells.vux-no-group-title{
      .vux-cell-box.weui-cell{
        border-bottom: 1px solid #ccc;
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
    .ver_box{
      border-bottom: 1px solid #ccc;
      .mobile_box.limit_width{
        .mobile_title{
          font-family: PingFangSC-Medium;
          font-size: 30px;
          color: #333333;
        }
        .mobile_number.limit_width{
          font-size: 28px;
          color: #666;
        }
      }
      .verificate{
        height: 42px;
        line-height: 42px;
        background: #2672BA;
        color: #fff;
        font-size: 22px;
        width: 100px;
        text-align: center;
        border-radius: 10px;
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
      .weui-cells.vux-no-group-title{
        .vux-cell-box.weui-cell{
          border: none;
        }
      }
      .weui-cells:before{
        border: none;
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
      .weui-cells .weui-cell {
        border-bottom: 1px solid #979797;
      }
      .weui-cells .weui-cell i {
        font-size: 32px; /*px*/
      }
      .no_padding {
        padding-bottom: 0;
      }
      ul {
        padding-bottom: 20px;
        max-height: 440px;
        overflow-y: scroll;
        li {
          height: 110px;
          padding: 0 120px 0 68px;
          font-size: 26px;
          color: #666;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          .iText {
            padding-top: 20px;
            margin-bottom: 10px;
            /*font-size: 28px;*/
          }
          .view {
            color: #2672BA;
            line-height: 30px;
          }
          .fr i {
            font-size: 36px;
            padding-right: 15px;
            vertical-align: top;
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

    .ver_box {
      height: 82px;
      line-height: 82px;
      border-top: 1px solid #D9D9D9;
      padding: 0 20px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      position: relative;
      .mobile_box {
        span {
          display: inline-block;
          position: static;
          right: 0;
          top: 0;
          -webkit-transform: translateY(0);
          transform: translateY(0);
        }
        span.mobile_title {
          width: 170px;
          color: rgb(51, 51, 51);
          font-family: PingFangSC-Medium;
          font-size: 30px;
        }
        span.mobile_number {
          width: calc(100% - 180px);
          text-align: right;
          color: #666;
          font-size: 28px;
        }
      }
      .mobile_box.limit_width {
        display: inline-block;
        /*width: 555px;*/
        /*padding-right: 140px;*/
        width: 78.1%;
      }
    }
  }

  .weui-cells {
    .weui-cell {
      height: 80px;
      line-height: 80px;
      box-sizing: border-box;
      padding: 0 20px;
    }
    a {
      color: #333;
      position: absolute;
      right: 27px;
      top: 50%;
      transform: translateY(-50%);
      -webkit-transform: translateY(-50%);
    }
    a:visited,
    a:active {
      text-decoration: none;
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
  .verificate_code {
    display: inline-block;
    /*width: 140px;*/
    width: 26.3%;
    height: 40px;
    line-height: 40px;
    background: #2672ba;
    color: #fff;
    font-size: 22px;
    text-align: center;
    border-radius: 10px;
    vertical-align: text-top;
    margin-left: 10px;
  }
</style>
