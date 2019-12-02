const { google } = require('googleapis')

async function main() {
	const keyFile = './credentials.json'
	const scopes = 'https://www.googleapis.com/auth/spreadsheets'
	const client = await google.auth.getClient({ keyFile, scopes })
	const ss = google.sheets('v4').spreadsheets
	const res = await ss.get({
		auth: client,
		spreadsheetId:''
	})
	console.log(res)
}

main().catch(console.error)