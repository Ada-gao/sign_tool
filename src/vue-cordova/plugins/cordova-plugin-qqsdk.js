export const install = function (Vue, options, cb) {
    document.addEventListener('deviceready', () => {
      /* global QQSDK */
      if (typeof QQSDK === 'undefined') {
        // eslint-disable-next-line
        return cb(false)
      }
      // pass through the camera object
      Vue.cordova.qqsdk = QQSDK
      console.log('qqsdk is ready..')
      // eslint-disable-next-line
      return cb(true)
    }, false)
  }
