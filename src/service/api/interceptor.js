export default {
  errMessage (url, code) {
    const urlMap = {
      '/client/customers/': {
      },
      '/v1/auth/verification_code/': {
        400: '该手机号已被验证'
      }
    }
    for (let key in urlMap) {
      url = url.indexOf(key) > -1 ? key : url
    }
    console.log(url)
    // if (url === '/auth/oauth/token') {
    //   console.log(url)
    //   return {'code': '777777', errMsg: '登录接口'}
    // }
    let codeMsgMap = urlMap[url]
    console.log(codeMsgMap)
    if (codeMsgMap === undefined) {
      console.log('请在interceptor内定义 ' + url + ' 的ErrorMsg信息')
      return {'code': '888888', errMsg: '没有这个接口'}
    }
    let errorMsg = codeMsgMap[code]
    console.log(errorMsg)
    if (errorMsg) {
      return { 'code': code, errMsg: errorMsg }
    } else {
      return {'code': '999999', errMsg: '服务器正忙，请稍后重试'}
    }
  }
}
