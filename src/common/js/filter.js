let twoDecimals = value => {
	value = Number(value)
	return value.toFixed(2)
}

let percent = value => {
	value = Number(value) * 100
	return value + '%'
}

export { twoDecimals, percent }
