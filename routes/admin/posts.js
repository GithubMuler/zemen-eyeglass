const express = require('express');
const mongoose = require('mongoose');
const Post =require('../../models/Post')
const router = express.Router();
const multer = require('multer');
var fs = require('fs');

//image upload
const storage = multer.diskStorage({
  destination:function(req, file, cb){
    cb(null, './post_images')
  },
  filename: function(req, file, cb){
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
}).single('image');

router.get("/", function(req, res){
  Post.find({}, function (err, posts) {
       posts = posts.reverse(); 
      res.render("blog/posts", {
        posts: posts
        });
    });
});
  // GET compose form
router.get("/compose", function(req, res){
  res.render("blog/compose");
});
// POST compose form
router.post("/compose", upload, function(req, res){
    const post = new Post({
      title: req.body.postTitle,
      content: req.body.postBody,
      image: req.file.filename,
    });
    post.save(function (err) {
      if (err) {
        res.json({ message: err.message, type: 'danger' });
      }
      else {
        req.session.message = {
          type: 'success',
          message: 'post added successfully!'
        };
         res.redirect("/admin/posts");
      }
});
});
  
//GET update form
router.get("/update/:id", function(req, res){
    let id = req.params.id;
    Post.findById(id, function(err, post){
        if (err){
            res.redirect('/admin/posts');
              }
        else{
            if (post== null){
              res.redirect('/admin/posts')  
            }
            else{
              res.render('blog/update',
                { title: 'Update Post', post: post, });
            }
        }
    });
  });

  router.post('/update/:id', upload, (req, res) =>{
    let id = req.params.id;
    let new_image ='';
    if (req.file){
        new_image = req.file.filename;
        try{
            fs.unlinkSync('./post_images/' + req.body.old_image);
        }catch (err){
            console.log(err);
        }
    } else {
        new_image = req.body.old_image;
    }
    Post.findByIdAndUpdate(id, {
        title: req.body.title,
        content: req.body.content,
        image: new_image,
},  (err, result) => {
    if (err) {
      res.json({ message: err.message, type: 'danger' });
    } else {
      req.session.message = {
        type: 'success',
        message: 'post updated successfully!'
      };
      res.redirect('/admin/posts');
    }
    });
  });
  // DELETE post 
router.get("/delete/:id", function (req, res) {
    let id = req.params.id;
    Post.findByIdAndRemove(id, function (err, result) {
        if (result.image != '') {
            try {
                fs.unlinkSync('./post_images/' + result.image);
            } catch (err) {
                console.log(err);
            }
        }
        if (err) {
            res.json({ message: err.message });
        } else {
            req.session.message = {
                type: 'info',
                message: 'post deleted successfully!',
            };
            res.redirect('/admin/posts');
        }
    })     
})
  module.exports = router;