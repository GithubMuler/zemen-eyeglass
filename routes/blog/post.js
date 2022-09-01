const express = require('express');
//const multer = require(multer);
const mongoose = require('mongoose');
const Post =require('../../models/Post')
const router = express.Router();
router.get("/post/:postId", function(req, res){
    const requestedPostId = req.params.postId;
      Post.findOne({_id: requestedPostId}, function(err, post){
        res.render("blog/post", {
          title: post.title,
          content: post.content,
          image: post.image,
        });
      });
    });
  module.exports = router;