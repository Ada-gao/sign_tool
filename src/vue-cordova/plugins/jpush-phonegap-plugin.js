import router from '../../router'
import { setStore } from '@/config/mUtils'

export const install = function (Vue, options, cb) {
  document.addEventListener('deviceready', () => {
    // 第一次成功注册到 JPush 服务器时
    document.addEventListener('jpush.receiveRegistrationId', function (event) {
      setStore('registrationId', event.registrationId)
    }, false)

    // 获取id
    var getRegistrationID = function () {
      window.JPush.getRegistrationID(onGetRegistrationID)
    }
    var onGetRegistrationID = function (data) {
      try {
        console.log('JPushPlugin:registrationID is ' + data)
        window.localStorage.setItem('registrationId', data)
        if (data.length === 0) {
          window.setTimeout(getRegistrationID, 1000)
        }
      } catch (exception) {
        console.log(exception)
      }
    }
    var initiateUI = function () {
      if ('JPush' in window) {
        console.log('jpush in window')
      } else {
        console.log('jpush is not exit')
      }
      try {
        window.JPush.init()
        window.JPush.setDebugMode(true)
        window.setTimeout(getRegistrationID, 1000)
        if (Vue.cordova.device.platform !== 'Android') {
          window.JPush.setApplicationIconBadgeNumber(0)
        }
      } catch (exception) {
        console.log(exception)
      }
    }
    var onOpenNotification = function (event) {
      try {
        var alertContent
        if (Vue.cordova.device.platform === 'Android') {
          alertContent = event
          router.push({name: 'WriteNotes', params: {id: event.extras['cn.jpush.android.EXTRA'].notificationId}})
        } else {
          alertContent = event.aps.alert
          router.push({name: 'WriteNotes', params: {id: event.extras.notificationId}})
        }
        // TODO 此处应当根据具体的消息内容跳转到不同route
        console.log('alertContent:')
        console.dir(alertContent)
      } catch (exception) {
        console.log('JPushPlugin:onOpenNotification' + exception)
      }
    }
    initiateUI()
    document.addEventListener('jpush.openNotification', onOpenNotification, false)
    Vue.cordova.jPush = window.jPush
    console.log('jpush is ready..')
    // eslint-disable-next-line
    return cb(true)
  }, false)
}
