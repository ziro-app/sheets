const sheets = require('googleapis').google.sheets
const sheet = sheets('v4').spreadsheets
const response = require('../templates/response')
const authorize = require('../utils/authorize')
const {
	areQueryParamsPresent,
	isAppJsonHeaderNotPresent,
	isApiResourceInvalid,
	validResources,
	isApiMethodInvalid,
	validMethods
} = require('../utils/validations')

const request = async (headers, body, queryStringParameters) => {
	const { apiResource, apiMethod, ...otherParams } = body
	if (areQueryParamsPresent(queryStringParameters))
		return response(400, 'usage of query string parameters is not allowed')
	if (isAppJsonHeaderNotPresent(headers))
		return response(400, 'content-type header must be application/json and body must be a raw json')
	if (isApiResourceInvalid(apiResource))
		return response(400, `API resource is invalid. Valid resources are ${validResources}`)
	if (isApiMethodInvalid(apiMethod))
		return response(400, `API method is invalid. Valid methods are ${validMethods}`)
	try {
		const auth = await authorize()
		const { data } = await sheet[apiResource][apiMethod]({ auth, ...otherParams })
		return response(200, data)
	} catch (error) {
		if (error.authError)
			throw { statusCode: 500, body: JSON.stringify(error.message, null, 4) }
		if (error.response && error.response.data && error.response.data.error) {
			const { code, message } = error.response.data.error
			if (code && message) throw { statusCode: code, body: message }
			console.log(error.response.data)
			throw { statusCode: 400, body: error.response.data.error }
		}
		console.log(error)
		return response(500, `Internal error. ${error}`)
	}
}

module.exports = request