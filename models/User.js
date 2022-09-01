const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
	name: String,
	username: String,
	password: String,
	googleId: String
}) 
module.exports = mongoose.model("User", userSchema);