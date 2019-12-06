const sheets = require('googleapis').google.sheets
const sheet = sheets('v4').spreadsheets
const authorize = require('./authorize')

const request = async (resource, method, spreadsheetId, range, others) => {
	try {
		const auth = await authorize()
		try {
			const { data } = await sheet[resource][method]({
				auth,
				spreadsheetId,
				range,
				...others
			})
			console.log(data)
		} catch (error) {
			if (error.response && error.response.data)
				console.log('API ERROR \n', error.response.data)
		}
	} catch (error) {
		console.log('AUTH ERROR \n', error)
	}
}

request('values', 'get', '1ypZ0N2ii1kfr1-oM1moVputhIS4I3SCrg2d6S9Q_ATY', 'Test!A1:C1')