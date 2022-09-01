// const express = require('express');
// const mongoose = require('mongoose');
// const router = express.Router();
// const multer = require('multer');
// var fs = require('fs');
// const Post = require('../../models/Post')
// // delete 
// router.get("/delete/:id", function (req, res) {
//     let id = req.params.id;
//     Post.findByIdAndRemove(id, function (err, result) {
//         if (result.image != '') {
//             try {
//                 fs.unlinkSync('./post_images/' + result.image);
//             } catch (err) {
//                 console.log(err);
//             }
//         }
//         if (err) {
//             res.json({ message: err.message });
//         } else {
//             req.session.message = {
//                 type: 'info',
//                 message: 'post deleted successfully!',
//             };
//             res.redirect('/posts');
//         }
//     })     
// })
  
//   module.exports = router;
