const { google: { sheets } } = require('googleapis')
const authorize = require('./authorize')
const sheet = sheets('v4').spreadsheets

// console.log(google.sheets)

const main = async () => {
	try {
		const auth = await authorize()
	} catch (error) {
		console.log('AUTH ERROR \n', error)
	}
}

main()

// const main = async () => {
// 	try {
// 		const client = await google.auth.getClient({ keyFile, scopes })
// 		try {
// 			const { data } = await sheet.values.get({
// 				auth: client,
// 				spreadsheetId: '',
// 				range: 'Recebimentos!A1:B1'
// 			})
// 			console.log(data)
// 		} catch (error) {
// 			if (error.response && error.response.data)
// 				console.log(error.response.data)
// 		}
// 	} catch (error) {
// 		if (error.response && error.response.data)
// 			console.log(error.response.data)
// 	}
// }

// main()