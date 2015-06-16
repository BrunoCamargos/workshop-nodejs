var bcrypt = require('bcryptjs');

module.exports = function (sequelize, types) {
	return sequelize.define('User', {
		name: types.STRING,
		email: types.STRING,
		password: {
			type: types.STRING,
			set: function (value) {
				var hash = bcrypt.hashSync(value, 10);
				this.setDataValue('password', hash);
			}
		}
	});
};