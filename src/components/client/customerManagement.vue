<template>
  <div class="customerManagement">
    <x-header :left-options="{backText: '', preventGoBack:true}"
              @on-click-back="toLink">客户详情</x-header>
    <div class="wrapper">
      <div class="fix_mobile">
        <i class="iconfont">&#xe600;</i>
        <a :href="'tel:'+data.mobile"></a>
      </div>
      <group class="client_info">
        <div class="space"></div>
        <cell :arrow-direction="showCont1 ? 'up' : 'down'"
              :border-intent="false"
              title="客户信息"
              class="bl_box"
              @click.native="showCont1 = !showCont1"
              is-link>
          <i slot="icon" class="border_left"></i>
        </cell>
        <section v-if="showCont1">
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
              <span class="success_certy">(已验证)</span>
            </span>
          </div>
          <div class="bb"></div>
          <div class="cell_box">
            <span class="cell_left">录入时间：</span>
            <span class="cell_right">{{data.create_time}}</span>
          </div>
          <div class="bb"></div>
          <div class="cell_box">
            <span class="cell_left">资产管理规模：</span>
            <span class="cell_right">{{data.asset_amount ? data.asset_amount + '万' : ''}}</span>
          </div>
        </section>
      </group>
      <group class="certify_info" v-if="data.realname_status !== '0'">
        <div class="space"></div>
        <cell :arrow-direction="showCont2 ? 'down' : 'up'"
              :border-intent="false"
              title="证件信息"
              class="bl_box"
              @click.native="showCont2 = !showCont2"
              is-link>
          <i slot="icon" class="border_left"></i>
        </cell>
        <section v-if="!showCont2">
          <div v-if="data.realname_status === '2'">
            <div class="cell_box">
              <span class="cell_left">证件类型：</span>
              <span class="cell_right">{{data.id_type}}</span>
            </div>
            <div class="bb"></div>
            <div class="cell_box">
              <span class="cell_left">证件号码：</span>
              <span class="cell_right">{{data.id_no}}</span>
            </div>
            <div class="bb"></div>
            <div class="cell_box">
              <span class="cell_left">证件有效起始时间：</span>
              <span class="cell_right">{{data.id_start_date}}</span>
            </div>
            <div class="bb"></div>
            <div class="cell_box">
              <span class="cell_left">证件有效结束时间：</span>
              <span class="cell_right">{{data.id_expiration}}</span>
            </div>
            <div class="bb"></div>
            <div class="cell_box">
              <span class="cell_left">出生日期：</span>
              <span class="cell_right">{{data.birthday}}</span>
            </div>
            <div class="bb"></div>
            <div class="cell_box">
              <span class="cell_left">地址：</span>
              <span class="cell_right">{{data.address}}</span>
            </div>
          </div>
        </section>
      </group>
      <group v-if="data.realname_status !== '0'">
        <div class="space"></div>
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
              <i v-if="data.certification_status === '0'">
                {{clickArrowObj.cerObj.type}} {{data.risk_level}}
              </i>
              <i v-if="data.certification_status === '1'">
                {{clickArrowObj.cerObj.type}} {{data.risk_level}}
              </i>
              <i v-if="data.certification_status === '2'">
                {{clickArrowObj.cerObj.type}} {{data.risk_level}}
              </i>
              <i v-if="data.certification_status === '3'">
                {{clickArrowObj.cerObj.type}} {{data.risk_level}}
              </i>
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
          <div class="cell_left">银行卡信息</div>
          <div class="cell_right">
            <span>查看</span>
            <i class="iconfont right_icon">&#xe8d5;</i>
          </div>
        </div>
        <div class="bb"></div>
        <div class="cell_box" @click="handlerPd">
          <div class="cell_left">客户已购买产品</div>
          <div class="cell_right">
            <span>查看</span>
            <i class="iconfont right_icon">&#xe8d5;</i>
          </div>
        </div>
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
        <cell :arrow-direction="showCont3 ? 'up' : 'down'"
              :border-intent="false"
              title="备注"
              class="bl_box"
              @click.native="showCont3 = !showCont3"
              is-link>
          <i slot="icon" class="border_left"></i>
        </cell>
        <section v-if="showCont3">
          <remark-list :list="remarkList"
                       @handlerExpand="handlerExpand"
                       @handlerFlag="handlerFlag"></remark-list>
        </section>
        <!-- <div class="add_remark">输入备注信息...</div> -->
        <div class="edit-remark">
          <input class="add_remark" placeholder="输入备注信息..." v-model="remarkInfo"/>
          <span @click="submitAddNew" class="submit-remark">提交</span>
        </div>
      </group>
      <x-dialog v-model="showHideOnBlur" class="add_remark_x" hide-on-blur>
        <textarea id="textarea" class="add_remark_t" v-model="remarkInfo"></textarea>
        <button @click="submitAddNew" class="add_remark_btn">新增备注</button>
      </x-dialog>
    </div>
    <!--<x-dialog v-model="transformDialog" class="submitDialog">-->
      <!--<div class="tip">客户当前资产规模已到达{{data.asset_standard}}万<br/>-->
        <!--是否自动转变为专业投资者？</div>-->
      <!--<x-button type="primary" @click.native="transform">转 变</x-button>-->
      <!--<x-button type="primary" @click.native="cancel">取 消</x-button>-->
    <!--</x-dialog>-->
    <mt-popup v-model="transformDialog"
              class="mobile_popup"
              popup-transition="popup-fade">
      <div class="transfer_tit">转换确认</div>
      <div class="transfer_tip">客户当前资产规模已到达{{data.asset_standard}}万<br/>
        是否自动转变为专业投资者？</div>
      <div class="btns">
        <span class="cancel" @click="transformDialog = false">取消</span>
        <span class="ensure" @click="transform">确定</span>
      </div>
    </mt-popup>
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
  import {tfCtypeToText, tfCerIdToText, tfIdtype} from '@/common/js/filter'
  import {setStore, removeStore} from '@/config/mUtils'
  import RemarkList from '@/base/remarkList/index'

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
      CellFormPreview,
      RemarkList
    },
    data () {
      return {
        showCont1: false,
        showCont2: true,
        showCont3: true,
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
        if (res.status === 200) {
          if (res.data.length > 0) {
            this.remarkList = JSON.parse(JSON.stringify(res.data))
            this.remarkList.forEach((item, index) => {
              item.flag = false
              item.expand = false
            })
          }
        }
      })
      clientId === 0 ? (this.investorType = '普通投资者') : (this.investorType = '专业投资者')
      this.getList(clientId)
      window.onpopstate = () => {
        this.toLink()
      }
    },
    methods: {
      handlerFlag (data) {
        this.remarkList[data.index].flag = data.flag
      },
      handlerExpand (data) {
        this.remarkList[data.index].expand = data.expand
      },
      handlerPerfect () {
        if (!this.clickArrowObj.realnameObj.disabled) {
          this.$router.push({name: 'PerfectInfos'})
        }
      },
      handlerCerty () {
        if (!this.clickArrowObj.cerObj.disabled) {
          this.$router.push({name: 'Certified', params: {id: this.data.client_id}})
        }
      },
      handlerBank () {
        this.$router.push({name: 'BankList', params: {addCard: '1', id: this.data.client_id}})
      },
      handlerPd () {
        this.$router.push({name: 'PurchasedProducts', params: {id: this.clientId}})
      },
      getList (id) {
        checkCusomersDetail(id).then(res => {
          this.data = Object.assign({}, res.data)
          this.data.id_type = tfIdtype(this.data.id_type)
          setStore('selfInfos', res.data)
          this.data.asset_amount = this.data.asset_amount || 0
          this.data.create_time = new Date(this.data.create_time).toLocaleDateString().split('/').join('.')
          this.clientId = res.data.client_id
          this.clientName = res.data.name
          this.clientType = res.data.client_type
          if (this.data.asset_amount > this.data.asset_standard &&
            this.data.client_type !== '1' &&
            this.data.certification_status !== '1') {
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
      addNew () {
        this.showHideOnBlur = true
        // this.$refs.textarea.focus()
        this.$nextTick(function () {
          //          this.$refs.textarea.focus()
          document.getElementById('textarea').focus()
        })
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
          client_name: this.clientName
        }
        addCustomerRemarks(this.clientId, params).then(res => {
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
      },
      toLink () {
        this.$router.push({name: 'CustomerList', params: {mark: 0}})
      },
      transform () {
        this.$router.push({name: 'AutoTransfer', params: {id: this.clientId}})
      }
    }
  }
</script>

<style lang="less">
  @import '../../common/style/variable';
  .mobile_popup {
    top: 35%;
    border-radius: 8px;
    width: 74.67%;
    padding-top: 34px;
    font-family: @font-family-R;
    font-size: 26px;
    color: #4A4A4A;
    text-align: center;
    .transfer_tit {
      font-family: @font-family-M;
      font-size: 36px;
      color: #000000;
      margin-bottom: 15px;
    }
    .transfer_tip {
      font-family: @font-family-M;
      font-size: 30px;
      color: #888888;
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
        font-size: 32px;
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
  .customerManagement {
    background: #fff;
    font-family: @font-family-R;
    font-size: 30px;
    color: #4A4A4A;
    .cell_right {
      i {
        font-size: 30px;
        margin-right: 0;
      }
    }
    .remark {
      font-family: @font-family-R;
      color: #9B9B9B;
      padding-bottom: 30px;
      background: #fff;
      .edit-remark{
        margin: 0 40px;
        border-top: 1px solid #E9E9E9;/*no*/
      }
      .add_remark {
        width: 590px;
        margin: 0 auto;
        box-sizing: border-box;
        margin-top: 30px;
        border: 1px solid #B8B8B8;/*no*/
        border-radius: 4px;/*no*/
        height: 73px;
        line-height: 73px;
        padding-left: 20px;
        font-size: 24px;
      }
      .submit-remark{
        font-size: @font-size-thirty;/*px*/
        color: @font-color-blue;
      }
    }
  }
</style>
