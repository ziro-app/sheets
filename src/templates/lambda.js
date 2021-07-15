require('dotenv').config()
const middy = require('@middy/core')
const cors = require('@middy/http-cors')
const { preflight } = require('@ziro/middleware')
const { auth } = require('@ziro/middleware')
const checkIfPostRequest = require('../utils/checkIfPostRequest')
const jsonBodyParser = require('@middy/http-json-body-parser')
const { errorHandler } = require('@ziro/middleware')

const lambda = handler =>
	middy(handler)
		.use(preflight)
		.use(auth)
		.use(checkIfPostRequest)
		.use(jsonBodyParser())
		.use(errorHandler)
		.use(cors())

module.exports = lambda