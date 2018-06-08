<template>
  <div class="pdf">
    <canvas v-for="page in pages" :id="'the-canvas'+page" :key="page"></canvas>
  </div>
</template>

<script>
import PDFJS from 'pdfjs-dist'
let Base64 = require('js-base64').Base64

export default {
  data () {
    return {
      title: '',
      pdfDoc: null,
      loadding: false,
      pages: 0
    }
  },
  props: ['pdfUrl'],
  methods: {
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
        _this.pdfDoc = pdf
        _this.pages = _this.pdfDoc.numPages
        _this.$nextTick(() => {
          _this.renderPage(1)
        })
      })
    }
  },
  mounted () {
      console.log(this.pdfUrl)
    let url = Base64.decode(Base64.encode('http://10.9.60.142:8888/group1/M00/00/0B/Cgk8jlsZBYCAfs7yAALbLyFKB34936.pdf'))
    this.loadFile(url)
  }
}
</script>

<style scoped>
.pdf{
    margin-bottom: 120px;
}
canvas {
  display: block;
  border-bottom: 1px solid black;
  margin: 0 auto;
}
</style>
