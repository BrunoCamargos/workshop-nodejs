var fs = require('fs');
var db = require('../lib/db');

/*
module.exports = fs.readdirSync(__dirname)
	.filter(function (file) {
		return !!file.match(/-model\.js/);
	})
	.map(function (file) {
		return db.import(__dirname + '/' + file);
});
*/

//*
var models = {};

fs.readdirSync(__dirname)
	.filter(function (file) {
		return !!file.match(/-model\.js/);
	})
	.forEach(function (file) {
		var model = db.import(__dirname + '/' + file);
		models[model.name] = model;
});

module.exports = models;
//*/

/*
fs.readdirSync(__dirname).forEach(function (file) {
	if(!file.match(/model\.js/gi))
		return;
	})
	
		var model = db.import(__dirname + '/' + file);
		models[model.name] = model;
});

module.exports = models;
*/
 