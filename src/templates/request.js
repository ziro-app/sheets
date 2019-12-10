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
	const { apiResource, apiMethod, spreadsheetId, range, resource, otherParams } = body
	/* if any required param is missing from body request, then return error message */
	if (!apiResource) return { statusCode: 400, body: JSON.stringify('apiResource is required') }
	if (!apiMethod) return { statusCode: 400, body: JSON.stringify('apiMethod is required') }
	if (!spreadsheetId) return { statusCode: 400, body: JSON.stringify('spreadsheetId is required') }
	if (!range) return { statusCode: 400, body: JSON.stringify('range is required') }
	if (!resource) return { statusCode: 400, body: JSON.stringify('resource is required') }
	if (!otherParams) return { statusCode: 400, body: JSON.stringify('otherParams is required') }
	/* if all required params are present, then authorize and call google sheets api */
	try {
		const auth = await authorize()
		const { data } = await sheet[apiResource][apiMethod]({
			auth,
			spreadsheetId,
			range,
			resource,
			...otherParams
		})
		return {
			statusCode: 200,
			body: JSON.stringify(data, null, 4)
		}
	} catch (error) {
		if (error.authError)
			throw { statusCode: 500, body: JSON.stringify(error.message, null, 4) }
		if (error.response && error.response.data && error.response.data.error) {
			const { code, message } = error.response.data.error
			throw { statusCode: code, body: message }
		} else {
			console.log('Unexpected error:', error)
			return {
				statusCode: 500,
				body: JSON.stringify('Internal error. Check logs', null, 4)
			}
		}
	}
}

module.exports = request