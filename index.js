const config = {
	apigw: {
		restApiId: "3af9wecp71",
		resourceId: "53exwsmhp6",
		httpMethod: "ANY",
	},
	ngrok: {
		proto: 'http',
		addr: 80,
		region: 'jp',
		authtoken: 'uJcsWZVpzkdUkCwBNKHA_DEKC1odxBXqKvyiXCKwp',
	}
}

const execSync = require('child_process').execSync
const ngrok = require('ngrok')

const main = async () => {
	const ngrokUrl = await ngrok.connect(config.ngrok)
	console.log(ngrokUrl)

	execSync(`aws apigateway put-integration --rest-api-id ${config.apigw.restApiId} --resource-id ${config.apigw.resourceId} --http-method ${config.apigw.httpMethod} --type HTTP_PROXY --integration-http-method ${config.apigw.httpMethod} --uri ${ngrokUrl}`)
	execSync(`aws apigateway create-deployment --rest-api-id ${config.apigw.restApiId} --stage-name prod`)
	console.log(`https://${config.apigw.restApiId}.execute-api.ap-northeast-1.amazonaws.com/prod`)
}
main()