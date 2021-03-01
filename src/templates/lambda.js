require('dotenv').config()
const middy = require('@middy/core')
const { preflight } = require('@ziro/middleware')
const { allowedOrigin } = require('@ziro/middleware')
const { auth } = require('@ziro/middleware')
const checkIfPostRequest = require('../utils/checkIfPostRequest')
const jsonBodyParser = require('@middy/http-json-body-parser')
const { errorHandler } = require('@ziro/middleware')
const { cors } = require('@ziro/middleware')
const allowed = ['http://localhost:7070', 'http://localhost:8080', 'http://localhost:9090']

const lambda = handler =>
	middy(handler)
		.use(preflight)
		// .use(allowedOrigin(allowed))
		.use(auth)
		.use(checkIfPostRequest)
		.use(jsonBodyParser())
		.use(errorHandler)
		.use(cors)

module.exports = lambda