const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
    title: {
		type:String,
		required: true
	},
    content: {
		type:String,
		required: true
	       },
	image: {
		type:String,
		required: true,
	},
	created:{
		type: Date,
		required: true,
		default: Date.now
	}
  
  },
  { timestamps: true }
  );
  module.exports = mongoose.model("Post", postSchema);