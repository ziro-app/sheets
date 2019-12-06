const sheets = require('googleapis').google.sheets
const sheet = sheets('v4').spreadsheets
const authorize = require('./authorize')

const request = async (apiResource, apiMethod, spreadsheetId, range, resource, otherParams) => {
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
		} catch (error) {
			if (error.response && error.response.data)
				console.log('API ERROR \n', error.response.data)
		}
	} catch (error) {
		console.log('AUTH ERROR \n', error)
	}
}

request('values', 'append', '1ypZ0N2ii1kfr1-oM1moVputhIS4I3SCrg2d6S9Q_ATY', 'Test!A1:C1', 
	{ values: [['Blue','Yellow','Green']] },
	{ valueInputOption: 'raw' }
)