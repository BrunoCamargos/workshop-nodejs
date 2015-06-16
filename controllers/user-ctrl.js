var Joi = require('joi');
var models = require('../models');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var Boom = require('boom');

var route = '/api/v1/user';

exports.register = function (server, options, next) {
	server.route({
		method: 'POST',
		path: route + '/auth',
		handler: function (request, reply) {
			var User = models.User;
			var data = request.payload;

			User.find({
				where: {
					email: data.email
				}
			}).then(function (user) {
				if (!user) {
					throw Boom.notFound('User not found');
				}

				var password = user.get('password');

				if (!bcrypt.compareSync(data.password, password)) {
					throw Boom.badRequest('Wrong password')
				}

				var token = jwt.sign({
					user: user.get('id')
				}, 'senha123', { expiresInMinutes: 10 });

				reply({ token: token });
			}).catch(function (err) {
				if (err.isBoom) {
					reply(err);
				}
				else {
					reply(Boom.wrap(err));
				}
			});
		}
	});

	server.route({
		method: 'POST',
		path: route,
		handler: function (request, reply) {
			console.log(models);
			console.log(models[0]);

			var User = models.User;
			//var User = models[1];

			User
				.create(request.payload)
				.then(function (user) {
				reply(user.get());
			});
		},
		config: {
			validate: {
				payload: {
					name: Joi.string().required(),
					email: Joi.string().email().required(),
					password: Joi.string().required()
				}
			}
		}
	});

	next();
};

exports.register.attributes = {
	name: 'user-ctrl',
	version: '0.0.1'
};