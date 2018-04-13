<template>
  <div class="page1">
    <div class="float-info touch-info">
      <!-- <div>￥{{ touchInfo.amount }} 万</div> -->
      <!-- <div ng-if="touchInfo.returnRatio">{{'projection_graph_expected_annual_return'|translate}}{{ touchInfo.returnRatio }}％</div> -->
    </div>
    <div class="graphTouch">
      <svg width="32px" height="100%" viewBox="-10 -1 64 479">
        <defs>
          <ellipse id="path-1" cx="22" cy="22" rx="22" ry="22"></ellipse>
          <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="filter-2">
            <feOffset dx="0" dy="4" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
            <feGaussianBlur stdDeviation="5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
            <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.6 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
          </filter>
        </defs>
        <path d="M22,0.5 L22,479" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1,5" fill="none"></path>
        <circle stroke="#00A1FF" stroke-width="2" fill="#FFFFFF" fill-rule="evenodd"
                cx="22" cy="0" r="6"></circle>
        <g id="button" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(0, 447)">
          <g id="Oval-1">
            <use fill="black" fill-opacity="1" filter="url(#filter-2)" xlink:href="#path-1"></use>
            <use fill="#FFFFFF" fill-rule="evenodd" xlink:href="#path-1"></use>
          </g>
          <circle id="Oval" fill="#D8D8D8" cx="22.5" cy="22.5" r="6.5"></circle>
        </g>
      </svg>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import ProjectionFactory from 'common/js/projection'
const Graph = new ProjectionFactory()

export default {
  data () {
    return {
      options: {
        height: 275,
        top: 20,
        left: 13,
        right: 70,
        bottom: 30
      },
      data: []
    }
  },
  created () {
    axios.get('/api/seller').then(res => {
      this.data = res.data.data
      const graph = new Graph(this.options)
      graph.drawGraph(this.data)
      console.dir(graph)
      // this.ProjectionFactory(this.options, this.data)
     }, res => {
         console.log(res)
     })
  }
}
</script>

<style scoped lang="less">
.page1 {
  // width: 100%;
  // height: 500px;
  @m-blue: #1580f3;
  @m-gray: #9b9b9b; // for text
  @m-night-sky: #121317; // for background
  @m-graph-axis: #e8ecff;
  @m-graph-gain: @m-blue;
  @m-graph-loss: #3d5472;
  @m-graph-gradient-blue: rgba(0, 123, 255, 0.52);
  @m-graph-gradient-gray: rgba(99, 99, 99, 1);
  @m-graph-touch-line: #65a8f7;
  display: block;
  width: 100%;
  position: relative;
  svg g text {
    fill: blue;
  }
  svg {
      overflow: visible;
  }
  .dot-text {
      fill: rgba(255, 255, 255, 0.5);
  }
  // rect {
      rect.gain {
          fill: @m-graph-gradient-blue;
      }
      rect.loss {
          fill: @m-graph-gradient-gray;
      }
  // }
  .median {
      stroke: #65a8f7;
      stroke-dasharray: 4;
      fill: none;
  }
  .base-line {
      stroke: #979797;
      stroke-dasharray: 4;
      fill: none;
  }
  .x-axis {
      line {
          stroke: @m-graph-axis;
          stroke-width: 0.2px;
      }
      .today,
      .year-label {
          fill: @m-gray;
          font-size: 12px;
      }
  }
  .touch-line {
      stroke: @m-graph-touch-line;
      stroke-width: 0.5px;
  }
  stop {
      stop-color: #fff;
  }
  rect.android {
      shape-rendering: crispEdges;
  }
  .y-axis {
      path {
          display: none;
      }
      line {
          stroke: #4B4B4B;
      }
      text {
          text-anchor: end;
          font-size: 8px;
          color: #121317;
          transform: translateY(-100%);
      }
  }
  .x-axis {
      path {
          stroke: #00a1ff;
          stroke-width: 3px;
          stroke-linejoin: bevel;
      }
  }
  .line-path {
      fill: none;
      stroke: @m-graph-gradient-blue;
  }
  .graphTouch {
      position: absolute;
      top: 0;
      bottom: 0;
  }
  .float-info {
      position: absolute;
      left: 0;
      font-size: 10px;
      color: white;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 2px;
      padding: 3px;
      max-width: 150px;
      &.touch-info {
          bottom: 100px;
          div {
              line-height: 15px;
              text-align: right;
          }
      }
  }
}
</style>
