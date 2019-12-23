const validResources = ['developerMetadata','sheets','values']
const validMethods = ['get','search','copyTo','append','batchClear','batchGet','batchUpdate','clear','update']

exports.areQueryParamsPresent = queryParams => Object.getOwnPropertyNames(queryParams).length > 0
exports.isAppJsonHeaderNotPresent = headers => headers['content-type'] !== 'application/json'
exports.isApiResourceInvalid = apiResource => !validResources.some(validResource => validResource === apiResource)
exports.validResources = validResources
exports.isApiMethodInvalid = apiMethod => !validMethods.some(validMethod => validMethod === apiMethod)
exports.validMethods = validMethods