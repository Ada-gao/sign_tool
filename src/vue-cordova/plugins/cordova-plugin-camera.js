export const install = function (Vue, options, cb) {
  document.addEventListener('deviceready', () => {
    if (typeof navigator.camera === 'undefined') {
      // eslint-disable-next-line
      return cb(false)
    }

    // pass through the camera object
    Vue.cordova.camera = navigator.camera

    console.log('camera is ready..')
    // eslint-disable-next-line
    return cb(true)
  }, false)
}
