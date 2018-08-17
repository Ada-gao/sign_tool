<template>
  <div @click="hidePopup" class="thumbnails" v-if="hidePop">
    <mt-popup v-model="popupVisible">
      <mt-swipe :show-indicators="false" :auto="0" :defaultIndex="imgKey">
        <mt-swipe-item v-if="Array.isArray(imgArr)" v-for="(item, index) in imgArr" :key="index" v-show="item">
          <img :src="item" v-show="item" style="width:100%;height:calc(100%)">
        </mt-swipe-item>
        <mt-swipe-item v-else v-show="imgArr">
          <img :src="imgArr" v-show="imgArr" style="width:100%;height:calc(100%)">
        </mt-swipe-item>
      </mt-swipe>
    </mt-popup>
  </div>
</template>
<script>
  export default {
    props: ['showImg', 'imgTotal', 'imgKey'],
    data () {
      return {
        popupVisible: true,
        hidePop: false,
        imgArr: null
      }
    },
    created () {
      this.hidePop = this.showImg
      this.imgArr = this.imgTotal
      console.log('bbbbbb', this.showImg, this.imgTotal, this.imgKey)
    },
    methods: {
      hidePopup () {
        this.hidePop = false
        this.$emit('hideBigPop', this.hidePop)
      }
    }
  }
</script>
<style lang="less">
  .thumbnails{
    .mint-popup{
      width: 750px;
      height: 750px;
      .mint-swipe{
        width: 750px;
        height: 750px;
        .mint-swipe-items-wrap{
          .mint-swipe-item{
            img{
              width: 100% !important;
              height: 100% !important;
            }
          }
        }
      }
    }
  }
</style>
