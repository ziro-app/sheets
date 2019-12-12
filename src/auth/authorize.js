const auth = require('googleapis').google.auth
const createKeyFile = require('./createKeyFile.js')
createKeyFile()
const keyFile = './src/auth/credentials.json'
const scopes = 'https://www.googleapis.com/auth/spreadsheets'

const authorize = () => {
	try {
		return auth.getClient({ keyFile, scopes })
	} catch (error) {
		console.log('AUTH ERROR \n', error)
		throw { authError: true, message: error }
	}
}

module.exports = authorize