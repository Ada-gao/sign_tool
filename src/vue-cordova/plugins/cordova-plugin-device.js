export const install = function (Vue, options, cb) {
  document.addEventListener('deviceready', () => {
    /* global device */
    if (typeof device === 'undefined' || typeof device.cordova === 'undefined') {
      return cb(new Error('error to init device.'))
    }

    // default values
    Vue.cordova.device = {
      cordova: null,
      model: null,
      platform: null,
      uuid: null,
      version: null,
      manufacturer: null,
      isVirtual: null,
      serial: null
    }

    Object.keys(Vue.cordova.device).forEach(key => {
      if (typeof device[key] !== 'undefined') {
        Vue.cordova.device[key] = device[key]
      }
    })

    // var event = new Event('appReady')

    // Dispatch the event.
    // document.dispatchEvent(event)

    return cb()
  }, false)
}
