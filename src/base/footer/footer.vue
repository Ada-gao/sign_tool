<template>
	<div class="footer-button">
		<grid>
      <grid-item>
        <router-link class="grid-center" to="/riskRating"><i class="iconfont icon-createtask_fill"></i>更精准配置</router-link>
      </grid-item>
      <grid-item>
        <router-link class="grid-center" to="/recommend"><i class="iconfont icon-createtask_fill"></i>查看推荐产品</router-link>
      </grid-item>
    </grid>
	</div>
</template>

<script>
import { Grid, GridItem } from 'vux'

export default {
  components: {
    Grid,
    GridItem
  }
}
</script>

<style scoped="" lang="less">
.footer-button {
	position: fixed;
	bottom: 0;
  width: 100%;
  height: 96px;
  line-height: 96px;
  box-sizing: border-box;
  font-size: 24px; /*px*/
	background-color: #fff;
	.weui-grid:nth-child(2) {
		background-color: #0083C5;
		a {
			color: #fff;
		}
	}
	.weui-grid {
		padding: 0;
	}
	.grid-center {
    display: block;
    text-align: center;
    i {
      font-size: 46px; /*px*/
      display: inline-block;
      vertical-align: sub;
    }
  }
}
</style>
