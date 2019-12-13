const auth = require('googleapis').google.auth
const scopes = 'https://www.googleapis.com/auth/spreadsheets'

const authorize = async () => {
	try {
		console.log(process.env.OLD_KEY)
		// console.log(Buffer.from(process.env.PRIVATE_KEY, 'base64').toString('ascii'))
		return auth.getClient({ scopes, credentials: {
			'private_key': Buffer.from(process.env.OLD_KEY, 'ascii').toString('ascii'),
			'client_email': process.env.CLIENT_EMAIL
		}})
	} catch (error) {
		console.log('AUTH ERROR \n', error)
		throw { authError: true, message: error }
	}
}

module.exports = authorize