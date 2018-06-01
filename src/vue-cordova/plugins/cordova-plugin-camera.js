const install = function (Vue, options, cb) {
  document.addEventListener('deviceready', () => {
    if (typeof navigator.camera === 'undefined') {
      return cb(new Error('error to init camera.'))
    }

    // pass through the camera object
    Vue.cordova.camera = navigator.camera

    return cb(null)
  }, false)
}

module.exports = {
    install
}
