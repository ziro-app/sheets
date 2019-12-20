const auth = require('googleapis').google.auth
const scopes = 'https://www.googleapis.com/auth/spreadsheets'

const authorize = async () => {
	try {
		console.log(process.env.NETLIFY)
		return auth.getClient({ scopes, credentials: {
			'private_key': process.env.NETLIFY ? JSON.parse(process.env.PRIVATE_KEY) : process.env.PRIVATE_KEY,
			'client_email': process.env.CLIENT_EMAIL
		}})
	} catch (error) {
		console.log('AUTH ERROR \n', error)
		throw { authError: true, message: error }
	}
}

module.exports = authorize