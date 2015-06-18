var Joi = require('joi');
var route = '/api/v1/oauth';
var jwt = require('jsonwebtoken');

exports.register = function(server, options, next) {
	server.route({
		method: 'POST',
		path: route + '/auth',
		handler: function(request, reply) {
			var data = request.payload;
			var headers = request.raw.req.headers;
			var authorization = headers.authorization || '';

			console.log(authorization);

			var tokenCredential = authorization.split(/\s+/).pop() || '';
			var composedCredential = new Buffer(tokenCredential, 'base64').toString();
			console.log(composedCredential);

			var credentialParts = composedCredential.split(/:/);
			var username = credentialParts[0];
			var password = credentialParts[1];

			// TODO: Check the client credentials

			/*	
				http://tools.ietf.org/html/rfc6749#section-4.3.1
				grant_type
					REQUIRED.  Value MUST be set to "password".

				username
			    	REQUIRED.  The resource owner username.

				password
			    	REQUIRED.  The resource owner password.

				scope
			    	OPTIONAL.  The scope of the access request as described by
			    	Section 3.3.
			*/

			// TODO: Verify if the grant_type is 'password'

			var obj = {
				clientId: username,
				clientSecret: password,
				roUsername: data.username,
				roPassword: data.password,
				scope: data.scope
			};

			console.log(obj);

			// var token = jwt.sign(obj, 'tokenSecretKey', {
			// 	expiresInMinutes: 30
			// });

			var token = jwt.sign(obj, 'tokenSecretKey');

			reply({
				access_token: token,
				token_type: "bearer"
			});

		},
		config: {
			validate: {
				payload: {
					grant_type: Joi.string().required(),
					username: Joi.string().required(),
					password: Joi.string().required(),
					scope: Joi.string().required()
				}
			}
		}
	});

	server.route({
		method: 'GET',
		path: route,
		handler: function(request, reply) {
			reply(request.auth.credentials);
		},
		config: {
			auth: 'oauth2'
		}
	});

	next();
};

exports.register.attributes = {
	name: 'oaurh2-ctrl',
	version: '0.0.1'
};