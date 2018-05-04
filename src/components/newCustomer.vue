<template>
	<div>
		<x-header v-if="isMod==0" :left-options="{backText: ''}">新建客户</x-header>
		<x-header v-if="isMod==1" :left-options="{backText: ''}">修改资料</x-header>
		<group class="wrapper">
      <x-input title="姓名:" v-model="name" placeholder="输入客户姓名" ref="input01" :show-clear="false" is-type="china-name" required></x-input>
      <x-input title="国籍:" v-model="nationality" isASelection=true @selectOne="selectNation" placeholder="输入客户年龄" ref="input02" :show-clear="false" required></x-input>
      <x-input title="电话:" v-model="mobile" placeholder="输入客户手机号码" ref="input03" :max='13' mask="999 9999 9999" is-type="china-mobile" :show-clear="false" required></x-input>
      <x-input title="邮箱:" v-model="email" placeholder="输入客户邮箱" ref="input03" is-type="email" :show-clear="false" required></x-input>
    </group>
    <div class="btn_wrap">
      <button class="next" @click="submitCustomer">确定</button>
    </div>
	</div>
</template>

<script>
import { XHeader, Group, XInput, XButton } from 'vux'
import { addCusomer } from '@/service/api/customers'

export default {
	name: 'NewCustomer',
  components: {
    XHeader,
    Group,
    XInput,
    XButton
  },
  data () {
  	return {
      num: 1,
      isMod: -1,
      name: '',
      nationality: '',
      mobile: '',
      email: ''
  	}
  },
  mounted () {
    this.isMod = Number(this.$route.params.isMod)
    console.log(this.isMod)
    if (this.isMod === 1) {
      console.log('需要获取数据')
    }
  },
  methods: {
    selectNation (num) {
      this.num = num
      console.log(this.num)
    },
    submitCustomer () {
      let params = {
        name: this.name,
        nationality: this.num === 1 ? '中国' : '其他',
        mobile: this.mobile,
        email: this.email
      }
      if (this.isMod === 0) {
        addCusomer(params).then(res => {
          console.log(res)
          if (res.status === 200) {
            this.$router.push({name: 'CustomerList'})
          }
        })
      } else {
        this.$router.push({name: 'CustomerManagement', params: {id: 1}})
      }
    }
  }
}
</script>

<style scoped lang="less">
.wrapper {
  // padding-top: 126px;
  .weui-cells .vux-x-input {
    height: 113px;
    box-sizing: border-box;
    button {
      width: 138px;
      height: 62px;
      font-size: 28px;
      background-color: #eee;
      color: #666;
      border-radius: 10px;
    }
  }
  .vux-x-input.weui-cell:before {
    border-top: 1px solid #D9D9D9; /*no*/
  }
  // .weui-cell:after {
  //   border-bottom: 1px solid #D9D9D9; /*no*/
  // }
}
.btn_wrap {
  padding: 0 37px;
  margin-top: 2rem;
  position: fixed;
  width: 100%;
  bottom: 30px;
  .next {
    text-decoration: none;
    border-radius: 60px;
    background-color: #3693E0;
    width: 644px;
    height: 88px;
    box-sizing: border-box;
    display: inline-block;
    text-align: center;
    color: #fff;
    line-height: 88px;
    font-size: 32px; /*px*/
    letter-spacing: 20px;
    cursor: pointer;
  }
}
</style>
