const main = require('../templates/main')
const request = require('../templates/request')

// Descrever objetivo do endpoint

const lambda = (event, context, callback) => {
	return request()
}

exports.handler = main(lambda)