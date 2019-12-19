const sheets = require('googleapis').google.sheets
const sheet = sheets('v4').spreadsheets
const authorize = require('../auth/authorize')
const { isApiResourceValid, validResources } = require('../validations/index')

const request = async (headers, body, queryStringParameters) => {
	if (Object.getOwnPropertyNames(queryStringParameters).length > 0)
		return {
			statusCode: 400,
			body: JSON.stringify('query string parameters are not allowed')
		}
	if (headers['content-type'] !== 'application/json')
		return {
			statusCode: 400,
			body: JSON.stringify('content-type header must be application/json and body must be a raw json')
		}
	const { apiResource, apiMethod, ...otherParams } = body
	console.log(!isApiResourceValid(apiResource))
	if (!isApiResourceValid(apiResource))
		return {
			statusCode: 400,
			body: JSON.stringify(`API resource is invalid. Valid resources are ${validResources}`)
		}
	try {
		const auth = await authorize()
		console.log(auth)
		const { data } = await sheet[apiResource][apiMethod]({ auth, ...otherParams })
		return {
			statusCode: 200,
			body: JSON.stringify(data, null, 4)
		}
	} catch (error) {
		if (error.apiResourceError)
			throw { statusCode: 400, body: error.message }
		if (error.authError)
			throw { statusCode: 500, body: JSON.stringify(error.message, null, 4) }
		if (error.response && error.response.data && error.response.data.error) {
			const { code, message } = error.response.data.error
			if (code && message) throw { statusCode: code, body: message }
			console.log(error.response.data)
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