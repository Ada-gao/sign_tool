// import { MessageBox } from 'mint-ui'
export const install = function (Vue, options, cb) {
  document.addEventListener('deviceready', () => {
    /* global device */
    if (typeof device === 'undefined' || typeof device.cordova === 'undefined') {
      // eslint-disable-next-line
      return cb(false)
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

    console.log('app is ready..')
    var event = new Event('appReady')

    // Dispatch the event.
    document.dispatchEvent(event)
    function onBackKeyDown () {
      // console.log(this.$router.currentRoute.path)
      let url = (location.href).split('#')[1]
      if (url.includes('HomePage') ||
          url.includes('reservationList') ||
          url.includes('login') ||
          url.includes('customerList') ||
          url.includes('aboutMe')) {
        if (navigator.app) {
          navigator.app.exitApp()
          // MessageBox({
          //   title: '温馨提示',
          //   message: '您确定要退出吗？',
          //   showCancelButton: true
          // }).then(() => {
          //   navigator.app.exitApp()
          //   localStorage.removeItem('token')
          // }).catch(() => {
          // })
        } else if (navigator.device) {
          navigator.device.exitApp()
        } else {
          window.close()
        }
      } else {
        history.back(-1)
      }
    }
    document.addEventListener('backbutton', onBackKeyDown, false)
    // eslint-disable-next-line
    return cb(true)
  }, false)
}
