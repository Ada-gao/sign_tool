import * as d3 from 'd3'
import _ from 'lodash'

function ProjectionFactory () {
  const formatNum = value => {
    value = Number(value).toFixed(0)
    return value.toString()
  }
  let globalProjectionGraphIdCounter = 1

  return class Projection {
    constructor (options) {
      this.projectionGraphId = globalProjectionGraphIdCounter++
      this.options = options || {}
      this.container = d3.select('.page1')
      this.setupVar()
      this.setupUtils()
      this.setupDOM()
    }

    setupVar () {
      // debugger
      this.margin = {
        left: this.options.left || 0,
        top: this.options.top || 0,
        bottom: this.options.bottom || 0,
        right: this.options.right || 0
      }

      let containerW = this.container._groups[0]
      this.width = containerW[0].clientWidth
      this.height = this.options.height || 0
      this.adjustedHeight = this.height - this.margin.bottom

      this.xRange = _.range(121)
    }

    setupUtils () {
      this.x = d3.scaleBand()
        .range([0 + this.margin.left, this.width - this.margin.right])
        .domain(this.xRange)

      this.y = d3.scaleLinear()
        .range([this.adjustedHeight, this.margin.top])
      this.offset = d3.scaleLinear().range([0, 1])

      this.yAxis = d3.axisRight(this.y)
        .tickSizeInner(this.width - this.margin.left - this.margin.right)
        .tickPadding(-3)
        .tickSizeOuter(0)
        .tickFormat((d) => `￥ ${formatNum(d)}`)

      const axisX = d3.scaleBand()
        .range([0 + this.margin.left, this.width - this.margin.right])
        .domain(_.range(11))
      this.xAxis = d3.axisBottom(axisX)
        .tickSize(0)
        .tickPadding(10)
        .tickFormat((d) => d + new Date().getFullYear())

      this.line = d3.line()
        .x((d, i) => this.x(i))
        .y(d => this.y(d[0]))
    }

    setupDOM () {
      this.svg = this.container.insert('svg', ':first-child')
        .attr('class', 'bar-chart')
        .attr('width', this.width)
        .attr('height', this.height)

      const baseG = this.svg.append('g')
        .attr('class', 'graph-area')
        // .attr('style', 'fill:rgba(255, 255, 255, 1)')

      baseG.append('rect')
        .attr('class', 'gain')
        .attr('x', this.margin.left)
        .attr('y', this.margin.top)
        .attr('width', this.width - this.margin.left - this.margin.right)
      baseG.append('rect')
        .attr('class', 'loss')
        .attr('x', this.margin.left)
        .attr('width', this.width - this.margin.left - this.margin.right)

      this.cloud = baseG.append('g')
        // .attr('style', 'fill:rgba(255, 255, 255, 1)')
        .attr('class', 'cloud')
      this.colorMask = this.cloud.append('defs')

      const projectionGraphId = this.projectionGraphId
      // console.log(ionic.Platform.platform())
      this.cloud.selectAll('rect').data(this.xRange)
        .enter()
        .append('rect')
        // .classed(ionic.Platform.platform(), true)
        .attr('x', (index) => this.x(index))
        .attr('y', () => this.margin.top)
        .attr('width', this.x.bandwidth())
        .attr('height', this.height - this.margin.top - this.margin.bottom)
        .style('fill', index => `url(#${projectionGraphId}-projection-gradient-${index})`)
        // .attr('style', 'opacity:0')

      const background = this.svg.append('g')

      this.svg.append('g')
        .attr('class', 'y-axis')
        .attr('transform', `translate(${this.margin.left}, 0)`)
      this.svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${this.height})`)

      this.svg.append('path')
        .attr('class', 'line-path')

      this.svg.append('text')
        .attr('class', 'unit-text')
        .attr('dy', '20px')
        .attr('text-anchor', 'end')
        .attr('x', this.width - this.margin.right)
        .attr('y', this.height - this.margin.bottom)
        .text('单位(万)')
        .attr('font-size', '18px')

      const dot = this.svg.append('g')
        .attr('class', 'first-dot')

      dot.append('circle')
        .attr('r', 3)
        .attr('fill', 'white')
        .attr('stroke', '#00a1ff')
        .attr('cx', this.margin.left + 3)
        .attr('cy', this.height - this.margin.bottom - 3)
      dot.append('text')
        // .attr('class', 'dot-text') // mod
        .attr('dy', '-0.7rem')
        .attr('font-size', '18px')
        .attr('x', this.margin.left)
        .attr('y', this.height - this.margin.bottom)

      background.append('line')
        .attr('class', 'return-split-line')
        .attr('stroke', '#E94150')
        .attr('stroke-width', 1)
        .attr('x1', this.margin.left + 5)
        .attr('x2', this.width - this.margin.right)

      // this.setupTouch()
    }

    // setupTouch () {
    //   const self = this
    //   this.screenMove = this.screenMove.bind(this)
    //   function handleTouch () {
    //     const selected = d3.touches(this)[0]
    //     self.screenMove(selected)
    //   }

    //   function handleMove () {
    //     const selected = d3.mouse(this)
    //     self.screenMove(selected)
    //   }

    //   this.hideTouchInfo = this.hideTouchInfo.bind(this)

    //   // if (ionic.Gestures.HAS_TOUCHEVENTS) {
    //   //   this.cloud.on('touchmove', handleTouch)
    //   //   this.cloud.on('touchend', this.hideTouchInfo)
    //   //   this.cloud.on('touchstart', handleTouch)
    //   // } else {
    //   //   this.cloud.on('mousemove', handleMove)
    //   //   this.cloud.on('mouseleave', this.hideTouchInfo)
    //   // }
    // }

    // hideTouchInfo () {
    //   if (this.onchange) {
    //     this.onchange({
    //       show: false
    //     })
    //   }
    // }

    screenMove (selected) {
      if (!this.onchange) {
        return
      }
      // if out of boundary
      if (
        selected[0] < this.margin.left ||
        selected[0] > this.width - this.margin.right ||
        selected[1] > this.height ||
        selected[1] < 0
      ) {
        this.onchange({
          show: false
        })
        return
      }

      const xPos = selected[0] - this.margin.left
      const monthIndex = Math.ceil(xPos / this.x.bandwidth())
      const isLeft = xPos < (this.width / 2)
      const currentMonthData = this.data[monthIndex - 1]

      // const dayOfMonthPos = xPos / this.x.bandwidth() - monthIndex + 1
      // let currentValue
      // if (currentMonthData) {
      //   const dayOfMonthIndex = Math.round(d3.scaleLinear().domain([0, 1]).range([0, currentMonthData.length - 1])(dayOfMonthPos))
      //   currentValue = currentMonthData[Math.min(dayOfMonthIndex, currentMonthData.length - 1)]
      // }

      this.onchange({
        show: true,
        position: selected,
        amount: this.y.invert(selected[1]),
        data: currentMonthData,
        base: this.data[0][0],
        months: monthIndex,
        width: this.width,
        isLeft
      })
    }

    drawGraph (data) {
      this.data = data
      const base = data[0][0]
      const maxYSet = _.map(data, (line) => line[line.length - 1])
      const minYSet = _.map(data, (line) => line[0])
      const minY = d3.min(minYSet)
      const maxY = d3.max(maxYSet)
      // const maxY = base * 6
      const yDomains = [minY, maxY]

      this.y.domain(yDomains)
      this.offset.domain(yDomains)
      const baseY = this.y(base)

      const gradient = this.colorMask.selectAll('.stop-group')
        .data(data)
      gradient.exit().remove()
      const projectionGraphId = this.projectionGraphId
      const stopGroupEnter = gradient.enter()
        .append('linearGradient')
        .attr('class', 'stop-group')
        .attr('id', (gdata, index) => `${projectionGraphId}-projection-gradient-${index}`)
        .attr('x1', 0) // be more explicit over default value
        .attr('y1', 1)
        .attr('x2', 0)
        .attr('y2', 0)
      stopGroupEnter.selectAll('stop')
        .data((d) => d)
        .enter()
        .append('stop')
        .attr('style', 'stop-color:#ffffff')

      this.svg.select('.gain')
        .attr('style', 'fill:rgb(0, 123, 255)')
        .attr('y', this.margin.top)
        .attr('height', baseY - this.y(maxY))

      this.svg.select('.loss')
        .attr('style', 'fill:rgb(109, 106, 106)')
        .attr('y', baseY)
        .attr('height', this.y(minY) - baseY)

      const tickValues = _.range(4).map((i) => minY + i * (maxY - minY) / 4)
      this.yAxis.tickValues(tickValues)
      const yAxes = this.svg.select('.y-axis')
        .call(this.yAxis)
      yAxes.selectAll('text')
        .attr('style', 'font-size:20px')
        .attr('dy', '-0.2rem')
      yAxes.selectAll('line')
        .attr('stroke-width', 0.25)

      const xAxes = this.svg.select('.x-axis')
        .call(this.xAxis)
      xAxes.selectAll('text')
        .attr('style', 'stroke:rgb(0, 161, 255)')
        .attr('style', 'font-size:20px')
        // .attr('dy', '-0.2rem')
      xAxes.select('path')
        .attr('stroke-dasharray',
          `${(this.width - this.margin.left - this.margin.right - 10) / 11} 1`
        )
        .attr('style', 'stroke:rgb(0, 161, 255)')

      this.svg.select('.first-dot text')
        .attr('y', this.y(base))
        .text(`￥ ${Math.round(base)}`)
      this.svg.select('.first-dot circle')
        .attr('cy', this.y(base))

      this.svg.select('.return-split-line')
        .attr('y1', this.y(base))
        .attr('y2', this.y(base))

      var halfL = Math.ceil(data[0].length / 2)
      this.svg.selectAll('.stop-group')
        .selectAll('stop')
        .attr('offset', (d) => {
          const base1 = this.y(minY)
          return `${(base1 - this.y(d)) / base1 * 100}%`
        })
        .attr('stop-opacity', (d, i) => {
          if (i < halfL) {
            return 1 - i / halfL
          }
          return i / (halfL - 1) - 1
        })

      if (data[0].length === 1) {
        this.svg.select('.line-path')
          .datum(data)
          .attr('d', this.line)
      }
    }
  }
}

export default ProjectionFactory
