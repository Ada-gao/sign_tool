<template>
	<div>
		<x-header v-if="isMod==0" :left-options="{backText: ''}">新建客户</x-header>
		<x-header v-if="isMod==1" :left-options="{backText: ''}">修改资料</x-header>
		<group class="main">
      <x-input title="姓名:" placeholder="输入客户姓名" ref="input01" required></x-input>
      <x-input title="国籍:" isASelection=true @selectOne="selectNation" placeholder="输入客户年龄" ref="input02" required></x-input>
      <x-input title="电话:" placeholder="输入客户手机号码" ref="input03" required></x-input>
      <x-input title="邮箱:" placeholder="输入客户邮箱" ref="input03" required></x-input>
    </group>
    <div class="btn_wrap">
        <router-link class="next" to="/customerList">确定</router-link>
      </div>
	</div>
</template>

<script>
import { XHeader, Group, XInput, XButton } from 'vux'

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
      isMod: -1
  	}
  },
  mounted () {
    this.isMod = this.$route.params.num
  },
  methods: {
    selectNation (num) {
      this.num = num
      console.log(this.num)
    }
  }
}
</script>

<style scoped lang="less">
.main {
  padding-top: 126px;
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
}
.btn_wrap {
  padding: 0 37px;
  margin-top: 2rem;
  position: fixed;
  width: 100%;
  bottom: 30px;
  .next {
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
