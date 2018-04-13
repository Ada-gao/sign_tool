let twoDecimals = value => {
	value = Number(value)
	return value.toFixed(2)
}

let percent = value => {
	value = Number(value) * 100
	return value + '%'
}

let formatNum = value => {
	value = Number(value).toFixed(0)
	return value.toString()
}

export { twoDecimals, percent, formatNum }
