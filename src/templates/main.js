require('dotenv').config()
const middy = require('middy')
const { jsonBodyParser } = require('middy/middlewares')
const { preflight } = require('@ziro/middleware')
const allowedOrigin = require('../utils/allowedOrigin')
const { auth } = require('@ziro/middleware')
const { errorHandler } = require('@ziro/middleware')
const { cors } = require('@ziro/middleware')
const allowed = 'http://localhost:8080' // allowed origin in development

const main = handler =>
	middy(handler)
	.use(preflight)
	.use(allowedOrigin(allowed))
	.use(auth)
	.use(jsonBodyParser())
	.use(errorHandler)
	.use(cors)

module.exports = main