var bluebird = require('bluebird');
var models = require('../models');
var names = Object.keys(models);

bluebird.resolve(names).each(function(name){
	return models[name].sync();
})
.then(function(){
	console.log('Acabou');
});