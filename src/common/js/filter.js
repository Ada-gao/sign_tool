import { MessageBox } from 'mint-ui'
/**
 * 保留两位小数
 */
export function twoDecimals (value) {
	value = parseInt(value)
	return value.toFixed(2)
}

/**
 * 将小数转化为百分比
 */
export function percent (value) {
	value = Number(value) * 100
	return value + '%'
}

/**
 * 数字转化为字符串
 */
export function formatNum (value) {
	value = Number(value).toFixed(0)
	return value.toString()
}

/**
 * 阿拉伯数字转化为大写
 */
export function upperNum (value) {
	value = parseInt(value).toString()
	let uppercase = '千百亿千百十万千百十个'
  let nLength = value.length
  let newStr = ''
  if (uppercase.length - nLength < 0) {
    return '数字过长'
  }
  uppercase = uppercase.substr(uppercase.length - nLength)
  for (let i = 0; i < nLength; i++) {
    newStr += '零一二三四五六七八九'.charAt(value[i]) + uppercase.charAt(i)
  }
  newStr = newStr.substr(0, newStr.length - 1)
	return newStr
}

/**
 * mobile validate
 * @param value
 * @param cb
 */
export function mobileValidate (value) {
  const reg = /^((1[3-8][0-9])+\d{8})$/
  let flag = reg.test(value)
  return {
    stat: flag
  }
}

/**
 * email validate
 * @param value
 * @returns {{stat: boolean}}
 */
export function emailValidate (value) {
  const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
  let flag = reg.test(value)
  return {
    stat: flag
  }
}

/**
 * idcard validate
 * @param value
 * @returns {{stat: boolean}}
 */
export function idcardValidate (value) {
  const reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  let flag = reg.test(value)
  return {
    stat: flag
  }
}

/**
 * bankcard validate
 * @param value
 * @returns {{stat: boolean}}
 */
export function bankcrdValidate (value) {
  const reg = /^(\d{16}|\d{19})$/
  let flag = reg.test(value)
  return {
    stat: flag
  }
}

/**
 * 弹窗提示
 * @param text
 */
export function toast (text) {
  MessageBox({
    title: ' ',
    message: text,
    position: 'top',
    showConfirmButton: true
  })
}

/**
 * 转换认证状态为文字
 * realname_status:
 * 0 未认证；1 待审核； 2 已认证；3 已驳回
 * @param status
 */
export function tfCerIdToText (status) {
  let params = {
    flag: '',
    disabled: null
  }
  switch (status) {
    case '1':
      params.flag = '认证待审核'
      params.disabled = true
      // params.disabled = false
      break
    case '2':
      params.flag = '已认证'
      params.disabled = true
      break
    case '3':
      params.flag = '认证失败！请您重新认证'
      params.disabled = false
      break
    default:
      params.flag = '未认证'
      params.disabled = false
      break
  }
  return params
}

/**
 * 转换认证状态为文字
 * certification_status:
 * 0 未认证；1 待审核； 2 已认证；3 已驳回
 * @param status
 */
export function tfCtypeToText (status) {
  let params = {
    flag: '',
    disabled: null
  }
  switch (status) {
    case '1':
      params.flag = '待审核'
      params.disabled = true
      // params.disabled = false
      break
    case '2':
      params.flag = '修改'
      params.disabled = false
      break
    case '3':
      params.flag = '修改'
      params.disabled = false
      break
    default:
      params.flag = '未认证'
      params.disabled = false
      break
  }
  return params
}
// export { twoDecimals, percent, formatNum, upperNum }
