<template>
    <div id="pdf">
        <x-header class="header" :left-options="{backText: '',preventGoBack:true}" @on-click-back="back()">{{title}}</x-header>
        <div class="page-pdf" >
            <scroll @scroll="handleScroll" :freeScroll="freeScroll" :scrollX="scrollX" ref="scroll" class="scroll-content">
                 <!-- :style="handleChangeStyle" -->
                <div class="scroll-content-info">
                    <canvas id="the-canvas"></canvas>
                </div>
                <loading :text="text" v-show="isLoading"></loading>
            </scroll>
            <div class="showPage">
                <span class="currentPage">{{pageNum}}</span>
                <span class="pageTotal">/{{pageTotal}}</span>
            </div>
            <div class="wrapper-todo">
                <div class="btn" @click="handlePrev">上一页<i></i></div>
                <div class="btn" @click="handleNext">下一页<i></i></div> &nbsp;
                <div class="btn" @click="handleAddscale">放大<i></i></div>
                <div class="btn" @click="handleMinus">缩小<i></i></div>
            </div>
        </div>
    </div>
</template>
<script type="es6">
    import { XHeader } from 'vux'
    import Scroll from './scroll'
    import Loading from './loading'
    import pdfJS from 'pdfjs-dist'
    let Base64 = require('js-base64').Base64
    export default {
        created () {
            let paint = JSON.parse(window.localStorage.getItem('data')).name + ',' + JSON.parse(window.localStorage.getItem('data')).mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
            this.title = this.$route.params.tip
            this.$nextTick(() => {
                let url = Base64.decode(this.$route.params.url)
                this.url = url
                this.handleInitPdf(this.pageNum)
                if (this.$route.params.mark === 1 || this.$route.params.mark === 2) {
                    this.paintFixedWaterMark(paint)
                }
            })
        },
        data () {
            return {
                title: '',
                url: '',
                pdfDoc: {},
                pageNum: 1,
                pageTotal: 1,
                scale: 1,
                maxScale: 3,
                minScale: 0,
                initFlag: true,
                scrollX: true,
                freeScroll: true,
                isLoading: true,
                text: ''
            }
        },
        methods: {
            back () {
                this.$router.push({name: 'PdfReport', params: {id: this.$route.params.id, mark: this.$route.params.mark}})
            },
            paintFixedWaterMark (workId) { // 在Vue中可改为ES6写法
                var material = document.querySelector('.scroll-content-info')
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
            },
            handleScroll (pos) {
                console.log(pos)
            },
            /*
            *   新增canvas
            * */
            createCanvas () {
                let canvas = document.createElement('canvas')
                canvas.setAttribute('id', 'the-canvas')
                document.querySelector('.scroll-content-info').appendChild(canvas)
            },
            /*
            *   删除canvas
            * */
            deleteCanvas () {
                document.querySelector('.scroll-content-info').removeChild(document.querySelector('#the-canvas'))
            },

            /*
            *   初始化PDF
            * */
            handleInitPdf (num) {
                // let pdfJS = require('pdfjs-dist').PDFJS;
                console.log(require('pdfjs-dist'))
                let vm = this
                // pdfJS.workerSrc = require('pdfjs-dist/build/pdf.worker.min');
                var canvas = document.getElementById('the-canvas')
                pdfJS.getDocument(this.url).then(function getPdfHelloWorld (pdf) {
                    pdf.getPage(num).then(function getPageHelloWorld (page) {
                        if (vm.initFlag) {
                            vm.scale = document.body.getBoundingClientRect().width / page.view[2]
                            vm.minScale = vm.scale
                        }
                        vm.initFlag = false
                        var viewport = page.getViewport(vm.scale)
                        //  var viewport = page.getViewport(screen.availWidth / page.getViewport(1).width)
                        var context = canvas.getContext('2d')
                        canvas.height = viewport.height
                        canvas.width = viewport.width
                        var renderContext = {
                            canvasContext: context,
                            viewport: viewport
                        }
                        page.render(renderContext)
                        document.querySelector('.scroll-content-info').style.width = document.querySelector('#the-canvas').getBoundingClientRect().width + 'px'
                        vm.$refs.scroll.refresh()
                        vm.isLoading = false
                    })
                })
                pdfJS.getDocument(this.url).then(function (pdfDoc_) { // 初始化pdf
                    vm.pdfDoc = pdfDoc_
                    vm.pageTotal = vm.pdfDoc.numPagesy
                }).catch(function (err) {
                    if (err) {
                        console.log(err)
                        vm.throwerr(vm.pdfurl)
                    }
                })
            },
            /*
            *   放大
            * */
            handleAddscale () {
                if (this.scale >= this.maxScale) {
                    return
                }
                this.deleteCanvas()
                this.createCanvas()
                this.scale += 0.1
                this.isLoading = true
                this.handleQueueRenderPage(this.pageNum)
            },
            /*
            *   缩小
            * */
            handleMinus () {
                if (this.scale <= this.minScale) {
                    return
                }
                this.deleteCanvas()
                this.createCanvas()
                this.scale -= 0.1
                this.isLoading = true
                this.handleQueueRenderPage(this.pageNum)
            },
            /*
            *   上一页
            * */
            handlePrev () {
                let vm = this
                if (vm.pageNum <= 1) {
                    return
                }
                vm.pageNum--
                vm.$refs.scroll.scrollTo(0, 0)
                vm.handleQueueRenderPage(vm.pageNum)
            },
            /*
            *   下一页
            * */
            handleNext () {
                let vm = this
                if (vm.pageNum >= vm.pageTotal) {
                    return
                }
                vm.pageNum++
                vm.$refs.scroll.scrollTo(0, 0)
                vm.handleQueueRenderPage(vm.pageNum)
            },
            /*
            *   重新渲染
            * */
            handleQueueRenderPage (num) {
                this.handleInitPdf(num)
            }
        },
        components: {
            Scroll, Loading, XHeader
        }
        // computed: {
        //     handleChangeStyle () {
        //     }
        // }
    }
</script>
<style lang="less" rel="stylesheet/less">
    @import "../../common/less/define";
    @import "../../common/less/mixin";
    @import "../../common/style/variable.less";
    #pdf{
        height: 100%;
        background: #fff;
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
    .page-pdf {
        padding-top: 88px;
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .scroll-content {
            position: absolute;
            width: 100%;
            top: 88px;
            bottom: 50px;
            left: 0;
        }
        .showPage {
            position: absolute;
            right: 10px;
            bottom: 80px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: rgba(0,0,0,0.3);
            color: #fff;
            text-align: center;
            line-height: 40px;
            font-size: 12px;
            .currentPage {
                font-size: 17px;
            }
        }
        .wrapper-todo {
            background-color: #fff;
            z-index: 10;
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 70px;
            display: flex;
            box-shadow: 0px -2px 18px 2px rgba(0, 0, 0, 0.1);
            .btn {
                line-height: 80px;
                display: block;
                flex: 1;
                text-align: center;
                font-size: 11px;
                color: #666;
                position: relative;
                i {
                    width: 25px;
                    height: 25px;
                    display: block;
                    border-radius: 50%;
                    background-color: #FFB700;
                    position: absolute;
                    left: 50%;
                    margin-left: -12px;
                    top: 4px;
                }
                &:nth-child(1) {
                    i:before {
                        content: '';
                        width: 25px;
                        height: 25px;
                        display: block;
                        .bg-image('icon-arrow-prev');
                        background-size: 7px;
                    }
                }
                &:nth-child(2) {
                    i:before {
                        content: '';
                        width: 25px;
                        height: 25px;
                        display: block;
                        .bg-image('icon-arrow-next');
                        background-size: 7px;
                    }
                }
                &:nth-child(3) {
                    i:before {
                        content: '';
                        width: 25px;
                        height: 25px;
                        display: block;
                        .bg-image('icon-arrow-bigger');
                        background-size: 11px;
                    }
                }
                &:nth-child(4) {
                    i:before {
                        content: '';
                        width: 25px;
                        height: 25px;
                        display: block;
                        .bg-image('icon-arrow-smaller');
                        background-size: 11px;
                    }
                }
            }
        }
    }
</style>
