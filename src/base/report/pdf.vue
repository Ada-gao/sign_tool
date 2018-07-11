<template>
    <div class="material">
        <x-header :left-options="{backText: '',preventGoBack:true}" @on-click-back="back()">{{title}}</x-header>
        <div class="spinner">
          <mt-spinner type="fading-circle" color="#158FD2" v-if="spinner"></mt-spinner>
        </div>
        <div class="wrapper">
            <div class="pdf">
                <canvas v-for="page in pages" :id="'the-canvas'+page" :key="page  "></canvas>
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
      spinner: false
    }
  },
  methods: {
    back () {
      this.$router.push({name: 'PdfReport', params: {id: this.$route.params.id, mark: this.$route.params.mark}})
    },
    renderPage (num) {
      let _this = this
      this.pdfDoc.getPage(num).then(function (page) {
        let canvas = document.getElementById('the-canvas' + num)
        let ctx = canvas.getContext('2d')
        let dpr = window.devicePixelRatio || 1
        let bsr = ctx.webkitBackingStorePixelRatio ||
                  ctx.mozBackingStorePixelRatio ||
                  ctx.msBackingStorePixelRatio ||
                  ctx.oBackingStorePixelRatio ||
                  ctx.backingStorePixelRatio || 1
        let ratio = dpr / bsr
        var viewport = page.getViewport(screen.availWidth / page.getViewport(1).width)
        canvas.width = viewport.width * ratio
        canvas.height = viewport.height * ratio
        canvas.style.width = canvas.width + 'px'
        canvas.style.height = canvas.height + 'px'
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
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
    }
  },
  mounted () {
    this.spinner = true
		this.title = this.$route.params.tip
    let url = Base64.decode(this.$route.params.url)
    this.loadFile(url)
  }
}
</script>

<style lang="less">
.material{
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
  }
}
</style>
