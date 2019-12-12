require('dotenv').config()
const fs = require('fs')

const createKeyFile = () => fs.writeFileSync('./src/auth/credentials.json', JSON.stringify({
	"private_key": process.env.PRIVATE_KEY,
	"client_email": process.env.CLIENT_EMAIL
}, null, 2))

module.exports = createKeyFile