const auth = require('googleapis').google.auth
const scopes = 'https://www.googleapis.com/auth/spreadsheets'

const authorize = async () => {
	try {
		console.log(process.env.PRIVATE_KEY)
		console.log(process.env.CLIENT_EMAIL)
		console.log(process.env.TOKEN)
		return auth.getClient({ scopes, credentials: {
			'private_key': process.env.PRIVATE_KEY,
			'client_email': process.env.CLIENT_EMAIL
		}})
	} catch (error) {
		console.log('AUTH ERROR \n', error)
		throw { authError: true, message: error }
	}
}

module.exports = authorize