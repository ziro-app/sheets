const sheets = require('googleapis').google.sheets
const sheet = sheets('v4').spreadsheets
const authorize = require('./authorize')

const main = async () => {
	try {
		const auth = await authorize()
		try {
			const { data } = await sheet.values.get({
				auth,
				spreadsheetId: '',
				range: 'Recebimentos!A1:B1'
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

main()