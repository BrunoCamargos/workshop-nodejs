var jwt = require('jsonwebtoken');
var Boom = require('boom');

exports.register = function (server, options, next) {
	server.auth.scheme('oauth2', function () {
		return {
			authenticate: function (request, reply) {
				var headers = request.raw.req.headers;
				var authorization = headers.authorization || '';
				var obj = null;

				try {
					obj = jwt.verify(authorization.replace(/bearer/gi, '').trim(), 'tokenSecretKey');
				} catch (err) {

				}

				if (!obj) {
					return reply(Boom.unauthorized('Not allowed'));
				}

				reply.continue({
					credentials: obj
				});
			}
		};
	});
	
	server.auth.strategy('oauth2', 'oauth2');
	
	next();
};

exports.register.attributes = {
	name: 'oauth2-plugin',
	version: '0.0.1'
};