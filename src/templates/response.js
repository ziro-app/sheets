const response = (statusCode, message) => ({
	statusCode,
	body: JSON.stringify(message, null, 4)
})

module.exports = response