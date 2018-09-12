<template>
  <div class="potentialPage">
    <mt-popup v-model="verificate.isShow"
              class="mobile_popup"
              popup-transition="popup-fade">
      <div class="pop_mobile">
        <span>手机号：</span>
        <span class="pop_right">{{data.mobile}}</span>
      </div>
      <div class="pop_validate">
        <span>验证码：</span>
        <input class="pop_right" type="text" placeholder="请输入验证码" v-model="verificate.code">
        <span class="send"
              @click="sendVerCode"
              v-if="!verificate.isTimeout">发送验证码</span>
        <span v-else class="send1">
          {{verificate.num}}秒后重新发送
        </span>
      </div>
      <div class="alert_msg" v-if="alertCont">
        <span class="no_certy">{{alertCont}}</span>
      </div>
      <div class="btns">
        <span class="cancel" @click="verificate.isShow = false">取消</span>
        <span class="ensure" @click="hideVerBox">确定</span>
      </div>
    </mt-popup>
    <x-header :left-options="{backText: '', preventGoBack:true}" @on-click-back="toLink">{{topTitle}}</x-header>
    <div class="potential wrapper">
      <div class="fix_mobile">
        <i class="iconfont">&#xe600;</i>
        <a :href="'tel:'+data.mobile"></a>
      </div>
      <div class="client_info">
        <div class="space"></div>
        <cell :arrow-direction="showCont1 ? 'down' : 'up'"
              :border-intent="false"
              title="客户信息"
              class="bl_box"
              @click.native="showCont1 = !showCont1"
              is-link>
          <i slot="icon" class="border_left"></i>
        </cell>
        <section v-if="!showCont1">
          <div class="cell_box">
            <span class="cell_left">客户姓名：</span>
            <span class="cell_right">{{data.name}}</span>
          </div>
          <div class="bb"></div>
          <div class="cell_box">
            <span class="cell_left">国籍：</span>
            <span class="cell_right"
                  v-if="data.nationality === '0'">中国</span>
            <span v-else class="cell_right">其他</span>
          </div>
          <div class="bb"></div>
          <div class="cell_box" v-if="data.nationality === '0'">
            <span class="cell_left">常住中国城市：</span>
            <span class="cell_right">{{data.city}}</span>
          </div>
          <div class="bb"></div>
          <div class="cell_box">
            <span class="cell_left">微信号：</span>
            <span class="cell_right">{{data.wechat}}</span>
          </div>
          <div class="bb"></div>
          <div class="cell_box">
            <span class="cell_left">邮箱：</span>
            <span class="cell_right">{{data.email}}</span>
          </div>
          <div class="bb"></div>
          <div class="cell_box">
            <span class="cell_left">客户电话：</span>
            <span class="cell_right">
              <i>{{data.mobile}}</i>
              <span v-if="data.mobile_validated === '0'"
                    class="success_certy">(已验证)
              </span>
              <span v-else @click="showValPop">
                <i class="no_certy">(未验证)</i>
                <i v-if="data.mobile_validated === '1'" class="iconfont right_icon">&#xe8d5;</i>
              </span>
            </span>
          </div>
          <div class="cell_box">
            <span class="cell_left">录入时间：</span>
            <span class="cell_right">{{data.create_time}}</span>
          </div>
        </section>
      </div>
      <div v-if="data.mobile_validated === '0'">
        <group class="certify_info" v-if="data.realname_status !== '0'">
          <div class="space"></div>
          <cell :arrow-direction="showCont2 ? 'down' : 'up'"
                :border-intent="false"
                title="客户信息"
                class="bl_box"
                @click.native="showCont2 = !showCont2"
                is-link>
            <i slot="icon" class="border_left"></i>
          </cell>
          <section v-if="!showCont2">
            <div class="cell_box">
              <span class="cell_left">实名认证：</span>
              <span class="cell_right" @click="handlerPerfect">
                <i v-if="data.realname_status === '3'"
                   class="no_certy">{{clickArrowObj.realnameObj.stat}}</i>
                <i v-if="data.realname_status === '1'"
                   class="wait_certy">{{clickArrowObj.realnameObj.stat}}</i>
                <i v-if="data.realname_status === '2'"
                   class="success_certy">{{clickArrowObj.realnameObj.stat}}</i>
                <i v-if="data.realname_status === '4'"
                   class="expire_certy">{{clickArrowObj.realnameObj.stat}}</i>
                <i class="iconfont right_icon"
                   v-if="!clickArrowObj.realnameObj.disabled">&#xe8d5;</i>
              </span>
            </div>
            <div class="bb"></div>
            <div class="cell_box" @click="handlerCerty">
              <span class="cell_left">
                投资者类型：
                <i v-if="data.certification_status === '0'"
                   class="no_certy">{{clickArrowObj.cerObj.type}} {{data.risk_level}}</i>
                <i v-if="data.certification_status === '1'"
                   class="wait_certy">{{clickArrowObj.cerObj.type}} {{data.risk_level}}</i>
                <i v-if="data.certification_status === '2'"
                   class="success_certy">{{clickArrowObj.cerObj.type}} {{data.risk_level}}</i>
                <i v-if="data.certification_status === '3'"
                   class="expire_certy">{{clickArrowObj.cerObj.type}} {{data.risk_level}}</i>
              </span>
              <span class="cell_right">
                <i v-if="data.certification_status === '0'"
                   class="no_certy">{{clickArrowObj.cerObj.stat}}</i>
                <i v-if="data.certification_status === '1'"
                   class="wait_certy">{{clickArrowObj.cerObj.stat}}</i>
                <i v-if="data.certification_status === '2'"
                   class="success_certy">{{clickArrowObj.cerObj.stat}}</i>
                <i v-if="data.certification_status === '3'"
                   class="expire_certy">{{clickArrowObj.cerObj.stat}}</i>
                <i class="iconfont right_icon"
                   v-if="!clickArrowObj.cerObj.disabled">&#xe8d5;</i>
              </span>
            </div>
            <div class="bb"></div>
            <div class="cell_box" @click="handlerBank">
              <div class="cell_left">银行卡信息：</div>
              <div class="cell_right">
                <i class="iconfont right_icon">&#xe8d5;</i>
              </div>
            </div>
          </section>
        </group>
        <group class="certify_info" v-else>
          <div class="space"></div>
          <div class="cell_box" @click="handlerPerfect">
            <span class="cell_left">实名认证：</span>
            <span class="cell_right">
              <i v-if="data.realname_status === '0' || data.realname_status === '3'"
                 class="no_certy">{{clickArrowObj.realnameObj.stat}}</i>
              <i v-if="data.realname_status === '1'"
                 class="wait_certy">{{clickArrowObj.realnameObj.stat}}</i>
              <i v-if="data.realname_status === '2'"
                 class="success_certy">{{clickArrowObj.realnameObj.stat}}</i>
              <i v-if="data.realname_status === '4'"
                 class="expire_certy">{{clickArrowObj.realnameObj.stat}}</i>
              <i class="iconfont right_icon"
                 v-if="!clickArrowObj.realnameObj.disabled">&#xe8d5;</i>
            </span>
          </div>
        </group>
        <group class="remark">
          <div class="space"></div>
          <div class="add_tit">
            <span class="border_left"></span>
            <span class="text">备注</span>
          </div>
          <div class="add_remark">输入备注信息...</div>
        </group>
      </div>
      <!--<div v-if="data.mobile_validated === '0'">-->
        <!--<div class="space"></div>-->
        <!--<div class="product">-->
          <!--<group>-->
          <!--<cell style="color:#333"-->
                <!--:is-link="!clickArrowObj.realnameObj.disabled"-->
                <!--:link="{name: 'PerfectInfos'}"-->
                <!--title="实名认证："-->
                <!--:value="clickArrowObj.realnameObj.stat"-->
                <!--:disabled="clickArrowObj.realnameObj.disabled">-->
          <!--</cell>-->
          <!--<div class="space1" v-if="data.realname_status === '2'"></div>-->
          <!--<group v-if="data.realname_status === '2'">-->
            <!--<cell style="color:#333"-->
                  <!--:is-link="!clickArrowObj.cerObj.disabled"-->
                  <!--:link="{name: 'Certified',params: {id: client_id}}"-->
                  <!--:title="'投资者类型：' + clickArrowObj.cerObj.type + data.risk_level"-->
                  <!--:value="clickArrowObj.cerObj.stat"-->
                  <!--:disabled="clickArrowObj.cerObj.disabled"-->
            <!--&gt;-->
            <!--</cell>-->
            <!--<div class="space1"></div>-->
            <!--<cell is-link-->
                  <!--:link="{name: 'BankList', params: {addCard: '0'}}"-->
                  <!--title="银行卡信息："-->
            <!--&gt;</cell>-->
          <!--</group>-->
        <!--<div class="space"></div>-->
          <!--</group>-->
        <!--</div>-->
        <!--<div class="remark">-->
          <!--<group>-->
            <!--<cell-box>备注</cell-box>-->
          <!--</group>-->
          <!--<ul :class="{'no_padding' : remarkList.length === 0}">-->
            <!--<li v-for="(item, index) in remarkList" :key="index">-->
              <!--<div class="iText text-overflow-one">{{item.remark}}</div>-->
              <!--<span class="iTime">{{item.create_time}}</span>-->
              <!--<router-link class="view fr" :to="{name: 'WriteNotes', params: {remark: item.remark}}">-->
                <!--<i class="iconfont" style="font-size:36px;vertical-align: middle;">&#xe624;</i>-->
                <!--<span class="font-size:26px;color:#2672ba;vertical-align: middle;">查看</span>-->
              <!--</router-link>-->
            <!--</li>-->
          <!--</ul>-->
        <!--</div>-->
        <!--<div class="bottom-remark">-->
          <!--<div class="add clearfix" @click="addNew">新增备注</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<x-dialog v-model="showHideOnBlur" class="add_remark_x" hide-on-blur>-->
        <!--<textarea ref="textarea" class="add_remark_t" v-model="remarkInfo"></textarea>-->
        <!--<button @click="submitAddNew" class="add_remark_btn">新增备注</button>-->
      <!--</x-dialog>-->
      <!--<x-dialog v-model="validatePop" class="dialog-demo msg_dialog">-->
        <!--<div class="msg_title" style="text-align:center">提示</div>-->
        <!--<span class="msg_ipt" style="width:100%;display: block;text-align:center">{{validateCont}}</span>-->
        <!--<x-button type="primary" @click.native="hideValPop">确 定</x-button>-->
      <!--</x-dialog>-->
      <!--<x-dialog v-model="verificate.isShow"-->
                <!--:hide-on-blur="true"-->
                <!--class="dialog-demo msg_dialog">-->
        <!--<div class="msg_title">-->
          <!--<span>手机号：</span>-->
          <!--<span>{{data.mobile}}</span>-->
        <!--</div>-->
        <!--<div class="msg_cont">-->
          <!--<span>邀请码：</span>-->
          <!--<input type="text" class="msg_ipt" v-model="verificate.code">-->
          <!--<span class="verificate_code"-->
                <!--v-if="!verificate.isTimeout"-->
                <!--@click="sendVerCode">发送邀请码</span>-->
          <!--<span class="verificate_code"-->
                <!--v-else>{{verificate.num}}s</span>-->
        <!--</div>-->
        <!--<div class="alert_msg" v-if="alertCont">{{alertCont}}</div>-->
        <!--<x-button type="primary" @click.native="hideVerBox">确 定</x-button>-->
      <!--</x-dialog>-->
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
        showCont1: false,
        showCont2: false,
        showCont3: false,
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
        console.log(this.clickArrowObj)
      })
      window.onpopstate = () => {
        this.toLink()
      }
    },
    methods: {
      handlerPerfect () {
        if (!this.clickArrowObj.realnameObj.disabled) {
          this.$router.push({name: 'PerfectInfos'})
        }
      },
      handlerCerty () {
        if (!this.clickArrowObj.cerObj.disabled) {
          this.$router.push({name: 'Certified', params: {id: this.client_id}})
        }
      },
      handlerBank () {
        this.$router.push({name: 'BankList', params: {addCard: '0'}})
      },
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
  @import '../../common/style/variable';
  /*@import '~vux/src/styles/reset';*/
  .potential {
    background: #fff;
    font-family: PingFangSC-Regular;
    font-size: 30px;
    color: #4A4A4A;
    .cell_right {
      i {
        font-size: 30px;
        margin-right: 0;
      }
    }
    .remark {
      font-family: PingFangSC-Regular;
      color: #9B9B9B;
      padding-bottom: 30px;
      .add_remark {
        width: 89.33%;
        margin: 0 auto;
        box-sizing: border-box;
        margin-top: 50px;
        border: 1px solid #B8B8B8;
        border-radius: 4px;
        height: 73px;
        line-height: 73px;
        padding-left: 20px;
        font-size: 24px;
      }
    }
  }
  .mobile_popup {
    border-radius: 8px;
    width: 74.67%;
    padding-top: 34px;
    font-family: PingFangSC-Regular;
    font-size: 26px;
    color: #4A4A4A;
    .pop_validate,
    .pop_mobile {
      padding: 0 30px;
      .pop_right {
        font-family: PingFangSC-Medium;
      }
    }
    .pop_mobile {
      margin-bottom: 38px;
    }
    input.pop_right {
      border: none;
      font-size: 26px;
      display: inline-block;
      width: 170px;
    }
    .send,
    .send1 {
      display: inline-block;
      height: 54px;
      line-height: 54px;
      text-align: center;
      border: 1px solid @new-font-color;
      border-radius: 4px;
      font-size: 26px;
    }
    .send {
      width: 170px;
      color: @new-font-color;
    }
    .send1 {
      width: 205px;
      border-color: #B0B0B0;
      color: #b0b0b0;
    }
    .alert_msg {
      padding-left: 30px;
    }
    .btns {
      height: 100px;
      line-height: 100px;
      width: 100%;
      font-size: 0;
      border-top: 1px solid #D2D3D5;
      margin-top: 30px;
      span {
        width: 50%;
        text-align: center;
        display: inline-block;
        font-size: 36px;
      }
      span:nth-of-type(1) {
        color: #9B9B9B;
        border-right: 1px solid #9b9b9b;/*no*/
        box-sizing: border-box;
      }
      span:nth-of-type(2) {
        color: @new-font-color;
      }
    }
  }
  /*.v-transfer-dom .vux-x-dialog .weui-dialog {*/
    /*width: 100%;*/
    /*bottom: 0;*/
    /*margin-bottom: 0;*/
    /*height: auto;*/
  /*}*/

  /*.potential {*/
    /*.no_bbottom .weui-cells::after {*/
      /*content: none;*/
    /*}*/
    /*.weui-cells.vux-no-group-title{*/
      /*.vux-cell-box.weui-cell{*/
        /*border-bottom: 1px solid #ccc;*/
        /*label{*/
          /*font-family: PingFangSC-Medium;*/
          /*font-size: 30px;*/
          /*color: #333333;*/
        /*}*/
        /*.fr{*/
          /*font-size: 28px;*/
          /*color: #666;*/
        /*}*/
      /*}*/
    /*}*/
    /*.ver_box{*/
      /*border-bottom: 1px solid #ccc;*/
      /*.mobile_box.limit_width{*/
        /*.mobile_title{*/
          /*font-family: PingFangSC-Medium;*/
          /*font-size: 30px;*/
          /*color: #333333;*/
        /*}*/
        /*.mobile_number.limit_width{*/
          /*font-size: 28px;*/
          /*color: #666;*/
        /*}*/
      /*}*/
      /*.verificate{*/
        /*height: 42px;*/
        /*line-height: 42px;*/
        /*background: #2672BA;*/
        /*color: #fff;*/
        /*font-size: 22px;*/
        /*width: 100px;*/
        /*text-align: center;*/
        /*border-radius: 10px;*/
      /*}*/
    /*}*/
    /*.id_right {*/
      /*text-align: right;*/
      /*position: absolute;*/
      /*right: 27px;*/
      /*span {*/
        /*position: static;*/
        /*display: inline-block;*/
        /*right: 0;*/
        /*top: 0;*/
        /*transform: translateY(0);*/
      /*}*/
    /*}*/
    /*.call-btn{*/
      /*height: 132px;*/
      /*background: #fff;*/
      /*text-align: center;*/
      /*line-height: 132px;*/
      /*.callout {*/
        /*display: inline-block;*/
        /*width: 94.7%;*/
        /*height: 72px;*/
        /*text-align: center;*/
        /*line-height: 72px;*/
        /*background: #2672BA;*/
        /*border-radius: 10px;*/
        /*font-size: 28px;*/
        /*color: #FFFFFF;*/
        /*&:link,*/
        /*&:visited,*/
        /*&:hover,*/
        /*&:active {*/
          /*text-decoration: none;*/
        /*}*/
      /*}*/
    /*}*/
    /*.report {*/
      /*.vux-tap-active {*/
        /*padding-left: 45px;*/
        /*padding-top: 20px;*/
        /*padding-bottom: 20px;*/
      /*}*/
    /*}*/
    /*.product {*/
      /*.cell-form {*/
        /*padding: 40px 34px 34px 40px;*/
        /*font-size: 22px; !*px*!*/
        /*border-bottom: 1px solid #eee; !*no*!*/
        /*.cell-form-top {*/
          /*margin-bottom: 16px;*/
          /*label {*/
            /*font-size: 28px; !*px*!*/
          /*}*/
          /*.grade {*/
            /*background-color: #F76E61;*/
            /*color: #fff;*/
            /*padding: 6px 15px;*/
          /*}*/
        /*}*/
        /*.cell-form-bottom {*/
          /*font-size: 24px; !*px*!*/
          /*.text-red {*/
            /*color: #FF6A6A;*/
          /*}*/
        /*}*/
      /*}*/
      /*.weui-cells.vux-no-group-title{*/
        /*.vux-cell-box.weui-cell{*/
          /*border: none;*/
        /*}*/
      /*}*/
      /*.weui-cells:before{*/
        /*border: none;*/
      /*}*/
    /*}*/
    /*.risk-evaluation,*/
    /*.asset-allocation {*/
      /*.weui-cells .weui-cell {*/
        /*height: 106px;*/
        /*box-sizing: border-box;*/
      /*}*/
    /*}*/
    /*.risk-evaluation i {*/
      /*font-size: 40px; !*px*!*/
    /*}*/
    /*.asset-allocation i {*/
      /*font-size: 48px; !*px*!*/
      /*margin-right: 12px;*/
      /*margin-left: -8px;*/
    /*}*/
    /*.remark {*/
      /*padding-bottom: 120px;*/
      /*background-color: #fff;*/
      /*.vux-cell-box.weui-cell{*/
        /*padding: 0;*/
        /*padding-left: 20px;*/
        /*font-family: PingFangSC-Medium;*/
        /*font-size: 30px;*/
        /*color: #333333;*/
        /*border-bottom: 1px solid #ccc;*/
      /*}*/
      /*.weui-cells .weui-cell {*/
        /*border-bottom: 1px solid #979797;*/
      /*}*/
      /*.weui-cells .weui-cell i {*/
        /*font-size: 32px; !*px*!*/
      /*}*/
      /*.no_padding {*/
        /*padding-bottom: 0;*/
      /*}*/
      /*ul {*/
        /*padding-bottom: 20px;*/
        /*max-height: 440px;*/
        /*overflow-y: scroll;*/
        /*li {*/
          /*height: 110px;*/
          /*padding: 0 120px 0 68px;*/
          /*font-size: 26px;*/
          /*color: #666;*/
          /*-webkit-box-sizing: border-box;*/
          /*-moz-box-sizing: border-box;*/
          /*box-sizing: border-box;*/
          /*.iText {*/
            /*padding-top: 20px;*/
            /*margin-bottom: 10px;*/
          /*}*/
          /*.view {*/
            /*color: #2672BA;*/
            /*line-height: 30px;*/
          /*}*/
          /*.fr i {*/
            /*font-size: 36px;*/
            /*padding-right: 15px;*/
            /*vertical-align: top;*/
          /*}*/
        /*}*/
      /*}*/
    /*}*/
    /*.vux-x-dialog {*/
      /*.img-box {*/
        /*min-height: 200px;*/
        /*padding: 30px 14px;*/
        /*box-sizing: border-box;*/
        /*textarea {*/
          /*display: block;*/
          /*width: 100%;*/
          /*height: 100%;*/
          /*outline: none;*/
          /*border: 1px solid #ccc; !*no*!*/
          /*border-radius: 10px;*/
          /*padding: 10px;*/
          /*box-sizing: border-box;*/
        /*}*/
      /*}*/
    /*}*/

    /*.ver_box {*/
      /*height: 82px;*/
      /*line-height: 82px;*/
      /*border-top: 1px solid #D9D9D9;*/
      /*padding: 0 20px;*/
      /*-webkit-box-sizing: border-box;*/
      /*-moz-box-sizing: border-box;*/
      /*box-sizing: border-box;*/
      /*position: relative;*/
      /*.mobile_box {*/
        /*span {*/
          /*display: inline-block;*/
          /*position: static;*/
          /*right: 0;*/
          /*top: 0;*/
          /*-webkit-transform: translateY(0);*/
          /*transform: translateY(0);*/
        /*}*/
        /*span.mobile_title {*/
          /*width: 170px;*/
          /*color: rgb(51, 51, 51);*/
          /*font-family: PingFangSC-Medium;*/
          /*font-size: 30px;*/
        /*}*/
        /*span.mobile_number {*/
          /*width: calc(100% - 180px);*/
          /*text-align: right;*/
          /*color: #666;*/
          /*font-size: 28px;*/
        /*}*/
      /*}*/
      /*.mobile_box.limit_width {*/
        /*display: inline-block;*/
        /*width: 78.1%;*/
      /*}*/
    /*}*/
  /*}*/

  /*.weui-cells {*/
    /*.weui-cell {*/
      /*height: 85px;*/
      /*line-height: 85px;*/
      /*box-sizing: border-box;*/
      /*padding: 0 40px;*/
    /*}*/
  /*}*/
  /*.verificate_code {*/
    /*display: inline-block;*/
    /*width: 26.3%;*/
    /*height: 40px;*/
    /*line-height: 40px;*/
    /*background: #2672ba;*/
    /*color: #fff;*/
    /*font-size: 22px;*/
    /*text-align: center;*/
    /*border-radius: 10px;*/
    /*vertical-align: text-top;*/
    /*margin-left: 10px;*/
  /*}*/
</style>
