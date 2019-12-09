const main = require('../templates/main')
const request = require('../templates/request')

// Receber requests, autenticar e repassar para Google Sheets API

const api = (event, context, callback) => {
	console.log(event)
	return callback(null, {
		statusCode: 200,
		body: 'Hello'
	})
}

exports.handler = main(api)

// request('values', 'append', '1ypZ0N2ii1kfr1-oM1moVputhIS4I3SCrg2d6S9Q_ATY', 'Test!A1:C1', 
// 	{ values: [['Blue','Yellow','Green']] },
// 	{ valueInputOption: 'raw' }
// )