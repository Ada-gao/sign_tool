/**
 * 保留两位小数
 */
let twoDecimals = value => {
	value = parseInt(value)
	return value.toFixed(2)
}

/**
 * 将小数转化为百分比
 */
let percent = value => {
	value = Number(value) * 100
	return value + '%'
}

/**
 * 数字转化为字符串
 */
let formatNum = value => {
	value = Number(value).toFixed(0)
	return value.toString()
}

/**
 * 阿拉伯数字转化为大写
 */
let upperNum = value => {
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

export { twoDecimals, percent, formatNum, upperNum }
