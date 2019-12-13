const sheets = require('googleapis').google.sheets
const sheet = sheets('v4').spreadsheets
const authorize = require('../auth/authorize')

const request = async (headers, body, queryStringParameters) => {
	/* if query string parameters are present, then return error message */
	if (Object.getOwnPropertyNames(queryStringParameters).length > 0)
		return {
			statusCode: 400,
			body: JSON.stringify('query string parameters are not allowed')
		}
	/* if headers are not valid, then return error message */
	if (headers['content-type'] !== 'application/json')
		return {
			statusCode: 400,
			body: JSON.stringify('content-type header must be application/json and body must be a raw json')
		}
	/* authorize and call google sheets api passing client params */
	try {
		const { apiResource, apiMethod, ...otherParams } = body
		const auth = await authorize()
		console.log('BEFORE>><<')
		const data = await sheet.values.get({ auth, ...otherParams })
		// const { data } = await sheet[apiResource][apiMethod]({ auth, ...otherParams })
		console.log('AFTER>><<')
		console.log(data)
		return {
			statusCode: 200,
			body: JSON.stringify(data, null, 4)
		}
	} catch (error) {
		if (error.authError)
			throw { statusCode: 500, body: JSON.stringify(error.message, null, 4) }
		if (error.response && error.response.data && error.response.data.error) {
			const { code, message } = error.response.data.error
			if (code && message) throw { statusCode: code, body: message }
			throw { statusCode: 400, body: error.response.data.error }
		}
		console.log(error)
		return {
			statusCode: 500,
			body: JSON.stringify(`Internal error. ${error}`, null, 4)
		}
	}
}

module.exports = request