<template>
  <div>
    <div class="upload_cont" @click="selectcamera()">
      <div class='iconfont icon_bg' v-if="fromBank === 2">+</div>
      <div class='iconfont icon_bg' v-else>&#xe600;</div>
      <div>
        <ul v-if="fromBank === 2" class="ul">
          <li v-for="(item, index) in fileArr"
              :key="index"
              v-show="item">
            <img :src="item" v-show="item">
            <span class="delete_img" @click='delImage(index)'>x</span>
          </li>
        </ul>
        <img :src="imgSrc"
             class="show"
             v-show="imgSrc"
             v-else>
      </div>
      <mt-spinner class="spinner"
                  :size="spinnerSet.size"
                  color="#aaa"
                  v-show="spinnerSet.show"
                  :type="spinnerSet.type"></mt-spinner>
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
    <div v-show="alertMsg">上传图片失败</div>
  </div>
</template>
<script>
  import {updateFrontPic, updateId, addMateials} from '@/service/api/customers'
  import {Popup, Spinner} from 'mint-ui'
  export default {
    name: 'Camera',
    components: {
      'mt-popup': Popup,
      'mt-spinner': Spinner
    },
    props: ['popupVisible', 'isFromBank'],
    data () {
      return {
        imgSrc: '',
        show: this.popupVisible,
        certificationId: '',
        alertMsg: false,
        fromBank: this.isFromBank,
        idSrc: '',
        spinnerSet: {
          type: 'fading-circle',
          size: 100,
          show: false
        }
      }
    },
    mounted () {
      this.certificationId = this.$route.params.clientCertificationId
//        console.log(this.certificationId)
    },
    methods: {
      selectcamera () {
        this.show = true
        this.$emit('showPopup', this.show)
      },
      cancel () {
        this.show = false
        this.$emit('hidePopup', this.show)
      },
      camera () {
        this.show = false
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
        let cameraOptions = {
          quality: 50,
          sourceType: 0,
          destinationType: navigator.camera.DestinationType.DATA_URL,
          saveToPhotoAlbum: true,
          encodingType: navigator.camera.EncodingType.JPEG
        }
        navigator.camera.getPicture(this.cameraSuccess, this.cameraError, cameraOptions)
      },
      cameraSuccess (imageData) {
        this.spinnerSet.show = true
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
          updateFrontPic(this.certificationId, formData).then(res => {
            if (res.status === 200) {
              this.spinnerSet.show = false
              this.imgSrc = 'data:image/jpeg;base64,' + imageData
//                console.log(res.data)
//            this.popupVisible = false
            }
            console.log(res)
          }).catch(err => {
            console.log('error: ' + err)
            this.alertMsg = true
          })
        } else if (this.fromBank === 1) {
          updateId(formData).then(res => {
            if (res.status === 200) {
              this.spinnerSet.show = false
              this.imgSrc = 'data:image/jpeg;base64,' + imageData
              this.idSrc = res.status.file_url
              this.$emit('imgHandler', this.idSrc)
            }
          }).catch(err => {
            console.log('error: ' + err)
            this.alertMsg = true
          })
        } else if (this.fromBank === 2) {
          addMateials(this.certificationId, formData).then(res => {
            if (res.status === 200) {
              this.spinnerSet.show = false
              this.fileArr.push('data:image/jpeg;base64,' + imageData)
            }
          }).catch(err => {
            console.log('error: ' + err)
            this.alertMsg = true
          })
        }
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

  .upload_cont {
    text-align: center;
    width: 270px;
    height: 180px;
    line-height: 180px;
    background-color: #ddd;
    border-radius: 8px;
    position: relative;
    margin: 0 auto;
    .spinner {
      position: absolute;
      left: 50%;
      margin-left: -50px;
      top: 50%;
      margin-top: -50px;
    }
    .icon_bg {
      font-size: 115px;
      color: #fff;
    }
    .show {
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
    }
  }
</style>
