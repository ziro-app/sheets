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
			return {
				statusCode: 500,
				body: JSON.stringify(`Internal error. ${error}`, null, 4)
			}
		}
	}
}

module.exports = request