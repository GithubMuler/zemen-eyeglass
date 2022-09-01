// const express = require('express');
// const mongoose = require('mongoose');
// const Post =require('../../models/Post')
// const router = express.Router();
// const multer = require('multer');
// var fs = require('fs');

// // get
// router.get("/compose", function(req, res){
//   res.render("blog/compose");
// });
// //image upload
// const storage = multer.diskStorage({
//   destination:function(req, file, cb){
//     cb(null, './post_images')
//   },
//   filename: function(req, file, cb){
//     cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
//   },
// });
// const upload = multer({
//   storage: storage,
// }).single('image');

//   router.post("/compose", upload, function(req, res){
//     const post = new Post({
//       title: req.body.postTitle,
//       content: req.body.postBody,
//       image: req.file.filename,
//     });
//     post.save(function (err) {
//       if (err) {
//         res.json({ message: err.message, type: 'danger' });
//       }
//       else {
//         req.session.message = {
//           type: 'success',
//           message: 'post added successfully!'
//         };
//          res.redirect("posts");
//       }
// });
//   });
 
// module.exports = router