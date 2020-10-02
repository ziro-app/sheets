require('dotenv').config()
const middy = require('middy')
const { jsonBodyParser } = require('middy/middlewares')
const { preflight } = require('@ziro/middleware')
const allowedOrigin = require('../utils/allowedOrigin')
const { auth } = require('@ziro/middleware')
const { errorHandler } = require('@ziro/middleware')
const { cors } = require('@ziro/middleware')
const allowed = ['http://localhost:7070', 'http://localhost:8080', 'http://localhost:9090']

const main = handler =>
	middy(handler)
	.use(preflight)
	.use(allowedOrigin(allowed))
	.use(auth)
	.use(jsonBodyParser())
	.use(errorHandler)
	.use(cors)

module.exports = main