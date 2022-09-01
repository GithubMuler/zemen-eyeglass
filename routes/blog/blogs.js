const express = require('express');
const mongoose = require('mongoose');
const Post =require('../../models/Post')
const router = express.Router();
router.get("/blogs", function(req, res){
    Post.find({}, function(err, posts){
      if (err) {
        res.json({ message: err.message });
      } else {
        posts = posts.reverse(); 
      return res.render("blog/blogs", { posts: posts } );
      }  
    });
  });
  module.exports = router;

