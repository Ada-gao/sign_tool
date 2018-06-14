<template>
  <div>
    <x-header :left-options="{backText: ''}">客户详情</x-header>
    <div class="wrapper">
      <div class="info">
        <group>
          <cell-box style="color: #2672ba;">
            <i class="iconfont">&#xe62c;</i>客户信息
            <span class="fr" style="color:#333;">{{investorType}}</span>
          </cell-box>
        </group>
        <div class="space"></div>
        <group>
          <cell-box>
            <label for="name">客户姓名：</label>
            <span class="fr">{{data.name}}</span>
          </cell-box>
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
          <cell-box v-show="data.nationality === '中国'">
            <label for="email">常住中国城市：</label>
            <span class="fr">{{data.city}}</span>
          </cell-box>
        </group>
        <div class="space"></div>
        <group class="no_bbottom">
          <cell-box>
            <label>证件类型：</label>
            <span
              class="fr"
              v-if="data.id_type ==='0'"
            >身份证</span>
            <span
              class="fr"
              v-if="data.id_type ==='1'"
            >护照</span>
            <span
              class="fr"
              v-if="data.id_type ==='2'"
            >军官证</span>
            <span
              class="fr"
              v-if="data.id_type ==='3'"
            >台胞证</span>
            <span
              class="fr"
              v-if="data.id_type ==='4'"
            >港澳通行证</span>
            <span
              class="fr"
              v-if="data.id_type ==='5'"
            >其他</span>
          </cell-box>
          <cell-box>
            <label>证件号码：</label>
            <span class="fr">{{data.id_no}}</span>
          </cell-box>
          <cell-box>
            <label>地址：</label>
            <span class="fr">{{data.city}}</span>
          </cell-box>
        </group>
        <a :href="'tel:'+data.client_id" class="callout">拨打客户电话</a>
      </div>
      <div class="space1"></div>
      <div class="product">
        <group>
          <cell
            is-lilnk
            :link="'/purchasedProducts/'+clientId"
            value-align="left"
            title="已购买产品"
          >
          </cell>
          <div class="space1"></div>
          <cell
            is-link
            :link="{name: 'Certified',params: {type: clientType}}"
            :title="'投资者类型：'+stat"
            value="修改"
          >
          </cell>
          <div class="space1"></div>
          <cell is-link
                :link="{name: 'BankcardInfos', params: {id: clientId}}"
                title="银行卡信息"
          ></cell>
          <div class="space1"></div>
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
              class="iconfont icon-view"></i>&nbsp;查看
            </router-link>
          </li>
        </ul>
        <div class="space"></div>
      </div>
      <div class="bottom-remark">
        <div class="add clearfix" @click="addNew">新增备注</div>
      </div>
      <x-dialog v-model="showHideOnBlur" class="add_remark_x" hide-on-blur>
        <textarea ref="textarea" class="add_remark_t" v-model="remarkInfo"></textarea>
        <button @click="submitAddNew" class="add_remark_btn">新增备注</button>
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
    XTextarea,
    TransferDomDirective as TransferDom,
    CellFormPreview
  } from 'vux'
  import {
    checkCusomersDetail,
    checkCustomerRemarks,
    addCustomerRemarks
  } from '@/service/api/customers'

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
        remarkInfo: null,
        remarkInput: null
      }
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
        this.clientId = res.data.client_id
        this.clientName = res.data.name
        this.clientType = res.data.client_type
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
        this.$router.push({name: 'NewCustomer', params: {isMod: 1}})
      },
      toLink1 () {
        this.$router.push({name: 'ProductDetail', params: {id: 1}})
      }
    }
  }
</script>

<style scoped lang="less">
  .wrapper {
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
      background-color: #fff;
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
</style>
