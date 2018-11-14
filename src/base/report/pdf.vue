<template>
    <div id="material">
        <x-header class="header" :left-options="{backText: '',preventGoBack:true}" @on-click-back="back()">{{title}}</x-header>
        <div class="spinner">
          <mt-spinner type="fading-circle" color="#BD9D62" v-if="spinner"></mt-spinner>
        </div>
        <div class="wrapper">
            <div class="pdf">
                <canvas v-for="page in pages" :id="'the-canvas'+page" :key="page"></canvas>
            </div>
        </div>
    </div>
</template>

<script>
import { XHeader } from 'vux'
import PDFJS from 'pdfjs-dist'
let Base64 = require('js-base64').Base64

export default {
  components: {
    XHeader
  },
  data () {
    return {
      title: '',
      pdfDoc: null,
      loadding: false,
      pages: 0,
      url: '',
      spinner: false,
      isCanScale: false,
      scale: 1,
      distance: {},
      vendors: null,
      origin: null,
      wrapper: null,
      element: null,
      pageX: '',
		  pageY: '',
		  initX: '',
		  initY: '',
		  isTouch: false,
		  start: []
    }
  },
  methods: {
    back () {
      this.$router.push({name: 'PdfReport', params: {id: this.$route.params.id, mark: this.$route.params.mark}})
    },
    handleTouch (e) {
      console.log(e.type)
      // e.preventDefault()
			switch (e.type) {
				case 'touchstart':
					if (e.touches.length > 1) {
	 					this.distance.start = this.getDistance({
	 						x: e.touches[0].screenX,
	 						y: e.touches[0].screenY
						}, {
	 						x: e.touches[1].screenX,
	 						y: e.touches[1].screenY
             })
	 				}
					break
        case 'touchmove':
          if (e.touches.length === 1) {
            console.log('111111')
          }
					if (e.touches.length === 2) {
            console.log('2222222222222')
	 					this.origin = this.getOrigin({
							x: event.touches[0].pageX,
							y: event.touches[0].pageY
						}, {
							x: event.touches[1].pageX,
							y: event.touches[1].pageY
						})
						this.distance.stop = this.getDistance({
	 						x: e.touches[0].screenX,
	 						y: e.touches[0].screenY
						}, {
	 						x: e.touches[1].screenX,
	 						y: e.touches[1].screenY
	 					})
	 					this.scale = this.distance.stop / this.distance.start
	 					this.isCanScale = true
	 					this.setScaleAnimation(this.scale)
	 				}
					break
				case 'touchend':
					this.scale = 1
					this.setScaleAnimation(this.scale)
					break
				case 'touchcancel':
					this.scale = 1
					this.setScaleAnimation(this.scale)
					break
				default:;
			}
    },
    vendor () {
			var TRANSITION = 'transition'
			var TRANSITION_END = 'transitionend'
			var TRANSFORM = 'transform'
			var TRANSFORM_PROPERTY = 'transform'
      var TRANSITION_PROPERTY = 'transition'
      var WIDTH = 'width'
      var HEIGHT = 'height'
			if (typeof document.body.style.webkitTransform !== 'undefined') {
				TRANSFORM = 'webkitTransform'
				TRANSITION = 'webkitTransition'
				TRANSITION_END = 'webkitTransitionEnd'
				TRANSFORM_PROPERTY = '-webkit-transform'
				TRANSITION_PROPERTY = '-webkit-transition'
			}
			return {
				TRANSFORM: TRANSFORM,
				TRANSITION: TRANSITION,
				TRANSITION_END: TRANSITION_END,
				TRANSFORM_PROPERTY: TRANSFORM_PROPERTY,
        TRANSITION_PROPERTY: TRANSITION_PROPERTY,
        WIDTH: WIDTH,
        HEIGHT: HEIGHT
			}
    },
    getOrigin (first, second) {
			return {
				x: (first.x + second.x) / 2,
				y: (first.y + second.y) / 2
			}
    },
    getDistance (start, stop) {
			return Math.sqrt(Math.pow((stop.x - start.x), 2) + Math.pow((stop.y - start.y), 2))
    },
    setScaleAnimation (scale, animation) {
			var transitionAnimation = ''
      var x, y
      // var width, height
      var element = document.querySelector('.pdf')
			if (!this.isCanScale) {
				return
			}
			this.isCanScale = false
			if (animation) {
				transitionAnimation = 'none'
			} else {
				transitionAnimation = this.vendors.TRANSFORM_PROPERTY + ' 0.3s ease-out'
      }
			element.style[this.vendors.TRANSITION] = transitionAnimation
			x = this.origin.x + (-this.origin.x) * this.scale
      y = this.origin.y + (-this.origin.y) * this.scale
      // console.log('before', element.offsetWidth, this.scale)
      // console.log('before', element.offsetHeight, this.scale)
      // width = element.offsetWidth * this.scale
      // height = element.offsetHeight * this.scale
      // console.log('after', width, this.scale)
      // console.log('after', height, this.scale)
      // element.style[this.vendors.WIDTH] = width + 'px'
      // element.style[this.vendors.HEIGHT] = height + 'px'
			element.style[this.vendors.TRANSFORM] = 'matrix(' + this.scale + ', 0, 0, ' + this.scale + ', ' + x + ', ' + y + ')'
		},
    renderPage (num) {
      let _this = this
      this.pdfDoc.getPage(num).then(function (page) {
        let canvas = document.getElementById('the-canvas' + num)
        let ctx = canvas.getContext('2d')
        // let dpr = window.devicePixelRatio || 1
        // console.log(window.devicePixelRatio)
        // let bsr = ctx.webkitBackingStorePixelRatio ||
        //           ctx.mozBackingStorePixelRatio ||
        //           ctx.msBackingStorePixelRatio ||
        //           ctx.oBackingStorePixelRatio ||
        //           ctx.backingStorePixelRatio || 1
        // console.log(bsr)
        // let ratio = dpr / bsr
        // console.log(screen.availWidth, page.getViewport(1).width)
        var viewport = page.getViewport(screen.availWidth / page.getViewport(1).width)
        // console.log(viewport)
        canvas.width = viewport.width * 1
        canvas.height = viewport.height * 1
        canvas.style.width = canvas.width + 'px'
        canvas.style.height = canvas.height + 'px'
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        var renderContext = {
          canvasContext: ctx,
          viewport: viewport
        }
        page.render(renderContext)
        if (_this.pages > num) {
          _this.renderPage(num + 1)
        }
      })
    },
    loadFile (url) {
      let _this = this
      PDFJS.getDocument(url).then(function (pdf) {
        _this.spinner = false
        _this.pdfDoc = pdf
        _this.pages = _this.pdfDoc.numPages
        _this.$nextTick(() => {
          _this.renderPage(1)
        })
      })
    },
    paintFixedWaterMark (workId) { // 在Vue中可改为ES6写法
     var material = document.querySelector('#material')
     var wrap = document.createElement('div') // 创建一个div
     wrap.className = 'fixed-water-mark' // 给div添加类名
     var wm = document.createElement('canvas') // 单个水印画布
     wm.id = 'watermark' // 给canvas标签添加id
     wm.width = workId.length * 18 // 设置canvas宽
     wm.height = 150 // 设置canvas
     wm.style.display = 'none' // 设置画布隐藏属性
     wrap.appendChild(wm) // 在div中添加画布
     var rwm = document.createElement('canvas') // 重复绘制水印画布，用于整个页面
     rwm.id = 'repeat-watermark'
     wrap.appendChild(rwm)
    //  document.body.appendChild(wrap)
     material.appendChild(wrap)
     // 绘制单个水印
     var cw = document.getElementById('watermark')
     var ctx = cw.getContext('2d')
     ctx.clearRect(0, 0, workId.length * 18, 150) // 清空矩形
     ctx.font = '30px 黑体' // 设置字体
     ctx.rotate(-20 * Math.PI / 180) // 逆时针旋转20度
     ctx.fillStyle = 'rgba(100,100,100,0.2)' // 填充透明度为0.2的灰色
     ctx.fillText(workId, -40, 140) // 填充内容为工号
     // 在另一个画布上重复绘制单个水印
     var crw = document.getElementById('repeat-watermark')
     crw.width = window.innerWidth // 设置画布宽度等于窗口显示宽度
     crw.height = window.innerHeight // 设置画布高度等于窗口显示高度
     var ctxr = crw.getContext('2d')
     ctxr.clearRect(0, 0, crw.width, crw.height)
     var pat = ctxr.createPattern(cw, 'repeat') // 在水平和垂直方向重复绘制单个水印
     ctxr.fillStyle = pat
     ctxr.fillRect(0, 0, crw.width, crw.height)
		}
  },
  mounted () {
    this.spinner = true
    this.title = this.$route.params.tip
    this.wrapper = document.querySelector('.pdf')
		// var pageX
		// var pageY
		// var initX
		// var initY
		// var isTouch = false
		// var start = []
    // this.wrapper.addEventListener('touchstart', function (e) {
    //   console.log(e)
    //   console.log('start')
    //   //	手指按下时的手指所在的X，Y坐标
    //   this.pageX = e.targetTouches[0].pageX
    //   this.pageY = e.targetTouches[0].pageY
    //   //	初始位置的X，Y坐标
    //   this.initX = e.target.offsetLeft
    //   this.initY = e.target.offsetTop
    //   //	记录初始 一组数据 作为缩放使用
    //   if (e.touches.length >= 2) { //	判断是否有两个点在屏幕上
    //       this.start = e.touches //	得到第一组两个点
		// 	}
    //   //	表示手指已按下
    //   this.isTouch = true
		// }, false)
		// //	监听 touchmove 事件 手指 移动时 做的事情
		// this.wrapper.addEventListener('touchmove', function (e) {
    //   console.log('touchmove')
    //   e.preventDefault()
    //   // 一根 手指 执行 目标元素移动 操作
    //   if (e.touches.length === 1 && this.isTouch) {
    //     console.log('one')
    //     //	移动目标的 X Y 坐标
    //     var touchMoveX = e.targetTouches[0].pageX
    //     var touchMoveY = e.targetTouches[0].pageY
    //     //	设置当前点击元素的 top left 定位值
    //     e.target.style.left = parseInt(touchMoveX) - parseInt(this.pageX) + parseInt(this.initX) + 'px'
    //     e.target.style.top = parseInt(touchMoveY) - parseInt(this.pageY) + parseInt(this.initY) + 'px'
    //   }
    //   // 2 根 手指执行 目标元素放大操作
    //   function getDistance (p1, p2) {
    //     var x = p2.pageX - p1.pageX
    //     var y = p2.pageY - p1.pageY
    //     return Math.sqrt((x * x) + (y * y))
    //   }
    //   if (e.touches.length >= 2 && this.isTouch && e.scale < 2.5) {
    //     //	得到第二组两个点
    //     var now = e.touches
    //     //	得到缩放比例， getDistance 是勾股定理的一个方法
    //     var scale = getDistance(now[0], now[1]) / getDistance(this.start[0], this.start[1])
    //     // 对缩放 比例 取整
    //     // e.scale = scale.toFixed(2)
    //     // 执行目标元素的缩放操作
    //     e.target.style.transform = 'scale(' + scale + ')'
    //   }
    // }, false)
		// 	//	监听 手指离开屏幕时
    // this.wrapper.addEventListener('touchend', function (e) {
    //   console.log('touchend')
    //   //	将 isTouch 修改为false  表示 手指已经离开屏幕
    //   if (this.isTouch) { this.isTouch = false }
		// }, false)
    this.wrapper.addEventListener('touchstart', this.handleTouch)
		this.wrapper.addEventListener('touchmove', this.handleTouch)
		this.wrapper.addEventListener('touchend', this.handleTouch)
		this.wrapper.addEventListener('touchcancel', this.handleTouch)
    this.vendors = this.vendor()
    let url = Base64.decode(this.$route.params.url)
    this.loadFile(url)
    let paint = JSON.parse(window.localStorage.getItem('data')).name + ',' + JSON.parse(window.localStorage.getItem('data')).mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    if (this.$route.params.mark === 1 || this.$route.params.mark === 2) {
      this.paintFixedWaterMark(paint)
    }
  }
}
</script>

<style lang="less">
@import "../../common/style/variable.less";
#material{
  .vux-header.header{
    background: @header-bg;
    .vux-header-left{
      .left-arrow:before{
        border-color: @text-font-color;
      }
    }
    .vux-header-title{
      color: @back-color-white;
    }
  }
  .spinner{
    position: absolute;
    z-index: 99;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    .mint-spinner-fading-circle{
      width: 80px !important;
      height: 80px !important;
    }
  }
  .wrapper{
    transform-origin: 0 0;
		-webkit-transform-origin: 0 0;
  }
  .pdf{
    /* margin-bottom: 120px; */
    /* overflow: scroll;
    width: 100%;
    height: 100%; */
  }
  canvas {
    display: block;
    border-bottom: 1px solid black;
    margin: 0 auto;
    // width: 100% !important;
  }
}
.fixed-water-mark {
     position: fixed;
     pointer-events: none;
     top: 0;
     bottom: 0;
     left: 0;
     right: 0;
     z-index: 1600;
  }
  .fixed-water-mark #watermark {
      text-align: center;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      opacity: 0.4;
      margin: 0 auto;
  }
</style>
