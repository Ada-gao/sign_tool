<template>
  <div>
    <div class="upload_cont" :class="{'upload_small': fromBank === 2}">

      <div v-if="fromBank === 2" class="upload_more">
        <!-- <ul class="ul"> -->
        <div v-for="(item, index) in fileArr"
             :key="index"
             v-show="item"
             class="img">
          <img :src="item + '!132x120'" v-show="item" @click="showBigImg('imgArr', index)">
          <span class="delete_img" @click='delImage(index)'>x</span>
          <!-- <thumbnails v-if="showImg" :imgTotal="fileArr" :imgKey="index" :showImg="showImg" v-on:hideBigPop="hideBigImg"></thumbnails> -->
        </div>
        <!-- </ul> -->
        <div class="addsmall_box" @click="selectcamera()">
          <span class="iconfont icon_bg">+</span>
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
      <!-- <thumbnails v-if="showImg" :imgTotal="imgSrc" :showImg="showImg" v-on:hideBigPop="hideBigImg"></thumbnails> -->
      <i v-if="imgSrc" class="iconfont enlarge" @click="showBigImg('imgSrc')">&#xe60c;</i>
    </div>
    <thumbnails v-if="showImg" :imgTotal="bigImg" :imgKey="bigImgIndex" :showImg="showImg" v-on:hideBigPop="hideBigImg"></thumbnails>
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
  import thumbnails from '@/base/camera/thumbnails'
  //  import {getStore} from '@/config/mUtils'
  export default {
    name: 'Camera',
    components: {
      'mt-popup': Popup,
      thumbnails
    },
    props: ['popupVisible', 'isFromBank', 'cerId', 'imageSrc', 'imageArr', 'isFromAppointment'],
    // props: {
    //   imageArr: {
    //     default: null
    //   },
    //   popupVisible: {
    //     default: false
    //   },
    //   imageSrc: {
    //     default: ''
    //   },
    //   isFromAppointment: {
    //     default: ''
    //   },
    //   isFromBank: {
    //     default: ''
    //   }
    // },
    data () {
      return {
        imgSrc: '',
        fileArr: [],
        show: this.popupVisible,
        certificationId: '',
        alertMsg: false,
        fromBank: this.isFromBank,
        idSrc: '',
        appointmentSrc: [],
        spinnerShow: false,
        fileId: [],
        outsideSrc: [],
        showImg: false,
        bigImg: null,
        bigImgIndex: ''
      }
    },
    watch: {
      'imageSrc': function (n, o) {
        this.setImgSrc()
      },
      // imageArr(curVal, oldVal) {
      //   console.log(curVal)
      // },
      'imageArr': {
        handler (n, o) {
          this.setImgSrcArr()
        },
        deep: true
      }
    },
    mounted () {
      this.outsideSrc = this.imageArr
      if (this.outsideSrc !== undefined) {
        for (let i = 0; i < this.outsideSrc.length; i++) {
          this.appointmentSrc.push(this.outsideSrc[i])
        }
      }
      this.setImgSrc()
      this.setImgSrcArr()
    },
    activated () {
      this.outsideSrc = this.imageArr
      this.appointmentSrc = []
      if (this.outsideSrc !== undefined) {
        for (let i = 0; i < this.outsideSrc.length; i++) {
          this.appointmentSrc.push(this.outsideSrc[i])
        }
      }
      this.setImgSrc()
      this.setImgSrcArr()
    },
    methods: {
      setImgSrc () {
        this.imgSrc = this.imageSrc
      },
      setImgSrcArr () {
        this.fileArr = this.imageArr || []
        // this.imageArr = this.fileArr
      },
      selectcamera () {
        console.log('selectC')
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
          saveToPhotoAlbum: true,
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
          if (this.isFromAppointment === 1) {
            updateId(formData).then(res => {
              if (res.status === 200) {
                this.fileId.push(res.data.client_cert_file_id)
                this.idSrc = res.data.file_url
                this.spinnerShow = false
                this.imgSrc = 'data:image/jpeg;base64,' + imageData
                this.$emit('imgHandler', this.idSrc)
              }
            }).catch(err => {
              console.log('error: ' + err)
              this.alertMsg = true
            })
          } else {
            updateFrontPic(this.cerId, formData).then(res => {
              if (res.status === 200) {
                this.spinnerShow = false
                this.imgSrc = 'data:image/jpeg;base64,' + imageData
              }
            }).catch(err => {
              console.log('error: ' + err)
              this.alertMsg = true
            })
          }
        } else if (this.fromBank === 1) {
          updateId(formData).then(res => {
            if (res.status === 200) {
              this.spinnerShow = false
              this.imgSrc = 'data:image/jpeg;base64,' + imageData
              this.idSrc = res.data.file_url
              this.$emit('imgHandler', this.idSrc)
            }
          }).catch(err => {
            console.log('error: ' + err)
            this.alertMsg = true
          })
        } else if (this.fromBank === 2) {
          if (this.isFromAppointment === 1) {
            updateId(formData).then(res => {
              if (res.status === 200) {
                this.fileId.push(res.data.client_cert_file_id)
                this.appointmentSrc.push(res.data.file_url)
                this.spinnerShow = false
                this.fileArr = [...this.appointmentSrc]
                // this.fileArr.push('data:image/jpeg;base64,' + imageData)
                this.$emit('imgHandler', this.appointmentSrc)
              }
            }).catch(err => {
              console.log('error: ' + err)
              this.alertMsg = true
            })
          } else {
//            console.log(this.fileArr)
            addMateials(this.cerId, formData).then(res => {
              if (res.status === 200) {
                this.fileId.push(res.data.client_cert_file_id)
                this.spinnerShow = false
                this.fileArr.push('data:image/jpeg;base64,' + imageData)
                this.$emit('imgHandler', this.fileId)
              }
            }).catch(err => {
              console.log('error: ' + err)
              this.alertMsg = true
            })
          }
        }
      },
      delImage (index) {
        if (this.isFromAppointment === 1) {
          this.appointmentSrc.splice(index, 1)
          this.fileArr = this.appointmentSrc
        } else {
          deleteDetail(this.cerId, this.fileId[index]).then(res => {
            if (res.status === 200) {
              this.fileId.splice(index, 1)
            }
          })
          this.fileArr.splice(index, 1)
        }
      },
      showBigImg (data, index) {
        this.showImg = true
        if (data === 'imgArr') {
          this.bigImg = this.fileArr
          this.bigImgIndex = index
        } else if (data === 'imgSrc') {
          this.bigImg = this.imgSrc
        }
      },
      hideBigImg (data) {
        this.showImg = data
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
    height: 180px;
    line-height: 180px;
    background-color: #ddd;
    border-radius: 8px;
    position: relative;
    margin: 0 auto;
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
    .upload_more{
      display: inline-block;
      height: 120px;
    }
  }
  .enlarge{
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 30px;
    line-height: 30px;
    z-index: 11;
    color: #ccc;
  }
  .upload_small {
    width: 100%;
    background-color: #fff;
    height: 120px;
    text-align: left;
    padding-left: 20px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    // .ul {
    //   display: inline-block;
    //   height: 120px;
    .img {
      width: 132px;
      height: 120px;
      position: relative;
      display: inline-block;
      margin-right: 20px;
      margin-bottom: 15px;
      img {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
      .delete_img {
        width: 40px;
        height: 40px;
        display: inline-block;
        background: rgba(0,0,0,0.60);
        border-radius: 50%;
        line-height: 35px;
        text-align: center;
        color: #fff;
        font-size: 30px;/*px*/
        position: absolute;
        top: -15px;
        right: -15px;
      }
    }
    li:not(:last-child) {
      margin-right: 10px;
    }
    // }
    .addsmall_box {
      display: inline-block;
      position: relative;
      width: 132px;
      height: 120px;
      background-color: #ddd;
      border-radius: 8px;
      text-align: center;
      .icon_bg {
        font-size: 60px;
        display: inline-block;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        line-height: 110px;
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
</style>
