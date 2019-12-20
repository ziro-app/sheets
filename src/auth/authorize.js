const auth = require('googleapis').google.auth
const scopes = 'https://www.googleapis.com/auth/spreadsheets'

const authorize = async () => {
	try {
		return auth.getClient({ scopes, credentials: {
			'private_key': process.env.DEV ? process.env.PRIVATE_KEY : JSON.parse(process.env.PRIVATE_KEY),
			'client_email': process.env.CLIENT_EMAIL
		}})
	} catch (error) {
		console.log('AUTH ERROR \n', error)
		throw { authError: true, message: error }
	}
}

module.exports = authorize