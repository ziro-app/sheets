/* Webpack allows you to define externals - modules that should not be bundled.
This project uses middy, which depends on aws-sdk.
Nelify-lambda will, by default, bundle aws-sdk, generating an error.
webpack-node-externals defines an 'externals()' function that prevents the whole node_modules folder to be bundled.
In order to avoid bundling aws-sdk, just add the 'externals()' function to the externals property */

const externals = require('webpack-node-externals')

module.exports = {
	externals: [externals()]
}