const { google } = require('googleapis')
const keyFile = './credentials.json'
const scopes = 'https://www.googleapis.com/auth/spreadsheets'
const sheet = google.sheets('v4').spreadsheets

const main = async () => {
	try {
		const client = await google.auth.getClient({ keyFile, scopes })
		try {
			const { data } = await sheet.values.get({
				auth: client,
				spreadsheetId: '',
				range: 'Recebimentos!A1:B1'
			})
			console.log(data)
		} catch (error) {
			if (error.response && error.response.data)
				console.log(error.response.data)
		}
	} catch (error) {
		if (error.response && error.response.data)
			console.log(error.response.data)
	}
}

main()