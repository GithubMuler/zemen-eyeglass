// const express = require('express');
// const mongoose = require('mongoose');
// const router = express.Router();
// const multer = require('multer');
// var fs = require('fs');
// const Post =require('../../models/Post')
// //image upload
// const storage = multer.diskStorage({
//     destination:function(req, file, cb){
//       cb(null, './post_images')
//     },
//     filename: function(req, file, cb){
//       cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
//     },
//   });
//   const upload = multer({
//     storage: storage,
//   }).single('image');




// router.get("/update/:id", function(req, res){
//     let id = req.params.id;
//     Post.findById(id, function(err, post){
//         if (err){
//             res.redirect('posts');
//               }
//         else{
//             if (post== null){
//               res.redirect('posts')  
//             }
//             else{
//               res.render('blog/update',
//                 { title: 'Update Post', post: post, });
//             }
//         }
//     });
//   });

//   router.post('/update/:id', upload, (req, res) =>{
//     let id = req.params.id;
//     let new_image ='';
//     if (req.file){
//         new_image = req.file.filename;
//         try{
//             fs.unlinkSync('./post_images/' + req.body.old_image);
//         }catch (err){
//             console.log(err);
//         }
//     } else {
//         new_image = req.body.old_image;
//     }
//     Post.findByIdAndUpdate(id, {
//         title: req.body.title,
//         content: req.body.content,
//         image: new_image,
// },  (err, result) => {
//     if (err) {
//       res.json({ message: err.message, type: 'danger' });
//     } else {
//       req.session.message = {
//         type: 'success',
//         message: 'post updated successfully!'
//       };
//       res.redirect('/posts');
//     }
//     });
//   });



  
//   module.exports = router;
