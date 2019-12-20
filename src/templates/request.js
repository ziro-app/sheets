const sheets = require('googleapis').google.sheets
const sheet = sheets('v4').spreadsheets
const authorize = require('../auth/authorize')
const {
	areQueryParamsPresent,
	isAppJsonHeaderNotPresent,
	isApiResourceInvalid,
	validResources,
	isApiMethodInvalid,
	validMethods
	
} = require('../validations/index')

const request = async (headers, body, queryStringParameters) => {
	const { apiResource, apiMethod, ...otherParams } = body
	if (areQueryParamsPresent(queryStringParameters))
		return {
			statusCode: 400,
			body: JSON.stringify('usage of query string parameters is not allowed')
		}
	if (isAppJsonHeaderNotPresent(headers))
		return {
			statusCode: 400,
			body: JSON.stringify('content-type header must be application/json and body must be a raw json')
		}
	if (isApiResourceInvalid(apiResource))
		return {
			statusCode: 400,
			body: JSON.stringify(`API resource is invalid. Valid resources are ${validResources}`)
		}
	if (isApiMethodInvalid(apiMethod))
		return {
			statusCode: 400,
			body: JSON.stringify(`API method is invalid. Valid methods are ${validMethods}`)
		}
	try {
		console.log(process.env.PRIVATE_KEY)
		const auth = await authorize()
		console.log(auth)
		const { data } = await sheet[apiResource][apiMethod]({ auth, ...otherParams })
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