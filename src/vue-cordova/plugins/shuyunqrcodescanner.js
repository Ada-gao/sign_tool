export const install = function (Vue, options, cb) {
  document.addEventListener('deviceready', () => {
    /* global cordova */
    if (typeof cordova.plugins.gizscanqrcode === 'undefined') {
      // eslint-disable-next-line
      return cb(false)
    }

    Vue.cordova.scanner = cordova.plugins.gizscanqrcode

    console.log('scanner is ready..')
    // eslint-disable-next-line
    return cb(true)
  }, false)
}
