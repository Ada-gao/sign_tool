
// list here all supported plugins
const pluginsList = [
  'cordova-plugin-camera',
  'cordova-plugin-device',
  'jpush-phonegap-plugin',
  'cordova-plugin-qqsdk',
  'cordova-plugin-wechatv2',
  'shuyunqrcodescanner'
]

exports.install = (Vue, options) => {
  // declare global Vue.cordova object
  Vue.cordova = Vue.cordova || {
    deviceready: false,
    plugins: []
  }

  // Cordova events wrapper
  Vue.cordova.on = (eventName, cb) => {
    document.addEventListener(eventName, cb, false)
  }

  // let Vue know that deviceready has been triggered
  document.addEventListener('deviceready', () => {
    console.log('deviceready is ready')
    Vue.cordova.deviceready = true
  }, false)

  // load supported plugins
  pluginsList.forEach(pluginName => {
    let plugin = require('./plugins/' + pluginName)
    plugin.install(Vue, options, pluginLoaded => {
      if (pluginLoaded) {
        Vue.cordova.plugins.push(pluginName)
      }
      if (Vue.config.debug) {
        console.log('[VueCordova]', pluginName, '→', pluginLoaded ? 'loaded' : 'not loaded')
      }
    })
  })
}
