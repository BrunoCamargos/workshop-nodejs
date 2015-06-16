var good = require('good');
var goodConsole = require('good-console');

exports.register = function (server, options, next) {
	server.register({
		register: good,
		options: {
			reporters: [
				new goodConsole({
					ops: '*',
					error: '*',
					log: '*',
					request: '*',
					response: '*'
				})
			]
		}
	}, next);
};

exports.register.attributes = {
	name: 'log-plugin',
	version: '0.0.1'
};