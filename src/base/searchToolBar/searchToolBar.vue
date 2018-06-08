<template>
  <div class="search" :class="{cancelSearch: isCancel}">
		<input class="ipt" type="text"
			v-model.trim="searchKey"
			placeholder="搜索  客户名 手机号码"
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
    },
    clickEvent () {
      this.isCancel = true
      let data = {
        _search: this.searchKey,
        isCancel: this.isCancel
      }
      this.$emit('searchHandler', data)
    }
  }
}
</script>

<style scoped lang="less">
.search {
  /*padding-top: 108px;*/
  text-align: center;
  background-color: #fff;
  height: 110px;
	.ipt {
		border: 1px solid #ccc; /*no*/
    padding-left: 32px;
		border-radius: 10px;
		width: 665px;
		height: 70px;
		box-sizing: border-box;
		font-size: 28px; /*px*/
    margin-top: 20px;
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
		width: 549px;
	}
	.btn-cancel {
		display: inline-block;
	}
}
</style>
