require('dotenv').config()
const promisify = require('util').promisify
const write = promisify(require('fs').writeFile)

const createKeyFile = async () => write('./src/auth/credentials.json', JSON.stringify({
	"private_key": process.env.PRIVATE_KEY,
	"client_email": process.env.CLIENT_EMAIL
}, null, 2))

module.exports = createKeyFile