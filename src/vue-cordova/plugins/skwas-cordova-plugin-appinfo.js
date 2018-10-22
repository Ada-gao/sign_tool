/**
 * Created by gaoyuan on 10/22/18.
 */
exports.install = function (Vue, options, cb) {
  document.addEventListener('deviceready', () => {
    /* global appInfo */
    if (typeof appInfo === 'undefined') {
      // eslint-disable-next-line
      return cb(false)
    }

    var ai = {}
    ai.name = appInfo.name
    ai.version = appInfo.version
    ai.identifier = appInfo.identifier
    ai.build = appInfo.build
    ai.compileDate = appInfo.compileDate
    ai.isHardwareAccelerated = appInfo.isHardwareAccelerated
    ai.isDebuggable = appInfo.isDebuggable

    Vue.cordova.appInfo = ai
    console.log(Vue.cordova.appInfo)
    // eslint-disable-next-line
    return cb(true)
  }, false)
}
