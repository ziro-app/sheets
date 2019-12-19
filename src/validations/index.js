const validResources = ['developerMetadata','sheets','values']

exports.areQueryParamsValid = queryParams => Object.getOwnPropertyNames(queryParams).length > 0
exports.areHeadersValid = headers => headers['content-type'] !== 'application/json'
exports.isApiResourceValid = apiResource => validResources.some(validResource => validResource === apiResource)
exports.validResources = validResources