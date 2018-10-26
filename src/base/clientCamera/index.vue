<template>
  <div>
    <div class="thumbnails" v-if="fromBank === 2">
    <mt-popup v-model="showImg">
      <mt-swipe :show-indicators="false"
                :auto="0"
                id="mt-swiper">
        <mt-swipe-item v-for="(item, idx) in fileArr" :key="idx" v-show="item">
          <img :src="item" v-show="item" style="width:100%;height:calc(100%)">
        </mt-swipe-item>
      </mt-swipe>
    </mt-popup>
    </div>
    <div v-else class="thumbnails">
      <mt-popup v-model="showImg">
        <mt-swipe :show-indicators="false" :auto="0">
          <mt-swipe-item v-show="imgSrc">
            <img :src="imgSrc" v-show="imgSrc" style="width:100%;height:calc(100%)">
          </mt-swipe-item>
        </mt-swipe>
      </mt-popup>
    </div>
    <div class="upload_cont" :class="{'upload_small': fromBank === 2}">

      <!--<div v-if="fromBank === 2" style="display: inline-block;height: 120px">-->
      <div v-if="fromBank === 2" class="ul_box">
        <!--<ul class="ul" v-if="fileArr.length > 0">-->
          <div v-for="(item, index) in fileArr"
               class="ul"
              :key="index"
              @click="showBigImg(index)"
              v-show="item">
            <img :src="item + '!132x120'" v-show="item">
            <span class="delete_img" @click.prevent='delImage(index, $event)'>
              <i>x</i>
            </span>
          </div>
        <!--</ul>-->
        <div class="addsmall_box" @click="selectcamera()">
          <span class="iconfont icon_bg">
            <i>+</i>
            <i>上传认证材料</i>
          </span>
          <mt-spinner class="camera_spinner"
                      color="#aaa"
                      v-show="spinnerShow"
                      type="fading-circle"></mt-spinner>
        </div>
      </div>

      <div v-else class="addbig_box" @click="selectcamera()">
        <!--<span class='iconfont icon_bg'>&#xe600;</span>-->
        <span class='iconfont icon_bg'>+</span>
        <img :src="imgSrc"
             class="show"
             v-show="imgSrc">
        <mt-spinner class="camera_spinner"
                    color="#aaa"
                    v-show="spinnerShow"
                    type="fading-circle"></mt-spinner>
      </div>
      <i v-if="imgSrc" class="iconfont enlarge" @click="showBigImg">&#xe60c;</i>
    </div>
    <mt-popup v-model="show"
              position="bottom"
              class="camera_pop">
      <div>
        <div class='popup-item' @click="camera()">相机</div>
        <div class='popup-item' @click="photo()">从相册中选取</div>
        <div class='popup-item' @click="cancel()">取消</div>
      </div>
    </mt-popup>
    <div class="fail_msg" v-show="alertMsg">上传图片失败</div>
  </div>
</template>
<script>
  import {
    updateFrontPic,
    updateId,
    addMateials,
    deleteDetail
  } from '@/service/api/customers'
  import {Popup} from 'mint-ui'
  export default {
    name: 'Camera',
    components: {
      'mt-popup': Popup
    },
    props: ['popupVisible', 'isFromBank', 'cerId', 'imageSrc'],
    data () {
      return {
        imgSrc: '',
        fileArr: [],
        show: this.popupVisible,
        certificationId: '',
        alertMsg: false,
        fromBank: this.isFromBank,
        idSrc: '',
        spinnerShow: false,
        fileId: [],
        showSearchIcon: false,
        showThumbnail: false,
        tempArr: [],
        defIdx: 0,
        showImg: false
      }
    },
    mounted () {
    },
    watch: {
      'imageSrc': function (n, o) {
        this.setImgSrc()
      }
    },
    methods: {
      setImgSrc () {
        this.imgSrc = this.imageSrc
      },
      selectcamera () {
        this.alertMsg = false
        this.show = true
        this.$emit('showPopup', this.show)
      },
      cancel () {
        this.show = false
        this.$emit('hidePopup', this.show)
      },
      camera () {
        this.show = false
        this.$emit('hidePopup', this.show)
        let cameraOptions = {
          quality: 50,
          sourceType: 1,
          destinationType: navigator.camera.DestinationType.DATA_URL,
          // saveToPhotoAlbum: true,
          encodingType: navigator.camera.EncodingType.JPEG
        }
        navigator.camera.getPicture(this.cameraSuccess, this.cameraError, cameraOptions)
      },
      photo () {
        this.show = false
        this.$emit('hidePopup', this.show)
        let cameraOptions = {
          quality: 50,
          sourceType: 0,
          destinationType: navigator.camera.DestinationType.DATA_URL,
          //          saveToPhotoAlbum: true,
          encodingType: navigator.camera.EncodingType.JPEG
        }
        navigator.camera.getPicture(this.cameraSuccess, this.cameraError, cameraOptions)
      },
      cameraSuccess (imageData) {
        this.spinnerShow = true
        //        this.imgSrc = 'data:image/jpeg;base64,' + imageData
        //        this.show = false
        this.$emit('hidePopup', this.show)
        this.uploadFile(imageData)
      },
      cameraError (message) {
        this.show = false
        this.$emit('hidePopup', this.show)
      },
      dataURLtoFile (imageData, filename) {
        let arr = imageData.split(',')
        let mime = arr[0].match(/:(.*?);/)[1]
        let bstr = window.atob(arr[1])
        let n = bstr.length
        let u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        let blob = new Blob([u8arr], {type: mime})
        blob.lastModifiedDate = new Date()
        blob.name = filename
        return blob
      },
      uploadFile (imageData) {
        let file = this.dataURLtoFile('data:image/jpeg;base64,' + imageData, 'test.jpeg')
        let formData = new FormData()
        formData.append('file', file)
        if (this.fromBank === 0) {
          updateFrontPic(this.cerId, formData).then(res => {
            if (res.status === 200) {
              this.spinnerShow = false
              this.imgSrc = 'data:image/jpeg;base64,' + imageData
            }
          }).catch(err => {
            this.spinnerShow = false
            console.log('error: ' + err)
            this.alertMsg = true
          })
        } else if (this.fromBank === 1) {
          updateId(formData).then(res => {
            if (res.status === 200) {
              this.spinnerShow = false
              // this.imgSrc = 'data:image/jpeg;base64,' + imageData
              this.imgSrc = this.idSrc = res.data.file_url
              this.$emit('imgHandler', this.idSrc)
            }
          }).catch(err => {
            this.spinnerShow = false
            console.log('error: ' + err)
            this.alertMsg = true
          })
        } else if (this.fromBank === 2) {
          addMateials(this.cerId, formData).then(res => {
            if (res.status === 200) {
              this.fileId.push(res.data.client_cert_file_id)
              this.spinnerShow = false
              // this.tempArr.push(res.data.file_url)
              // this.fileArr.push('data:image/jpeg;base64,' + imageData)
              this.fileArr.push(res.data.file_url)
            }
          }).catch(err => {
            this.spinnerShow = false
            console.log('error: ' + err)
            this.alertMsg = true
          })
        }
      },
      showBigImg (index) {
        if (typeof index === 'object') {
          this.defIdx = 0
        } else {
          this.defIdx = index
          let children = Array.from(document.querySelector('#mt-swiper').querySelectorAll('.mint-swipe-item'))
          children.map((item, index) => {
            item.classList.remove('is-active')
          })
          children[this.defIdx].classList.add('is-active')
        }
        // this.defIdx = typeof index === 'object' ? 0 : index
        this.showImg = true
      },
      delImage (index, ev) {
        ev.stopPropagation()
        deleteDetail(this.cerId, this.fileId[index]).then(res => {
          if (res.status === 200) {
            this.fileId.splice(index, 1)
          }
        })
        this.fileArr.splice(index, 1)
      }
    }
  }
</script>
<style lang="less" scoped>
  .camera_pop {
    width: 100%;
    font-size: 30px;
    text-align: center;
    line-height: 90px;
    color: #333;
    .popup-item:not(:last-child) {
      border-bottom: 1px solid #ccc;
    }
  }

  .fail_msg {
    line-height: 36px;
    position: absolute;
    left: 66px;
  }

  .upload_cont {
    text-align: center;
    width: 270px;
    /*height: 180px;*/
    /*line-height: 180px;*/
    background-color: #ddd;
    border-radius: 8px;
    position: relative;
    margin: 0 auto;
    .ul_box {
      display: inline-block;
      /*width: 150px;*/
      height: 150px;
      /*height: 120px;*/
    }
    .icon_bg {
      font-size: 115px;
      color: #fff;
      line-height: 150px;
    }
    .show {
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      z-index: 10;
    }
  }
  .enlarge{
    position: absolute;
    bottom: 3px;
    right: 0;
    font-size: 30px;
    line-height: 30px;
    margin-right: 0;
    z-index: 11;
    color: #ccc;
  }
  .upload_small {
    width: 100%;
    background-color: #fff;
    /*height: 150px;*/
    text-align: left;
    padding-left: 40px;
    box-sizing: border-box;
    .ul {
      display: inline-block;
      /*height: 100%;*/
      width: 150px;
      height: 150px;
      /*width: 100%;*/
      /*height: 100%;*/
      position: relative;
      display: inline-block;
      img {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
      .delete_img {
        position: absolute;
        display: block;
        top: -20px;
        right: -6px;
        font-size: 50px;
        line-height: 22px;
        color: #000;
        width: 40px;
        height: 40px;
        border-radius: 100%;
        text-align: center;
        background: rgba(0,0,0,0.60);
        i {
          display: inline-block;
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .ul:not(:last-child) {
      margin-right: 10px;
    }
    .addsmall_box {
      display: inline-block;
      position: relative;
      width: 150px;
      height: 100%;
      text-align: center;
      border: 1px dashed #e1e1e1;/*no*/
      .icon_bg {
        display: inline-block;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 50%;
        top: 36%;
        transform: translate(-50%, -50%);
        i {
          display: block;
        }
        i:nth-of-type(1) {
          color: #e1e1e1;
          font-size: 90px;
        }
        i:nth-of-type(2) {
          font-size: 20px;
          color: #dcdcdc;
          line-height: 0px;
        }
      }
      .spinner {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -50px;
        margin-top: -50px;
      }
    }
  }
  .thumbnails{
    .mint-popup{
      width: 750px;
      height: 750px;
      .mint-swipe{
        width: 750px;
        height: 750px;
        .mint-swipe-items-wrap{
          .mint-swipe-item{
          }
        }
      }
    }
  }
</style>
