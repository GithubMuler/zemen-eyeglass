
const express = require('express');
const mongoose = require('mongoose');
const about =require('../models/about')
const router = express.Router();
router.get("/about", function(req, res){
    about.find({}, function(err, about){
      about = about.reverse(); 
      return res.render("about", { about: about } );
    });
  });
module.exports = router;
  