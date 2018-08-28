export const install = function (Vue, options, cb) {
    document.addEventListener('deviceready', () => {
      if (typeof QQSDK === 'undefined') {
        // eslint-disable-next-line
        return cb(false)
      }
      // pass through the camera object
      Vue.cordova.qqsdk = QQSDK
      console.log(QQSDK)
      console.log(window.QQSDK)
      console.log('qqsdk is ready..')
      // eslint-disable-next-line
      return cb(true)
    }, false)
  }
