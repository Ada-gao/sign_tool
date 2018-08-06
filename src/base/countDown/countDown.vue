<template>
    <span>{{time}}</span>
</template>
<script>
export default {
	data () {
		return {
			timeCnt: '',
			timer: null
			// time: null
		}
	},
	name: 'counter',
	props: ['timeCount'],
	computed: {
		'time': function () {
			return this.formate(this.timeCnt)
		}
	},
	methods: {
		prefix (num, n) {
			var len = num.toString().length
			while (len < n) {
					num = '0' + num
					len++
			}
			return num
		},
		formate (val) {
			let h = Math.floor(val / 60 / 60)
			let m = Math.floor((val - h * 60 * 60) / 60)
			let s = Math.floor((val - h * 60 * 60 - m * 60))
			h = this.prefix(h, 2)
			m = this.prefix(m, 2)
			s = this.prefix(s, 2)
			return h + ':' + m + ':' + s
		}
	},
	created () {
		this.timeCnt = this.timeCount
		this.timer = setInterval(() => {
			--this.timeCnt
			if (Number(this.timeCnt) === 0) {
				this.timer = null
				clearInterval(this.timer)
			}
		}, 1000)
	}
}
</script>
<style lang="less">

</style>
