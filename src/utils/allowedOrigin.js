const rule = origin =>
	origin.startsWith('https://') && origin.endsWith('ziro.app') ||
	origin.startsWith('https://') && origin.endsWith('ziro.com.br')

const allowedOrigin = allowed => ({
	before: ({ callback, event: { headers: { origin } } }, next) => {
		if (rule(origin))
			next()
		else if (origin === allowed)
			next()
		else callback(null, {
				headers: { 'Access-Control-Allow-Origin': '*' },
				statusCode: 400,
				body: JSON.stringify('Origin not allowed') // only matters for browser requests
			})
	}
})

module.exports = allowedOrigin