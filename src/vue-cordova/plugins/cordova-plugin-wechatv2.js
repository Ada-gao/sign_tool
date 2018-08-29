export const install = function (Vue, options, cb) {
    document.addEventListener('deviceready', () => {
      if (typeof Wechat === 'undefined') {
        // eslint-disable-next-line
        return cb(false)
      }
      // pass through the camera object
      Vue.cordova.wechat = Wechat
      console.log('wechat is ready..')
      // eslint-disable-next-line
      return cb(true)
    }, false)
  }
