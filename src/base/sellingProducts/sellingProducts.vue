<template>
	<div class="flexbox-wrapper">
		<ul>
			<li v-for="(item, index) in childData" :key="index" @click="toProductDetail">
				<flexbox :gutter="2" wrap="wrap">
					<flexbox-item :span="4" class="item-left">
						<div class="flex-product">
							<div class="flex-left">
								<p class="rate"><span>{{item.rate | twoDecimals}}</span>%</p>
								<p class="text">近一年收益</p>
							</div>
						</div>
					</flexbox-item>
					<flexbox-item class="item-right">
						<div class="flex-product">
							<div class="flex-right">
								<p>{{item.pTitle}}</p>
								<span>{{item.pLabel}}</span>
							</div>
						</div>
					</flexbox-item>
				</flexbox>
			</li>
		</ul>

	</div>
</template>

<script>
import { XHeader, Group, CellBox, Flexbox, FlexboxItem } from 'vux'
export default {
	name: 'SellingProducts',
  components: {
  	XHeader,
  	Group,
  	CellBox,
  	Flexbox,
  	FlexboxItem
  },
	props: ['childData'],
	methods: {
		toProductDetail () {
			this.$router.push('/productDetail')
		}
	}
}
</script>

<style scoped lang="less">
</style>
