var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	name	: { type: String },
	password: { type: String },
	tipo	: { type: String, enum: ['client','coach']}
});

module.exports = mongoose.model('User','userSchema');