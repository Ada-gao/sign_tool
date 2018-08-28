export const install = function (Vue, options, cb) {
  document.addEventListener('deviceready', () => {
    // if (typeof window.jPush === 'undefined') {
    //   return cb(false)
    // }

    // pass through the camera object
    var onDeviceReady = function () {
      document.addEventListener('jpush.receiveRegistrationId', function (event) {
          // alert('receiveRegistrationId' + JSON.stringify(event))
          // $('#registrationId').html(event.registrationId)
          console.log(event.registrationId)
      }, false)
      initiateUI()
    }
    var getRegistrationID = function () {
      window.JPush.getRegistrationID(onGetRegistrationID)
    }
    var onGetRegistrationID = function (data) {
      try {
        console.log('JPushPlugin:registrationID is ' + data)
        if (data.length === 0) {
          // var t1 = window.setTimeout(getRegistrationID, 1000)
        }
      } catch (exception) {
        console.log(exception)
      }
    }
    var initiateUI = function () {
      if ('JPush' in window) {
        console.log('init jpush')
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
        console.log('it is initiateUI')
      } catch (exception) {
        console.log(exception)
      }
    }
    var onOpenNotification = function (event) {
      try {
        var alertContent
        if (Vue.cordova.device.platform === 'Android') {
          alertContent = event
        } else {
          alertContent = event.aps.alert
        }
      } catch (exception) {
        console.log('JPushPlugin:onOpenNotification' + exception)
      }
    }
    document.addEventListener('deviceready', onDeviceReady, false)
    document.addEventListener('jpush.openNotification', onOpenNotification, false)

    // eslint-disable-next-line
    return cb(true)
  }, false)
}
