<template>
		<div v-html="ruleData"></div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ['msg', 'searchValue'],
  computed: {
    ruleData () {
      let titleString = ''
      let cont = ''
      if (this.msg.name.indexOf(this.searchValue) > -1) {
        titleString = this.msg.name
        cont = this.msg.mobile
      } else if (this.msg.client_no.indexOf(this.searchValue) > -1) {
        titleString = this.msg.client_no
        cont = this.msg.name
      } else {
        titleString = this.msg.mobile
        cont = this.msg.name
      }
      if (!titleString) {
        return ''
      }
      if (this.searchValue && this.searchValue.length > 0) {
        // 匹配关键字正则
        let replaceReg = new RegExp(this.searchValue, 'g')
        // 高亮替换v-html值
        let replaceString = '<span style="color: #FF4747">' + this.searchValue + '</span>'
        // 开始替换
        titleString = titleString.replace(replaceReg, replaceString)
        titleString = '<span style="width: 50%; display: inline-block">' + titleString + '</span>'
        cont = '<span style="width: 50%">' + cont + '</span>'
      }
      return titleString + ' ' + cont
    }
  }
}
</script>

<style scoped lang="less">
.search-text {
	color: #FF4747;
}
</style>
