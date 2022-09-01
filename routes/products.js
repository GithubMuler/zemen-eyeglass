const express = require('express');
const mongoose = require('mongoose');
const Product =require('../models/Product')
const router = express.Router();

router.get('/products', (req, res) => {
     Product.find({}, function(err, products){
      if (err) {
        res.json({ message: err.message });
      } else {
        products = products.reverse(); 
      return res.render('products', { products: products })
      }  
    });
 })
module.exports =router;