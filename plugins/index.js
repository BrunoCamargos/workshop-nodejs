var fs = require('fs');

var files = fs.readdirSync(__dirname)
	.filter(function (file) {
	return !!file.match(/-plugin\.js/gi);
	})
	.map(function (file) {
	return require(__dirname + '/' + file);
});

module.exports = files;