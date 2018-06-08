<template>
  <div>
    <x-header :left-options="{backText: '', preventGoBack:true}" @on-click-back="toLink1">潜客详情</x-header>
    <div class="potential wrapper">
      <div class="info">
        <group>
          <cell-box style="color: #2672ba;">
            <i class="iconfont">&#xe62c;</i>潜客信息
            <span class="fr"
                  @click="toLink"
                  style="color:#666;"
                  v-if="data.realname_status === '0'">完善信息</span>
            <span class="fr" v-else style="color:#666;">已完善</span>
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
            <label style="color:#333">常住中国城市：</label>
            <span class="fr">{{data.city}}</span>
          </cell-box>
        </group>
        <div class="space"></div>
        <group class="no_bbottom">
          <cell-box>
            <label style="color:#333">邮箱：</label>
            <span class="fr">{{data.email}}</span>
          </cell-box>
          <!--<cell-box>-->
            <!--<label style="color:#333">手机号：</label>-->
            <!--<span class="fr">{{data.mobile}}</span>-->
          <!--</cell-box>-->
          <div class="ver_box">
            <!--<cell title="手机号码：" :value="mobile" class="cell_mobile"></cell>-->
            <div class="mobile_box" :class="{'limit_width': verificate.verStatus === '1'}">
              <span class="mobile_title">手机号码：</span>
              <span class="mobile_number" :class="{'limit_width': verificate.verStatus === '1'}">{{mobile}}</span>
            </div>
            <span class="verificate" v-show="verificate.verStatus === '1'">发送验证码</span>
          </div>
        </group>
      </div>
      <div class="space"></div>
      <div class="product">
        <group>
          <cell style="color:#333"
            :is-link="!convert(data.realname_status, disabled)"
            :link="{name: 'Certified',params: {id: client_id}}"
            :title="'投资者类型：'+stat"
            :value="modifiedVal"
            :disabled="convert(data.realname_status, disabled)"
          >
          </cell>
        </group>
      </div>
      <div class="space"></div>
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
        <!--<div class="add clearfix">-->
        <!--<input type="text" @click="addNew" class="addInput" v-model="remarkInput" placeholder="新增备注"/>-->
        <!--</div>-->
        <div class="add clearfix" @click="addNew">新增备注</div>
      </div>
      <!--<div v-transfer-dom>-->
        <!--<x-dialog v-model="showHideOnBlur" class="dialog-demo" hide-on-blur>-->
          <!--<div class="img-box">-->
            <!--<textarea v-focus id="inputing" v-model="remarkInfo"></textarea>-->
          <!--</div>-->
          <!--<div style="text-align: right;">-->
            <!--<button @click="submitAddNew" class="btn btn-primary vux-emit">新增备注</button>-->
          <!--</div>-->
        <!--</x-dialog>-->
      <!--</div>-->

      <x-dialog v-model="showHideOnBlur" class="add_remark_x" hide-on-blur>
        <textarea ref="textarea" class="add_remark_t" v-model="remarkInfo"></textarea>
        <button @click="submitAddNew" class="add_remark_btn">新增备注</button>
      </x-dialog>
      <x-dialog v-model="verificate.isShow" class="dialog-demo msg_dialog">
        <div class="msg_title">请输入验证码：</div>
        <input type="text" class="msg_ipt" v-model="verificate.code">
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

  import {setStore, getStore, removeStore} from '@/config/mUtils'

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
          code: '',
          verStatus: null
        },
        data: {},
        client_id: 0,
        client_name: '',
        clientClass: '',
        clientType: '',
        nationality: '',
        city: '',
        mobile: '',
        email: '',
        clientCertificationId: 0,
        clientCertificationType: '',
        stat: '',
        remarkList: [],
        showHideOnBlur: false,
        remarkInfo: '',
        remarkInput: null,
        disabled: true,
        modifiedVal: ''
      }
    },
//    beforeRouteLeave (to, from, next) {
//      if (to.name === 'PerfectInfos') {
//        to.meta.keepAlive = false
//      }
//      next()
//    },
    mounted () {
      this.client_id = this.$route.params.id
//      console.log(this.client_id)
      checkCustomerRemarks(this.client_id).then(res => {
        if (res.status === 200) {
          if (res.data.length > 0) {
            this.remarkList = res.data
          }
        }
      })
      checkCusomersDetail(this.client_id).then(res => {
        if (!JSON.parse(getStore('selfInfos'))) {
          let selfInfos = Object.assign({}, res.data)
          setStore('selfInfos', selfInfos)
        }
        this.data = res.data
        this.client_name = res.data.name
        this.mobile = res.data.mobile
        this.email = res.data.email
        this.nationality = res.data.nationality
        this.clientCertificationType = res.data.certification_type
        this.city = res.data.city
        this.clientClass = res.data.client_class
        this.clientType = res.data.client_type
        if (res.data.mobile_validated === '1') {
            this.verificate.verStatus = '1'
        }
        switch (res.data.certification_status) {
          case '0':
            this.stat = '未认证'
            break
          case '1':
            this.stat = '待审核'
//            this.modifiedVal = '修改'
            break
          case '2':
            this.stat = '已认证'
            this.modifiedVal = '修改'
            break
          case '3':
            this.stat = '已驳回'
            this.modifiedVal = '修改'
        }
      })
    },
    methods: {
      hideVerBox () {
        this.verificate.isShow = this.verificate.isTimeout = false
        clearInterval(this.verificate.timer)
        this.verificate.num = 60
        let params = {
          code: this.verificate.code,
          mobile: this.mobile
        }
        confirmVercode(params).then(res => {
          if (res.status === 200) {}
        })
      },
      sendVerCode () {
        this.verificate.isShow = this.verificate.isTimeout = true
        let params = {
          mobile: this.mobile
        }
        sendVerCode(params).then(res => {
          if (res.status === 200) {
            console.log(res)
//            this.verificate.isTimeout = false
//            this.verificate.num = 60
//            clearInterval(this.verificate.timer)
          }
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
      toLink1 () {
        removeStore('selfInfos')
        this.$router.replace({name: 'CustomerList'})
      },
      toLink () {
        let params = {
          id: this.client_id,
          name: this.client_name,
          nationality: this.nationality,
          mobile: this.mobile,
          city: this.city,
          clientClass: this.clientClass,
          clientType: this.clientType
        }
//        console.log(params)
        this.$router.push({name: 'PerfectInfos', params: params})
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
        this.remarkList.push({
          remark: this.remarkInfo.trim(),
          create_time: dateFormat(new Date(), 'yyyy-MM-dd')
        })

        let params = {
          remark: this.remarkInfo,
          client_name: this.client_name
        }
        addCustomerRemarks(this.client_id, params).then(res => {
          if (res.status === 200) {
            this.remarkInfo = ''
          }
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
    /*.verificate {*/
      /*display: inline-block;*/
      /*height: 40px;*/
      /*line-height: 40px;*/
      /*background-color: #2672ba;*/
      /*color: #f0f0f0;*/
      /*width: 140px;*/
      /*font-size: 22px;*/
      /*text-align: center;*/
      /*border-radius: 10px;*/
      /*vertical-align: middle;*/
    /*}*/
    /*.msg_dialog {*/
      /*.weui-dialog {*/
        /*width: 580px;*/
        /*height: 330px;*/
        /*background: #FFFFFF;*/
        /*border-radius: 10px;*/
        /*top: 50% !important;*/
        /*left: 50% !important;*/
        /*transform: translate(-50%, -50%);*/
        /*padding: 0;*/
        /*text-align: center;*/
        /*.weui-btn.weui-btn_primary {*/
          /*display: inline-block;*/
          /*background: #2A7DC1;*/
          /*border-radius: 10px;*/
          /*width: 190px;*/
          /*height: 80px;*/
          /*font-family: PingFangSC-Medium;*/
          /*font-size: 36px;*/
          /*color: #F0F0F0;*/
        /*}*/
        /*.msg_title {*/
          /*color: #333;*/
          /*font-size: 30px;*/
          /*margin: 30px auto;*/
        /*}*/
        /*.msg_ipt {*/
          /*font-size: 30px;*/
          /*color: #333;*/
          /*text-align: center;*/
          /*border-color: #999;*/
          /*border-radius: 10px;*/
          /*display: block;*/
          /*margin: 0 auto;*/
          /*width: 300px;*/
          /*height: 60px;*/
          /*margin-bottom: 30px;*/
        /*}*/
      /*}*/
    /*}*/
    .no_bbottom .weui-cells::after {
      content: none;
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
    .callout {
      display: block;
      margin: 70px auto 12px;
      width: 710px;
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
      /*padding-bottom: 120px;*/
      background-color: #fff;
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
          color: #333;
        }
        span.mobile_number {
          width: calc(100% - 180px);
          text-align: right;
          color: #666;
        }
      }
      .mobile_box.limit_width {
        display: inline-block;
        width: 555px;
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

  .space {
    width: 100%;
    height: 20px;
    background-color: #eee;
  }
</style>
