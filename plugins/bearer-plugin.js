var jwt = require('jsonwebtoken');
var Boom = require('boom');

exports.register = function (server, options, next) {
	server.auth.scheme('bearer', function () {
		return {
			authenticate: function (request, reply) {
				var headers = request.raw.req.headers;
				var authorization = headers.authorization || '';
				var obj = null;

				try {
					obj = jwt.verify(authorization.replace(/bearer/gi, '').trim(), 'senha123');
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
	
	server.auth.strategy('bearer', 'bearer');
	
	next();
};

exports.register.attributes = {
	name: 'bearer-plugin',
	version: '0.0.1'
};