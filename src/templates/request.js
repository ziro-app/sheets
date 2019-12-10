const sheets = require('googleapis').google.sheets
const sheet = sheets('v4').spreadsheets
const authorize = require('../auth/authorize')

const request = async body => {
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
		try {
			const { data } = await sheet[apiResource][apiMethod]({
				auth,
				spreadsheetId,
				range,
				resource,
				...otherParams
			})
			console.log(data)
			return {
				statusCode: 200,
				body: JSON.stringify(data, null, 4)
			}
		} catch (error) {
			if (error.response && error.response.data && error.response.data.error) {
				const { status_code, message } = error.response.data.error
				throw { statusCode: status_code, body: message }
			} else {
				console.log('Unexpected error:', error)
				return {
					statusCode: 500,
					body: JSON.stringify('Internal error. Check logs', null, 4)
				}
			}
		}
	} catch (error) {
		console.log('AUTH ERROR \n', error)
	}
}

module.exports = request