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
        <input maxlength="6" class="pop_right" type="text" placeholder="请输入验证码" v-model="verificate.code">
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
    <x-header :left-options="{backText: '', preventGoBack:true}"
              @on-click-back="toLink">{{topTitle}}</x-header>
    <div class="potential wrapper">
      <div class="fix_mobile">
        <i class="iconfont">&#xe600;</i>
        <a :href="'tel:'+data.mobile"></a>
      </div>
      <group class="client_info">
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
          <div class="bb"></div>
          <div class="cell_box">
            <span class="cell_left">录入时间：</span>
            <span class="cell_right">{{data.create_time}}</span>
          </div>
        </section>
      </group>
      <div v-if="data.mobile_validated === '0'">
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
        <group v-if="data.mobile_validated === '0' && data.realname_status !== '0'">
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
              <!--<i v-if="data.certification_status === '0'">-->
                <!--{{clickArrowObj.cerObj.type}} {{data.risk_level}}-->
              <!--</i>-->
              <!--<i v-if="data.certification_status === '1'">-->
                <!--{{clickArrowObj.cerObj.type}} {{data.risk_level}}-->
              <!--</i>-->
              <!--<i v-if="data.certification_status === '2'">-->
                <!--{{clickArrowObj.cerObj.type}} {{data.risk_level}}-->
              <!--</i>-->
              <!--<i v-if="data.certification_status === '3'">-->
                <!--{{clickArrowObj.cerObj.type}} {{data.risk_level}}-->
              <!--</i>-->
              <i>{{clickArrowObj.cerObj.type}} {{data.risk_level}}</i>
            </span>
            <span class="cell_right">
              <i v-if="data.certification_status === '0'"
                  class="no_certy">{{clickArrowObj.cerObj.stat}}</i>
              <i v-if="data.certification_status === '1'"
                  class="wait_certy">{{clickArrowObj.cerObj.stat}}</i>
              <i v-if="data.certification_status === '2'"
                  class="success_certy">{{clickArrowObj.cerObj.stat}}</i>
              <i v-if="data.certification_status === '3' || data.certification_status === '4'"
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
          <!-- <input class="add_remark" placeholder="输入备注信息..." v-model="remarkInfo"/>
          <button @click="submitAddNew">添加备注</button> -->
          <div class="edit-remark">
            <input class="add_remark" placeholder="输入备注信息..." v-model="remarkInfo"/>
            <span @click="submitAddNew" class="submit-remark">提交</span>
          </div>
        </group>
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
  import RemarkList from '@/base/remarkList/index'
  export default {
    name: 'PotentialCustomerList',
    directives: {
      TransferDom
    },
    components: {
      RemarkList,
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
            this.remarkList = JSON.parse(JSON.stringify(res.data))
            this.remarkList.forEach((item, index) => {
              item.flag = false
              item.expand = false
            })
          }
        }
      })
      checkCusomersDetail(this.client_id).then(res => {
        let selfInfos = Object.assign({}, res.data)
        setStore('selfInfos', selfInfos)
        this.data = Object.assign({}, res.data)
        this.data.id_type = tfIdtype(this.data.id_type)
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
      getRemarks (id) {},
      getList (id) {
        checkCusomersDetail(this.client_id).then(res => {
          let selfInfos = Object.assign({}, res.data)
          setStore('selfInfos', selfInfos)
          this.data = Object.assign({}, res.data)
          this.data.id_type = tfIdtype(this.data.id_type)
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
      },
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
        console.log('ggggg....')
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
        width: 87%;
        margin: 0 auto;
        box-sizing: border-box;
        margin-top: 30px;
        border: 1px solid #B8B8B8;/*no*/
        border-radius: 4px;/*no*/
        height: 75px;
        line-height: 75px;
        padding-left: 20px;
        font-size: 24px;
      }
      .submit-remark{
        font-size: @font-size-thirty;/*px*/
        color: @font-color-blue;
      }
    }
  }
  .mobile_popup {
    border-radius: 8px;
    width: 74.67%;
    padding-top: 34px;
    font-family: @font-family-R;
    font-size: 26px;
    color: #4A4A4A;
    .pop_validate,
    .pop_mobile {
      padding: 0 30px;
      .pop_right {
        font-family: @font-family-M;
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
        font-size: 32px;
      }
      span:nth-of-type(1) {
        color: #9B9B9B;
        border-right: 1px solid #D2D3D5;/*no*/
        box-sizing: border-box;
      }
      span:nth-of-type(2) {
        color: @new-font-color;
      }
    }
  }
</style>
