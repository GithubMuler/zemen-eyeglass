const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = Schema({
  title: {
    type: String,
   required: true
  },
  slug: {
    type:String
  },
  description: {
    type: String,
    required: true
    
  },
    category: {
    type: String,
    required:true
  },
   image:{
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  // quantity: {
  //   type: Number,
  //   required: false
  // },
 
//  cost: {
//     type: Number,
//     required: false,
//   },
 
  //  material: {
  //   type: String
  // },
  // shape: {
  //   type: String
  // },
  // size: {
  //   type: String
  // },
//   color: {
//     type: String
// },
//   type: {
//     type: String
// },
//  brand : {
//     type: String
// },
// people: {
//     type: String
// },

  // available: {
  //   type: Boolean,
  //   required: false,
  // },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
 
});

var Product = module.exports = mongoose.model("Product", productSchema);
