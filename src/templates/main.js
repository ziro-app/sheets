require('dotenv').config()
const middy = require('middy')
const { jsonBodyParser } = require('middy/middlewares')
const { preflight } = require('@ziro/middleware')
const { allowedOrigin } = require('@ziro/middleware')
const { auth } = require('@ziro/middleware')
const { errorHandler } = require('@ziro/middleware')
const { cors } = require('@ziro/middleware')
const allowed = 'https://ziro.app'

const main = handler =>
	middy(handler)
	.use(preflight)
	.use(allowedOrigin(allowed))
	.use(auth)
	.use(jsonBodyParser())
	.use(errorHandler)
	.use(cors)

module.exports = main