var Hapi = require('hapi');
var server = new Hapi.Server();

var plugins = require('./plugins');
var controllers = require('./controllers')

server.connection({
	host: 'localhost',
	port: 8080
});

server.register(plugins.concat(controllers), function(err){
	if(err)
	{
		throw err;
	}
	
	server.start();
});