/// <reference path="../typings/node/node.d.ts"/>
var fs = require('fs');

var files = fs.readdirSync(__dirname)
	.filter(function (file) {
	return !!file.match(/-ctrl\.js/);
})
	.map(function (file) {
	return require(__dirname + '/' + file);
});

module.exports = files;