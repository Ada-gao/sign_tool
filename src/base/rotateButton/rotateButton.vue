<template>
	<div id="icon" class="icon">
		<div class="wheel" ref="wheel"
			@touchstart='touchStart'
			@touchmove='touchMove'
			@touchend='touchEnd'
			:style="rotateEffect"
		>
			<div class="indicator"></div>
		</div>
		<span class="num">{{idx + 1}}</span>
		<div class="dots">
			<span class="dot" :class="{activeDot: index === idx}" v-for="(i, index) in 10" :key="index"></span>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			ox1: 376,
			oy1: 376,
			angle1: 0,
			angle2: 0,
			// lastX: 0,
			// lastY: 0,
			rotateEffect: '',
			activeDot: '',
			idx: 0
		}
	},
	mounted () {
	},
	methods: {
		touchStart (e) {
			e.preventDefault()
			let el = e.touches[0]
			let mx1 = el.clientX
			let my1 = el.clientY
			// 落点的角度  test
			this.angle1 = this.getAngle(this.ox1, this.oy1, mx1, my1)
			console.log('this.angle1: ' + this.angle1)
		},
		touchMove (e) {
			let el = e.touches[0]
			let mx2 = el.clientX
			let my2 = el.clientY
			this.angle2 = this.getAngle(this.ox1, this.oy1, mx2, my2)
			// this.rotateAngle = this.angle2 - this.angle1
			// console.log('this.angle2: ' + this.angle2)
			// this.$refs.wheel.style.transform = 'rotate(`${this.rotateAngle}deg`)'
			this.rotateEffect = 'transform:rotate(' + this.angle2 + 'deg)'
			this.idx = Math.round((this.angle2 - 18) / 36)

			// if (!this.lastX) {
				// 第二次继续旋转
				// this.rotateAngle += this.lastAngle
			// }
		},
		touchEnd (e) {
			// let el = e.changedTouches[0]
			// this.lastX = el.clientX
			// this.lastY = el.clientY
			// this.lastAngle = this.rotateAngle
		},
		getAngle (ox, oy, mx, my) {
			let x = Math.abs(ox - mx)
			let y = Math.abs(oy - my)
			let z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
			let cos = y / z
			let radian = Math.acos(cos) // 求弧度
			let angle = Math.floor(180 / (Math.PI / radian))

			if (mx > ox && my === oy) {
				// 在 X 的正轴
				angle = 90
			}
			if (mx > ox && my > oy) {
				// 第四象限
				angle = 180 - angle
			}
			if (mx === ox && my > oy) {
				// 在 Y 的负轴
				angle = 180
			}
			if (mx < ox && my < oy) {
				// 第二象限。。
				angle = 360 - angle
			}
			if (mx < ox && my === oy) {
				// 在 X 的负轴
				angle = 270
			}
			if (mx < ox && my > oy) {
				// 第三象限。。
				angle = 180 + angle
			}
			return angle
		}
	}
}
</script>

<style scoped lang="less">
.icon {
	width: 200px;
	height: 200px;
	border-radius: 50%;
	margin: 40px auto;
	background-color: #eee;
	// overflow: hidden;
	position: relative;
	padding-top: 1px;
	.num {
		text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 100;
    transform: translate(-50%, -50%);
    font-size: 0.610264rem;
    font-weight: 700;
	}
	.wheel {
		width: 80%;
		height: 80%;
		border-radius: 50%;
		margin: 10% auto;
		background-color: #EEEEEE;
		box-shadow: 0 2px 10px #999;
		position: relative;
		overflow: hidden;
		z-index: 100;
		.indicator {
			width: 30px;
			height: 30px;
			border-radius: 60%;
			background-color: #999999;
			// position: absolute;
			// top: 20px;
			// left: 50%;
			// transform: translateX(-50%);
			margin-left: 43%;
			margin-top: 10%;
		}

	}
	.dots {
		width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    // padding: 50px;
		left: 0;
		.dot {
			position: absolute;
			width: 30px;
			height: 30px;
			background-color: #eee;
			// z-index: 100;
			border-radius: 50%;
			&:nth-child(10) {
				top: -25%;
				left: 20%;
			}
			&:nth-child(9) {
				top: 5%;
    		left: -17%;
			}
			&:nth-child(8) {
				top: 50%;
    		left: -28%;
			}
			&:nth-child(7) {
				top: 90%;
    		left: -10%;
			}
			&:nth-child(6) {
				bottom: -25%;
				left: 20%;
			}
			&:nth-child(5) {
				bottom: -25%;
				right: 20%;
			}
			&:nth-child(4) {
				top: 83%;
    		right: -10%;
			}
			&:nth-child(3) {
				top: 50%;
				right: -30%;
			}
			&:nth-child(2) {
				top: 10%;
    		right: -18%;
			}
			&:nth-child(1) {
				top: -25%;
				right: 20%;
			}
		}
		.activeDot {
			background-color: #0083c5;
		}
	}
}
</style>
