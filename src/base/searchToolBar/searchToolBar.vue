<template>
  <div class="search" :class="{cancelSearch: isCancel}">
    <span class="iconfont icon_search">&#xe609;</span>
		<input class="ipt" type="text"
			v-model.trim="searchKey"
			placeholder="输入客户姓名或手机号码搜索"
			@click="clickEvent"
			@input="searchEvent"/>
		<button class="btn-cancel" @click="cancelSearchEvent">取消</button>
	</div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      searchKey: '',
      timer: null,
      isCancel: null
    }
  },
  methods: {
    searchEvent () {
      this.clearTimer()
      let data = {
        _search: this.searchKey,
        isCancel: this.isCancel
      }
      if (this.searchKey && this.searchKey.length > 0) {
        this.timer = setTimeout(() => {
          this.$emit('searchHandler', data)
        }, 900)
      } else {
        this.$emit('searchHandler', data)
      }
    },
    clearTimer () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    cancelSearchEvent () {
			this.isCancel = false
      this.searchKey = ''
      let data = {
        _search: this.searchKey,
        isCancel: this.isCancel
      }
      this.$emit('searchHandler', data)
      this.$emit('cancel', this.isCancel)
    },
    clickEvent () {
      this.isCancel = true
      let data = {
        _search: this.searchKey,
        isCancel: this.isCancel
      }
      this.$emit('ensure', this.isCancel)
      this.$emit('searchHandler', data)
    }
  }
}
</script>

<style scoped lang="less">
.search {
  /*padding-top: 108px;*/
  text-align: center;
  /*background-color: #fff;*/
  /*height: 110px;*/
  height: 60px;
  line-height: 60px;
  position: relative;
  margin-top: 12px;
  .icon_search {
    font-size: 26px;
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #fff;
    opacity: 0.4;
  }
	.ipt {
		border: none; /*no*/
    padding-left: 50px;
		border-radius: 100px;
		width: 100%;
    height: 100%;
		/*height: 70px;*/
		box-sizing: border-box;
		font-size: 28px; /*px*/
    vertical-align: bottom;
    background: rgba(255, 255, 255, .1);
    /*margin-top: 20px;*/
	}
	.btn-cancel {
		outline: none;
		background-color: #fff;
		color: #0083c5;
		font-size: 28px; /*px*/
		display: none;
		letter-spacing: 12px;
		margin-left: 30px;
	}
}
.cancelSearch {
	.ipt {
		width: 70%;
    color: #fff;
    border: none;
	}
	.btn-cancel {
		display: inline-block;
	}
}
</style>
