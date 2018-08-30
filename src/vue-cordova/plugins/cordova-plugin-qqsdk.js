export const install = function (Vue, options, cb) {
    document.addEventListener('deviceready', () => {
      /* global QQSDK */
      if (typeof QQSDK === 'undefined') {
        // eslint-disable-next-line
        return cb(false)
      }
      Vue.cordova.QQSDK = QQSDK
      console.log('QQSDK is ready..')
      // eslint-disable-next-line
      return cb(true)
    }, false)
  }
