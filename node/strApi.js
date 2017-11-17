function trim(str) {
	return str.replace(/(^h|d$)/g,'aaaaaa');
}

module.exports.trim = trim;