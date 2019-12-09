const sheets = require('googleapis').google.sheets
const sheet = sheets('v4').spreadsheets
const authorize = require('../auth/authorize')

const request = async body => {
	const { apiResource, apiMethod, spreadsheetId, range, resource, otherParams } = body
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