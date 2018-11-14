<template>
  <div class="bankcard_infos">
    <x-header :left-options="{backText: ''}">客户认证</x-header>
    <div class="wrapper">
      <group>
        <cell-box class="info_cell">
          <label>持卡人：</label>
          <span class="fr">{{data.name}}</span>
        </cell-box>
        <cell-box class="info_cell">
          <label>开户银行：</label>
          <span class="fr">{{data.bank_name}}</span>
        </cell-box>
        <cell-box class="info_cell">
          <label>支行：</label>
          <span class="fr">{{data.sub_branch_name}}</span>
        </cell-box>
        <cell-box class="info_cell">
          <label>银行卡号：</label>
          <span class="fr">{{data.card_no}}</span>
        </cell-box>
      </group>
      <div class="space"></div>
      <div class="img_box">
        <div class="title">银行卡照片：</div>
        <div class="img">
          <img :src="data.card_front_url" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {XHeader, Group, CellBox} from 'vux'
    import {checkCustomerBankDetail} from '@/service/api/customers'
  export default {
    components: {
      XHeader,
      Group,
      CellBox
    },
    data () {
      return {
        data: [],
        clientId: ''
      }
    },
    mounted () {
      this.clientId = this.$route.params.id
      checkCustomerBankDetail(this.clientId).then(res => {
          if (res.status === 200) {
            this.data = res.data[0]
//            console.log(this.data)
          }
      })
    },
    methods: {}
  }
</script>
<style lang="less">
  .space {
    height: 20px;
    background-color: #f5f5f5;
  }

  .fr {
    position: absolute;
    right: 20px;
  }

  .weui-cells .weui-cell.info_cell {
    height: 82px;
    line-height: 82px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #ddd;
    label {
      color: #333;
    }
  }
  .img_box {
    background-color: #fff;
    .title {
      height: 82px;
      line-height: 82px;
      font-size: 30px;
      color: #333;
      padding-left: 40px;
      border-bottom: 1px solid #dfdfdf;
    }
    .img {
      text-align: center;
      img {
        display: inline-block;
        width: 270px;
        height: 180px;
        margin: 49px 0;
      }
    }
  }
</style>
