<template>
  <div class="investor" ref="investor">
    <p class="ist-name">{{investorData.name}}</p>
    <p class="ist-tag">{{investorData.profession}}&nbsp;&nbsp;&nbsp;&nbsp;{{investorData.type}}</p>
    <p class="text-plus" v-if="investorData.score"><span class="red-text-1">{{investorData.score}}</span>分</p>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  props: ['investor-data']
}
</script>

<style scoped lang="less">
.investor {
	text-align: left;
  padding: 13px 20px 15px 20px;
  box-sizing: border-box;
  height: 114px;
	background-color: #eee;
  position: relative;
  color: #333;
  .ist-name {
    font-size: 32px; /*px*/
  }
  .ist-tag {
    font-size: 26px; /*px*/
  }
  .text-plus {
    position: absolute;
    right: 31px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
