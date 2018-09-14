<template>
  <ul class="remark_cont" ref="remarkUl">
    <li v-for="(item, index) in remarkList" :key="index">
      <div :class="{overflow: item.flag}">
        {{item.remark}}
      </div>
      <p class="expand"
         @click="handlerExpand(item, index)">
        <i class="arrow_down"></i><span>展开</span>
        <!--<i class="iconfont">&#xe601;</i><span>展开</span>-->
      </p>
      <div>{{item.create_time}}</div>
    </li>
  </ul>
</template>

<script>

export default {
	name: 'RemarkList',
	props: ['list'],
  data () {
  	return {
  	  remarkList: null
  	}
  },
  watch: {
	  'list': {
	    handler (n, o) {
	      this.setList()
      },
      deep: true
    }
  },
  updated () {
    this.$nextTick(() => {
      let tempArr = Array.from(this.$refs.remarkUl.querySelectorAll('li'))
      let standard
      if (this.$refs.remarkUl.querySelectorAll('li')[0]) {
        standard = parseInt(window.getComputedStyle(this.$refs.remarkUl.querySelectorAll('li')[0].querySelectorAll('div')[0], null)['line-height'].split('px')[0])
      }
      tempArr.forEach((item, index) => {
        if (item.querySelectorAll('div')[0].offsetHeight > standard) {
          this.remarkList[index].flag = true
          let obj = {
            index,
            flag: this.remarkList[index].flag
          }
          this.$emit('handlerFlag', obj)
          item.querySelectorAll('div')[0].classList.add('overflow')
        }
      })
    })
  },
  mounted () {
	  this.setList()
  },
  methods: {
	  setList () {
	    this.remarkList = Object.assign([], this.list) || []
    },
    handlerExpand (item, index) {
      let tempArr = Array.from(this.$refs.remarkUl.querySelectorAll('li'))
      let obj = {
        index,
        expand: item.expand
      }
      if (!item.expand) {
        tempArr[index].querySelectorAll('div')[0].classList.remove('overflow')
        tempArr[index].querySelector('p').querySelector('i').classList.remove('arrow_down')
        tempArr[index].querySelector('p').querySelector('i').classList.add('arrow_up')
        tempArr[index].querySelectorAll('div')[0].classList.add('auto')
        tempArr[index].querySelector('p').querySelector('span').innerText = '收起'
        obj.expand = true
      } else {
        tempArr[index].querySelectorAll('div')[0].classList.remove('auto')
        tempArr[index].querySelectorAll('div')[0].classList.add('overflow')
        tempArr[index].querySelector('p').querySelector('i').classList.remove('arrow_up')
        tempArr[index].querySelector('p').querySelector('i').classList.add('arrow_down')
        tempArr[index].querySelector('p').querySelector('span').innerText = '展开'
        obj.expand = false
      }
      this.$emit('handlerExpand', obj)
    }
  }
}
</script>

<style lang="less">
</style>
