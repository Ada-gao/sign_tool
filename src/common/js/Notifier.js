import { Toast, MessageBox } from 'mint-ui'

let TOAST_DURATION = 3000
export default {
  toast: function (msg, duartion) {
    Toast({
      message: msg,
      duration: duartion || TOAST_DURATION
    })
  },

  alert: function (msg, callback, title) {
      let msgNew = msg
      if (msg.indexOf('\n') > 0) {
        msgNew = msg.replace(/[\n\r]/g, '<br/>')
      }
      MessageBox.alert(msgNew, title || '').then(callback || function () {
        console.log('you clicked button.')
      })
  },

  confirm: function (msg, confirmCallBack, cancelCallBack, confirmButtonText, cancelButtonText, title) {
    if (cancelCallBack === undefined) {
      cancelCallBack = function () {
        console.log('you clicked cancel button.')
      }
    }

    if (confirmCallBack === undefined) {
      confirmCallBack = function () {
        console.log('you clicked confirm button.')
      }
    }

    MessageBox({
      title: title || '',
      message: msg,
      showCancelButton: true,
      closeOnClickModal: false,
      confirmButtonText: confirmButtonText || '确定',
      cancelButtonText: cancelButtonText || '取消'
    }, action => {
      console.log(action)
      if (action === 'confirm') {
        confirmCallBack()
      } else if (action === 'cancel') {
        cancelCallBack()
      } else {
        console.log('We do not support 3 more buttons for confirm dialog. ')
      }
    })
  }
}
