<template>
  <div>
    <x-header :left-options="{backText: '',preventGoBack:true}"
              @on-click-back="toLink1">潜客详情</x-header>
    <div class="potential">
      <div class="info">
        <group>
          <cell-box>
            <i class="iconfont">&#xe62c;</i>潜客信息
            <span class="fr"
                  @click="toLink"
                  v-if="data.realname_status === '0'">完善信息</span>
            <span class="fr" v-else>已完善</span>
          </cell-box>
        </group>
        <div class="space"></div>
        <group>
          <cell-box>
            <label>客户姓名：</label>
            <span class="fr">{{data.name}}</span>
          </cell-box>
          <cell-box>
            <label>国籍：</label>
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
            <label>常驻中国城市：</label>
            <span class="fr">{{data.city}}</span>
          </cell-box>
        </group>
        <div class="space"></div>
        <group class="no_bbottom">
          <cell-box>
            <label>邮箱：</label>
            <span class="fr">{{data.email}}</span>
          </cell-box>
          <cell-box>
            <label>手机号：</label>
            <span class="fr">{{data.mobile}}</span>
          </cell-box>
        </group>
      </div>
      <div class="space"></div>
      <div class="product">
        <group>
          <cell
            is-link
            :link="{name: 'Certified',params: {
                 id: clientId,
                 email: email,
                 name: clientName}}"
            :title="'投资者类型：'+stat"
            :value="modifiedVal"
            :disabled="convert(data.realname_status, disabled)"
          >
          </cell>
        </group>
      </div>
      <div class="space"></div>
      <div class="space"></div>
      <div class="remark">
        <group>
          <cell-box>备注</cell-box>
        </group>
        <ul>
          <li v-for="(item, index) in remarkList" :key="index">
            <div class="iText text-overflow-one">{{item.remark}}</div>
            <span class="iTime">{{item.create_time}}</span>
            <router-link class="view fr" :to="{name: 'WriteNotes', params: {remark: item.remark}}"><i class="iconfont icon-view"></i>&nbsp;查看</router-link>
          </li>
        </ul>
        <div class="space"></div>
      </div>
      <div class="bottom-remark">
        <div class="add clearfix">
          <input type="text" @click="addNew" class="addInput" v-model="remarkInput" placeholder="新增备注"/>
        </div>
      </div>
      <div v-transfer-dom>
        <x-dialog v-model="showHideOnBlur" class="dialog-demo" hide-on-blur>
          <div class="img-box">
            <textarea v-focus id="inputing" name="" rows="" cols="" v-model="remarkInfo"></textarea>
          </div>
          <div style="text-align: right;">
            <button @click="submitAddNew" class="btn btn-primary vux-emit">新增备注</button>
          </div>
        </x-dialog>
      </div>
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
    TransferDomDirective as TransferDom,
    CellFormPreview
  } from 'vux'
  import {checkCusomersDetail, perfectInfos, addCustomerRemarks, checkCustomerRemarks} from '@/service/api/customers'

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
      CellFormPreview
    },
    data () {
      return {
        data: {},
        clientId: 0,
        clientName: '',
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
        remarkInfo: null,
        remarkInput: null,
        disabled: true,
        modifiedVal: ''
      }
    },
    beforeRouteLeave (to, from, next) {
      let obj = {}
      obj.client_id = this.clientId
      obj.client_name = this.clientName

      perfectInfos(obj).then(res => {
        if (res.status === 200) {
          to.params.clientCertificationId = res.data.client_certification_id
          next()
        }
      })
    },
    mounted () {
      if (this.showHideOnBlur) {
        document.getElementById('inputing').focus()
      }
      checkCustomerRemarks().then(res => {
          if (res.status === 200) {
              this.remarkList = res.data
          }
      })
      this.clientId = this.$route.params.id
      checkCusomersDetail(this.clientId).then(res => {
        this.data = res.data
        this.clientName = res.data.name
        this.mobile = res.data.mobile
        this.email = res.data.email
        this.nationality = res.data.nationality
        this.clientCertificationType = res.data.certification_type
        this.city = res.data.city
        this.clientClass = res.data.client_class
        this.clientType = res.data.client_type
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
            this.$router.replace({name: 'CustomerList'})
        },
      toLink () {
        let params = {
          id: this.clientId,
          name: this.clientName,
          nationality: this.nationality,
          mobile: this.mobile,
          city: this.city,
          clientClass: this.clientClass,
          clientType: this.clientType
        }
        console.log(params)
        this.$router.push({name: 'PerfectInfos', params: params})
      },
      addNew () {
        this.showHideOnBlur = true
        document.getElementById('inputing').focus()
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
          text: this.remarkInfo.trim(),
          time: dateFormat(new Date(), 'yyyy-MM-dd')
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
    padding-top: 108px;
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
      padding-bottom: 120px;
      .weui-cells .weui-cell {
        border-bottom: 1px solid #979797;
      }
      .weui-cells .weui-cell i {
        font-size: 32px; /*px*/
      }
      ul {
        padding-bottom: 20px;
        li {
          padding: 20px 120px 0 68px;
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
  }

  .weui-cells {
    .weui-cell {
      height: 80px;
      line-height: 80px;
      box-sizing: border-box;
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
    height: 10px;
    background-color: #eee;
  }
</style>
