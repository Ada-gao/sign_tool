export const install = function (Vue, options, cb) {
  document.addEventListener('deviceready', () => {
    /* global StatusBar */
    if (typeof StatusBar === 'undefined') {
      // eslint-disable-next-line
      return cb(false)
    }
    // pass through the camera object
    Vue.cordova.statusbar = StatusBar
    console.log('StatusBar is ready..')
    // eslint-disable-next-line
    return cb(true)
  }, false)
}
